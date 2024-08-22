import { IoCarSport } from "react-icons/io5"
import { FaMapLocationDot } from "react-icons/fa6";
import { FaBuilding, FaWhatsapp } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { MdOutlineNumbers } from "react-icons/md";
import { IoPhonePortrait } from "react-icons/io5";
import { MdAttachEmail } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthProvider";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import LinksContext from "../context/storeLinks";

export default function ContactUs() {

  const { token } = useAuth()

  const { storeLinks } = useContext(LinksContext);

  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)

  const [messageSuccess, setMessageSuccess] = useState(false)
  const [messageError, setMessageError] = useState(null)

  const { t, i18n } = useTranslation()


  const [formData, setFormData] = useState(null)
  // console.log(formData)

  const [messageFormData, setMessageFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  function handleMessageFormChange(e) {
    const { name, value } = e.target
    setMessageFormData(prevFormData => {
      return {
        ...prevFormData, [name]: value
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/sendMessage`, messageFormData)
        .then(res => {
        // console.log(res)
        
        setMessageSuccess(true)
        setTimeout(() => {
          setMessageSuccess(false)
        }, 3000)

        setMessageFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        })
        })
        .catch(err => {
        // console.log(err)
        setMessageError(err.message)
        setTimeout(() => {
          setMessageError(null)
        }, 3000)

        setMessageFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        })
        })
  }

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/staticPages`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then(res => {
            setLoadingStatus(false)
            // console.log(res)
            setFormData(res.data.data.contactus)
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
      <section className="bg-secondary">
        <div className="hero min-h-[20rem]" style={{backgroundImage: 'url("/bg-1.jpg")'}}>
          <div className="hero-overlay bg-secondary bg-opacity-60"></div>
          <div className="hero-content text-center text-neutral-content">
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold text-primary">Contact Us</h1>
            </div>
          </div>
        </div>

        <div className="hero bg-secondary mt-8 h-screen">
          <div className="hero-content flex-col md:flex-col xl:flex-row h-screen pb-10 md:0 gap-8">
            <div className="flex flex-col justify-space-between items-start ">

              <p className="py-6 text-5xl font-semibold text-accent">{t("Do you have any inquiries?")}</p>
              <span className="text-primary text-xl flex justify-center items-center gap-4"><FaMapLocationDot /> {t("Address")}</span>
              <h3 className="text-xl mt-2 border-b-[0.02rem] border-gray-700  w-full md:w-full pb-6">
              {t("المملكة العربية السعودية")}<br />
              {t("المنطقة الشرقية، القطيف/سيهات")}
              </h3>

              <span className="text-base md:text-xl flex justify-center mt-2 items-center pt-6 gap-4"><FaBuilding className="text-primary" /> {t("Building Number")} : 4955</span>

              <span className="text-base md:text-xl flex justify-center mt-2 items-center gap-4"><MdMarkEmailUnread className="text-primary" /> {t("Postal Code")} : 32461</span>

              <span className="text-base md:text-xl flex justify-start mt-2 items-center pb-6 border-b-[0.02rem] border-gray-700 w-full sm:w-full gap-4"><MdOutlineNumbers className="text-primary" /> {t("Additional Number")} : 8688</span>

              <h3 className="text-base md:text-xl flex justify-center mt-2 items-center gap-4 pt-6"><IoPhonePortrait className="text-primary" /> <a href={`tel:0500947921`}>0500947921</a></h3>

              <h3 className="text-base md:text-xl flex justify-center mt-2 items-center gap-4"><MdAttachEmail className="text-primary" /> <a href={`mailto:mylovecar1886@gmail.com`}>mylovecar1886@gmail.com</a></h3>
              
            </div>
            
            <div className="relative flex flex-col justify-space-between items-start w-[18rem] sm:w-[35rem] md:w-[40rem] h-[30rem]">
              <iframe className="absolute top-0 left-0 w-full h-full" style={{ "frameBorder":"0", "style":"border:0", "allowFullScreen":"", "ariaHidden":"false", "tabIndex":"0" }}
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7141.809346494834!2d50.031933!3d26.491014000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49ffa222916bcd%3A0x56403e4e620a0d93!2z2YXZg9iq2Kgg2YXYp9mH2LEg2KfZhNmF2LTYp9mF2Lkg2YTZhNiu2K_Zhdin2Kog2KfZhNiq2KzYp9ix2YrYqSAo2YXYp9mFKQ!5e0!3m2!1sen!2seg!4v1702471520369!5m2!1sen!2seg">
              </iframe>
            </div>
          </div>
        </div>
      </section>
    )
  }


  return(
    <section className="dark:bg-secondary bg-base-300 min-h-screen flex flex-col font-semibold">
      <div className="hero min-h-[20rem]" style={{backgroundImage: 'url("/bg-1.jpg")'}}>
        <div className="hero-overlay bg-secondary bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-primary">{t("Contact Us")}</h1>
          </div>
        </div>
      </div>

      <div className="hero dark:bg-secondary bg-base-300 mt-8 ">
        <div className="hero-content flex-col md:flex-col xl:flex-row  pb-10 md:0 gap-8 flex-wrap">
          <div className="flex flex-col justify-space-between items-start md:self-start">

            <p className="py-6 text-4xl sm:text-5xl font-semibold">{t("Do you have any inquiries?")}</p>
            <span className="text-primary text-xl flex justify-center items-center gap-4"><FaMapLocationDot /> {t("Address")}</span>
            <h3 className="text-xl mt-2 border-b-[0.02rem] border-gray-700  w-full md:w-full pb-6 leading-loose">
              {formData.address} <br />
              {formData.region}
            </h3>

            <span className="text-base md:text-xl flex justify-center mt-2 items-center pt-6 gap-4"><FaBuilding className="text-primary" /> {t("Building Number")} : {formData.buildNumber}</span>

            <span className="text-base md:text-xl flex justify-center mt-2 items-center gap-4"><MdMarkEmailUnread className="text-primary" /> {t("Postal Code")} : {formData.postalCode}</span>

            <span className="text-base md:text-xl flex justify-start mt-2 items-center pb-6 border-b-[0.02rem] border-gray-700 w-full sm:w-full gap-4"><MdOutlineNumbers className="text-primary" /> {t("Additional Number")} : {formData.additionalNumber}</span>

            <h3 className="text-base md:text-xl flex justify-center mt-2 items-center gap-4 pt-6"><IoPhonePortrait className="text-primary" /> <a href={`tel:${formData.phone}`}>{formData.phone}</a></h3>

            <h3 className="text-base md:text-xl flex justify-center mt-2 items-center gap-4"><MdAttachEmail className="text-primary" /> <a href={`mailto:${formData.email}`}>{formData.email}</a></h3>
            
          </div>
          
          <div className="relative flex flex-col justify-space-between items-start w-[18rem] sm:w-[35rem] md:w-[40rem] h-[30rem]">
            <iframe className="absolute top-0 left-0 w-full h-full" style={{ "frameBorder":"0", "style":"border:0", "allowFullScreen":"", "ariaHidden":"false", "tabIndex":"0" }}
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7141.809346494834!2d50.031933!3d26.491014000000003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e49ffa222916bcd%3A0x56403e4e620a0d93!2z2YXZg9iq2Kgg2YXYp9mH2LEg2KfZhNmF2LTYp9mF2Lkg2YTZhNiu2K_Zhdin2Kog2KfZhNiq2KzYp9ix2YrYqSAo2YXYp9mFKQ!5e0!3m2!1sen!2seg!4v1702471520369!5m2!1sen!2seg">
            </iframe>
          </div>

          <form onSubmit={handleSubmit}  className="flex flex-col gap-2 w-full xl:px-10 mx-auto self-start my-10" >
            <h1 className="text-xl text-primary mb-4 font-semibold">{t("Send your inquiry")}</h1>
            {messageSuccess && <div role="alert" className="alert alert-success w-full max-w-full my-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span className="text-accent">{t("Your Message have been sent!")}</span>
            </div>}

            {messageError && <p className="text-accent p-3 rounded-lg bg-red-900" aria-live="assertive">
              {messageError}
            </p>}
            <label className="label-text text-base inline-block mb-0" htmlFor="name">{t("Name")}</label>
            <input className="input input-bordered w-full" type="name" name="name" id="name" onChange={handleMessageFormChange} required value={messageFormData.name} />

            <label className="label-text text-base inline-block mb-0" htmlFor="phone">{t("Phone")}</label>
            <input className="input input-bordered w-full" type="tel" name="phone" id="phone" onChange={handleMessageFormChange} required value={messageFormData.phone} />

            <label className="label-text text-base inline-block mb-0" htmlFor="email">{t("Email")}</label>
            <input className="input input-bordered w-full" type="email" name="email" id="email" required onChange={handleMessageFormChange} value={messageFormData.email} />

            <label className="form-control">
              <div className="label">
                <span className="label-text">{t("Inquiry")}</span>
              </div>
              <textarea className="textarea textarea-bordered h-24" name="message" required value={messageFormData.message} onChange={handleMessageFormChange} placeholder="Message"></textarea>
            </label>

            <button className="btn btn-primary text-white font-base mt-2">{t("Send")}</button>
          </form>

        </div>
      </div>


      <section className={`bg-green-500 fixed h-12 w-12 bottom-10 ${i18n.language == "en" ? "right-10" : "left-10"}  cursor-pointer rounded-full flex items-center justify-center drop-shadow-2xl`}>
        <a href={storeLinks?.socialMedia?.whatsapp} className="" target="_blank"><FaWhatsapp className="text-white text-4xl sm:text-4xl" /></a>
      </section>
    </section>
  )
}