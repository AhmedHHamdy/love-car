import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { AiFillCloseCircle } from "react-icons/ai"
import { useAuth } from "../../context/AuthProvider";
import { useTranslation } from "react-i18next";
import LocationContext from "../../context/CitiesAndRegions";
import LinksContext from "../../context/storeLinks";
import { FaWhatsapp } from "react-icons/fa";

export default function Profile() {

  const { regions, cities, errMsg } = useContext(LocationContext);

  const { storeLinks } = useContext(LinksContext);

  // console.log(regions, cities)

  const { token } = useAuth()

  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/
  const [validPassword, setValidPassword] = useState(false);

  const [loadingStatus, setLoadingStatus] = useState(true)
  const [error, setError] = useState(null)
  const [errorPasswordForm, setErrorPasswordForm] = useState(null)
  const [loadingButtonStatus, setLoadingButtonStatus] = useState(false)

  const { t, i18n } = useTranslation()

  // const [regions, setRegions] = useState([])
  // const [cities, setCities] = useState([])

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    city: '',
    cityId: '',
    region: '',
    regionId: '',
    address: '',
    image: null
  })

  // console.log(formData)

  // useEffect(() => {
  //   axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/get-regions`)
  //   .then(res => {
  //     setRegions(res.data.data.regions)
  //   })
  //   .catch(err => {
  //     setErrMsg(err.message)
  //   })
  // }, [])

  // useEffect(() => {
  //   axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/get-cities`)
  //   .then(res => {
  //     setCities(res.data.data.cities)
  //   })
  //   .catch(err => {
  //     setErrMsg(err.message)
  //   })
  // }, [])

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
            // console.log(err); // Log any errors that occur
            setError(err.message)
          })
  }, [])

  console.log(formData)

  const [formPassword, setFormPassword] = useState({
    old_password: '',
    password: '',
    confirm_Password: ''
  })

  // console.log(formPassword)

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
      // console.log(validPassword)
    }
  }

  function handlePasswordFormSubmit(event) {
    event.preventDefault()
    if (formPassword.password == formPassword.confirm_Password && validPassword) {
      axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/users/changePassword`, formPassword)
          .then(res => {
            // console.log(res)
            setFormPassword({
              old_password: '',
              password: '',
              confirm_Password: ''
            })
            // console.log("Password Changed")
            document.getElementById('my_modal_5').close()
          })
          .catch(err => {
            // console.log(err)
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

    let inputNames = ["name", "email", "phone", "city_id", "region_id", "address"]
    const EditProfileForm = new FormData(); // Create a new FormData object
  
    // Append the fields from pileFormData
    for (const key of inputNames) {
      if (key == "city_id" || key == "region_id") {
        // console.log(key.split("_")[0]+key.split("_")[1].split('')[0].toUpperCase()+key.split("_")[1].split('')[1])
        EditProfileForm.append(key, formData[key.split("_")[0]+key.split("_")[1].split('')[0].toUpperCase()+key.split("_")[1].split('')[1]]);
      } else  {
        EditProfileForm.append(key, formData[key]);
      }
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
  //       <h1 className="bg-primary text-accent text-center uppercase rounded-lg p-4 text-lg">{error} <br/> Please refresh</h1>
  //     </div>
  //   )
  // }


  return (
      <section className="dark:bg-secondary bg-base-300 flex flex-col justify-center items-center min-h-screen font-semibold">
        {error &&   
        <div className="flex justify-center items-center bg-secondary">
          <h1 className="bg-primary text-center capitalize rounded-lg p-4 text-lg text-white">{error}</h1>
        </div>}

        <div className="text-2xl my-6">
          <h1>{t("Edit Profile")}</h1>
        </div>
        
        <form className="flex flex-col justify-center items-center gap-2 2xl:max-w-[1800px] 2xl:mx-auto" onSubmit={handleSubmit}>
          <div className="avatar mb-4">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={typeof formData.image == "string" ? formData.image : typeof formData.image !== "string" ? URL.createObjectURL(formData.image) : 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'} alt="UserImage" />
            </div>
          </div>
 
          <div className="grid grid-cols-2 gap-4 px-6">
            <div className="col-span-1">
              <label className="label-text text-base" htmlFor="name">{t("Name")}</label>
              <input className="input input-bordered w-full mt-2" type="text" name="name" id="name" onChange={handleChange} value={formData.name} />
            </div>

            <div className="col-span-1">
              <label className="label-text text-base inline-block mb-2" htmlFor="email">{t("Email")}</label>
              <input className="input input-bordered w-full" type="email" name="email" id="email" onChange={handleChange} value={formData.email} />
            </div>

            <div className="col-span-1">
              <label className="label-text text-base inline-block mb-2" htmlFor="region">{t("Region")}</label>
              <select
                className="select select-bordered w-full"
                name="regionId"
                id="region"
                onChange={handleChange}
                value={formData.regionId}
                required
              >
                <option value="" disabled>
                  {t("Select Region")}
                </option>
                {regions.map((option, i) => {
                  return (
                    <option key={i} value={option.id}>{option.name}</option>
                  )
                })}
                </select>          
            </div>

            <div className="col-span-1">
              <label className="label-text text-base inline-block mb-2" htmlFor="city">{t("City")}</label>
              <select
              className="select select-bordered w-full"
              name="cityId"
              id="city"
              onChange={handleChange}
              value={formData.cityId}
              required
            >
              <option value="" disabled>
                {t("Select City")}
              </option>
              {cities.map((option, i) => {
                return (
                  <option key={i} value={option.id}>{option.name}</option>
                )
              })}
              </select>          
            </div>


            <div className="col-span-1">
              <label className="label-text text-base inline-block mb-2" htmlFor="address">{t("Address")}</label>
              <input className="input input-bordered w-full" type="text" name="address" id="address" onChange={handleChange} value={formData.address} />
            </div>

            <div className="col-span-1">
              <label className="label-text text-base inline-block mb-2" htmlFor="phone">{t("Phone")}</label>
              <input className="input input-bordered w-full" type="text" name="phone" id="phone" onChange={handleChange} value={formData.phone} />
            </div>

            <div className="col-span-2">
            <label className="label-text text-base inline-block mb-2" htmlFor="image">{t("Image")}</label>
            <input className="file-input file-input-bordered file-input-primary w-full " type="file" name="image" id="image" onChange={handleFileChange}  />
          </div>

            <button className="btn btn-primary text-accent text-base mt-4 justify-items-center col-span-2" disabled={loadingButtonStatus}>{t("Save Profile")}</button>
          </div>
        </form>

        <button className="btn btn-base-100 text-accent text-base mt-4 w-neutral hover:bg-primary" onClick={()=>document.getElementById('my_modal_5').showModal()}>{t("Change Password")}</button>
        
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-2xl mb-2">{t("Change Password")}</h3>
              {errorPasswordForm && <h1 className="bg-primary text-white text-center capitalize rounded-lg p-4 my-1 text-lg">{errorPasswordForm}</h1>}
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

        <section className={`bg-green-500 fixed h-12 w-12 bottom-10 ${i18n.language == "en" ? "right-10" : "left-10"}  cursor-pointer rounded-full flex items-center justify-center drop-shadow-2xl`}>
          <a href={storeLinks?.socialMedia?.whatsapp} className="" target="_blank"><FaWhatsapp className="text-white text-4xl sm:text-4xl" /></a>
        </section>
      </section>
  )
}