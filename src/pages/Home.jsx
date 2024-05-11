import React, { useEffect, useState } from 'react'
import DashboardCard from '../components/DashboardCard'
import axios from 'axios'

function Home() {

  const [data,setData]=useState([])

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/account/display.php`)
      .then(res => setData(res.data))
      .catch(err => console.log(err))
    // setData(response.data);

  }, [])

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <DashboardCard color="#3497DB" desc="More Info" title="Users" number={data.length || 0} />
        <DashboardCard color="#00BC8C" desc="Total Pending" title="Withdraw Request" number={2822} />
        <DashboardCard color="#F39C11" desc="Total Pending" title="Balance Request" number={10282} />
        <DashboardCard color="#E84C3D" desc="More Info" title="Total Wallet Balance" number={67867.4} />
      </div>
    </div>
  )
}

export default Home
