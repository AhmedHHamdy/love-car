import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useContext } from "react";
import LinksContext from "../context/storeLinks";
import { FaWhatsapp } from "react-icons/fa";

export default function NotFound() {

    const { storeLinks } = useContext(LinksContext);

    const { t, i18n } = useTranslation()

    return (
        <div className="flex flex-col items-center justify-center gap-10 min-h-screen bg-secondary">
            <h1 className="text-3xl">{t("Page Not Found")}</h1>
            <Link className="btn btn-primary text-accent text-xl" to="/">{t("Home")}</Link>

            <section className={`bg-green-500 fixed h-20 w-20 bottom-10 ${i18n.language == "en" ? "right-10" : "left-10"}  cursor-pointer rounded-full flex items-center justify-center drop-shadow-2xl`}>
              <a href={storeLinks?.socialMedia?.whatsapp} className="" target="_blank"><FaWhatsapp className="text-white text-6xl sm:text-6xl" /></a>
            </section>
        </div>
    )
}