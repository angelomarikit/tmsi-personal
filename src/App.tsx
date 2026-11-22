import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { PublicLayout } from '@/components/layout/PublicLayout'
import { AuthProvider } from '@/contexts/AuthContext'
import { AdminDashboardPage } from '@/features/admin/AdminDashboardPage'
import { AdminEssaysPage } from '@/features/admin/AdminEssaysPage'
import { AdminInquiriesPage } from '@/features/admin/AdminInquiriesPage'
import { AdminMembershipPage } from '@/features/admin/AdminMembershipPage'
import { LoginPage } from '@/features/auth/LoginPage'
import { RegisterPage } from '@/features/auth/RegisterPage'
import { MemberDashboardPage } from '@/features/member/MemberDashboardPage'
import { AboutPage } from '@/features/public/AboutPage'
import { BookIntroPage } from '@/features/public/BookIntroPage'
import { BooksPage } from '@/features/public/BooksPage'
import { ContactPage } from '@/features/public/ContactPage'
import { EssayDetailPage } from '@/features/public/EssayDetailPage'
import { EssaysPage } from '@/features/public/EssaysPage'
import { HomePage } from '@/features/public/HomePage'
import { LibraryPage } from '@/features/public/LibraryPage'
import { MembershipApplyPage } from '@/features/public/MembershipApplyPage'
import { MembershipPage } from '@/features/public/MembershipPage'
import { PhilosophyPage } from '@/features/public/PhilosophyPage'
import { SupportPage } from '@/features/public/SupportPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="essays" element={<EssaysPage />} />
            <Route path="essays/:slug" element={<EssayDetailPage />} />
            <Route path="books" element={<BooksPage />} />
            <Route path="books/intro" element={<BookIntroPage />} />
            <Route path="philosophy" element={<PhilosophyPage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="membership" element={<MembershipPage />} />
            <Route path="membership/apply" element={<MembershipApplyPage />} />
            <Route path="support" element={<SupportPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <MemberDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin"
              element={
                <ProtectedRoute staffOnly>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/membership"
              element={
                <ProtectedRoute staffOnly>
                  <AdminMembershipPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/essays"
              element={
                <ProtectedRoute staffOnly>
                  <AdminEssaysPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="admin/inquiries"
              element={
                <ProtectedRoute staffOnly>
                  <AdminInquiriesPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
        <Toaster position="top-center" richColors closeButton />
      </AuthProvider>
    </BrowserRouter>
  )
}