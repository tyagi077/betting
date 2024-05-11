import React from 'react'

function DashboardCard({number,title,desc,color}) {
  return (
    <div className='flex flex-col gap-4 text-white p-2 rounded-lg' style={{backgroundColor:color}}>
        <p className='font-bold text-4xl'>{number}</p>
        <p>{title}</p>
        <div className="w-full text-center" style={{backgroundColor:`darken(${color},5%)`}}>
            <p className='text-xs'>{desc}</p>
        </div>
    </div>
  )
}

export default DashboardCard
