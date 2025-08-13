import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";
import { BiShow, BiHide } from "react-icons/bi";
import LinksContext from "../../context/storeLinks";


export default function ResetPassword() {
  const [resetCodeFormContainer, setResetCodeFormContainer] = useState(true) 
  const [resetPasswordFormContainer, setResetPasswordFormContainer] = useState(false)
  const [enterResetCodeFormContainer, setEnterResetCodeFormContainer] = useState(false) 

  const [emailForm, setEmailForm] = useState({email: ''})
  const [resetCodeForm, setResetCodeForm] = useState({email: '', code: ''})
  const [resetPasswordForm, setResetPasswordForm] = useState({email: '', password: '', password_confirmation: '', code: ''})

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/
  const [validPassword, setValidPassword] = useState(false);
  const [validMatch, setValidMatch] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isCodeLoading, setIsCodeLoading] = useState(false)
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

  const navigate = useNavigate()

  const { storeLinks } = useContext(LinksContext);

  const { t, i18n } = useTranslation()

  // console.log(resetPasswordForm)

  function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    setErrMsg('')
    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/requestReset`, emailForm)
    .then(res => {
      // console.log(res)
      if (res.status == 200) {
        setResetCodeForm({...resetCodeForm, email: emailForm.email})
        setResetCodeFormContainer(false)
        setResetPasswordFormContainer(true)
      }
    })
    .catch(err => {
      // console.log(err)
      if (err.response?.data?.message) {
        setErrMsg('Email not found. Please check your email address.')
      } else if (err.response?.status === 429) {
        setErrMsg('Too many requests. Please try again later.')
      } else {
        setErrMsg('Something went wrong. Please try again.')
      }
    })
    .finally(() => {
      setIsLoading(false)
    })
  }


  function handleResetCodeSubmit(event) {
    event.preventDefault()
    setIsCodeLoading(true)
    setErrMsg('')
    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/verifyOtp`, resetCodeForm)
    .then(res => {
      // console.log(res)
      if (res.status == "200") {
        // console.log(res)
        setResetPasswordForm({...resetPasswordForm, email: resetCodeForm.email, code:resetCodeForm.code})
        setResetPasswordFormContainer(false)
        setEnterResetCodeFormContainer(true)
      }
    })
    .catch(err => {
      // console.log(err)
      if (err.response?.data?.message) {
        setErrMsg('Invalid code. Please check your code and try again.')
      } else if (err.response?.status === 404) {
        setErrMsg('Code not found or expired. Please request a new code.')
      } else if (err.response?.status === 429) {
        setErrMsg('Too many attempts. Please try again later.')
      } else {
        setErrMsg('Something went wrong. Please try again.')
      }
    })
    .finally(() => {
      setIsCodeLoading(false)
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


  function handleShowPassword() {
    const passwordInput = document.getElementById("password") 
    if (passwordInput) {
      if (passwordInput.type === "text") {
        passwordInput.type = "password";
      } else {
        passwordInput.type = "text";
      }
      setShowPassword((previousValue) => !previousValue);
    }
  }

  function handleShowPasswordConfirmation() {
    const passwordConfirmationInput = document.getElementById("password_confirmation") 
    if (passwordConfirmationInput) {
      if (passwordConfirmationInput.type === "text") {
        passwordConfirmationInput.type = "password";
      } else {
        passwordConfirmationInput.type = "text";
      }
      setShowPasswordConfirmation((previousValue) => !previousValue);
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
      setIsPasswordLoading(true)
      axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/resetPassword`, resetPasswordForm)
      .then(res => {
        // console.log(res)
        if (res.status == "200") {
          // console.log(res)
          setResetPasswordForm({...resetPasswordForm, email: resetCodeForm.email, code:resetCodeForm.code})
          setResetPasswordFormContainer(false)
          setEnterResetCodeFormContainer(true)
          setErrMsg("Password Changed")
          navigate('/login', { replace: true });
        }
      })
      .catch(err => {
        // console.log(err)
      })
      .finally(() => {
        setIsPasswordLoading(false)
      })
    }
  }

  return (
    <section className="dark:bg-secondary bg-base-300 flex justify-center items-center h-screen">
      {resetCodeFormContainer &&
        <section className="bg-base-100 flex flex-col justify-center items-start pt-4 pb-6 px-10 w-50 rounded-md">
          <h1 className="text-2xl my-2">{t("Reset Your Password")}</h1>
          {errMsg && 
            <p className={`text-white p-3 rounded-lg w-[320px] ${errMsg == "Password Changed" ? "bg-green-900" : "bg-primary"}`} aria-live="assertive">
                {errMsg}
            </p>}
          <form className="flex flex-col justify-center items-start gap-2 mt-3" onSubmit={handleSubmit}>
            <label className="label-text text-xl" htmlFor="email">{t("Email")}</label>
            <input className="input input-bordered w-full max-w-xs" type="email" name="email" id="email" placeholder="John@gmail.com" required value={emailForm.email} onChange={(event) => setEmailForm({...emailForm, email: event.target.value})} autoComplete="off"/>
            <button className="btn btn-primary text-accent mt-2 w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  {t("Loading...")}
                </>
              ) : (
                t("Continue")
              )}
            </button>
          </form>
        </section> 
      }

      {resetPasswordFormContainer && 
        <section className="bg-base-100 flex flex-col justify-center items-start pt-4 pb-6 px-10 w-50 rounded-md">
          <h1 className="text-2xl my-2">{t("Enter Code")}</h1>
          {errMsg && 
            <p className={`text-white p-3 rounded-lg w-[320px] ${errMsg == "Password Changed" ? "bg-green-900" : "bg-primary"}`} aria-live="assertive">
                {errMsg}
            </p>}
          <form className="flex flex-col justify-center items-start gap-2 mt-3" onSubmit={handleResetCodeSubmit}>
            <label htmlFor="email">{t("Email")}</label>
            <input className="input input-bordered w-full max-w-xs" type="email" name="email" id="email" placeholder="John@gmail.com" required value={resetCodeForm.email} onChange={(event) => setResetCodeForm({...resetCodeForm, email: event.target.value})} autoComplete="off"/>

            <label htmlFor="code">{t("Code")}</label>
            <input className="input input-bordered w-full max-w-xs" type="text" name="code" id="code" placeholder="####" required value={resetCodeForm.code} onChange={(event) => setResetCodeForm({...resetCodeForm, code: event.target.value})} />
            <button className="btn btn-primary text-accent mt-2 w-full" disabled={isCodeLoading}>
              {isCodeLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  {t("Loading...")}
                </>
              ) : (
                t("Continue")
              )}
            </button>
          </form>
        </section>
      }

      {enterResetCodeFormContainer && 
        <section className="bg-base-100 flex flex-col justify-center items-start pt-4 pb-6 px-10 w-50 rounded-md">
          <h1 className="text-2xl my-2">{t("Reset Your Password")}</h1>
          {errMsg && 
            <p className={`text-white p-3 rounded-lg w-[320px] ${errMsg == "Password Changed" ? "bg-green-900" : "bg-primary"}`} aria-live="assertive">
                {errMsg}
            </p>}
          <form className="flex flex-col justify-center items-start gap-2 mt-3" onSubmit={handleResetPasswordSubmit}>
            <label htmlFor="password">{t("New Password")}</label>
            <div className="relative w-full max-w-xs">
              <input className="input input-bordered w-full" type="password" name="password" id="password" autoComplete="off" placeholder="Enter new password" value={resetPasswordForm.password} onChange={handlePasswordChange} required />
              {showPassword ? (
                <BiShow
                  className={`absolute top-3 ${i18n.language == "en" ? "right-3" : "left-3"} text-gray-500 text-xl cursor-pointer`}
                  onClick={handleShowPassword}
                />
              ) : (
                <BiHide
                  className={`absolute top-3 ${i18n.language == "en" ? "right-3" : "left-3"} text-gray-500 text-xl cursor-pointer`}
                  onClick={handleShowPassword}
                />
              )}
            </div>

            <label htmlFor="password_confirmation">{t("Password Confirmation")}</label>
            <div className="relative w-full max-w-xs">
              <input className="input input-bordered w-full" type="password" name="password_confirmation" autoComplete="off" id="password_confirmation" placeholder="Confirm new password" value={resetPasswordForm.password_confirmation} onChange={handlePasswordChange} required />
              {showPasswordConfirmation ? (
                <BiShow
                  className={`absolute top-3 ${i18n.language == "en" ? "right-3" : "left-3"} text-gray-500 text-xl cursor-pointer`}
                  onClick={handleShowPasswordConfirmation}
                />
              ) : (
                <BiHide
                  className={`absolute top-3 ${i18n.language == "en" ? "right-3" : "left-3"} text-gray-500 text-xl cursor-pointer`}
                  onClick={handleShowPasswordConfirmation}
                />
              )}
            </div>
            <button className="btn btn-primary text-accent mt-2 w-full" disabled={isPasswordLoading}>
              {isPasswordLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  {t("Loading...")}
                </>
              ) : (
                t("Save")
              )}
            </button>
          </form>
        </section>
      }

      <section className={`bg-green-500 fixed h-12 w-12 bottom-10 ${i18n.language == "en" ? "right-10" : "left-10"}  cursor-pointer rounded-full flex items-center justify-center drop-shadow-2xl`}>
        <a href={storeLinks?.socialMedia?.whatsapp} className="" target="_blank"><FaWhatsapp className="text-white text-4xl sm:text-4xl" /></a>
      </section>
    </section>
  )
}