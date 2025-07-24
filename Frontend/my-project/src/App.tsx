import { Navigate, Route, Routes } from "react-router-dom"
import { Form } from "./Components/Form"
import { AdminAuthentication} from "../src/Components/Admins/AdminAuthentication"

import { Home } from "./Components/Home"
import { Layout } from "./Components/Layout/layout"
import { AdminPortal } from "../src/Components/Admins/AdminPortal"
import { useState } from "react"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <>
    <Routes >
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route
            path="/admin-authentication"
            element={<AdminAuthentication setIsAuthenticated={setIsAuthenticated} />}
          />
        <Route
            path="/admin-portal"
            element={
              isAuthenticated ? (
                <AdminPortal />
              ) : (
                <Navigate to="/admin-authentication" replace />
              )
            }
          />
        <Route path="/form" element={<Form />}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App;