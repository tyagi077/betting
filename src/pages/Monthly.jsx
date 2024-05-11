import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import './Table.css'
import { search } from '../assets';

function Monthly() {
    const [data, setData] = useState([]);
    let [filteredData, setFilteredData] = useState([]);
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState([])
    const [amount, setAmount] = useState({})

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {

        let newAmount = {
            single_win: 0,
            total_single: 0,
            total_win_single: 0,
            patti_win: 0,
            total_patti: 0,
            total_win_patti: 0,
            jodi_win: 0,
            total_jodi: 0,
            total_win_jodi: 0,
            cp_win: 0,
            total_cp: 0,
            total_win_cp: 0,
        }

        filteredData?.forEach((obj) => {
            newAmount.single_win += parseInt(obj.single_win);
            newAmount.total_single += parseInt(obj.single_win);
            newAmount.total_win_single += parseInt(obj.single_win);
            newAmount.patti_win += parseInt(obj.patti_win);
            newAmount.total_patti += parseInt(obj.patti_win);
            newAmount.total_win_patti += parseInt(obj.patti_win);
            newAmount.jodi_win += parseInt(obj.jodi_win);
            newAmount.total_jodi += parseInt(obj.jodi_win);
            newAmount.total_win_jodi += parseInt(obj.jodi_win);
            newAmount.cp_win += parseInt(obj.cp_win);
            newAmount.total_cp += parseInt(obj.cp_win);
            newAmount.total_win_cp += parseInt(obj.cp_win);
        });

        setAmount(newAmount);


    }, [filteredData]);

    const fetchData = async () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/report/fetch.php`)
            .then(res => { setData(res.data) })
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
        let fromDate = document.getElementById('fromDate').value;
        let toDate = document.getElementById('toDate').value;

        if (filterValue || fromDate || toDate) {
            let filtered = data.filter(cat => {
                const categoryMatch = !filterValue || cat.category?.toUpperCase().includes(filterValue?.toUpperCase());
                if (fromDate && toDate) {
                    const dateMatch = (cat.date >= fromDate) && (cat.date <= toDate)
                    return categoryMatch && dateMatch;
                }
                else if (fromDate && !toDate) {
                    const dateMatch = (cat.date >= fromDate)
                    return categoryMatch && dateMatch;
                }
                else {
                    return categoryMatch
                }
            });
            if (filtered.length > 0) {
                setFilteredData(filtered);
            } else {
                document.querySelectorAll('#tableBody tr').forEach(tr => {
                    tr.style.display = 'none';
                });
                setFilteredData([]);
            }
        } else {
            document.querySelectorAll('#tableBody tr').forEach(tr => {
                tr.style.display = '';
            });
            setFilteredData([]);
        }
    };

    return (
        <div className='flex flex-col gap-4 text-white'>

            <h1 className='text-3xl font-semibold'>Monthly Report</h1>

            <div className="bg-[#0e1726] py-6 px-8 ">

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
                            <p>From Date</p>
                            <input type="date" id="fromDate" className='bg-[#1A1B2D] py-1 px-3' />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>To Date</p>
                            <input type="date" id="toDate" className='bg-[#1A1B2D] py-1 px-3' />
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

            {message && <p>{message}</p>}

            {
                filteredData?.length > 0 &&
                <div className="table-container">

                    <table className="data-table" id="dataTable">
                        <thead>
                            <tr className='uppercase'>
                                <th onClick={() => sortTable(0)}>id</th>
                                <th onClick={() => sortTable(1)}>date</th>
                                <th onClick={() => sortTable(2)}>single</th>
                                <th onClick={() => sortTable(3)}>total single(₹)</th>
                                <th onClick={() => sortTable(4)}>total win single(₹)</th>
                                <th onClick={() => sortTable(5)}>patti</th>
                                <th onClick={() => sortTable(6)}>total patti(₹)</th>
                                <th onClick={() => sortTable(7)}>total win patti(₹)</th>
                                <th onClick={() => sortTable(8)}>jodi</th>
                                <th onClick={() => sortTable(9)}>total jodi(₹)</th>
                                <th onClick={() => sortTable(10)}>total win jodi(₹)</th>
                                <th onClick={() => sortTable(11)}>cp</th>
                                <th onClick={() => sortTable(12)}>total cp(₹)</th>
                                <th onClick={() => sortTable(13)}>total win cp(₹)</th>
                            </tr>

                        </thead>
                        <tbody id="tableBody">
                            {
                                filteredData?.map((obj, index) => (
                                    <tr key={index}>
                                        <td>{obj.id}</td>
                                        <td>{obj.date}</td>
                                        <td>{obj.single_win}</td>
                                        <td>{obj.single_win}</td>
                                        <td>{obj.single_win}</td>
                                        <td>{obj.patti_win}</td>
                                        <td>{obj.patti_win}</td>
                                        <td>{obj.patti_win}</td>
                                        <td>{obj.jodi_win}</td>
                                        <td>{obj.jodi_win}</td>
                                        <td>{obj.jodi_win}</td>
                                        <td>{obj.cp_win}</td>
                                        <td>{obj.cp_win}</td>
                                        <td>{obj.cp_win}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                        <thead>
                            <tr className='uppercase'>
                                <td className='bg-[#4BB050] border-r border-[#0D1522]'></td>
                                <td className='bg-[#4BB050] border-r border-[#0D1522]'>Total:</td>
                                <td className='bg-[#4BB050] border-r border-[#0D1522]'></td>
                                <td className='bg-[#4BB050] border-r border-[#0D1522]'>Rs.{amount.single_win?.toFixed(2)}</td>
                                <td className='bg-[#4BB050] border-r border-[#0D1522]'>Rs.{amount.total_win_single?.toFixed(2)}</td>
                                <td className='bg-[#4BB050] border-r border-[#0D1522]'></td>
                                <td className='bg-[#4BB050] border-r border-[#0D1522]'>Rs.{amount.patti_win?.toFixed(2)}</td>
                                <td className='bg-[#4BB050] border-r border-[#0D1522]'>Rs.{amount.total_win_patti?.toFixed(2)}</td>
                                <td className='bg-[#4BB050] border-r border-[#0D1522]'></td>
                                <td className='bg-[#4BB050] border-r border-[#0D1522]'>Rs.{amount.jodi_win?.toFixed(2)}</td>
                                <td className='bg-[#4BB050] border-r border-[#0D1522]'>Rs.{amount.total_win_jodi?.toFixed(2)}</td>
                                <td className='bg-[#4BB050] border-r border-[#0D1522]'></td>
                                <td className='bg-[#4BB050] border-r border-[#0D1522]'>Rs.{amount.cp_win?.toFixed(2)}</td>
                                <td className='bg-[#4BB050] border-r border-[#0D1522]'>Rs.{amount.total_win_cp?.toFixed(2)}</td>
                            </tr>
                        </thead>
                    </table>
                </div>
            }

        </div>
    );
}

export default Monthly;