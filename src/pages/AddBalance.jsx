
import React, { useState } from 'react'
import Input from '../components/Input'
import axios from 'axios'

function AddBalance() {

  const [form, setForm] = useState({})
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = () => {
    if(form.balance && form.phone ){

      const formData = new FormData();
      
      formData.append('balance', form.balance);
      formData.append('phone', parseInt(form.phone,10));
      
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/balance/addbalance.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        let newMsg = '';
        if(res.data.status==='success'){
          newMsg=`Updated balance in ${res.data.username}'s account : ${res.data.balance} `;
        }
        else{
          newMsg=res.data.message;
        }
        setMessage(newMsg)
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
        <h1 className='text-3xl text-white font-semibold'>Add Balance</h1>
        <Input handleChange={handleChange} name="phone" label="Phone No." />
        <Input handleChange={handleChange} name="balance" placeholder={"Balance Amount"} type="number" label="Balance Amount" />
        <button onClick={submit} className='bg-[#2E4D6D] text-white w-max px-3 py-2 rounded-lg '>Submit</button>
      </div>
      {message && <p className='py-4'>{message}</p>}

    </div>
  )
}

export default AddBalance
