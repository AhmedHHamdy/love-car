import { useContext, useEffect, useState } from "react";
import MultiSelectDropdown from "../../components/MultiSelectDropdown";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthProvider";
import Select from "react-dropdown-select";
import { components } from "react-select";
import { default as ReactSelect } from "react-select";
import LinksContext from "../../context/storeLinks";
import { FaWhatsapp } from "react-icons/fa";

export default function Maintenance() {
  const location = useLocation()

  const [selectedOilOptions, setSelectedOilOptions] = useState([]);
  const [selectedFrameOptions, setSelectedFrameOptions] = useState([]);
  const [selectedConsumerPartOptions, setSelectedConsumerPartOptions] = useState([]);
  const [selectedBrakeOptions, setSelectedBrakesOptions] = useState([]);
  const [selectedRepairTypeOptions, setSelectedRepairTypeOptions] = useState([]);


  // console.log(selectedOilOptions, selectedFrameOptions, selectedConsumerPartOptions, selectedBrakeOptions, selectedRepairTypeOptions)

  const [formData, setFormData] = useState({
    type: "maintenance",
    model: "",
    year: "",
    description: "",
    notes: "",
    oils: [],
    frames: [],
    brakes: [],
    consumerParts: [],
    repairTypes: [],
  });

  const handleOilsChange = (values) => {
    setSelectedOilOptions(values)
    setFormData({...formData, oils: values.map((option) => option.id)})
  }

  const handleFramesChange = (values) => {
    setSelectedFrameOptions(values)
    setFormData({...formData, frames: values.map((option) => option.id)})
  }

  const handleConsumerPartsChange = (values) => {
    setSelectedConsumerPartOptions(values)
    setFormData({...formData, consumerParts: values.map((option) => option.id)})
  }

  const handleBrakesChange = (values) => {
    setSelectedBrakesOptions(values)
    setFormData({...formData, brakes: values.map((option) => option.id)})
  }

  const handleRepairTypesChange = (values) => {
    setSelectedRepairTypeOptions(values)
    setFormData({...formData, repairTypes: values.map((option) => option.id)})
  }

  const { token } = useAuth()

  const [loadingStatus, setLoadingStatus] = useState(true)
  const [loadingError, setLoadingError] = useState(null)

  const [maintenanceOptionsData, setMaintenanceOptionsData] = useState(null)

  const [requestMadeStatus, setRequestMadeStatus] = useState(false)


  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const { storeLinks } = useContext(LinksContext);

  const { t, i18n } = useTranslation()

  // console.log(formData)
  // console.log(maintenanceOptionsData)

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_API_URL}/carOrders`, {
            headers: {
              Authorization: `Bearer ${token}`
            },
          })
          .then(res => {
            setLoadingStatus(false)
            // console.log(res)
            setMaintenanceOptionsData(res.data.data)
          })
          .catch(err => {
            setLoadingStatus(false)
            // console.log(err); // Log any errors that occur
            setLoadingError(err.message)
          })
  }, [])

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
      let arr = ["type", "model", "year", "description", "notes", "oils", "frames", "brakes", "consumerParts", "repairTypes"]
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

    } 

    for (const pair of formServicesData.entries()) {
      // console.log(`${pair[0]}, ${pair[1]}`);
    }

    setRequestMadeStatus(false)

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/carOrders`, formServicesData)
      const data = await response.data.data
      // console.log(response)
      // console.log(data)
      setSuccess(true)
      setRequestMadeStatus(true)
      setTimeout(() => {
        setSuccess(false)
      }, 4000)
      setFormData({
        type: "maintenance",
        model: "",
        year: "",
        description: "",
        notes: "",
        oils: [],
        frames: [],
        brakes: [],
        consumerParts: [],
        repairTypes: [],
      })
      setSelectedOilOptions([])
      setSelectedFrameOptions([])
      setSelectedConsumerPartOptions([])
      setSelectedBrakesOptions([])
      setSelectedRepairTypeOptions([])
    } catch (err) {
      // console.log(err)
      setError(err.message)
      setTimeout(() => {
        setError(null)
      }, 4000)
      setFormData({
        type: "maintenance",
        model: "",
        year: "",
        description: "",
        notes: "",
        oils: [],
        frames: [],
        brakes: [],
        consumerParts: [],
        repairTypes: [],
      })
      setSelectedOilOptions([])
      setSelectedFrameOptions([])
      setSelectedConsumerPartOptions([])
      setSelectedBrakesOptions([])
      setSelectedRepairTypeOptions([])
    }
    
  }

  if (loadingStatus) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-secondary">
        <span className="loading loading-ring loading-lg bg-primary"></span>
      </div>
    )
  }

  
  if (loadingError) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-secondary">
        <h1 className="bg-red-900 text-accent text-center uppercase rounded-lg p-4 text-lg">{loadingError} <br/> Please refresh</h1>
      </div>
    )
  }

  const itemRenderer = ({ item, itemIndex, props, state, methods }) => (
    <div className="bg-base-100" key={item[props.valueField]} onClick={() => methods.addItem(item)}>
      <div className="flex items-center bg-secondary p-2 rounded-xl" style={{ margin: "10px" }}>
        <input type="checkbox" className="cursor-pointer checkbox checkbox-primary border-neutral" checked={methods.isSelected(item)} />
        &nbsp;&nbsp;&nbsp;{item[props.labelField]}
      </div>
    </div>
  );

  const Option = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
            className="cursor-pointer checkbox checkbox-secondary border-neutral"
          />{" "}
          <label className="cursor-pointer">{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const customStyles = {
    // You can style different components of ReactSelect using the following keys:
    control: (provided, state) => ({
      // Styles for the outer container
      ...provided,
      // borderColor: state.isFocused ? '#5a5a5a' : '#ccc',
      // borderColor: state.isHovered ? 'red' : 'red',
      boxShadow: state.isFocused ? '0 0 0 1px #5a5a5a' : 'none',
      background: "#1E1E1E",
      padding: "0",
      '&:hover': {
        borderColor: '#D91C0B',
      },
      borderColor: '#555555',
    }),
    option: (provided, state) => ({
      // Styles for each option
      ...provided,
      backgroundColor: state.isSelected ? '#D91C0B' : '#1E1E1E',
      color: state.isSelected ? 'white' : 'white',
      display: "flex",
      
      gap: "0.5rem"
    }),
    multiValue: (provided) => ({
      // Styles for the selected value(s)
      ...provided,
      backgroundColor: '#D91C0B',
      color: "white"
    }),
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      color: "white",
    }),
    menuList: (provided) => ({
      ...provided,
      paddingTop: 0,
      paddingBottom: 0,
    }),
  };


  return (
    <section className="bg-secondary p-10 min-h-screen">
      <section className="w-9/12 mx-auto flex flex-col justify-center items-center 2xl:max-w-[1800px] 2xl:mx-auto">
        <h1 className="text-center text-3xl">{t("Maintenance")}</h1>

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
            >
              <option disabled value="">Type</option>
              <option value="maintenance">maintenance</option>
            </select>
          </label> */}

          <label className="form-control col-span-6">
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

          <label className="form-control w-full max-w-full mb-1 col-span-12">
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

          <label className="form-control w-full max-w-full col-span-12">
            <div className="label">
              <span className="label-text text-base">{t("Notes")}</span>
            </div>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              placeholder="Notes"
              className="textarea textarea-bordered h-24"
              required
            />
          </label>

          <label className="form-control w-full max-w-full col-span-6"> 
            <div className="label">
              <span className="label-text text-base">{t("Oils")}</span>
            </div>
            {/* <Select  values={selectedOilOptions} defaultValue={selectedOilOptions} itemRenderer={itemRenderer} dropdownGap={6} direction="rtl" className="bg-base-100 border border-gray-600 form-control w-20 max-w-xs md:self-center" style={{borderColor: "gray", maxWidth: "20rem", background: "#1E1E1E", color: "#fff", borderRadius: "0.4rem"}} placeholder="Oils"  searchable={false} color="#E45A00" options={maintenanceOptionsData.oils} multi labelField="name" valueField="id" name="oils" onChange={handleOilsChange} /> */}

            <ReactSelect
                options={maintenanceOptionsData.oils}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option
                }}
                styles={customStyles}
                onChange={handleOilsChange}
                allowSelectAll={true}
                value={selectedOilOptions}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Oils"
                isSearchable={false}
              />
          </label>

          <label className="form-control w-full max-w-full col-span-6"> 
            <div className="label">
              <span className="label-text text-base">{t("Frames")}</span>
            </div>
            {/* <Select  values={selectedFrameOptions} defaultValue={selectedFrameOptions} itemRenderer={itemRenderer} dropdownGap={6} direction="rtl" className="bg-base-100 border border-gray-600 form-control w-20 max-w-xs md:self-center" style={{borderColor: "gray", maxWidth: "20rem", background: "#1E1E1E", color: "#fff", borderRadius: "0.4rem"}} placeholder="Frames"  searchable={false} color="#E45A00" options={maintenanceOptionsData.frames} multi labelField="name" valueField="id" name="frames" onChange={handleFramesChange} /> */}

            <ReactSelect
                options={maintenanceOptionsData.frames}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option
                }}
                styles={customStyles}
                onChange={handleFramesChange}
                allowSelectAll={true}
                value={selectedFrameOptions}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Frames"
                isSearchable={false}
              />
          </label>

          <label className="form-control w-full max-w-full col-span-6"> 
            <div className="label">
              <span className="label-text text-base">{t("Consumer Parts")}</span>
            </div>
            {/* <Select  values={selectedConsumerPartOptions} defaultValue={selectedConsumerPartOptions} itemRenderer={itemRenderer} dropdownGap={6} direction="rtl" className="bg-base-100 border border-gray-600 form-control w-20 max-w-xs md:self-center" style={{borderColor: "gray", maxWidth: "20rem", background: "#1E1E1E", color: "#fff", borderRadius: "0.4rem"}} placeholder="Consumer Parts"  searchable={false} color="#E45A00" options={maintenanceOptionsData.consumerParts} multi labelField="name" valueField="id" name="consumerParts" onChange={handleConsumerPartsChange} /> */}

            <ReactSelect
                options={maintenanceOptionsData.consumerParts}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option
                }}
                styles={customStyles}
                onChange={handleConsumerPartsChange}
                allowSelectAll={true}
                value={selectedConsumerPartOptions}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Consumer Parts"
                isSearchable={false}
              />
          </label>

          <label className="form-control w-full max-w-full col-span-6"> 
            <div className="label">
              <span className="label-text text-base">{t("Brakes")}</span>
            </div>
            {/* <Select  values={selectedBrakeOptions} defaultValue={selectedBrakeOptions} itemRenderer={itemRenderer} dropdownGap={6} direction="rtl" className="bg-base-100 border border-gray-600 form-control w-20 max-w-xs md:self-center" style={{borderColor: "gray", maxWidth: "20rem", background: "#1E1E1E", color: "#fff", borderRadius: "0.4rem"}} placeholder="Brakes"  searchable={false} color="#E45A00" options={maintenanceOptionsData.brakes} multi labelField="name" valueField="id" name="brakes" onChange={handleBrakesChange} /> */}

            <ReactSelect
                options={maintenanceOptionsData.brakes}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option
                }}
                styles={customStyles}
                onChange={handleBrakesChange}
                allowSelectAll={true}
                value={selectedBrakeOptions}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Brakes"
                isSearchable={false}
              />
          </label>

          <label className="form-control w-full max-w-full col-span-12"> 
            <div className="label">
              <span className="label-text text-base">{t("Repair Types")}</span>
            </div>
            {/* <Select  values={selectedRepairTypeOptions} defaultValue={selectedRepairTypeOptions} itemRenderer={itemRenderer} dropdownGap={6} direction="rtl" className="bg-base-100 border border-gray-600 form-control w-20 max-w-xs md:self-center" style={{borderColor: "gray", maxWidth: "20rem", background: "#1E1E1E", color: "#fff", borderRadius: "0.4rem"}} placeholder="Repair Types"  searchable={false} color="#E45A00" options={maintenanceOptionsData.repairTypes} multi labelField="name" valueField="id" name="repairTypes" onChange={handleRepairTypesChange} /> */}

            <ReactSelect
                options={maintenanceOptionsData.repairTypes}
                isMulti
                closeMenuOnSelect={false}
                hideSelectedOptions={false}
                components={{
                  Option
                }}
                styles={customStyles}
                onChange={handleRepairTypesChange}
                allowSelectAll={true}
                value={selectedRepairTypeOptions}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="Repair Types"
                isSearchable={false}
              />
          </label>

          
          {/* {formData.type === "maintenance" && <section className="flex flex-col gap-4 my-3 md:w-full md:self-center">
            {formData.type === "maintenance" && <label className="form-control w-full max-w-xs md:self-center">
              <MultiSelectDropdown
                formFieldName="Oils"
                formName="oils"
                optionsData={maintenanceOptionsData.oils}
                onChange={handleMultiSelectChange}
                requestMadeStatus={requestMadeStatus}
              />
            </label>}

            {formData.type === "maintenance" && <label className="form-control w-full max-w-xs md:self-center">
              <MultiSelectDropdown
                formFieldName="Frames"
                formName="frames"
                optionsData={maintenanceOptionsData.frames}
                onChange={handleMultiSelectChange}
                requestMadeStatus={requestMadeStatus}
              />
            </label>}

            {formData.type === "maintenance" && <label className="form-control w-full max-w-xs md:self-center">
              <MultiSelectDropdown
                formFieldName="Consumer Parts"
                formName="consumerParts"
                optionsData={maintenanceOptionsData.consumerParts}
                onChange={handleMultiSelectChange}
                requestMadeStatus={requestMadeStatus}
              />
            </label>}

            {formData.type === "maintenance" && <label className="form-control w-full max-w-xs md:self-center">
              <MultiSelectDropdown
                formFieldName="Brakes"
                formName="brakes"
                optionsData={maintenanceOptionsData.brakes}
                onChange={handleMultiSelectChange}
                requestMadeStatus={requestMadeStatus}
              />
            </label>}

            {formData.type === "maintenance" && <label className="form-control w-full max-w-xs md:self-center">
              <MultiSelectDropdown
                formFieldName="Repair Types"
                formName="repairTypes"
                optionsData={maintenanceOptionsData.repairTypes}
                onChange={handleMultiSelectChange}
                requestMadeStatus={requestMadeStatus}
              />
            </label>}

          </section>} */}

          <button className="btn btn-primary text-accent mt-4 w-full max-w-full col-span-12">{t("Send")}</button>
        </form>
      </section>

      <section className={`bg-green-500 fixed h-20 w-20 bottom-10 ${i18n.language == "en" ? "right-10" : "left-10"}  cursor-pointer rounded-full flex items-center justify-center drop-shadow-2xl`}>
         <a href={storeLinks?.socialMedia?.whatsapp} className="" target="_blank"><FaWhatsapp className="text-white text-6xl sm:text-6xl" /></a>
      </section>
    </section>
  );
}
