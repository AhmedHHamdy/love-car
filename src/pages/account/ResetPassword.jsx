import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";
import LinksContext from "../../context/storeLinks";


export default function ResetPassword() {
  const [resetCodeFormContainer, setResetCodeFormContainer] = useState(true) 
  const [resetPasswordFormContainer, setResetPasswordFormContainer] = useState(false)
  const [enterResetCodeFormContainer, setEnterResetCodeFormContainer] = useState(false) 

  const [phoneForm, setPhoneForm] = useState({phone: ''})
  const [resetCodeForm, setResetCodeForm] = useState({phone: '', otp: ''})
  const [resetPasswordForm, setResetPasswordForm] = useState({phone: '', password: '', password_confirmation: '', device_token: 'device_token'})

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/
  const [validPassword, setValidPassword] = useState(false);
  const [validMatch, setValidMatch] = useState(false)

  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()

  const { storeLinks } = useContext(LinksContext);

  const { t, i18n } = useTranslation()

  // console.log(resetPasswordForm)

  function handleSubmit(event) {
    event.preventDefault()
    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/requestReset`, phoneForm)
    .then(res => {
      // console.log(res)
      if (res.status == 200) {
        setResetCodeForm({...resetCodeForm, phone: phoneForm.phone})
        setResetCodeFormContainer(false)
        setResetPasswordFormContainer(true)
      }
    })
    .catch(err => {
      // console.log(err)
    })
  }


  function handleResetCodeSubmit(event) {
    event.preventDefault()
    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/verifyOtp`, resetCodeForm)
    .then(res => {
      // console.log(res)
      if (res.status == "200") {
        // console.log(res)
        setResetPasswordForm({...resetPasswordForm, phone: resetCodeForm.phone, otp:resetCodeForm.otp})
        setResetPasswordFormContainer(false)
        setEnterResetCodeFormContainer(true)
      }
    })
    .catch(err => {
      // console.log(err)
    })
  }


  function handlePasswordChange(event) {
    const {name, value} = event.target
    setResetPasswordForm(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })

    if (name === "password") {
      const isPasswordValid = PWD_REGEX.test(value);
      setValidPassword(isPasswordValid);
    } else if (name === "password_confirmation") {
      setValidMatch(value === resetPasswordForm.password );
    }
  }


  function handleResetPasswordSubmit(event) {
    event.preventDefault()
    // console.log(validMatch, validPassword)
  
    if (!validPassword) {
      setErrMsg('Password must meet these criteria: At least 1 lowercase letter, 1 uppercase letter, 1 digit and be 8-24 characters long.')
      return;
    }


    if (!validMatch) {
      setErrMsg('Passwords do not match')
      return;
    }



    if (validMatch && validPassword) {
      axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/resetPassword`, resetPasswordForm)
      .then(res => {
        // console.log(res)
        if (res.status == "200") {
          // console.log(res)
          setResetPasswordForm({...resetPasswordForm, phone: resetCodeForm.phone, otp:resetCodeForm.otp})
          setResetPasswordFormContainer(false)
          setEnterResetCodeFormContainer(true)
          setErrMsg("Password Changed")
          navigate('/login', { replace: true });
        }
      })
      .catch(err => {
        // console.log(err)
      })
    }
  }

  return (
    <section className="bg-secondary dark:bg-base-300 flex justify-center items-center h-screen">
      {resetCodeFormContainer &&
        <section className="bg-base-100 flex flex-col justify-center items-start pt-4 pb-6 px-10 w-50 rounded-md">
          <h1 className="text-2xl my-2">{t("Reset Your Password")}</h1>
          <form className="flex flex-col justify-center items-start gap-2 mt-3" onSubmit={handleSubmit}>
            <label className="label-text text-xl" htmlFor="phone">{t("Phone")}</label>
            <input className="input input-bordered w-full max-w-xs" type="text" name="phone" id="phone" placeholder="01555 555 555" required value={phoneForm.phone} onChange={(event) => setPhoneForm({...phoneForm, phone: event.target.value})}/>
            <button className="btn btn-primary text-accent mt-2 w-full">{t("Continue")}</button>
          </form>
        </section> 
      }

      {resetPasswordFormContainer && 
        <section className="bg-base-100 flex flex-col justify-center items-start pt-4 pb-6 px-10 w-50 rounded-md">
          <h1 className="text-2xl my-2">{t("Enter Code")}</h1>
          <form className="flex flex-col justify-center items-start gap-2 mt-3" onSubmit={handleResetCodeSubmit}>
            <label htmlFor="phone">{t("Phone")}</label>
            <input className="input input-bordered w-full max-w-xs" type="text" name="phone" id="phone" placeholder="015 555 555 55" required value={resetCodeForm.phone} onChange={(event) => setResetCodeForm({...resetCodeForm, phone: event.target.value})}/>

            <label htmlFor="otp">{t("Code")}</label>
            <input className="input input-bordered w-full max-w-xs" type="text" name="otp" id="otp" placeholder="####" required value={resetCodeForm.otp} onChange={(event) => setResetCodeForm({...resetCodeForm, otp: event.target.value})} />
            <button className="btn btn-primary text-accent mt-2 w-full">{t("Continue")}</button>
          </form>
        </section>
      }

      {enterResetCodeFormContainer && 
        <section className="bg-base-100 flex flex-col justify-center items-start pt-4 pb-6 px-10 w-50 rounded-md">
          <h1 className="text-2xl my-2">{t("Reset Your Password")}</h1>
          {errMsg && 
            <p className={`text-white p-3 rounded-lg ${errMsg == "Password Changed" ? "bg-green-900" : "bg-primary"}`} aria-live="assertive">
                {errMsg}
            </p>}
          <form className="flex flex-col justify-center items-start gap-2 mt-3" onSubmit={handleResetPasswordSubmit}>
            <label htmlFor="password">{t("New Password")}</label>
            <input className="input input-bordered w-full max-w-xs" type="password" name="password" id="password" placeholder="Enter new password" value={resetPasswordForm.password} onChange={handlePasswordChange} required />

            <label htmlFor="password_confirmation">{t("Password Confirmation")}</label>
            <input className="input input-bordered w-full max-w-xs" type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirm new password" value={resetPasswordForm.password_confirmation} onChange={handlePasswordChange} required />
            <button className="btn btn-primary text-accent mt-2 w-full">{t("Save")}</button>
          </form>
        </section>
      }

      <section className={`bg-green-500 fixed h-20 w-20 bottom-10 ${i18n.language == "en" ? "right-10" : "left-10"}  cursor-pointer rounded-full flex items-center justify-center drop-shadow-2xl`}>
        <a href={storeLinks?.socialMedia?.whatsapp} className="" target="_blank"><FaWhatsapp className="text-white text-6xl sm:text-6xl" /></a>
      </section>
    </section>
  )
}