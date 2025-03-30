import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Login } from './components/auth/login'
import { Signup } from './components/auth/signup'
import { RouterProvider } from 'react-router'
import  Home  from './components/pages/Home'
import { SolvedQuestion } from './components/pages/SolvedQuestion'
import { UnSolvedQuestions } from './components/pages/UnSlovedQuestions'
import { AllQuestions} from './components/pages/AllQustions'

const appRouter = createBrowserRouter([
  { path: "/" , element: <Home/>},
  { path: "/login" , element: <Login/>},
  { path: "/signup" , element: <Signup/>},
  { path: "/solvedquestions" , element: <SolvedQuestion/>},
  { path: "/unsolvedquestions" , element: <UnSolvedQuestions/>},
  { path: "/allquestions" , element: <AllQuestions/>},
  // { path: "/" , element: <Signup/>},
])

export function App() {

  return (
    <>
    {/* <h1>hrloo</h1> */}
      <RouterProvider router={appRouter} />
    </>
  )
}
