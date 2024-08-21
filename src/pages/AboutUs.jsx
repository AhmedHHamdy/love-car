import { useTranslation } from "react-i18next";
import { IoCarSport } from "react-icons/io5";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import LinksContext from "../context/storeLinks";
import { FaWhatsapp } from "react-icons/fa";

export default function AboutUs() {

  const { storeLinks } = useContext(LinksContext);

  const { t, i18n } = useTranslation()

  const { token } = useAuth()

  const [formData, setFormData] = useState(null)
  // console.log(formData)

  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/aboutUs`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then(res => {
            setLoadingStatus(false)
            // console.log(res)
            setFormData({...res.data.data})
          })
          .catch(err => {
            setLoadingStatus(false)
            // console.log(err); // Log any errors that occur
            setError(err.message)
          })
  }, [])

  if (loadingStatus) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-secondary">
        <span className="loading loading-ring loading-lg bg-primary"></span>
      </div>
    )
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-secondary">
        <h1 className="bg-red-900  text-center uppercase rounded-lg p-4 text-lg">{error} <br/> Please refresh</h1>
      </div>
    )
  }

  return(
    <section className="bg-secondary dark:bg-base-300 min-h-screen font-semibold">
      <div className="hero min-h-[20rem]" style={{backgroundImage: 'url("/bg-2.jpg")'}}>
        <div className="hero-overlay bg-secondary bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-primary">{t("About Love Car")}</h1>
          </div>
        </div>
      </div>

      <div className="hero bg-secondary dark:bg-base-300 my-8  ">
        <div className="hero-content gap-10 xl:gap-20 flex-col xl:flex-row md:items-center xl:items-start">
          <img src={formData.image1} className="max-w-full sm:max-w-xl rounded-lg" />

          <div className="flex flex-col justify-space-between items-center sm:items-center md:items-center xl:items-start">
            <span className="text-sm bg-primary dark:text-secondary p-3 rounded-full rounded-tl-none ">{t("We are pleased to collaborate with you")}</span>
            {i18n.language == "ar" && <p className="py-6 text-3xl sm:text-5xl font-semibold  leading-loose sm:leading-relaxed text-center xl:text-start">{formData.description_ar}</p>}
            {i18n.language == "en" && <p className="py-6 text-3xl sm:text-5xl font-semibold  leading-loose sm:leading-relaxed text-center xl:text-start">{formData.description_en}</p>}

            <ul className="h-full flex flex-col items-center md:grid md:grid-cols-12 md:justify-center md:items-center md:auto-rows-min gap-x-10">
              {formData.data.map((d, i) => {
                return (
                  <li key={d.id} className="flex sm:mx-auto items-start w-60 sm:w-[17rem] text-sm md:col-span-6 justify-start  gap-4  sm:text-base mt-4"><IoCarSport className="text-primary align-top" style={{ width: '24px', height: '24px', flex: 'none' }}/> {i18n.language == "ar" ? d.text_ar : d.text_en}</li>
                )
              })}
              {/* <li className="flex justify-start items-center gap-4  text-base mt-4"><IoCarSport className="text-primary" /> {formData.description[1]}</li>
              <li className="flex justify-start items-center gap-4  text-base mt-4"><IoCarSport className="text-primary" /> {formData.description[2]}</li>
              <li className="flex justify-start items-center gap-4  text-base mt-4"><IoCarSport className="text-primary" /> {formData.description[3]}</li> */}
            </ul>    
          </div>
        </div>
      </div>

      <div className="hero bg-secondary dark:bg-base-300">
        <div className="hero-content gap-10 xl:gap-40 flex-col xl:flex-row-reverse">
          <img src={formData.image2} className="max-w-full sm:max-w-xl rounded-lg xl:mb-6" />
          <div className="text-center 2xl:text-start">
            <h1 className="text-3xl ">{t("We are delighted to fulfill your requests.")}</h1>
            <p className="py-6  text-sm sm:text-base mx-auto 2xl:mx-0 w-60 sm:w-full">{t("We welcome orders for renewing, maintaining, and inspecting all types of vehicles. We are happy to serve you.")}</p>
          </div>
        </div>
      </div>

      <section className={`bg-green-500 fixed h-12 w-12 bottom-10 ${i18n.language == "en" ? "right-10" : "left-10"}  cursor-pointer rounded-full flex items-center justify-center drop-shadow-2xl`}>
        <a href={storeLinks?.socialMedia?.whatsapp} className="" target="_blank"><FaWhatsapp className="text-white text-4xl sm:text-4xl" /></a>
      </section>
    </section>
  )
}