import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { AiFillCloseCircle } from "react-icons/ai"
import { useAuth } from "../../context/AuthProvider";
import { useTranslation } from "react-i18next";

export default function Profile() {

  const { token } = useAuth()

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/
  const [validPassword, setValidPassword] = useState(false);

  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)
  const [errorPasswordForm, setErrorPasswordForm] = useState(null)
  const [loadingButtonStatus, setLoadingButtonStatus] = useState(false)

  const { t } = useTranslation()

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    image: null
  })

  console.log(formData)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/users/show`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then(res => {
            setLoadingStatus(false)
            setFormData(res.data.data.user)
          })
          .catch(err => {
            setLoadingStatus(false)
            console.log(err); // Log any errors that occur
            setError(err.message)
          })
  }, [])

  // console.log(formData)

  const [formPassword, setFormPassword] = useState({
    old_password: '',
    password: '',
    confirm_Password: ''
  })

  console.log(formPassword)

  function handleChangePassword(even){
    const {name, value} = event.target
    setFormPassword(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })

    if (name === "password") {
      const isPasswordValid = PWD_REGEX.test(value);
      setValidPassword(isPasswordValid);
      console.log(validPassword)
    }
  }

  function handlePasswordFormSubmit(event) {
    event.preventDefault()
    if (formPassword.password == formPassword.confirm_Password && validPassword) {
      axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/changePassword`, formPassword)
          .then(res => {
            console.log(res)
            setFormPassword({
              old_password: '',
              password: '',
              confirm_Password: ''
            })
            console.log("Password Changed")
            document.getElementById('my_modal_5').close()
          })
          .catch(err => {
            console.log(err)
            if (err.response.data.message == "كلمة المرور القديمة غير صحيحة") {
              setErrorPasswordForm(t("The old password is incorrect."))
              setTimeout(() => setErrorPasswordForm(null), 4000); // Clear the error message after 3000 milliseconds (3 seconds)
            } else {
              setErrorPasswordForm(err.response.data.message)
              setTimeout(() => setErrorPasswordForm(null), 4000); // Clear the error message after 3000 milliseconds (3 seconds)
            }
          })
    } else {
      setErrorPasswordForm(t("Please make sure your passwords match, and it follows the password change requirements (Password: 8-24 chars, at least 1 lowercase, 1 uppercase, 1 digit.)"))
      setTimeout(() => setErrorPasswordForm(null), 5000); // Clear the error message after 3000 milliseconds (3 seconds)
    }
  }

  function handleChange(event) {
    const {name, value} = event.target
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0]
    setFormData((previousFormData) => ({
      ...previousFormData,
      image: selectedFile
    }))
  }

  function handleSubmit(event) {
    event.preventDefault();

    let inputNames = ["name", "email", "phone"]
    const EditProfileForm = new FormData(); // Create a new FormData object
  
    // Append the fields from pileFormData
    for (const key of inputNames) {
      EditProfileForm.append(key, formData[key]);
    }
  
    // Append the file data
    // EditProfileForm.append("image", formData.image);
    
    // Check if formData.image is a file (not a string)
    if (formData.image instanceof File) {
      // Append the file data
      EditProfileForm.append("image", formData.image);
  }

    setLoadingButtonStatus(true)

    axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/update`, EditProfileForm, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(res => {
        setLoadingButtonStatus(false)
        console.log(res);
        window.location.reload()
      })
      .catch(err => {
        console.log(err);
        setLoadingButtonStatus(false)
        setError(err.response.data.message)
      });
  }


  if (loadingStatus) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-secondary">
        <span className="loading loading-ring loading-lg bg-primary"></span>
      </div>
    )
  }

  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center w-screen h-screen bg-secondary">
  //       <h1 className="bg-red-900 text-accent text-center uppercase rounded-lg p-4 text-lg">{error} <br/> Please refresh</h1>
  //     </div>
  //   )
  // }


  return (
      <section className="bg-secondary flex flex-col justify-center items-center h-screen">
        {error &&   
        <div className="flex justify-center items-center bg-secondary">
          <h1 className="bg-red-900 text-accent text-center capitalize rounded-lg p-4 text-lg">{error}</h1>
        </div>}

        <div className="text-2xl my-6">
          <h1>{t("Edit Profile")}</h1>
        </div>
        
        <form className="flex flex-col justify-center items-center gap-2" onSubmit={handleSubmit}>
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={typeof formData.image == "string" ? formData.image : typeof formData.image !== "string" ? URL.createObjectURL(formData.image) : 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'} alt="UserImage" />
            </div>
          </div>
 
          <div className="w-[90%]">
            <label className="label-text text-base" htmlFor="name">{t("Name")}</label>
            <input className="input input-bordered w-full" type="text" name="name" id="name" onChange={handleChange} value={formData.name} />
          </div>

          <div className="w-[90%]">
            <label className="label-text text-base inline-block mb-2" htmlFor="email">{t("Email")}</label>
            <input className="input input-bordered w-full" type="email" name="email" id="email" onChange={handleChange} value={formData.email} />
          </div>

          <div className="w-[90%]">
            <label className="label-text text-base inline-block mb-2" htmlFor="phone">{t("Phone")}</label>
            <input className="input input-bordered w-full" type="text" name="phone" id="phone" onChange={handleChange} value={formData.phone} />
          </div>

          <div className="w-[90%]">
            <label className="label-text text-base inline-block mb-2" htmlFor="image">{t("Image")}</label>
            <input className="file-input file-input-bordered file-input-primary w-full " type="file" name="image" id="image" onChange={handleFileChange}  />
          </div>

          <button className="btn btn-primary text-accent text-base mt-4 w-[90%]" disabled={loadingButtonStatus}>{t("Save Profile")}</button>
        </form>

        <button className="btn btn-base-100 text-accent text-base mt-4 w-neutral hover:bg-primary" onClick={()=>document.getElementById('my_modal_5').showModal()}>{t("Change Password")}</button>
        
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-2xl mb-2">{t("Change Password")}</h3>
              {errorPasswordForm && <h1 className="bg-red-900 text-accent text-center capitalize rounded-lg p-4 my-1 text-lg">{errorPasswordForm}</h1>}
              <form onSubmit={handlePasswordFormSubmit} className="flex flex-col gap-2" method="dialog">
                <label className="label-text text-base inline-block mb-0" htmlFor="old_password">{t("Old Password")}</label>
                <input className="input input-bordered w-full" type="password" name="old_password" id="old_password" onChange={handleChangePassword} required value={formPassword.old_password} />

                <label className="label-text text-base inline-block mb-0" htmlFor="password">{t("Password")}</label>
                <input className="input input-bordered w-full" type="password" name="password" id="password" onChange={handleChangePassword} required value={formPassword.password} />

                <label className="label-text text-base inline-block mb-0" htmlFor="confirm_Password">{t("Confirm Password")}</label>
                <input className="input input-bordered w-full" type="password" name="confirm_Password" id="confirm_Password" required onChange={handleChangePassword} value={formPassword.confirm_Password} />
                <button className="btn btn-primary text-white font-base mt-2">{t("Save")}</button>
                <button className="btn btn-secondary" type="button" onClick={() => document.getElementById('my_modal_5').close()}>{t("Close")}</button>
              </form>
            </div>
        </dialog>
      </section>
  )
}