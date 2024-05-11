
import React, { useState } from 'react'
import Input from '../components/Input'
import axios from 'axios'

function AddAccount() {

  const [form, setForm] = useState({})
  const [message, setMessage] = useState('');


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = () => {
    if(form.name && form.phone && form.password){

      const formData = new FormData();
      
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      formData.append('password', form.password);
      
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/account/add.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        // document.querySelectorAll(".addUser input").forEach(input=>{
        //   input.value=""
        // })
        setMessage(res.data.message);
        setTimeout(() => setMessage(""), 1000);
      })
      .catch(err => console.log(err))
    }
    else{
      setMessage("Enter all details");
      setTimeout(() => setMessage(""), 1000);
    }
    }
    
  return (
    <div className=' w-full'>
      <div className="addUser w-[90%] flex flex-col gap-4">
        <h1 className='text-3xl text-white font-semibold'>Add Account</h1>
        <Input handleChange={handleChange} name="name" label="Full Name" />
        <Input handleChange={handleChange} name="phone" label="Phone No." />
        <Input handleChange={handleChange} name="password" label="Password" />
        <button onClick={submit} className='bg-[#2E4D6D] text-white w-max px-3 py-2 rounded-lg '>Submit</button>
      </div>
      {message && <p className='py-4'>{message}</p>}

    </div>
  )
}

export default AddAccount
