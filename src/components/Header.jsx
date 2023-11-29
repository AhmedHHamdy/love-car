import { Outlet } from "react-router-dom"
import Logo from "../assets/logo.png"

export default function Header() {
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
            <li><a>Home</a></li>
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
          </ul>
        </div>
        <div className="navbar-end">
          <a className="btn bg-primary text-xl rounded-full px-14 text-accent leading-none">Login</a>
        </div>
      </div>
      <Outlet />
    </>
  )
}