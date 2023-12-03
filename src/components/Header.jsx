import { Link, Outlet, useNavigate } from "react-router-dom"
import Logo from "../assets/logo.png"
import { useAuth } from "../context/AuthProvider"
import { CgProfile } from "react-icons/cg";
import Cookies from "js-cookie";

export default function Header() {
  const { token, setToken } = useAuth()

  const navigate = useNavigate()

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
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-primary-100 rounded-box w-52 text-accent">
              <li><a>Home</a></li>
              <li>
                <a>Services</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Shop</a></li>
              <li><a>About Us</a></li>
              <li><a>Contact Us</a></li>
            </ul>
          </div>
          <a className=" text-xl"><img src={Logo} alt="" /></a>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 text-accent text-sm">
            <li><Link to="/">Home</Link></li>
            <li>
              <details>
                <summary>Services</summary>
                <ul className="p-2 bg-primary w-48">
                  <li className="hover:bg-secondary rounded-xl"><a>Periodic Maintenance</a></li>
                  <li className="hover:bg-secondary rounded-xl"><a>Modification</a></li>
                </ul>
              </details>
            </li>
            <li><a>Shop</a></li>
            <li><a>About Us</a></li>
            <li><a>Contact Us</a></li>
            {token && <li><Link to="dashboard">Dashboard</Link></li>}
          </ul>
        </div>
       {!token && <div className="navbar-end">
          <Link to="/login" className="btn bg-primary text-xl rounded-full px-14 text-accent leading-none">Login</Link>
        </div>}

        {/* {token && <div className="navbar-end">
          <Link to="/profile" className="btn bg-secondary text-4xl text-primary rounded-full px-2 flex items-center justify-center leading-none"><CgProfile /></Link>
        </div>} */}

        {token && 
          <section className="navbar-end">
            <div className="dropdown dropdown-bottom dropdown-end">
              <div tabIndex={0} role="button" className="tn bg-secondary text-4xl text-primary rounded-full w-12 h-12 flex items-center justify-center leading-none"><CgProfile /></div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 mt-2 shadow bg-primary rounded-box w-28">
                <li><Link className="text-xl hover:bg-base-100" to="/profile">Profile</Link></li>
                <li><button className="text-xl hover:bg-base-100" onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          </section>}
      </div>

      <Outlet />

      <section className="py-14 w-10/12 mx-auto flex justify-between items-start">
        <section className="flex flex-col justify-center items-start gap-4">
          <img src={Logo} alt="logo-icon" />
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo</p>
          <small>© 2023 All Rights Reserved</small>
        </section>

        <section className="flex justify-between items-start w-7/12">
          <div className="flex flex-col justify-center items-start gap-4">
            <h4 className="text-primary text-xl font-semibold">Services</h4>
            <ul>
              <li><a className="hover:border-b-2" href="">Periodic Maintenance</a></li>
              <li><a className="hover:border-b-2" href="">Modification</a></li>
            </ul>
          </div>

          <div className="flex flex-col justify-center items-start gap-4">
            <h4 className="text-primary text-xl font-semibold">About Us</h4>
            <ul>
              <li><a className="hover:border-b-2" href="">About</a></li>
              <li><a className="hover:border-b-2" href="">Staff</a></li>
            </ul>
          </div>

          <div className="flex flex-col justify-center items-start gap-4">
            <h4 className="text-primary text-xl font-semibold">Shop</h4>
            <ul>
              <li><a className="hover:border-b-2" href="">Spare Parts Shop</a></li>
            </ul>
          </div>

          <div className="flex flex-col justify-center items-start gap-4">
            <h4 className="text-primary text-xl font-semibold">Contact Us</h4>
            <ul>
              <li><a className="hover:border-b-2" href="">Location</a></li>
            </ul>
          </div>

        </section>
      </section>
    </>
  )
}