import { getSupabaseClient } from '@/lib/supabase/client'
import { uploadMembershipFile } from '@/lib/supabase/storage'
import { membershipCategories } from '@/data/site-content'

export type TlpsMembershipPayload = {
  categoryCode: string
  fullName: string
  preferredName: string
  applicationDate: string
  email: string
  mobile: string
  cityProvinceCountry: string
  occupation: string
  referral: string
  interests: string[]
  statement: string
  dateOfBirth: string
  gender: string
  address: string
  education: string
  declarationAccepted: boolean
  privacyAccepted: boolean
  idPhoto?: File
  signature?: File
  paymentReference?: string
  paymentDate?: string
  paymentReceipt?: File
  password?: string
}

function refCode() {
  return `TLPS-${Date.now().toString(36).toUpperCase()}`
}

function feeForCategory(code: string) {
  return membershipCategories.find((c) => c.code === code)?.fee ?? 0
}

export async function submitTlpsMembership(payload: TlpsMembershipPayload) {
  const supabase = getSupabaseClient()
  if (!supabase) throw new Error('Supabase is not configured')

  if (!payload.declarationAccepted || !payload.privacyAccepted) {
    throw new Error('Please accept the declaration and privacy notice')
  }

  const fee = feeForCategory(payload.categoryCode)
  if (fee > 0) {
    if (!payload.paymentReference?.trim()) throw new Error('Enter payment reference number')
    if (!payload.paymentDate?.trim()) throw new Error('Enter payment date')
    if (!payload.paymentReceipt?.size) throw new Error('Upload payment receipt')
  }

  let userId: string | null = null
  const { data: sessionData } = await supabase.auth.getSession()
  if (sessionData.session?.user) {
    userId = sessionData.session.user.id
  } else if (payload.password && payload.password.length >= 8) {
    const { data: signUp, error: signErr } = await supabase.auth.signUp({
      email: payload.email.trim(),
      password: payload.password,
      options: {
        data: { full_name: payload.fullName.trim() },
      },
    })
    if (signErr) throw new Error(signErr.message)
    userId = signUp.user?.id ?? null
  }

  const reference = refCode()
  const { data: row, error: insertErr } = await supabase
    .from('tlps_membership_applications')
    .insert({
      applicant_id: userId,
      category_code: payload.categoryCode,
      status: 'submitted',
      reference_code: reference,
      fee_amount: fee,
      full_name: payload.fullName.trim(),
      preferred_name: payload.preferredName.trim() || null,
      application_date: payload.applicationDate || null,
      email: payload.email.trim(),
      mobile: payload.mobile.trim(),
      city_province_country: payload.cityProvinceCountry.trim(),
      occupation: payload.occupation.trim() || null,
      referral_source: payload.referral.trim() || null,
      interests: payload.interests,
      statement_of_purpose: payload.statement.trim() || null,
      date_of_birth: payload.dateOfBirth || null,
      gender: payload.gender || null,
      address: payload.address.trim(),
      education: payload.education.trim() || null,
      submitted_at: new Date().toISOString(),
    })
    .select('id')
    .single()

  if (insertErr || !row) throw new Error(insertErr?.message ?? 'Could not save application')

  const appId = row.id as string
  const prefix = `${appId}`

  if (payload.idPhoto?.size) {
    const ext = payload.idPhoto.name.split('.').pop() ?? 'jpg'
    const path = `${prefix}/id-photo.${ext}`
    await uploadMembershipFile(path, payload.idPhoto)
    await supabase.from('tlps_membership_applications').update({ id_photo_path: path }).eq('id', appId)
  }

  if (payload.signature?.size) {
    const ext = payload.signature.name.split('.').pop() ?? 'png'
    const path = `${prefix}/signature.${ext}`
    await uploadMembershipFile(path, payload.signature)
    await supabase.from('tlps_membership_applications').update({ signature_path: path }).eq('id', appId)
  }

  if (fee > 0 && payload.paymentReceipt) {
    const ext = payload.paymentReceipt.name.split('.').pop() ?? 'jpg'
    const path = `receipts/${prefix}/receipt.${ext}`
    await uploadMembershipFile(path, payload.paymentReceipt, 'payment-receipts')
    await supabase.from('tlps_membership_applications').update({
      payment_reference: payload.paymentReference?.trim(),
      payment_date: payload.paymentDate || null,
      payment_receipt_path: path,
    }).eq('id', appId)
  }

  return { referenceCode: reference, applicationId: appId }
}