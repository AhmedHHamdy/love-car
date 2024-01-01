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
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/aboutUs`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then(res => {
            setLoadingStatus(false)
            console.log(res)
            setFormData({...res.data.data})
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

      <div className="hero bg-secondary my-8 h-[60rem] sm:h-full md:h-[52rem] xl:h-full">
        <div className="hero-content gap-20 flex-col lg:flex-row ">
          <img src={formData.image1} className="max-w-xs sm:max-w-xl rounded-lg" />
          <div className="flex flex-col justify-space-between items-start h-[29rem]">
            <span className="text-sm bg-primary p-3 rounded-full rounded-tl-none text-accent">{t("We are pleased to collaborate with you")}</span>
            <p className="py-6 text-5xl font-semibold text-accent leading-normal">{formData.description_ar}</p>
            <ul className="h-full flex flex-wrap content-start gap-x-10 overflow-auto">
              {formData.data.map(d => {
                return (
                  <li key={d.id} className="flex justify-start items-center gap-4 text-accent text-base mt-4"><IoCarSport className="text-primary" /> {d.text_ar}</li>
                )
              })}
              {/* <li className="flex justify-start items-center gap-4 text-accent text-base mt-4"><IoCarSport className="text-primary" /> {formData.description[1]}</li>
              <li className="flex justify-start items-center gap-4 text-accent text-base mt-4"><IoCarSport className="text-primary" /> {formData.description[2]}</li>
              <li className="flex justify-start items-center gap-4 text-accent text-base mt-4"><IoCarSport className="text-primary" /> {formData.description[3]}</li> */}
            </ul>    
          </div>
        </div>
      </div>

      <div className="hero bg-secondary h-[60rem] sm:h-full md:h-[52rem] xl:h-full">
        <div className="hero-content gap-20 flex-col lg:flex-row-reverse">
          <img src={formData.image2} className="max-w-xs sm:max-w-xl rounded-lg mb-8" />
          <div>
            <h1 className="text-3xl text-accent">{t("We are delighted to fulfill your requests.")}</h1>
            <p className="py-6 text-accent">{t("We welcome orders for purchasing, renewing, and maintaining all types of vehicles. We are happy to serve you.")}</p>
          </div>
        </div>
      </div>
    </section>
  )
}