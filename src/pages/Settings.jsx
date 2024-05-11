import React, { useEffect, useState } from 'react'
import Input from '../components/Input'
import axios from 'axios';

function Settings() {

  let [data, setData] = useState({});
  const [form, setForm] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/setting/fetch.php`)
      .then(res => { setData(res.data) })
      .catch(err => console.log(err))
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleDisableAdmin = (query) => {
    document.querySelectorAll(`.${query} input`).forEach(input => {
      input.disabled = !input.disabled;

      if(input.classList.contains('active'))
        input.classList.remove('active');
      else
        input.classList.add('active');
    });
  }

  const updateAdmin = async (index, id) => {

    const formData = new FormData();

    formData.append('whatsapp',data.whatsapp)
    formData.append('email',data.email)
    formData.append('phonepe',data.phonepe)
    formData.append('paytm',data.paytm)
    formData.append('gpay',data.gpay)
    formData.append('title',data.title)
    formData.append('min',data.min)

    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/setting/update.php`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        setMessage(response.data.message);
        setTimeout(() => setMessage(""), 1000);

        fetchData();

        document.querySelectorAll('input').forEach(input => {
          input.disabled = true;
          input.classList.remove('active');
        });
    } catch (err) {
        console.error(err);
    }


  };

  return (
    <div className='flex flex-col gap-4 text-white'>
      <h1 className='text-3xl text-white font-semibold'>Settings</h1>

      <div className="bg-[#57575760] rounded-lg p-3 ">
        <h1 className='text-xl text-white'>Site Setting</h1>
        <div className="siteSetting grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="flex flex-col gap-3">
            <p>Email</p>
            <input type="text" name="email" placeholder='admin email' value={data.email || ''} disabled onChange={(e) => { data.email = e.target.value; setData({ ...data }) }} className='bg-[#141A27] outline-2 outline-white border border-transparent p-2 rounded-lg' />
          </div>
          <div className="flex flex-col gap-3">
            <p>Whatsapp</p>
            <input type="text" name="whatsapp" placeholder='whatsapp' value={data.whatsapp || ''} disabled onChange={(e) => { data.whatsapp = e.target.value; setData({ ...data }) }} className='bg-[#141A27] outline-2 outline-white border border-transparent p-2 rounded-lg' />
          </div>
          <div className=""></div>
          <div className="w-full flex justify-end items-end gap-4 px-16 pt-4">
            <button onClick={()=>handleDisableAdmin('siteSetting')} className='bg-[#2E4D6D] text-white w-max px-3 py-2 rounded-lg h-max'>Update</button>
            <button onClick={updateAdmin} className='bg-[#2E4D6D] text-white w-max px-3 py-2 rounded-lg h-max'>Save</button>
          </div>


        </div>
      </div>
      
      <div className="bg-[#57575760] rounded-lg p-3 ">
        <h1 className='text-xl text-white'>Deposit Bank Details</h1>
        <div className="deposit grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <div className="flex flex-col gap-3 md:col-span-2">
            <p>title</p>
            <input name="title" placeholder='admin title' value={data.title || ''} disabled onChange={(e) => { data.title = e.target.value; setData({ ...data }) }} className='bg-[#141A27] outline-2 outline-white border border-transparent p-2 rounded-lg' />
          </div>
          <div className="flex flex-col gap-3">
            <p>Minimum deposit</p>
            <input type="text" name="min" placeholder='min' value={data.min || ''} disabled onChange={(e) => { data.min = e.target.value; setData({ ...data }) }} className='bg-[#141A27] outline-2 outline-white border border-transparent p-2 rounded-lg' />
          </div>
          <div className="flex flex-col gap-3">
            <p>paytm</p>
            <input type="text" name="paytm" placeholder='paytm' value={data.paytm || ''} disabled onChange={(e) => { data.paytm = e.target.value; setData({ ...data }) }} className='bg-[#141A27] outline-2 outline-white border border-transparent p-2 rounded-lg' />
          </div>
          <div className="flex flex-col gap-3">
            <p>phonepe</p>
            <input type="text" name="phonepe" placeholder='phonepe' value={data.phonepe || ''} disabled onChange={(e) => { data.phonepe = e.target.value; setData({ ...data }) }} className='bg-[#141A27] outline-2 outline-white border border-transparent p-2 rounded-lg' />
          </div>
          <div className="flex flex-col gap-3">
            <p>gpay</p>
            <input type="text" name="gpay" placeholder='gpay' value={data.gpay || ''} disabled onChange={(e) => { data.gpay = e.target.value; setData({ ...data }) }} className='bg-[#141A27] outline-2 outline-white border border-transparent p-2 rounded-lg' />
          </div>
          <div className=""></div>
          <div className="w-full flex justify-end items-end gap-4 px-16 pt-4">
            <button onClick={()=>handleDisableAdmin('deposit')} className='bg-[#2E4D6D] text-white w-max px-3 py-2 rounded-lg h-max'>Update</button>
            <button onClick={updateAdmin} className='bg-[#2E4D6D] text-white w-max px-3 py-2 rounded-lg h-max'>Save</button>
          </div>

        </div>
      </div>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Settings
