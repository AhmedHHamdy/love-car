import { useState } from "react";
import MultiSelectDropdown from "../../components/MultiSelectDropdown";
import axios from "axios";

export default function Maintenance() {
  const [formData, setFormData] = useState({
    type: "",
    model: "",
    year: "",
    description: "",
    notes: "",
    oils: [],
    frames: [],
    brakes: [],
    consumerParts: [],
    repairTypes: [],
    license_date: "",
    city: "",
    region: "",
  });

  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  console.log(formData)

  const oilsOptionsData = [
    {
      id: 1,
      name: "زيت المحرك",
    },
    {
      id: 2,
      name: "زيت القير",
    },
    {
      id: 3,
      name: "زيت الديفرنس",
    },
    {
      id: 4,
      name: "زيت المكابح",
    },
    {
      id: 5,
      name: "زيت علبة الديركسيون",
    },
    {
      id: 6,
      name: "ماء اللديتر",
    },
    {
      id: 7,
      name: "ماء المساحات 1",
    },
    {
      id: 9,
      name: "زيت 5",
    },
  ];

  const framesOptionsData = [
    {
      id: 1,
      name: "تغيير الإطار",
    },
    {
      id: 2,
      name: "فحص هواء الإطارات S",
    },
    {
      id: 3,
      name: "توازن الإطار (ترصيص)",
    },
    {
      id: 4,
      name: "تغيير أماكن الإطار ان لزم (كروس X)",
    },
  ];

  const consumerPartsOptionsData = [
    {
      id: 1,
      name: "شمعة الاشتعال (تغيير البواجي - أسلاك البواجي - الكويل )",
    },
    {
      id: 2,
      name: "البخاخات أو الكبليتر (تنظيف - إصلاح)",
    },
    {
      id: 3,
      name: "فحص كمبيوتر (شامل) A",
    },
  ];

  const brakesOptionsData = [
    {
      id: 1,
      name: "تغيير المكابح الأمامية",
    },
    {
      id: 2,
      name: "تغيير الهوبات",
    },
    {
      id: 3,
      name: "خراطة الهوبات",
    },
    {
      id: 4,
      name: "ميزان الديركسيون 4",
    },
    {
      id: 5,
      name: "مكافح4",
    },
  ];

  const repairTypesOptionsData = [
    {
      id: 1,
      name: "ميكانيكي",
    },
    {
      id: 2,
      name: "كهربائي",
    },
    {
      id: 4,
      name: "اصلاح روتينى",
    },
  ];

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

    } else if (formData.type === "license") {
      let arr = ["type", "model", "year", "description", "license_date", "city", "region"]
      formServicesData = new FormData()

      for (const key of arr) {
        formServicesData.append(key, formData[key])
      }
    }

    for (const pair of formServicesData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/carOrders`, formServicesData)
      const data = await response.data.data
      console.log(response)
      console.log(data)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 4000)
      setFormData({
        type: "",
        model: "",
        year: "",
        description: "",
        notes: "",
        oils: [],
        frames: [],
        brakes: [],
        consumerParts: [],
        repairTypes: [],
        license_date: "",
        city: "",
        region: "",
      })
    } catch (err) {
      console.log(err)
      setError(err.message)
      setTimeout(() => {
        setError(null)
      }, 4000)
      setFormData({
        type: "",
        model: "",
        year: "",
        description: "",
        notes: "",
        oils: [],
        frames: [],
        brakes: [],
        consumerParts: [],
        repairTypes: [],
        license_date: "",
        city: "",
        region: "",
      })
    }
    
  }

  return (
    <section className="bg-secondary p-10">
      <section className="w-9/12 mx-auto flex flex-col justify-center items-center">
        <h1 className="text-center text-3xl">Services</h1>

        {success && <div role="alert" className="alert alert-success w-full max-w-xs my-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-accent">Your Request have been sent!</span>
        </div>}

        { error && <div role="alert" className="alert alert-error w-full max-w-xs my-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span className="text-accent">{error}</span>
        </div>}

        <form className="flex flex-col w-full md:justify-center md:items-center" onSubmit={handleSubmit}>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-base">Service Type</span>
            </div>
            <select 
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
              className="select select-bordered"
            >
              <option disabled value="">Type</option>
              <option value="maintenance">maintenance</option>
              <option value="renewal">renewal</option>
              <option value="license">license</option>
            </select>
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-base">Model</span>
            </div>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
              placeholder="BMW 2023"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-base">Year</span>
            </div>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
              placeholder="2023"
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          {formData.type === "renewal" && <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-base">Notes</span>
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

          <label className="form-control w-full max-w-xs mb-1">
            <div className="label">
              <span className="label-text text-base">Description</span>
            </div>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Description..."
              className="textarea textarea-bordered h-24"
            />
          </label>
          
          {formData.type === "maintenance" && <section className="flex flex-col gap-4 my-3 md:w-full md:self-center">
            {formData.type === "maintenance" && <label className="form-control w-full max-w-xs md:self-center">
              <MultiSelectDropdown
                formFieldName="Oils"
                formName="oils"
                optionsData={oilsOptionsData}
                onChange={handleMultiSelectChange}
              />
            </label>}

            {formData.type === "maintenance" && <label className="form-control w-full max-w-xs md:self-center">
              <MultiSelectDropdown
                formFieldName="Frames"
                formName="frames"
                optionsData={framesOptionsData}
                onChange={handleMultiSelectChange}
              />
            </label>}

            {formData.type === "maintenance" && <label className="form-control w-full max-w-xs md:self-center">
              <MultiSelectDropdown
                formFieldName="Consumer Parts"
                formName="consumerParts"
                optionsData={consumerPartsOptionsData}
                onChange={handleMultiSelectChange}
              />
            </label>}

            {formData.type === "maintenance" && <label className="form-control w-full max-w-xs md:self-center">
              <MultiSelectDropdown
                formFieldName="Brakes"
                formName="brakes"
                optionsData={brakesOptionsData}
                onChange={handleMultiSelectChange}
              />
            </label>}

            {formData.type === "maintenance" && <label className="form-control w-full max-w-xs md:self-center">
              <MultiSelectDropdown
                formFieldName="Repair Types"
                formName="repairTypes"
                optionsData={repairTypesOptionsData}
                onChange={handleMultiSelectChange}
              />
            </label>}

          </section>}

          {formData.type === "license" && <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-base">License Date</span>
            </div>
            <input
              name="license_date"
              value={formData.license_date}
              onChange={handleInputChange}
              required
              type="date"
              placeholder="1/12/2023"
              className="input input-bordered w-full max-w-xs"
            />
          </label>}

          {formData.type === "license" && <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-base">City</span>
            </div>
            <input
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              required
              type="text"
              placeholder="Saudi Arabia"
              className="input input-bordered w-full max-w-xs"
            />
          </label>}

          {formData.type === "license" && <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text text-base">Region</span>
            </div>
            <input
              name="region"
              value={formData.region}
              onChange={handleInputChange}
              required
              type="text"
              placeholder="Riyadh"
              className="input input-bordered w-full max-w-xs"
            />
          </label>}

          <button className="btn btn-primary text-accent mt-4 w-full max-w-xs">Send</button>
        </form>
      </section>
    </section>
  );
}
