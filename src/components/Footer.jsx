import Logo from "../assets/logo.png"

export default function Footer() {
    return (
    //     <footer className="py-14 w-10/12 mx-auto flex justify-between items-start">
    //     <section className="flex flex-col justify-center items-start gap-4">
    //       <img src={Logo} alt="logo-icon" />
    //       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmo</p>
    //       <small>© 2023 All Rights Reserved</small>
    //     </section>

    //     <section className="flex justify-between items-start w-7/12">
    //       <div className="flex flex-col justify-center items-start gap-4">
    //         <h4 className="text-primary text-xl font-semibold">Services</h4>
    //         <ul>
    //           <li><a className="hover:border-b-2" href="">Periodic Maintenance</a></li>
    //           <li><a className="hover:border-b-2" href="">Modification</a></li>
    //         </ul>
    //       </div>

    //       <div className="flex flex-col justify-center items-start gap-4">
    //         <h4 className="text-primary text-xl font-semibold">About Us</h4>
    //         <ul>
    //           <li><a className="hover:border-b-2" href="">About</a></li>
    //           <li><a className="hover:border-b-2" href="">Staff</a></li>
    //         </ul>
    //       </div>

    //       <div className="flex flex-col justify-center items-start gap-4">
    //         <h4 className="text-primary text-xl font-semibold">Shop</h4>
    //         <ul>
    //           <li><a className="hover:border-b-2" href="">Spare Parts Shop</a></li>
    //         </ul>
    //       </div>

    //       <div className="flex flex-col justify-center items-start gap-4">
    //         <h4 className="text-primary text-xl font-semibold">Contact Us</h4>
    //         <ul>
    //           <li><a className="hover:border-b-2" href="">Location</a></li>
    //         </ul>
    //       </div>

    //     </section>
    //   </footer>

    <footer className="footer p-10 bg-base-200 text-base-content">
        <aside>
            <img className="max-w-full" src={Logo} alt="logo-icon" />
            <p>LoveCar Industries Ltd.<br/>Providing reliable repairs since 1992</p>
        </aside> 
        <nav>
            <header className="footer-title">Services</header> 
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
        </nav> 
        <nav>
            <header className="footer-title">Company</header> 
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
        </nav> 
        <nav>
            <header className="footer-title">Legal</header> 
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
        </nav>
    </footer>
    )
}