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
import { UserHome } from './components/pages/UserHome'
import { AskQuestion } from './components/pages/AskQuestion'

const appRouter = createBrowserRouter([
  { path: "/", element: <Home /> },
  {path:"/homepage",element:<UserHome/>},
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/askquestion", element: <AskQuestion /> },
  { path: "/solvedquestions", element: <SolvedQuestion /> },
  { path: "/unsolvedquestions", element: <UnSolvedQuestions /> },
  { path: "/allquestions", element: <AllQuestions /> },
  { path: "/profile", element: <Profile /> },
  { path: "/edit/profile", element: <EditProfile /> },
])

export function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <RouterProvider router={appRouter} />
    </>
  );
}
