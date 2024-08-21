import { useState } from "react";
import i18n from "../i18n"
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language) // i18n.language contains the language assigned to lng in i18n.js file.

  const { t } = useTranslation()

  const chooseLanguage = (e) => {
    e.preventDefault()
    i18n.changeLanguage(e.target.value) // i18n.changeLanguage() is used to change the language assigned to lng in i18n.js file.
    setSelectedLanguage(e.target.value)
    localStorage.setItem("lang", e.target.value)
    // window.location.reload()
  }

  return (
    <select className="select select-bordered w-full lg:w-[6rem] max-w-xs  min-h-0 mt-1 h-[2rem] p-0 px-2" defaultValue={selectedLanguage} onChange={chooseLanguage}>
      <option className="bg-base-300" value="ar">Arabic</option>
      <option className="bg-base-300" value="en">English</option>
    </select>
  )
}

export default LanguageSelector