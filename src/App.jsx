import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import ContactUs from "./pages/ContactUs"
import Login from "./pages/account/Login"
import Signup from "./pages/account/Signup"
import AuthRequired from "./components/AuthRequired"
import Dashboard from "./pages/Dashboard"
import Profile from "./pages/account/Profile"
import ResetPassword from "./pages/account/ResetPassword"
import Maintenance from "./pages/orders/Maintenance"
import Renewal from "./pages/orders/Renewal"
import License from "./pages/orders/License"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} /> 
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetpassword" element={<ResetPassword />} />


          <Route element={<AuthRequired />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="renewal" element={<Renewal />} />
            <Route path="license" element={<License />} />
          </Route>
        </Route>


      </Routes>
    </BrowserRouter>
  )
}

export default App
