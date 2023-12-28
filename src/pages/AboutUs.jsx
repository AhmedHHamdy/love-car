import { useTranslation } from "react-i18next";
import { IoCarSport } from "react-icons/io5";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function AboutUs() {

  const { t } = useTranslation()

  const { token } = useAuth()

  const [formData, setFormData] = useState(null)
  console.log(formData)

  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/staticPages`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then(res => {
            setLoadingStatus(false)
            console.log(res)

            const descriptionArray = res.data.data.aboutus.description
                    .replace(/<p>/g, '')  // Remove <p> tags
                    .replace(/<\/p>/g, '') // Remove </p> tags
                    .split('\r\n')   

            setFormData({...res.data.data.aboutus, description: descriptionArray})
          })
          .catch(err => {
            setLoadingStatus(false)
            console.log(err); // Log any errors that occur
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
        <h1 className="bg-red-900 text-accent text-center uppercase rounded-lg p-4 text-lg">{error} <br/> Please refresh</h1>
      </div>
    )
  }

  return(
    <section className="bg-secondary">
      <div className="hero min-h-[20rem]" style={{backgroundImage: 'url("/bg-2.jpg")'}}>
        <div className="hero-overlay bg-secondary bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-primary">{t("About Love Car")}</h1>
          </div>
        </div>
      </div>

      <div className="hero bg-secondary mt-8 h-[60rem] sm:h-full md:h-[52rem] xl:h-full">
        <div className="hero-content gap-20 flex-col lg:flex-row ">
          <img src="https://mylovecar1886.com/wp-content/uploads/2020/09/carparts-home-pic1.png" className="max-w-xs sm:max-w-xl rounded-lg" />
          <div className="flex flex-col justify-space-between items-start h-[29rem]">
            <span className="text-sm bg-primary p-3 rounded-full rounded-tl-none text-accent">{t("We are pleased to collaborate with you")}</span>
            <p className="py-6 text-5xl font-semibold text-accent leading-normal">{formData.description[0]}</p>
            <ul className="h-full">
              <li className="flex justify-start items-center gap-4 text-accent text-base mt-4"><IoCarSport className="text-primary" /> {formData.description[1]}</li>
              <li className="flex justify-start items-center gap-4 text-accent text-base mt-4"><IoCarSport className="text-primary" /> {formData.description[2]}</li>
              <li className="flex justify-start items-center gap-4 text-accent text-base mt-4"><IoCarSport className="text-primary" /> {formData.description[3]}</li>
            </ul>    
          </div>
        </div>
      </div>

      <div className="hero bg-secondary h-[60rem] sm:h-full md:h-[52rem] xl:h-full">
        <div className="hero-content gap-20 flex-col lg:flex-row-reverse">
          <img src="https://mylovecar1886.com/wp-content/uploads/2020/09/carparts-category-pic5.jpg" className="max-w-xs sm:max-w-xl rounded-lg mb-8" />
          <div>
            <h1 className="text-3xl text-accent">{t("We are delighted to fulfill your requests.")}</h1>
            <p className="py-6 text-accent">{t("We welcome orders for purchasing, renewing, and maintaining all types of vehicles. We are happy to serve you.")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}