import { Link, useNavigate } from "react-router-dom"
import Logo from "../assets/logo.png"
import { useAuth } from "../context/AuthProvider"
import { CgProfile } from "react-icons/cg";
import Cookies from "js-cookie";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import LogoMobile from "../assets/lovecartransBack.png"
import axios from "axios";
import Car from "../assets/mingcute_car-3-fill.png"
import Dropdown from "./DropdownMenu";

export default function Header() {
  const { token, setToken } = useAuth()

  const navigate = useNavigate()

  const { i18n, t } = useTranslation()

  const [loadingStatus, setLoadingStatus] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    image: null
  })

  console.log(formData)

  useEffect(() => {
    document.documentElement.dir = i18n.dir()
    if (i18n.language == "ar") {
      // document.body.style.fontFamily = "Cairo"
    }
  }, [i18n.language])

  function handleLogout() {
    Cookies.remove("token")
    setToken()
    navigate("/", { replace: true })
  }

  
  useEffect(() => {
    if (token) {
      setLoadingStatus(true)
      axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/users/show`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then(res => {
        setFormData(res.data.data.user)
        setLoadingStatus(false)
      })
      .catch(err => {
        setLoadingStatus(false)
        console.log(err); // Log any errors that occur
        setError(err.message)
      })
    } else {
      setLoadingStatus(false)
    }
   
  }, [token])

  const handleClick = () => {
    const elem = document.activeElement;
    if (elem) {
      elem?.blur();
    }
  };

  // if (loadingStatus) {
  //   return (
  //     <div className="flex justify-center items-center w-screen h-screen bg-secondary">
  //       <span className="loading loading-ring loading-lg bg-primary"></span>
  //     </div>
  //   )
  // }

  if (error) {
  return (
      <div className="flex justify-center items-center w-screen h-screen bg-secondary">
        <h1 className="bg-red-900 text-accent text-center uppercase rounded-lg p-4 text-lg">{error} <br/> Please refresh</h1>
      </div>
    )
  }

  return(
    <>
      <div className="navbar bg-base-100 w-10/12 mx-auto px-0 py-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn bg-base-100 hover:bg-base-100 border-none pl-0 lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-secondary rounded-box w-56 text-accent">
              <li className="hover:bg-primary rounded-lg"><Link to="/">{t("Home")}</Link></li>
              <li className="">
                <Link>{t("Services")}</Link>
                <ul className="p-2 rounded-lg z-30">
                  <li className="hover:bg-primary rounded-lg"><Link onClick={() => handleClick()} state={{type: "maintenance"}} to="/maintenance">{t("Maintenance")}</Link></li>
                  <li className="hover:bg-primary rounded-lg"><Link onClick={() => handleClick()} state={{type: "renewal"}} to="/renewal">{t("Renewal")}</Link></li>
                  <li className="hover:bg-primary rounded-lg"><Link  onClick={() => handleClick()}state={{type: "license"}} to="/license">{t("License")}</Link></li>
                </ul>
              </li>
              <li className="hover:bg-primary rounded-lg"><a href="https://mr-decals.com/" target="_blank">{t("Shop")}</a></li>
              <li className="hover:bg-primary rounded-lg"><Link onClick={() => handleClick()} to="/about-us">{t("About Us")}</Link></li>
              <li className="hover:bg-primary rounded-lg"><Link onClick={() => handleClick()} to="/contact-us">{t("Contact Us")}</Link></li>
              {token && <li className="hover:bg-primary rounded-lg"><Link onClick={() => handleClick()} to="/dashboard">{t("Dashboard")}</Link></li>}
              {token && <li className="hover:bg-primary rounded-lg"><Link onClick={() => handleClick()} to="/messages">{t("Messages")}</Link></li>}
              <li className="hover:bg-primary rounded-lg"><Link to="/team">{t("Team")}</Link></li>

            </ul>
          </div>
          <Link className="text-xl hidden sm:inline" to="/"><img className="max-w-full" src={Logo} alt="logo" /></Link>
          <Link className="text-xl sm:hidden" to="/"><img className="max-w-[6rem]" src={LogoMobile} alt="logo" /></Link>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 text-accent text-sm">
            <li className="text-base"><Link to="/">{t("Home")}</Link></li>
            {/* <li className="text-base">
              <details>
                <summary>{t("Services")}</summary>
                <ul className="p-2 bg-primary w-52 z-30">
                  <li className="hover:bg-secondary rounded-xl"><Link onClick={ () => document.querySelector("#menu").click() } state={{type: "maintenance"}} to="/maintenance">{t("Maintenance")}</Link></li>
                  <li className="hover:bg-secondary rounded-xl"><Link onClick={ () => document.querySelector("#menu").click() } state={{type: "renewal"}} to="/renewal">{t("Renewal")}</Link></li>
                  <li className="hover:bg-secondary rounded-xl"><Link onClick={ () => document.querySelector("#menu").click() }state={{type: "license"}} to="/license">{t("License")}</Link></li>
                </ul>
              </details>
            </li> */}

            <li className="text-base dropdown">
              <div tabIndex={0} role="button" className="">{t("Services")}</div>
              <ul tabIndex={0} className="dropdown-content z-30 menu p-2 shadow bg-primary rounded-box w-52">
                <li className="hover:bg-secondary rounded-xl"><Link onClick={ () => handleClick() } state={{type: "maintenance"}} to="/maintenance">{t("Maintenance")}</Link></li>
                <li className="hover:bg-secondary rounded-xl"><Link onClick={ () => handleClick() } state={{type: "renewal"}} to="/renewal">{t("Renewal")}</Link></li>
                <li className="hover:bg-secondary rounded-xl"><Link onClick={ () => handleClick() } state={{type: "license"}} to="/license">{t("License")}</Link></li>
              </ul>
            </li>
            {/* <li className="text-base"><Dropdown /></li> */}
            <li className="text-base"><a href="https://mr-decals.com/" target="_blank">{t("Shop")}</a></li>
            <li className="text-base"><Link to="/about-us">{t("About Us")}</Link></li>
            <li className="text-base"><Link to="/contact-us">{t("Contact Us")}</Link></li>
            {token && <li className="text-base"><Link to="/dashboard">{t("Dashboard")}</Link></li>}
            {token && <li className="text-base"><Link to="/messages">{t("Messages")}</Link></li>}
            <li className="text-base"><Link to="/team">{t("Team")}</Link></li>
            {/* <li className="ms-4"><LanguageSelector /></li> */}
          </ul>
        </div>
       {!token && <div className="navbar-end">
          <Link to="/login" className="btn h-2 min-h-[2rem] md:btn md:rounded-full md:bg-primary md:text-accent bg-primary text-base px-6 md:text-xl rounded-full md:px-10 text-accent leading-none">{t("Login")}</Link>
        </div>}

        {/* {token && <div className="navbar-end">
          <Link to="/profile" className="btn bg-secondary text-4xl text-primary rounded-full px-2 flex items-center justify-center leading-none"><CgProfile /></Link>
        </div>} */}

        {token && 
          <section className="navbar-end">
            <div className="dropdown dropdown-bottom dropdown-end avatar">
              <div tabIndex={0} role="button" className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"><img className="" src={formData.image || Car} alt="" /></div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-2 shadow bg-primary rounded-box w-40 sm:w-48">
                <li><Link onClick={ () => handleClick() } className="text-base sm:text-xl hover:bg-base-100 text-accent" to="/profile">{t("Profile")}</Link></li>
                <li><button className="text-base sm:text-xl hover:bg-base-100 text-accent" onClick={handleLogout}>{t("Logout")}</button></li>
              </ul>
            </div>
          </section>}
      </div>
    </>
  )
}