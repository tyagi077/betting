import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Update() {

    const { page, id } = useParams()

    const [form, setForm] = useState({})
    const [category, setCategory] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setTimeout(() => setMessage(''), 1000)
    }, [message]);



    const fetchData = async () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/game/display.php`)
            .then((res) => setCategory(res.data))
            .catch((err) => console.log(err));

        if (page === 'cpdigit') {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/cp_digits/display.php`)
                .then(res => { setMessage(res.data.message); setForm(res.data.filter(cat => cat.id === id)[0]) })
                .catch(err => console.log(err))
        }
        else if (page === 'winning') {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/winninggame/fetch.php`)
                .then(res => { setMessage(res.data.message); setForm(res.data.filter(cat => cat.id === id)[0]) })
                .catch(err => console.log(err))
        }

        else if (page === 'slider') {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/slider/display.php`)
                .then(res => { setMessage(res.data.message); setForm(res.data.filter(cat => cat.id === id)[0]) })
                .catch(err => console.log(err))
        }
        else if (page === 'slot') {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/slot/display.php`)
                .then(res => { setMessage(res.data.message); setForm(res.data.filter(cat => cat.id === id)[0]) })
                .catch(err => console.log(err))
            console.log(form)
        }
        else if (page === 'game') {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/game/display.php`)
                .then(res => { setMessage(res.data.message); setForm(res.data.filter(cat => cat.id === id)[0]) })
                .catch(err => console.log(err))
        }
        else if (page === 'news') {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/news/display.php`)
                .then(res => { setMessage(res.data.message); setForm(res.data.filter(cat => cat.id === id)[0]) })
                .catch(err => console.log(err))
        }
        else if (page === 'manage') {
            axios.post(`${import.meta.env.VITE_BACKEND_URL}/manage/display.php`)
                .then(res => { setMessage(res.data.message); setForm(res.data.filter(cat => cat.id === id)[0]) })
                .catch(err => console.log(err))
        }

    };

    const submit = () => {
        const formData = new FormData();
        formData.append('submit', '1');

        if (page === 'cpdigit') {
            formData.append('digit', form.digit);
            formData.append('status', form.status);

            axios.post(`${import.meta.env.VITE_BACKEND_URL}/cp_digits/update.php?updateid=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(res => { setMessage(res.data.message) })
                .catch(err => console.log(err))
        }
        else if (page === 'winning') {

            formData.append('category', form.category);
            formData.append('type', form.type);
            formData.append('calculation', form.calculation);
            formData.append('value', form.value);

            axios.post(`${import.meta.env.VITE_BACKEND_URL}/winninggame/update.php?updateid=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(res => { setMessage(res.data.message) })
                .catch(err => console.log(err))
        }
        else if (page === 'slider') {
            if (form.image) {
                formData.append('image', form.image);
            }
            formData.append('title', form.title);
            formData.append('status', form.status);

            axios.post(`${import.meta.env.VITE_BACKEND_URL}/slider/update.php?updateid=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(res => { setMessage(res.data.message) })
                .catch(err => console.log(err))
        }
        else if (page === 'slot') {
            formData.append('time_start', form.time_start);
            formData.append('time_end', form.time_end);
            formData.append('category', form.category);
            formData.append('status', form.status);

            axios.post(`${import.meta.env.VITE_BACKEND_URL}/slot/update.php?updateid=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(res => { setMessage(res.data.message) })
                .catch(err => console.log(err))
            console.log(form)
        }
        else if (page === 'game') {
            if (form.image) {
                formData.append('image', form.image);
            }
            formData.append('ename', form.ename);
            formData.append('bname', form.bname);
            formData.append('label', form.label);
            formData.append('status', form.status);

            axios.post(`${import.meta.env.VITE_BACKEND_URL}/game/update.php?updateid=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(res => { setMessage(res.data.message); console.log(res.data); console.log(form) })
                .catch(err => console.log(err))
        }
        else if (page === 'news') {
            formData.append('title', form.title);
            formData.append('descr', form.descr);

            axios.post(`${import.meta.env.VITE_BACKEND_URL}/news/update.php?updateid=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(res => { setMessage(res.data.message) })
                .catch(err => console.log(err))
        }
        else if (page === 'manage') {
            formData.append('name', form.name);
            formData.append('category', form.category);
            formData.append('time_start', form.time_start);
            formData.append('time_end', form.time_end);
            formData.append('status', form.status);
            if(form.image)
                formData.append('image', form.image);

                console.log(form)

            axios.post(`${import.meta.env.VITE_BACKEND_URL}/manage/update.php?updateid=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(res => { setMessage(res.data.message); console.log(res.data) })
            .catch(err => console.log(err))
        }

    }

    const handleChange = (e) => {
        if (e.target.type !== 'file')
            setForm({ ...form, [e.target.name]: e.target.value })
        else
            setForm({ ...form, [e.target.name]: e.target.files[0] })
    }

    return (
        <div className='flex flex-col gap-4 text-white'>
            {
                page === 'cpdigit' &&
                <h1 className='text-3xl  font-semibold'>CP Digits</h1>
            }
            {
                page === 'winning' &&
                <h1 className='text-3xl  font-semibold'>Winning Price</h1>
            }
            {
                page === 'slider' &&
                <h1 className='text-3xl  font-semibold'>Slider</h1>
            }
            {
                page === 'slot' &&
                <h1 className='text-3xl  font-semibold'>Slot</h1>
            }
            {
                page === 'game' &&
                <h1 className='text-3xl  font-semibold'>game name</h1>
            }
            {
                page === 'news' &&
                <h1 className='text-3xl  font-semibold'>News Board</h1>
            }
            {
                page === 'manage' &&
                <h1 className='text-3xl  font-semibold'>Manage Game</h1>
            }

            <div className="bg-[#0e1726] py-3 px-5 rounded-lg ">

                <div className="flex flex-col gap-4 w-full md:w-[70%] xl:w-[30%]">

                    {
                        page === 'cpdigit' &&
                        <>
                            <div className="flex flex-col gap-2">
                                <p>Digit</p>
                                <input type="number" value={form?.digit || ''} onChange={handleChange} placeholder="Enter Digit" name="digit" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p>Status</p>
                                <select name="status" value={form?.status || ''} onChange={handleChange} className="bg-[#1A1B2D] py-1 px-3">
                                    <option value={""}>Choose...</option>
                                    <option value='active'>active</option>
                                    <option value='in-active'>in-active</option>
                                </select>
                            </div>
                        </>
                    }

                    {
                        page === 'winning' &&
                        <>
                            <div className="flex flex-col gap-2">
                                <p>category</p>
                                <select name="category" value={form?.category || ''} onChange={handleChange} className="bg-[#1A1B2D] py-1 px-3">
                                    <option value={""}>Choose...</option>
                                    {category?.map((cat, index) => (
                                        <option key={index} value={cat?.ename}>
                                            {cat?.ename}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p>Type</p>
                                <input type="text" value={form?.type || ''} onChange={handleChange} placeholder="Enter Type" name="type" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p>Calculation Type</p>
                                <select name="calculation" value={form?.calculation} onChange={handleChange} className="bg-[#1A1B2D] py-1 px-3">
                                    <option value="">Choose...</option>
                                    <option value="multiply">Multiply</option>
                                    <option value="percentge">Percentage</option>
                                </select>                        </div>
                            <div className="flex flex-col gap-2">
                                <p>Value</p>
                                <input type="number" name="value" value={form?.value || ''} onChange={handleChange} placeholder="Enter Value" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>
                        </>
                    }
                    {
                        page === 'slider' &&
                        <>
                            <div className="flex flex-col gap-2">
                                <p>Image</p>
                                <img src={form?.link} alt="" className='w-[16rem] my-2 h-[8rem] object-cover ' />
                                <input type="file" onChange={handleChange} name="image" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <p>Title</p>
                                <input type="text" value={form?.title || ''} onChange={handleChange} placeholder="Enter Title" name="title" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <p>Status</p>
                                <select name="status" value={form?.status || ''} onChange={handleChange} className="bg-[#1A1B2D] py-1 px-3">
                                    <option value={""}>Choose...</option>
                                    <option value='active'>active</option>
                                    <option value='in-active'>in-active</option>
                                </select>
                            </div>
                        </>
                    }
                    {
                        page === 'slot' &&
                        <>
                            <div className="flex flex-col gap-2">
                                <p>category</p>
                                <select name="category" value={form?.category || ''} onChange={handleChange} className="bg-[#1A1B2D] py-1 px-3">
                                    <option value={""}>Choose...</option>
                                    {category?.map((cat, index) => (
                                        <option key={index} value={cat?.ename}>
                                            {cat?.ename}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p>Start Time</p>
                                <input type="time" value={form?.time_start || ''} onChange={handleChange} placeholder="Enter Start Time" name="time_start" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p>End Time</p>
                                <input type="time" value={form?.time_end || ''} onChange={handleChange} placeholder="Enter End Time" name="time_end" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p>Status</p>
                                <select name="status" value={form?.status || ''} onChange={handleChange} className="bg-[#1A1B2D] py-1 px-3">
                                    <option value={""}>Choose...</option>
                                    <option value='active'>active</option>
                                    <option value='in-active'>in-active</option>
                                </select>
                            </div>
                        </>
                    }
                    {
                        page === 'game' &&
                        <>
                            <div className="flex flex-col gap-2">
                                <p>Image</p>
                                <img src={form?.image} alt="" className='w-[16rem] my-2 h-[8rem] object-cover ' />
                                <input type="file" onChange={handleChange} name="image" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <p>Category</p>
                                <input type="text" value={form?.ename || ''} onChange={handleChange} placeholder="Enter Category" name="ename" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <p>Bname</p>
                                <input type="text" value={form?.bname || ''} onChange={handleChange} placeholder="Enter Bname" name="bname" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <p>Label</p>
                                <input type="text" value={form?.label || ''} onChange={handleChange} placeholder="Enter Label" name="label" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <p>Status</p>
                                <select name="status" value={form?.status || ''} onChange={handleChange} className="bg-[#1A1B2D] py-1 px-3">
                                    <option value={""}>Choose...</option>
                                    <option value='active'>active</option>
                                    <option value='in-active'>in-active</option>
                                </select>
                            </div>
                        </>
                    }
                    {
                        page === 'news' &&
                        <>
                            <div className="flex flex-col gap-2">
                                <p>Title</p>
                                <input type="text" value={form?.title || ''} onChange={handleChange} placeholder="Enter Title" name="title" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <p>description</p>
                                <input type="text" value={form?.descr || ''} onChange={handleChange} placeholder="Enter Descr" name="descr" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>
                        </>
                    }
                    {
                        page === 'manage' &&
                        <>
                            <div className="flex flex-col gap-2">
                                <p>Image</p>
                                <img src={form?.image} alt="" className='w-[16rem] my-2 h-[8rem] object-cover ' />
                                <input type="file" onChange={handleChange} name="image" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <p>category</p>
                                <select name="category" value={form?.category || ''} onChange={handleChange} className="bg-[#1A1B2D] py-1 px-3">
                                    <option value={""}>Choose...</option>
                                    {category?.map((cat, index) => (
                                        <option key={index} value={cat?.ename}>
                                            {cat?.ename}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p>Name</p>
                                <input type="text" value={form?.name || ''} onChange={handleChange} placeholder="Enter Name" name="name" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <p>Start Time</p>
                                <input type="time" value={form?.time_start || ''} onChange={handleChange} placeholder="Enter time_start" name="time_start" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>
                            
                            <div className="flex flex-col gap-2">
                                <p>End Time</p>
                                <input type="time" value={form?.time_end || ''} onChange={handleChange} placeholder="Enter time_end" name="time_end" className="bg-[#1A1B2D] py-1 px-3" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <p>Status</p>
                                <select name="status" value={form?.status || ''} onChange={handleChange} className="bg-[#1A1B2D] py-1 px-3">
                                    <option value={""}>Choose...</option>
                                    <option value='active'>active</option>
                                    <option value='in-active'>in-active</option>
                                </select>
                            </div>
                        </>
                    }

                    <button className="btn btn2 m-0" onClick={submit}>Submit</button>

                    {message && <p className=''>{message}</p>}
                </div>

            </div>
        </div >
    )
}

export default Update
