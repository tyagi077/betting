import React, { useEffect, useState } from 'react'
import './Table.css'
import axios from 'axios';

function AccountList() {

  const [data, setData] = useState([])
  let [filteredData, setFilteredData] = useState([]);

  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(10)

  let newData = [...data]

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

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/account/display.php`)
      .then(res => { setData(res.data) })
      .catch(err => console.log(err))

  }, [])

  const action = (index) => {
    let rows = document.querySelectorAll("#tableBody tr")
    rows.forEach((tr, i) => {
      if (index !== i)
        tr.querySelector(`.action`).style.display = "none"
    }
    )
    rows[index].querySelector(`.action`).style.display = rows[index].querySelector(`.action`).style.display === "flex" ? "none" : "flex"
  }

  const removeUser = (id) => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/account/delete.php?deleteid=${id}`)
      .then(res => {
        setData(data.filter(obj => obj.id !== id))
      })
      .catch(err => {
        console.log(err)
      })
  }

  const statusUser = (id, index) => {

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/account/stateupdate.php?updateid=${id}`)
      .then(res => {
        let newData = [...data]
        newData[index].status = newData[index].status === 'active' ? 'in-active' : 'active'
        setData(newData)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleFilter = () => {
    let filterInput = document.getElementById('filterInput');
    let inputValue = filterInput.value.trim();

    if (inputValue) {
      let filtered = data.filter(user =>
        user.name.toUpperCase().includes(inputValue.toUpperCase())
      );
      setFilteredData(filtered);
      setStartIndex(0)
    }
    else {
      setStartIndex(0)
      setFilteredData([]);
    }

  };

  const handleRowsPerPageChange = (e) => {
    setStartIndex(0)
    setEndIndex(parseInt(e.target.value));
  };

  return (
    <div className=' flex flex-col gap-4'>
      <h1 className='text-3xl text-white font-semibold'>Users</h1>
      <div className="table-container">
        <div className="flex items-center gap-3 pb-6">
          <input type="text" id="filterInput" placeholder="Filter by name..." className='w-[10rem]' />
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

        <table className="data-table" id="dataTable">
          <thead>
            <tr>
              <th onClick={() => sortTable(0)}>#
              </th>
              <th onClick={() => sortTable(1)}>Name
              </th>
              <th onClick={() => sortTable(2)}>Balance
              </th>
              <th onClick={() => sortTable(3)}>Phone
              </th>
              <th onClick={() => sortTable(4)}>Status
              </th>
              <th onClick={() => sortTable(5)}>Date Created
              </th>
              <th onClick={() => sortTable(6)}>Action
              </th>
            </tr>
          </thead>
          <tbody id="tableBody">

            {
              filteredData?.length === 0 &&
              newData?.splice(startIndex, endIndex).map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.balance}</td>
                  <td>{user.phone}</td>
                  <td id="status">{user.status}</td>
                  <td>{user.date}</td>
                  <td className="">
                    <div className="bg-[#1F7869] flex items-center gap-1 cursor-pointer w-max" onClick={() => action(index)}>
                      <p className='bg-[#29a18d] py-2 px-2'>Action</p>
                      <i className="fa-solid fa-chevron-down py-2 px-2"></i>
                    </div>
                    <div className="bg-white action hidden absolute px-4 py-2 translate-x-10 translate-y-1 text-black flex-col gap-3">
                      <p className='cursor-pointer' onClick={() => removeUser(user.id)}>Remove</p>
                      <p className='cursor-pointer' onClick={() => statusUser(user.id, index)}>{user.status === 'Active' ? 'In-active' : 'Active'}</p>
                    </div>
                  </td>
                </tr>
              ))
            }

            {
              filteredData?.length > 0 &&
              filteredData?.splice(startIndex, endIndex).map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.balance}</td>
                  <td>{user.phone}</td>
                  <td id="status">{user.status}</td>
                  <td>{user.date}</td>
                  <td className="">
                    <div className="bg-[#1F7869] flex items-center gap-1 cursor-pointer w-max" onClick={() => action(index)}>
                      <p className='bg-[#29a18d] py-2 px-2'>Action</p>
                      <i className="fa-solid fa-chevron-down py-2 px-2"></i>
                    </div>
                    <div className="bg-white action hidden absolute px-4 py-2 translate-x-10 translate-y-1 text-black flex-col gap-3">
                      <p className='cursor-pointer' >View</p>
                      <p className='cursor-pointer' onClick={() => removeUser(user.id)}>Remove</p>
                      <p className='cursor-pointer' onClick={() => statusUser(user.id, index)}>{user.status === 'Active' ? 'In-active' : 'Active'}</p>
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
  )
}

export default AccountList
