import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import './Table.css'

function Transaction() {
    let [data, setData] = useState([]);
    let [filteredData, setFilteredData] = useState([]);

    const [startIndex, setStartIndex] = useState(0)
    const [endIndex, setEndIndex] = useState(10)

    let newData = [...data]

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/approve/transaction/display.php`)
            .then(res => {
                let newData = [];
                res.data.Deposit.forEach(dep => {
                    newData.push({ ...dep, desc: 'deposit' })
                })
                res.data.withdraw.forEach(wit => {
                    newData.push({ ...wit, desc: 'withdraw' })
                })
                setData(newData);
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
        let filterInput = document.getElementById('filterInput');
        let inputValue = filterInput.value.trim();

        if (inputValue) {
            let filtered = data.filter(user =>
                user.number.toUpperCase().includes(inputValue.toUpperCase())
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

    return (
        <div className='flex flex-col gap-4'>
            <h1 className='text-3xl text-white font-semibold'>Transaction History</h1>

            <div className="flex items-center gap-3 pb-6">
                <input type="text" id="filterInput" placeholder="Filter by number..." className='w-[15rem]' />
                <button onClick={handleFilter} className='bg-[#2E4D6D] text-white w-max px-3 py-2 rounded-lg'>Filter</button>
            </div>

            <div className="flex items-center gap-2 pb-6">
                <p>Showing</p>
                <select name="" id="" onChange={handleRowsPerPageChange}>
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
                        <tr>
                            <th onClick={() => sortTable(0)}>S.n
                            </th>
                            <th onClick={() => sortTable(1)}>Date
                            </th>
                            <th onClick={() => sortTable(2)}>Action
                            </th>
                            <th onClick={() => sortTable(3)}>desc
                            </th>
                            <th onClick={() => sortTable(4)}>status
                            </th>
                            <th onClick={() => sortTable(5)}>balance
                            </th>
                            <th onClick={() => sortTable(5)}>Number
                            </th>
                        </tr>
                    </thead>
                    <tbody id="tableBody">
                        {
                            filteredData?.length === 0 &&
                            newData?.splice(startIndex, endIndex).map((obj, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            value={obj.date}
                                            type="datetime-local"
                                            name="date"
                                            className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                            onChange={e => { data[index].date = e.target.value; setData([...data]) }}
                                            disabled={true}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            value={obj.method}
                                            type="text"
                                            name="method"
                                            className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                            onChange={e => { data[index].method = e.target.value; setData([...data]) }}
                                            disabled={true}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            value={obj.desc || ''}
                                            name="desc"
                                            className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                            onChange={e => { data[index].desc = e.target.value; setData([...data]) }}
                                            disabled={true}
                                        /></td>
                                    <td><input
                                        value={obj.status || ''}
                                        name="status"
                                        className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                        onChange={e => { data[index].status = e.target.value; setData([...data]) }}
                                        disabled={true}
                                    /></td>
                                    <td><input
                                        value={obj.amount || ''}
                                        name="amount"
                                        className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                        onChange={e => { data[index].amount = e.target.value; setData([...data]) }}
                                        disabled={true}
                                    /></td>
                                    <td><input
                                        value={obj.number || ''}
                                        type="number"
                                        name="number"
                                        className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                        onChange={e => { data[index].number = e.target.value; setData([...data]) }}
                                        disabled={true}
                                    /></td>

                                </tr>
                            ))
                        }
                        {
                            filteredData?.length !== 0 &&
                            filteredData?.splice(startIndex, endIndex).map((obj, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <input
                                            value={obj.date}
                                            type="datetime-local"
                                            name="date"
                                            className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                            onChange={e => { data[index].date = e.target.value; setData([...data]) }}
                                            disabled={true}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            value={obj.method}
                                            type="text"
                                            name="method"
                                            className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                            onChange={e => { data[index].method = e.target.value; setData([...data]) }}
                                            disabled={true}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            value={obj.desc || ''}
                                            name="desc"
                                            className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                            onChange={e => { data[index].desc = e.target.value; setData([...data]) }}
                                            disabled={true}
                                        /></td>
                                    <td><input
                                        value={obj.status || ''}
                                        name="status"
                                        className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                        onChange={e => { data[index].status = e.target.value; setData([...data]) }}
                                        disabled={true}
                                    /></td>
                                    <td><input
                                        value={obj.amount || ''}
                                        name="amount"
                                        className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                        onChange={e => { data[index].amount = e.target.value; setData([...data]) }}
                                        disabled={true}
                                    /></td>
                                    <td><input
                                        value={obj.number || ''}
                                        type="number"
                                        name="number"
                                        className=' bg-transparent border border-transparent outline-transparent outline-1 px-3 py-1 rounded-lg'
                                        onChange={e => { data[index].number = e.target.value; setData([...data]) }}
                                        disabled={true}
                                    /></td>

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
    );
}

export default Transaction;