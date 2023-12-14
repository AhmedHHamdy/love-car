import { Link } from "react-router-dom"
import Logo from "../assets/logo.png"
import { useTranslation } from "react-i18next"

export default function Footer() {

    const { t } = useTranslation()

    return (
    <footer className="w-10/12 mx-auto ">
        <section className="footer p-10 bg-base-100 text-base-content">
            <aside>
                <img className="max-w-full" src={Logo} alt="logo-icon" />
                <p>{t("Providing reliable automotive repairs since 2003.")}</p>
            </aside> 
            <nav>
                <header className="footer-title">{t("Services")}</header> 
                <Link to="/maintenance" className="link link-hover text-base">{t("Maintenance")}</Link>
                <Link to="/renewal" className="link link-hover text-base">{t("Renewal")}</Link>
                <Link to="/license" className="link link-hover text-base">{t("License")}</Link>
            </nav> 
            <nav>
                <header className="footer-title">{t("Company")}</header> 
                <a href="https://mr-decals.com/" target="_blank" className="link link-hover">{t("Shop")}</a>
                <Link to="/about-us" className="link link-hover text-base">{t("About Us")}</Link>
                <Link to="/contact-us" className="link link-hover text-base">{t("Contact Us")}</Link>
            </nav> 
            <nav>
                <header className="footer-title">{t("Legal")}</header> 
                <Link className="link link-hover text-base">{t("Terms Of Use")}</Link>
                <Link className="link link-hover text-base">{t("Privacy Policy")}</Link>
            </nav>
        </section>
    </footer>
    )
}