import React from 'react'
import { LuChevronDown } from 'react-icons/lu'

const SelectDropdown = ({options,value,onChange,placeholder}) => {
 const [isOpen, setIsOpen] = React.useState(false);
 const handleSelect = (option) => {
   onChange(option);
   setIsOpen(false);
 };

 return (
  <div className="relative max-w-3xs mt-4">
    <label className="text-sm font-medium text-gray-700 mb-1 block">Priority</label>
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-full text-sm text-gray-900 bg-white border border-gray-300 px-3 py-2 rounded-md flex justify-between items-center shadow-sm"
    >
      {value
        ? options.find((opt) => opt.value === value)?.label
        : placeholder}
      <span className="ml-2">
        {isOpen ? <LuChevronDown className="rotate-180 transition-transform" /> : <LuChevronDown />}
      </span>
    </button>

    {/* Dropdown Menu */}
    {isOpen && (
      <div className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 shadow-md z-10">
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            {option.label}
          </div>
        ))}
      </div>
    )}
  </div>
);

}

export default SelectDropdown