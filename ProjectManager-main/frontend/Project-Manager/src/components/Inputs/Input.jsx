import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div>
      <label className='text-[18px] text-slate-800'>{label}</label>
      <div className='input-box'>
        <input
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          className='w-full bg-transparent outline-none'
          value={value}
          onChange={e => onChange(e)}
        />
        {type === 'password' && (
          showPassword ? (
            <FaRegEyeSlash
              size={22}
              className='cursor-pointer'
              onClick={toggleShowPassword}
            />
          ) : (
            <FaRegEye
              size={22}
              className='cursor-pointer'
              onClick={toggleShowPassword}
            />
          )
        )}
      </div>
    </div>
  )
}

export default Input