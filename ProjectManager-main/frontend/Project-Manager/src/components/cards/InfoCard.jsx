import React from 'react'

const InfoCard = ({ icon, label, value }) => {
  return (
    <div className='flex items-center gap-2 mt-3'>
      <div className="text-xs md:text-[14px] text-gray-500">
        <span className='text md:text -[15px] text-black font-semibold'>{value}</span>
        {icon}
      </div>
      <h4 className='text-[15px] md:text-[18px] font-medium text-gray-950'>- {label}</h4>
    </div>
  )
}

export default InfoCard
