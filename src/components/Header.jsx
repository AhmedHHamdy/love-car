import { Link, useNavigate } from "react-router-dom"
import Logo from "../assets/logo.png"
import { useAuth } from "../context/AuthProvider"
import { CgProfile } from "react-icons/cg";
import Cookies from "js-cookie";
import LanguageSelector from "./LanguageSelector";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import LogoMobile from "../assets/lovecartransBack.png"

export default function Header() {
  const { token, setToken } = useAuth()

  const navigate = useNavigate()

  const { i18n, t } = useTranslation()

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
                  <li className="hover:bg-primary rounded-lg"><Link state={{type: "maintenance"}} to="/maintenance">{t("Maintenance")}</Link></li>
                  <li className="hover:bg-primary rounded-lg"><Link state={{type: "renewal"}} to="/renewal">{t("Renewal")}</Link></li>
                  <li className="hover:bg-primary rounded-lg"><Link state={{type: "license"}} to="/license">{t("License")}</Link></li>
                </ul>
              </li>
              <li className="hover:bg-primary rounded-lg"><a href="https://mr-decals.com/" target="_blank">{t("Shop")}</a></li>
              <li className="hover:bg-primary rounded-lg"><Link to="/about-us">{t("About Us")}</Link></li>
              <li className="hover:bg-primary rounded-lg"><Link to="/contact-us">{t("Contact Us")}</Link></li>
              {token && <li className="hover:bg-primary rounded-lg"><Link to="/dashboard">{t("Dashboard")}</Link></li>}
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
                  <li className="hover:bg-secondary rounded-xl"><Link state={{type: "maintenance"}} to="/maintenance">{t("Maintenance")}</Link></li>
                  <li className="hover:bg-secondary rounded-xl"><Link state={{type: "renewal"}} to="/renewal">{t("Renewal")}</Link></li>
                  <li className="hover:bg-secondary rounded-xl"><Link state={{type: "license"}} to="/license">{t("License")}</Link></li>
                </ul>
              </details>
            </li> */}

            <li className="text-base dropdown">
              <div tabIndex={0} role="button" className="">{t("Services")}</div>
              <ul tabIndex={0} className="dropdown-content z-30 menu p-2 shadow bg-primary rounded-box w-52">
                <li className="hover:bg-secondary rounded-xl"><Link state={{type: "maintenance"}} to="/maintenance">{t("Maintenance")}</Link></li>
                <li className="hover:bg-secondary rounded-xl"><Link state={{type: "renewal"}} to="/renewal">{t("Renewal")}</Link></li>
                <li className="hover:bg-secondary rounded-xl"><Link state={{type: "license"}} to="/license">{t("License")}</Link></li>
              </ul>
            </li>
            <li className="text-base"><a href="https://mr-decals.com/" target="_blank">{t("Shop")}</a></li>
            <li className="text-base"><Link to="/about-us">{t("About Us")}</Link></li>
            <li className="text-base"><Link to="/contact-us">{t("Contact Us")}</Link></li>
            {token && <li className="text-base"><Link to="/dashboard">{t("Dashboard")}</Link></li>}
            {/* <li className="ms-4"><LanguageSelector /></li> */}
          </ul>
        </div>
       {!token && <div className="navbar-end">
          <Link to="/login" className="btn h-2 min-h-[2rem] md:btn md:rounded-full md:bg-primary md:text-accent bg-primary text-base px-6 md:text-xl rounded-full md:px-14 text-accent leading-none">{t("Login")}</Link>
        </div>}

        {/* {token && <div className="navbar-end">
          <Link to="/profile" className="btn bg-secondary text-4xl text-primary rounded-full px-2 flex items-center justify-center leading-none"><CgProfile /></Link>
        </div>} */}

        {token && 
          <section className="navbar-end">
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="tn bg-secondary text-4xl text-primary rounded-full w-12 h-12 flex items-center justify-center leading-none"><CgProfile /></div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-2 shadow bg-primary rounded-box w-22 sm:w-48">
                <li><Link className="text-base sm:text-xl hover:bg-base-100 text-accent" to="/profile">{t("Profile")}</Link></li>
                <li><button className="text-base sm:text-xl hover:bg-base-100 text-accent" onClick={handleLogout}>{t("Logout")}</button></li>
              </ul>
            </div>
          </section>}
      </div>
    </>
  )
}