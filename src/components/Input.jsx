import React from 'react'

function Input({label,handleChange,name,type="text",placeholder}) {
  return (
    <div className='flex flex-col gap-2'>
    <div className="">{label}</div>
    <input type={type} className={`bg-[#141A27] border border-slate-400 px-3 py-2 rounded-lg `} name={name} label={label} placeholder={`Enter ${placeholder?placeholder:label}`} onChange={handleChange}  />
    </div>
  )
}

export default Input
