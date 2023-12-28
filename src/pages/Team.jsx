import { useTranslation } from "react-i18next";
import { IoCarSport } from "react-icons/io5";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";

export default function Team() {

  const { t } = useTranslation()

  const { token } = useAuth()

  const [formData, setFormData] = useState(null)
  console.log(formData)

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
            console.log(res)


            setFormData(res.data.data.teams)
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
      <div className="hero min-h-[20rem]" style={{backgroundImage: 'url("/carBackground.jpg")', backgroundPositionY: "-18rem" , backgroundRepeat: "no-repeat"}}>
        <div className="hero-overlay bg-secondary bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-primary ">{t("About Team")}</h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(25rem,1fr))] items-center w-10/12 mx-auto py-10 justify-center gap-20 bg-secondary mt-8">
            {formData.map((teamMember => {
                return ( 
                    <div className="">
                        <div key={teamMember.id} className="flex flex-col md:flex-row justify-between gap-10 w-50 mb-4">
                            <img src={teamMember.image} className="max-w-xs sm:max-w-sm h-80 rounded-lg" />
                            <div className="flex flex-col justify-center items-start">
                                <h1 className="py-6 text-4xl font-semibold text-accent leading-normal">{teamMember.name}</h1>
                                <p className=" text-2xl font-semibold text-accent leading-normal flex justify-start items-center gap-4"><IoCarSport className="text-primary"/> {teamMember.specialization}</p>
                            </div>
                        </div>
                    </div>
                )
            }))}
        </div>
    </section>
  )
}