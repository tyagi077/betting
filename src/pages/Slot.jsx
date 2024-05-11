import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import './Table.css'
import { Link } from 'react-router-dom';

function Slot() {
    let [data, setData] = useState([]);
    let [filteredData, setFilteredData] = useState([]);

    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(10)
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        handleFilter();
    }, [inputValue]);
    
    let newData = [...data]

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/slot/display.php`)
            .then(res => {
                setData(res.data);
            })
            .catch(err => console.log(err))
    };

    const sortTable = (columnIndex) => {
        const table = document.getElementById("dataTable");
        let rows, switching, i, x, y, shouldSwitch, direction, switchCount = 0;
        switching = true;
        direction = "asc";
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[columnIndex];
                y = rows[i + 1].getElementsByTagName("TD")[columnIndex];
                if (direction == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (direction == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchCount++;
            } else {
                if (switchCount == 0 && direction == "asc") {
                    direction = "desc";
                    switching = true;
                }
            }
        }
    }

    const handleFilter = () => {
        if (inputValue) {
            let filtered = data.filter(news =>
                news.category.toUpperCase().includes(inputValue.toUpperCase())
            );
            if (filtered.length > 0) {
                setFilteredData(filtered);
                setStartIndex(0)
                setEndIndex(10)
            }
            else {
                document.querySelectorAll('#tableBody tr').forEach(tr => {
                    tr.style.display = 'none'
                })
                setFilteredData([]);
                setStartIndex(0)
                setEndIndex(10)
            }
        }
        else {
            document.querySelectorAll('#tableBody tr').forEach(tr => {
                tr.style.display = ''
            })
            setFilteredData([]);
            setStartIndex(0)
            setEndIndex(10)
        }
    };

    const handleRowsPerPageChange = (e) => {
        setStartIndex(0)
        setEndIndex(parseInt(e.target.value));
    };

    const deleteData = async (id) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/slot/delete.php?deleteid=${id}`);

            setTimeout(() => setMessage(""), 1000);

            setData(data.filter(obj => obj.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const updateData = (index, id) => {

    };

    return (
        <div className='flex flex-col gap-4 text-white'>
            <h1 className='text-3xl  font-semibold'>Slot</h1>

            <div className="bg-[#0e1726] py-3 px-5 rounded-lg ">

            <Link to={`/add/slot`}><button className='btn btn1'><i className="fa-solid fa-plus"></i> Add</button></Link>


                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2 ">
                        <p>Showing</p>
                        <select name="" id="" onChange={handleRowsPerPageChange} className='bg-[#07081C] p-1'>
                            {
                                Array.from({ length: Math.ceil(data.length / 10) }, (_, index) => (
                                    <option key={index} value={(index + 1) * 10}>{(index + 1) * 10}</option>
                                ))
                            }
                        </select>
                        <p>entries</p>
                    </div>
                    <div className="flex items-center ">
                        <button onClick={handleFilter} className=' text-white w-max px-3 py-2 rounded-lg'>Search :</button>
                        <input type="text" onChange={e=>setInputValue(e.target.value)} placeholder="Filter by category..." className='bg-[#07081C] w-[15rem] py-1 px-2 rounded-lg' />
                    </div>

                </div>

                <div className="table-container">

                    <table className="data-table" id="dataTable">
                        <thead>
                            <tr>
                                <th onClick={() => sortTable(0)}>ID</th>
                                <th onClick={() => sortTable(1)}>Start time</th>
                                <th onClick={() => sortTable(2)}>end time</th>
                                <th onClick={() => sortTable(3)}>category</th>
                                <th onClick={() => sortTable(4)}>status</th>
                                <th onClick={() => sortTable(5)}>action</th>
                            </tr>
                        </thead>
                        <tbody id="tableBody">
                            {
                                filteredData?.length === 0 &&
                                newData?.splice(startIndex, endIndex).map((obj, index) => (
                                    <tr key={index}>
                                        <td>{obj.id}</td>
                                        <td>{obj.time_start}</td>
                                        <td>{obj.time_end}</td>
                                        <td>{obj.category}</td>
                                        <td>{obj.status}</td>
                                        <td className="">
                                            <div className="flex gap-3 items-center">
                                            <Link to={`/update/slot/${obj.id}`}><i className="updateFormBtn cursor-pointer hover:text-white text-[#dcdada] fa-regular fa-pen-to-square bg-[#406793] p-2 rounded-lg "></i></Link>
                                                <i onClick={() => deleteData(obj.id)} className="cursor-pointer hover:text-white text-[#dcdada] fa-solid fa-trash bg-[#DA5041] p-2 rounded-lg"></i>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                            {
                                filteredData?.length !== 0 &&
                                filteredData?.splice(startIndex, endIndex).map((obj, index) => (
                                  <tr key={index}>
                                  <td>{obj.id}</td>
                                  <td>{obj.time_start}</td>
                                  <td>{obj.time_end}</td>
                                  <td>{obj.category}</td>
                                  <td>{obj.status}</td>
                                  <td className="">
                                      <div className="flex gap-3 items-center">
                                      <Link to={`/update/slot/${obj.id}`}><i className="updateFormBtn cursor-pointer hover:text-white text-[#dcdada] fa-regular fa-pen-to-square bg-[#406793] p-2 rounded-lg "></i></Link>
                                          <i onClick={() => deleteData(obj.id)} className="cursor-pointer hover:text-white text-[#dcdada] fa-solid fa-trash bg-[#DA5041] p-2 rounded-lg"></i>
                                      </div>
                                  </td>
                              </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center gap-1 w-full justify-end pt-6 text-white">
                    <p className='px-2 bg-[#2E4D6D] cursor-pointer ' onClick={() => { startIndex !== 0 ? setStartIndex(startIndex - endIndex) : 0 }}>Previous</p>
                    {
                        Array.from({ length: Math.ceil(data.length / endIndex) }, (_, index) => (
                            <p key={index} className='px-2 bg-[#2E4D6D] cursor-pointer ' onClick={() => { setStartIndex(index * endIndex) }}>{index + 1}</p>
                        ))
                    }
                    <p className='px-2 bg-[#2E4D6D] cursor-pointer ' onClick={() => { startIndex !== (Math.ceil(data.length / endIndex) - 1) * endIndex ? setStartIndex(startIndex + endIndex) : 0 }}>Next</p>
                </div>
            </div>
        </div>
    );
}

export default Slot;