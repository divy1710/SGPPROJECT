import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Login } from './components/auth/login'
import { Signup } from './components/auth/signup'
import { RouterProvider } from 'react-router'
import Home from './components/pages/Home'
import { SolvedQuestion } from './components/pages/SolvedQuestion'
import { UnSolvedQuestions } from './components/pages/UnSolvedQuestions'
import { AllQuestions } from './components/pages/AllQustions'
import { Footer } from "./components/pages/Footer"
import { Toaster } from 'sonner'
import Profile from './components/profilePages/Profile'
import EditProfile from './components/profilePages/EditProfile'
import ProtectedRoute from './components/shared/ProtectedRoutes'

// Remove the AppContent component and simplify the router structure
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  {
    path: "/solvedquestions",
    element: (
      <ProtectedRoute>
        <SolvedQuestion />
      </ProtectedRoute>
    )
  },
  {
    path: "/unsolvedquestions",
    element: (
      <ProtectedRoute>
        <UnSolvedQuestions />
      </ProtectedRoute>
    )
  },
  {
    path: "/allquestions",
    element: (
      <ProtectedRoute>
        <AllQuestions />
      </ProtectedRoute>
    )
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  {
    path: "/edit/profile",
    element: (
      <ProtectedRoute>
        <EditProfile />
      </ProtectedRoute>
    )
  },
])

export function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <RouterProvider router={appRouter} />
    </>
  );
}
