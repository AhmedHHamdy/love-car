import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function NotFound() {

    const { t } = useTranslation()

    return (
        <div className="flex flex-col items-center justify-center gap-10 h-screen bg-secondary">
            <h1 className="text-3xl">{t("Page Not Found")}</h1>
            <Link className="btn btn-primary text-accent text-xl" to="/">{t("Home")}</Link>
        </div>
    )
}