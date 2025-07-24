import { Route, Routes } from "react-router-dom"
import { Form } from "./Components/Form"
import { HelpDesk } from "./Components/HelpDesk"
import { Home } from "./Components/Home"
import { Layout } from "./Components/Layout/layout"

function App() {

  return (
    <>
    <Routes >
      <Route element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/help-desk" element={<HelpDesk />}></Route>
        <Route path="/form" element={<Form />}></Route>
      </Route>
    </Routes>
    </>
  )
}

export default App
