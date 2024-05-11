import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import './Table.css'
import { search } from '../assets';

function BetHistory() {

    let [data, setData] = useState([]);
    let [filteredData, setFilteredData] = useState([]);
    const [category, setCategory] = useState([])
    const [amount, setAmount] = useState({})

    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(10)

    let newData = [...filteredData]

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {

        let newAmount = {
            single_win: 0,
            total_single: 0,
            patti_win: 0,
            total_patti: 0,
            jodi_win: 0,
            total_jodi: 0,
            cp_win: 0,
            total_cp: 0,
        }

        filteredData?.forEach((obj) => {
            newAmount.single_win += parseInt(obj.single_win);
            newAmount.total_single += parseInt(obj.single_win);
            newAmount.patti_win += parseInt(obj.patti_win);
            newAmount.total_patti += parseInt(obj.patti_win);
            newAmount.jodi_win += parseInt(obj.jodi_win);
            newAmount.total_jodi += parseInt(obj.jodi_win);
            newAmount.cp_win += parseInt(obj.cp_win);
            newAmount.total_cp += parseInt(obj.cp_win);
        });

        setAmount(newAmount);

    }, [filteredData]);

    const fetchData = async () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/report/fetch.php`)
            .then(res => { setData(res.data);;console.log(res.data) })
            .catch(err => console.log(err))

        axios.get(`${import.meta.env.VITE_BACKEND_URL}/game/display.php`)
            .then(res => { setCategory(res.data) })
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
        let filterValue = document.getElementById('categorySelect').value?.trim()?.toUpperCase();
        let todayDate = document.getElementById('todayDate').value;

        if (filterValue || todayDate) {
            let filtered = data.filter(cat => {
                const categoryMatch = !filterValue || cat.category?.toUpperCase().includes(filterValue?.toUpperCase());
                if (todayDate) {
                    const dateMatch = (cat.date === todayDate)
                    return categoryMatch && dateMatch;
                }
                else {
                    return categoryMatch
                }
            });
            if (filtered.length > 0) {
                setFilteredData(filtered);
                setStartIndex(0)
            } else {
                document.querySelectorAll('#tableBody tr').forEach(tr => {
                    tr.style.display = 'none';
                });
                setFilteredData([]);
                setStartIndex(0)
            }
        } else {
            document.querySelectorAll('#tableBody tr').forEach(tr => {
                tr.style.display = '';
            });
            setStartIndex(0)
            setFilteredData([]);
        }
    };

    const handleRowsPerPageChange = (e) => {
        setStartIndex(0)
        setEndIndex(parseInt(e.target.value));
    };

    return (
        <div className='flex flex-col text-white gap-8'>
            <h1 className='text-3xl font-semibold'>Bet History</h1>

            <div className="bg-[#0e1726] py-3 px-5 ">

                <div className="filterData flex flex-col gap-6 md:w-[70%] xl:w-[50%]">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col gap-2">
                            <p>category</p>
                            <select name="category" id="categorySelect" onChange={(e) => (e.target.value)} className='bg-[#1A1B2D] py-1 px-3 w-[10rem]'>
                                <option value={''}>Choose...</option>
                                {
                                    category?.map((cat, index) => (
                                        <option key={index} value={cat?.ename}>{cat?.ename}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Date</p>
                            <input type="date" id="todayDate" className='bg-[#1A1B2D] py-1 px-3' />
                        </div>

                    </div>
                </div>

                <div className="w-full flex justify-end">
                    <div onClick={handleFilter} className='bg-[#2E4D6D] cursor-pointer w-max px-3 py-2 rounded-lg flex items-center'>
                        <div className="w-6 h-6 bg-transparent">
                            <img src={search} className='w-full h-full object-cover' alt="" />
                        </div>
                        <p>Search</p>
                    </div>
                </div>
            </div>
            {
                newData?.length > 0 &&
                <>
                    <div className="flex items-center gap-2">
                        <p>Showing</p>
                        <select name="" id="" onChange={handleRowsPerPageChange} className='text-[#2E4D6D]'>
                            {
                                Array.from({ length: Math.ceil(data.length / 10) }, (_, index) => (
                                    <option key={index} value={(index + 1) * 10}>{(index + 1) * 10}</option>
                                ))
                            }
                        </select>
                        <p>entries</p>
                    </div>

                    <div className="table-container">
                        <table className="data-table" id="dataTable">
                            <thead>
                                <tr className='uppercase'>
                                    <th onClick={() => sortTable(0)}>id</th>
                                    <th onClick={() => sortTable(1)}>single</th>
                                    <th onClick={() => sortTable(2)}>total single(₹)</th>
                                    <th onClick={() => sortTable(3)}>patti</th>
                                    <th onClick={() => sortTable(4)}>total patti(₹)</th>
                                    <th onClick={() => sortTable(5)}>jodi</th>
                                    <th onClick={() => sortTable(6)}>total jodi(₹)</th>
                                    <th onClick={() => sortTable(7)}>cp</th>
                                    <th onClick={() => sortTable(8)}>total cp(₹)</th>
                                </tr>

                            </thead>

                            <tbody id="tableBody">
                                {
                                    newData?.splice(startIndex, endIndex).map((obj, index) => (
                                        <tr key={index}>
                                            <td>{obj?.id}</td>
                                            <td>{obj?.single_win}</td>
                                            <td>{obj?.single_win}</td>
                                            <td>{obj?.patti_win}</td>
                                            <td>{obj?.patti_win}</td>
                                            <td>{obj?.jodi_win}</td>
                                            <td>{obj?.jodi_win}</td>
                                            <td>{obj?.cp_win}</td>
                                            <td>{obj?.cp_win}</td>
                                        </tr>
                                    ))
                                }

                            </tbody>
                            <thead>
                                <tr className='uppercase'>
                                    <td>Total:</td>
                                    <td></td>
                                    <td>Rs.{amount.single_win?.toFixed(2)}</td>
                                    <td></td>
                                    <td>Rs.{amount.patti_win?.toFixed(2)}</td>
                                    <td></td>
                                    <td>Rs.{amount.jodi_win?.toFixed(2)}</td>
                                    <td></td>
                                    <td>Rs.{amount.cp_win?.toFixed(2)}</td>
                                </tr>
                            </thead>
                        </table>
                    </div>

                    <div className="flex items-center gap-1 w-full justify-end pt-6 text-white">
                        <p className='px-2 bg-[#2E4D6D] cursor-pointer ' onClick={() => { startIndex !== 0 ? setStartIndex(startIndex - endIndex) : 0 }}>Previous</p>
                        {
                            Array.from({ length: Math.ceil(filteredData?.length / endIndex) }, (_, index) => (
                                <p key={index} className='px-2 bg-[#2E4D6D] cursor-pointer ' onClick={() => { setStartIndex(index * endIndex) }}>{index + 1}</p>
                            ))
                        }
                        <p className='px-2 bg-[#2E4D6D] cursor-pointer ' onClick={() => { startIndex !== (Math.ceil(filteredData?.length / endIndex) - 1) * endIndex ? setStartIndex(startIndex + endIndex) : 0 }}>Next</p>
                    </div>
                </>
            }

        </div>
    );
}

export default BetHistory;