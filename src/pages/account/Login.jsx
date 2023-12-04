import { Link, useNavigate, Navigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../context/AuthProvider"
import axios from "axios"

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        device_token: "myDeviceToken"
    })

    console.log(formData)

    const { setToken, token } = useAuth()

    const [errMsg, setErrMsg] = useState('')

    if (token) {
        console.log(token)
        return <Navigate to="/dashboard" />
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
        console.log(response)
        
        setToken(data.token)
    
        if (data.token) {
          navigate('/dashboard')
        }
  
      } catch (err) {
          if (err.response.data.message == "البريد الإلكتروني أو كلمة المرور غير صحيحة") {
            setErrMsg("The email or password is incorrect.")
            setTimeout(() => setErrMsg(''), 3000); // Clear the error message after 3000 milliseconds (3 seconds)
          } else if (err.response.data.message == "validation errors") {
            console.log(err.response.data.errors)
            let error = err.response.data.errors[0]?.email ? "No account found." : "The password must be 8 characters or more."
            setErrMsg(error)
            setTimeout(() => setErrMsg(''), 3000); // Clear the error message after 3000 milliseconds (3 seconds)
          } 
          console.log(err)
      }
    }
    



  return (
    <section className="bg-secondary md:pt-0 min-[320px]:pt-28 sm:pt-20 lg:pt-0">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-base-100 border-base-100 rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-accent md:text-2xl">
              Sign in to your account
            </h1>
              <p className="text-base font-light m-0 text-accent">
                Don’t have an account yet?{' '}
                <Link to="/signup" className="font-medium text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            {errMsg && <p className="text-accent p-3 rounded-lg bg-red-900" aria-live="assertive">
                  {errMsg}
            </p>}
            <form className="space-y-4 md:space-y-6 " onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-accent">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  value={formData.username}
                  className="bg-secondary border border-secondary text-accent sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-accent">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  value={formData.password}
                  required
                  className="bg-secondary border border-secondary text-accent sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                />
              </div>

              <button className="w-full text-white bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Sign in
              </button>
              <p className="text-base font-normal text-accent underline">
                <Link to="/resetpassword">Forgot your password?</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

}