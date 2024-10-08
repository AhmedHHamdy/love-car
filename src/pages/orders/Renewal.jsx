import { useContext, useState } from "react";
import MultiSelectDropdown from "../../components/MultiSelectDropdown";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LinksContext from "../../context/storeLinks";
import { FaWhatsapp } from "react-icons/fa";

export default function Renewal() {
  const location = useLocation()

  const [formData, setFormData] = useState({
    type: "renewal",
    model: "",
    year: "",
    description: "",
    notes: "",
  });


  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const { storeLinks } = useContext(LinksContext);

  const { t, i18n } = useTranslation()

  // console.log(formData)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  const handleMultiSelectChange = (list, formFieldName) => {
    setFormData({...formData, [formFieldName]: list})
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let formServicesData = {}
    if (formData.type === "maintenance") {
      let arr = ["type", "model", "year", "description", "oils", "frames", "brakes", "consumerParts", "repairTypes"]
      formServicesData = new FormData()

      for (const key of arr) {
        if(Array.isArray(formData[key])) {
          formData[key].forEach((item, index) => {
            formServicesData.append(`${key}[${index}]`, item)
          })
        } else {
          formServicesData.append(key, formData[key])
        }
      }

    } else if (formData.type === "renewal") {
      let arr = ["type", "model", "year", "description", "notes"]
      formServicesData = new FormData()

      for (const key of arr) {
        formServicesData.append(key, formData[key])
      }
    } 

    for (const pair of formServicesData.entries()) {
      // console.log(`${pair[0]}, ${pair[1]}`);
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/carOrders`, formServicesData)
      const data = await response.data.data
      // console.log(response)
      // console.log(data)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 4000)
      setFormData({
        type: "renewal",
        model: "",
        year: "",
        description: "",
        notes: ""
      })
    } catch (err) {
      // console.log(err)
      setError(err.message)
      setTimeout(() => {
        setError(null)
      }, 4000)
      setFormData({
        type: "renewal",
        model: "",
        year: "",
        description: "",
        notes: ""
      })
    }
    
  }

  return (
    <section className="dark:bg-secondary bg-base-300 p-10 min-h-screen font-semibold">
      <section className="w-9/12 mx-auto flex flex-col justify-center items-center 2xl:max-w-[1800px] 2xl:mx-auto">
        <h1 className="text-center text-3xl">{t("Renewal")}</h1>

        {success && <div role="alert" className="alert alert-success max-w-fit flex my-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-accent">{t("Your Request have been sent!")}</span>
        </div>}

        {error && <div role="alert" className="alert alert-error max-w-fit flex my-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-accent">{error}</span>
        </div>}

        <form className="flex flex-col w-full md:justify-center md:items-center md:grid md:grid-cols-12 md:gap-x-10 mt-4" onSubmit={handleSubmit}>
          {/* <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-base">Service Type</span>
            </div>
            <select 
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="select select-bordered"
              readOnly
            >
              <option value="renewal">renewal</option>
            </select>
          </label> */}

          <label className="form-control w-full max-w-full col-span-6">
            <div className="label">
              <span className="label-text text-base">{t("Model")}</span>
            </div>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
              placeholder="BMW 2023"
              className="input input-bordered w-full max-w-full"
            />
          </label>

          <label className="form-control w-full max-w-full col-span-6">
            <div className="label">
              <span className="label-text text-base">{t("Year")}</span>
            </div>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
              placeholder="2023"
              className="input input-bordered w-full max-w-full"
            />
          </label>

          {formData.type === "renewal" && <label className="form-control w-full max-w-full col-span-12">
            <div className="label">
              <span className="label-text text-base">{t("Notes")}</span>
            </div>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              required
              placeholder="Notes"
              className="textarea textarea-bordered h-24"
            />
          </label>}

          <label className="form-control w-full max-w-full col-span-12 mb-1">
            <div className="label">
              <span className="label-text text-base">{t("Description")}</span>
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Description"
              className="textarea textarea-bordered h-24"
            />
          </label>
          
          
          <button className="btn btn-primary text-accent mt-6 w-full max-w-full col-span-12">{t("Send")}</button>
        </form>
      </section>

      <section className={`bg-green-500 fixed h-16 w-16 bottom-10 ${i18n.language == "en" ? "right-10" : "left-10"}  cursor-pointer rounded-full flex items-center justify-center drop-shadow-2xl`}>
         <a href={storeLinks?.socialMedia?.whatsapp} className="" target="_blank"><FaWhatsapp className="text-white text-5xl sm:text-5xl" /></a>
      </section>
    </section>
  );
}
