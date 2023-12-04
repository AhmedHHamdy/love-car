import { Link, useNavigate } from "react-router-dom"
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
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </div>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-accent">
              <li className="hover:bg-primary rounded-lg"><a>Home</a></li>
              <li className="">
                <a>Services</a>
                <ul className="p-2 rounded-lg">
                  <li className="hover:bg-primary rounded-lg"><a>Submenu 1</a></li>
                  <li className="hover:bg-primary rounded-lg"><a>Submenu 2</a></li>
                </ul>
              </li>
              <li className="hover:bg-primary rounded-lg"><a>Shop</a></li>
              <li className="hover:bg-primary rounded-lg"><a>About Us</a></li>
              <li className="hover:bg-primary rounded-lg"><a>Contact Us</a></li>
            </ul>
          </div>
          <a className="text-xl"><img className="max-w-full" src={Logo} alt="logo" /></a>
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
    </>
  )
}