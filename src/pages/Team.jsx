import { useTranslation } from "react-i18next";
import { IoCarSport } from "react-icons/io5";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { FaWhatsapp } from "react-icons/fa";
import LinksContext from "../context/storeLinks";

export default function Team() {

  const { storeLinks } = useContext(LinksContext);

  const { t, i18n } = useTranslation()
  
  const { token } = useAuth()

  const [formData, setFormData] = useState(null)
  // console.log(formData)

  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/teams`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then(res => {
            setLoadingStatus(false)
            // console.log(res)


            setFormData(res.data.data.teams)
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
        <h1 className="bg-red-900 text-center uppercase rounded-lg p-4 text-lg">{error} <br/> Please refresh</h1>
      </div>
    )
  }

  return(
    <section className="bg-secondary dark:bg-base-300 min-h-screen font-semibold">
      <div className="hero min-h-[20rem]" style={{backgroundImage: 'url("/carBackground.jpg")', backgroundRepeat: "no-repeat"}}>
        <div className="hero-overlay bg-secondary bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-primary ">{t("About Team")}</h1>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 items-center w-10/12 mx-auto py-10 justify-items-center gap-y-10 bg-secondary dark:bg-base-300 mt-8 2xl:max-w-[1800px] 2xl:mx-auto">
            {formData.map((teamMember => {
                return ( 
                    <div className="">
                        <div key={teamMember.id} className="flex flex-col items-center justify-center gap-8 mb-4">
                            <img src={teamMember.image} className="h-64 rounded-lg" />
                            <div className="flex flex-col justify-center items-center ">
                                <h1 className="py-6 text-4xl  font-semibold leading-normal">{teamMember.name}</h1>
                                <p className="text-base sm:text-lg font-semibold leading-normal flex justify-start items-center gap-4"><IoCarSport className="text-primary"/> {teamMember.specialization}</p>
                            </div>
                        </div>
                    </div>
                )
            }))}
        </div>

      <section className={`bg-green-500 fixed h-20 w-20 bottom-10 ${i18n.language == "en" ? "right-10" : "left-10"}  cursor-pointer rounded-full flex items-center justify-center drop-shadow-2xl`}>
        <a href={storeLinks?.socialMedia?.whatsapp} className="" target="_blank"><FaWhatsapp className="text-white text-6xl sm:text-6xl" /></a>
      </section>
    </section>
  )
}