import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import './Table.css'

function Report() {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/report/fetch.php`)
            .then(res => { setData(res.data); console.log(res.data) })
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
        let filterInput = document.getElementById('filterInput');
        let filterValue = filterInput.value.trim().toUpperCase(); // Remove leading/trailing spaces and convert to uppercase for case-insensitive matching
        let tableBody = document.getElementById('tableBody');
        let rows = tableBody.getElementsByTagName('tr');
    
        for (let i = 0; i < rows.length; i++) {
            let categoryNameInput = rows[i].querySelector('input[name="category"]');
            if (categoryNameInput) {
                let categoryName = categoryNameInput.value.trim().toUpperCase(); // Get category name and convert to uppercase
                if (categoryName.includes(filterValue)) {
                    rows[i].style.display = ''; // Display the row if the filter value matches the category name
                } else {
                    rows[i].style.display = 'none'; // Hide the row if no match
                }
            }
        }
    };
    

    return (
        <div className='flex flex-col gap-4'>

            <div className="flex items-center gap-3 pb-6">
                <input type="text" id="filterInput" placeholder="Filter by category..." className='w-[15rem]' />
                {/* <input type="date" id="dateFilterInput" placeholder="Filter by category..." className='w-[15rem]' /> */}
                <button onClick={handleFilter} className='bg-[#2E4D6D] text-white w-max px-3 py-2 rounded-lg'>Filter</button>
            </div>
            <h1 className='text-3xl text-white font-semibold'>Game Report</h1>

            {message && <p>{message}</p>}

            <div className="table-container">

                <table className="data-table" id="dataTable">
                    <thead>
                        <tr>
                            <th onClick={() => sortTable(0)}>category name </th>
                            <th onClick={() => sortTable(1)}>name </th>
                            <th onClick={() => sortTable(2)}>slot </th>
                            <th onClick={() => sortTable(3)}>total play amount (Rs)</th>
                            <th onClick={() => sortTable(4)}>total win amount (Rs) </th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        {
                            data?.map((obj, index) => (
                                <tr key={index}>
                                    <td>
                                        <input
                                            value={obj.category || ''}
                                            name="category"
                                            className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                            onChange={e => { data[index].category = e.target.value; setData([...data]) }}
                                            disabled={true}
                                        /></td>
                                    <td><input
                                        value={obj.name || ''}
                                        name="name"
                                        className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                        onChange={e => { data[index].name = e.target.value; setData([...data]) }}
                                        disabled={true}
                                    /></td>
                                    <td className=''>
                                        <div className="flex items-center">
                                        <input
                                            value={obj.time_start}
                                            type="time"
                                            name="time_start"
                                            className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                            onChange={e => { data[index].time_start = e.target.value; setData([...data]) }}
                                            disabled={true}
                                        />
                                        <p>-</p>
                                        <input
                                            value={obj.time_end}
                                            type="time"
                                            name="time_end"
                                            className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                            onChange={e => { data[index].time_end = e.target.value; setData([...data]) }}
                                            disabled={true}
                                        />
                                        </div>
                                    </td>
                                    <td><input
                                        value={obj.total_win || ''}
                                        name="total_win"
                                        className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                        onChange={e => { data[index].total_win = e.target.value; setData([...data]) }}
                                        disabled={true}
                                    /></td>
                                    <td className='text-center'>
                                        <p className='w-[15rem]'>Total : {obj.total_win}</p>
                                        <p className='w-[15rem]'>Single Win : {obj.single_win}</p>
                                        <p className='w-[15rem]'>patti win : {obj.patti_win}</p>
                                        <p className='w-[15rem]'>jodi win : {obj.jodi_win}</p>
                                        <p className='w-[15rem]'>cp win : {obj.cp_win}</p>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Report;