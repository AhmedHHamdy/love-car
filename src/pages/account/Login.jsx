import { Link, useNavigate, Navigate } from "react-router-dom"
import { useContext, useState } from "react"
import { useAuth } from "../../context/AuthProvider"
import axios from "axios"
import { useTranslation } from "react-i18next"
import { BiShow, BiHide } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa"
import LinksContext from "../../context/storeLinks"

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        device_token: "myDeviceToken"
    })

    // console.log(formData)

    const { storeLinks } = useContext(LinksContext);

    const { setToken, token } = useAuth()

    const [errMsg, setErrMsg] = useState('')

    const [showPassword, setShowPassword] = useState(false);

    const { t, i18n } = useTranslation()

    if (token) {
        // console.log(token)
        return <Navigate to="/" />
    }

    const navigate = useNavigate()

    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
          return {
            ...prevFormData,
            [name]: value
          }
        })
    }

    async function handleSubmit(event) {
      event.preventDefault()
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/login`, formData)
        const data = response.data.data
        // console.log(response)
        
        setToken(data.token)
    
        if (data.token) {
          navigate('/')
        }
  
      } catch (err) {
          if (err.response.data.message == "البريد الإلكتروني أو كلمة المرور غير صحيحة") {
            setErrMsg(t("The email or password is incorrect."))
            setTimeout(() => setErrMsg(''), 3000); // Clear the error message after 3000 milliseconds (3 seconds)
          } else if (err.response.data.message == "validation errors") {
            // console.log(err.response.data.errors)
            let error = err.response.data.errors[0]?.email ? t("No account found.") : t("The password must be 8 characters or more.")
            setErrMsg(error)
            setTimeout(() => setErrMsg(''), 3000); // Clear the error message after 3000 milliseconds (3 seconds)
          } 
          // console.log(err)
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


  return (
    <section className="bg-secondary md:pt-0 min-[320px]:pt-0 sm:pt-20 lg:pt-0">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 2xl:max-w-[1800px] 2xl:mx-auto">
        <div className="w-full bg-base-100 border-base-100 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-accent md:text-2xl">
              {t("Sign in to your account")}
            </h1>
              <p className="text-base font-light m-0 text-accent">
                {t("Don't have an account yet?")}{' '}
                <Link to="/signup" className="font-medium text-primary hover:underline">
                  {t("Sign up")}
                </Link>
              </p>
            {errMsg && <p className="text-accent p-3 rounded-lg bg-red-900" aria-live="assertive">
                  {errMsg}
            </p>}
            <form className="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
              <div>
                {/* <label htmlFor="email" className="block mb-2 text-sm font-medium text-accent">
                  {t("Email")}
                </label> */}
                <label className="input bg-secondary input-bordered flex items-center gap-2 col-span-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="grow w-20 autofill:shadow-[inset_0_0_0px_1000px_#0D0D0D] bg-secondary border border-secondary text-accent sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2"
                  placeholder={t("Email")}
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
              </label>
              </div>

              <div>
                {/* <label htmlFor="password" className="block mb-2 text-sm font-medium text-accent">
                  {t("Password")}
                </label> */}
                <label className="input bg-secondary input-bordered flex items-center relative gap-2 col-span-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="grow w-20 bg-secondary border border-secondary text-accent sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2"
                    required
                    onChange={handleChange}
                    value={formData.password}
                  />

                  {showPassword ? (
                    <BiShow
                      className={`absolute bg-secondary top-2 ${i18n.language == "en" ? "right-4 ml-2" : "left-4 mr-2"} text-gray-500 mt-1 text-2xl cursor-pointer`}
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <BiHide
                      className={`absolute bg-secondary top-2 ${i18n.language == "en" ? "right-4 ml-2" : "left-4 mr-2"} text-gray-500 mt-1 bg-secondary text-2xl cursor-pointer`}
                      onClick={handleShowPassword}
                    />
                  )}
                </label>
              </div>

              <button className="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                {t("Sign in")}
              </button>
              <p className="text-base font-normal text-accent underline">
                <Link to="/resetpassword">{t("Forgot your password?")}</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <section className={`bg-green-500 fixed h-20 w-20 bottom-10 ${i18n.language == "en" ? "right-10" : "left-10"}  cursor-pointer rounded-full flex items-center justify-center drop-shadow-2xl`}>
        <a href={storeLinks?.socialMedia?.whatsapp} className="" target="_blank"><FaWhatsapp className="text-white text-6xl sm:text-6xl" /></a>
      </section>
    </section>
  );

}