import axios from "axios";
import { useEffect, useState } from "react";

export default function MultiSelectDropdown({optionsData, formFieldName, onChange, formName, requestMadeStatus}) {
    const [selectedOptions, setSelectedOptions] = useState([]);
    console.log(selectedOptions, formFieldName)

    const handleSelectedOptionsAfterRequest = () => {
        if (requestMadeStatus) {
            setSelectedOptions([])
        }
    }

    useEffect(() => {
        handleSelectedOptionsAfterRequest()
    }, [requestMadeStatus])

    const handleChange = (e) => {
        const isChecked = e.target.checked
        const option = e.target.value

        const selectedOptionSet = new Set(selectedOptions)

        if (isChecked) {
            selectedOptionSet.add(option)
        } else {
            selectedOptionSet.delete(option)
        }

        const newSelectedOptions = Array.from(selectedOptionSet)

        setSelectedOptions(newSelectedOptions)

        onChange(newSelectedOptions, formName)
    }

    const options = optionsData.map((option, i) => {
        return (
            <li key={option.id} className="">
                <label className="flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-primary [&:has(input:checked)]:bg-primary">
                    <input type="checkbox" checked={+option.id === +selectedOptions[selectedOptions.indexOf(option.id.toString())]} name={formFieldName.toLowerCase().split('').filter(e => e !== ' ').join('')} value={option.id} onChange={handleChange} className="cursor-pointer checkbox checkbox-secondary border-neutral" />
                    <span className="ms-3 text-sm">{option.name}</span>
                </label>
            </li>
        )
    })

    return (
      <label className="relative">
        <input type="checkbox" className="hidden peer" />
  
        <div className="cursor-pointer border p-2 border-neutral-600 bg-base-100 rounded-[0.4rem] after:content-['▼'] after:text-xs after:ms-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform">
          {formFieldName}
        </div>
  
        <div className="absolute z-30 bg-base-100 border border-neutral rounded-[0.5rem] p-2 transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto">
            <ul>
                {options}
            </ul>
        </div>
      </label>
    );
  }