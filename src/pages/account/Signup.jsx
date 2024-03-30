import { Link, useNavigate, Navigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthProvider"
import { useTranslation } from "react-i18next"

export default function Signup() {
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/

    const { token } = useAuth()

    const [errMsg, setErrMsg] = useState('')

    const { t } = useTranslation()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        city: '',
        region: '',
        address: '',
        device_token: "myDeviceToken"
    })

    // console.log(formData)

    const navigate = useNavigate()

    if (token) {
        // console.log(token)
        return <Navigate to="/products" />
    }

    const [validPassword, setValidPassword] = useState(false);
    
    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
          return {
            ...prevFormData,
            [name]: value
          }
        })
    
        if (name === "password") {
          const isPasswordValid = PWD_REGEX.test(value);
          setValidPassword(isPasswordValid);
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
    
          if (!validPassword) {
            setErrMsg(t('Password must contain at least one lowercase letter, one uppercase letter, one digit, and be between 8 and 24 characters in length.'))
            return
          }
    
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/register`, formData)
          // console.log(response)

          const data = response.data.data

          // console.log(response)

          setFormData({
            name: '',
            email: '',
            phone: '',
            password: '',
            city: '',
            region: '',
            address: '',
            device_token: "myDeviceToken"
        })
    
          if (data.token) {
            navigate("/login")
          }
    
        } catch (err) {
          // console.log(err)
          let errors = err.response.data.errors
          // console.log(errors)
          for (let err of errors) {
            // console.log(err)
            // console.log(Object.keys(err)[0])
            if (Object.keys(err)[0] == "email") {
              // console.log("yay")
              setErrMsg(t("The Email you entered is already in use."))
              setTimeout(() => setErrMsg(''), 3000); // Clear the error message after 3000 milliseconds (3 seconds)
              break
            } else if (Object.keys(err)[0] == "phone") {
              setErrMsg(t("The Phone number you entered is already in use."))
              setTimeout(() => setErrMsg(''), 3000); // Clear the error message after 3000 milliseconds (3 seconds)
              break
            } else if (Object.keys(err)[0] == "password") {
              setErrMsg(t("The Password must be 8 characters or more."))
              setTimeout(() => setErrMsg(''), 3000); // Clear the error message after 3000 milliseconds (3 seconds)
              break
            }
 
          }
        }
    }


    return (
      <section className="bg-secondary md:pt-0 min-[320px]:pt-0 sm:pt-20 lg:pt-0 ">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-base-100 border-base-100 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-2 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-accent md:text-2xl">
              {t("Sign up")}
              </h1>
              <p className="self-center text-base font-light text-accent">
                {t("Have an account?")}{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary hover:underline"
                  >
                    {t("Login")}
                  </Link>
              </p>
              {errMsg && <p className="text-accent p-3 rounded-lg bg-red-900"  aria-live="assertive">
                {errMsg}
              </p>}
    
              {/* <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-accent"
                >
                  {t("Name")}
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-secondary border border-secondary text-accent sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2"
                  placeholder="Name"
                  required
                  onChange={handleChange}
                  value={formData.name}
                />
    
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-accent"
                >
                  {t("Email")}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-secondary border border-secondary text-accent sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2"
                  placeholder="name@company.com"
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
    
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-accent"
                >
                  {t("Phone")}
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="bg-secondary border border-secondary text-accent sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2"
                  placeholder="01055555555"
                  required
                  onChange={handleChange}
                  value={formData.phone}
                />
    
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-accent"
                >
                  {t("Password")}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-secondary border border-secondary text-accent sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2"
                  required
                  onChange={handleChange}
                  value={formData.password}
                />
    
                <button style={{ marginTop: "1.5rem" }} className="w-full mt-10!important text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  {t("Create an account")}
                </button>
    
  
              </form> */}

              <form className="flex flex-col  md:grid md:grid-cols-2 xl: gap-4" onSubmit={handleSubmit}>
                <label className="input input-bordered bg-secondary flex items-center gap-2 col-span-1">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                  </svg>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="grow autofill:shadow-[inset_0_0_0px_1000px_#0D0D0D]
                    w-20 bg-secondary border border-secondary text-accent sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2"
                    placeholder={t("Name")}
                    required
                    onChange={handleChange}
                    value={formData.name}
                  />
                </label>

                <label className="input bg-secondary input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="grow autofill:shadow-[inset_0_0_0px_1000px_#0D0D0D] w-20 bg-secondary border border-secondary text-accent sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2"
                    placeholder="000 000 0000"
                    required
                    onChange={handleChange}
                    value={formData.phone}
                  />
                </label>
                
                <label className="input bg-secondary input-bordered flex items-center gap-2">
                  <svg className="w-5 h-5 opacity-70"  stroke-width="1.5" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" ><path d="M7 9.01L7.01 8.99889" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 9.01L11.01 8.99889" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 13.01L7.01 12.9989" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 13.01L11.01 12.9989" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7 17.01L7.01 16.9989" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M11 17.01L11.01 16.9989" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15 21H3.6C3.26863 21 3 20.7314 3 20.4V5.6C3 5.26863 3.26863 5 3.6 5H9V3.6C9 3.26863 9.26863 3 9.6 3H14.4C14.7314 3 15 3.26863 15 3.6V9M15 21H20.4C20.7314 21 21 20.7314 21 20.4V9.6C21 9.26863 20.7314 9 20.4 9H15M15 21V17M15 9V13M15 13H17M15 13V17M15 17H17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    className="grow w-20 autofill:shadow-[inset_0_0_0px_1000px_#0D0D0D] bg-secondary border border-secondary text-accent sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2"
                    placeholder={t("City")}
                    required
                    onChange={handleChange}
                    value={formData.city}
                  />
                </label>

                <select
                  className="select bg-secondary select-bordered w-full max-w-xs"
                  name="region"
                  id="region"
                  onChange={handleChange}
                  value={formData.region}
                  required
                >
                  <option value="" disabled selected>
                    {t("Select Region")}
                  </option>
                  <option value="Riyadh">{t("Riyadh")}</option>
                  <option value="Makkah">{t("Makkah")}</option>
                  <option value="Madinah">{t("Madinah")}</option>
                  <option value="Eastern Province">{t("Eastern Province")}</option>
                  <option value="Asir">{t("Asir")}</option>
                  <option value="Tabuk">{t("Tabuk")}</option>
                  <option value="Hail">{t("Hail")}</option>
                  <option value="Northern Borders">{t("Northern Borders")}</option>
                  <option value="Al Jawf">{t("Al Jawf")}</option>
                  <option value="Najran">{t("Najran")}</option>
                  <option value="Al Bahah">{t("Al Bahah")}</option>
                  <option value="Al Qurayyat">{t("Al Qurayyat")}</option>
                  <option value="Jizan">{t("Jizan")}</option>
                </select>


                <label className="input bg-secondary input-bordered flex items-center gap-2 col-span-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M15 2v20"/><path d="M15 7h5"/><path d="M15 12h5"/><path d="M15 17h5"/></svg>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    className="grow w-20 autofill:shadow-[inset_0_0_0px_1000px_#0D0D0D] bg-secondary border border-secondary text-accent sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2"
                    placeholder={t("Address")}
                    onChange={handleChange}
                    value={formData.address}
                  />
                </label>

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

                <label className="input bg-secondary input-bordered flex items-center gap-2 col-span-2">
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
                </label>
    
                <button className="w-full col-span-2 mt-2 text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  {t("Create an account")}
                </button>
    
  
              </form>
            </div>
          </div>
        </div>
      </section>
    );
    
}    