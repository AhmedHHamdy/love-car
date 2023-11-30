import { Link, useNavigate, Navigate } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useAuth } from "../../context/AuthProvider"

export default function Signup() {
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/

    const { token } = useAuth()

    const [errMsg, setErrMsg] = useState('')

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        device_token: "myDeviceToken"
    })

    const navigate = useNavigate()

    if (token) {
        console.log(token)
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
            setErrMsg('Password must contain at least one lowercase letter, one uppercase letter, one digit, and be between 8 and 24 characters in length.')
            return
          }
    
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/register`, formData)
          console.log(response)

          const data = response.data.data

          console.log(response)

          setFormData({
            name: '',
            email: '',
            phone: '',
            password: '',
        })
    
          if (data.token) {
            navigate("/login")
          }
    
        } catch (err) {
          console.error(err.response.data.message);
          setErrMsg(err.response.data.message)
        }
    }


    return (
      <section className="bg-secondary md:pt-0 min-[320px]:pt-28 sm:pt-20 lg:pt-0">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-base-100 dark:border-base-100">
            <div className="p-6 space-y-2 md:space-y-6 sm:p-4">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign up
              </h1>
              <p className="text-red-600" aria-live="assertive">
                {errMsg}
              </p>
    
              <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-secondary dark:border-secondary dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Name"
                  required
                  onChange={handleChange}
                  value={formData.name}
                />
    
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-secondary dark:border-secondary dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  onChange={handleChange}
                  value={formData.email}
                />
    
                <label
                  htmlFor="phone"
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-secondary dark:border-secondary dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="01055555555"
                  required
                  onChange={handleChange}
                  value={formData.phone}
                />
    
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2 dark:bg-secondary dark:border-secondary dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={handleChange}
                  value={formData.password}
                />
    
                <button style={{marginTop: "1.5rem"}} className="w-full mt-10!important text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Create an account
                </button>
    
                <p className="self-center text-sm font-light text-gray-500 dark:text-gray-400">
                  Have an account yet?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary hover:underline dark:text-primary"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }    