import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../App.css'
import axios from 'axios';

function Sidebar() {

  const [data, setData] = useState([]);

  const {page} = useParams()

  const path = page || window.location.pathname.split('/').pop()

  useEffect(() => {
    fetchData();

    setTimeout(() => {

      document.querySelectorAll(".sidebar > ul > li").forEach(li => {

        li.childNodes[0]?.addEventListener('click', () => {

          if (li.childNodes[1]) {
            // document.querySelector(".menu.view")?.classList.remove("view")
            li.childNodes[0].classList.contains('view') ? li.childNodes[0].classList.remove('view') : li.childNodes[0].classList.add('view')
          }

          else {
            document.querySelector(".menu.view")?.classList.remove("view")
            document.querySelector(".sidebar .menu.active")?.classList.remove('active')
            li.childNodes[0].classList.add('active')
            document.querySelector(".sidebar .submenu li.active")?.classList.remove('active')
          }
        })

        li.childNodes[1]?.childNodes.forEach((sub) => {
          sub.addEventListener('click', () => {
            document.querySelector(".sidebar .menu.active")?.classList.remove('active')
            // li.childNodes[0].classList.remove('view')
            li.childNodes[0].classList.add("active")
            document.querySelector(".sidebar .submenu li.active")?.classList.remove('active')
            sub.classList.add('active')
          })
        })
      })

      if (!path) {
        document.querySelector('.sidebar .menu')?.classList.add('active')
      }
      else {
        let pathQuery = document.querySelector(`.sidebar #${path}`);
        pathQuery?.classList.add('active')
        pathQuery?.parentNode.parentNode.childNodes[0]?.classList.add('active')
        pathQuery?.parentNode.parentNode.childNodes[0]?.classList.add('view')
      }
    }, 100)


  }, [])


  const fetchData = async () => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/game/display.php`)
      .then(res => { setData(res.data);console.log(res.data) })
      .catch(err => console.log(err))
  };

  return (
    <div className='sidebar bg-[#07081C] flex flex-col gap-4 fixed w-[18rem] py-4 h-screen overflow-y-auto text-sm'>

      <ul className='flex flex-col gap-1'>
        <li className=''>
          <Link to="/" className='menu'>
            <div className="flex items-center gap-4">
              <i className="fa-solid fa-gauge-high"></i>
              <p>Dashboard</p>
            </div>
          </Link>
        </li>
        <li className=''>
          <div className='menu'>
            <div className="flex items-center gap-4">
              <i className=" fa-solid fa-folder"></i>
              <p>Master</p>
            </div>
            <i className="fa-solid fa-chevron-left "></i>
          </div>
          <ul className="submenu">
            <li id="game"><Link to="/game" className='flex items-center gap-2'><i className=" fa-regular fa-circle"></i>Game Name</Link></li>
            <li id="slider"><Link to="/slider" className='flex items-center gap-2'><i className=" fa-regular fa-circle"></i>Slider</Link></li>
            <li id="slot"><Link to="/slot" className='flex items-center gap-2'><i className=" fa-regular fa-circle"></i>Slot</Link></li>
            <li id="cpdigit"><Link to="/cpdigit" className='flex items-center gap-2'><i className=" fa-regular fa-circle"></i>CP Digits</Link></li>
            <li id="winning"><Link to="/winning" className='flex items-center gap-2'><i className=" fa-regular fa-circle"></i>Winning Price</Link></li>
          </ul>
        </li>
        <li className=''>
        <div className='menu'>
            <div className="flex items-center gap-4">
              <i className=" fa-solid fa-circle-check"></i>
              <p>Money</p>
            </div>
            <i className="fa-solid fa-chevron-left "></i>
          </div>
          <ul className="submenu ">
            <li id="addbalance"><Link to="/addbalance" className=' flex items-center gap-2'><i className=" fa-regular fa-circle"></i>Add Balance</Link></li>
            <li id="deductbalance"><Link to="/deductbalance" className='flex items-center gap-2'><i className=" fa-regular fa-circle"></i>deduct balance</Link></li>
          </ul>
        </li>
        <li className=''>
          <div className='menu'>
            <div className="flex items-center gap-4">
              <i className=" fa-solid fa-circle-check"></i>
              <p>Approve</p>
            </div>
            <i className="fa-solid fa-chevron-left "></i>
          </div>
          <ul className="submenu ">
            <li id="transfermoney"><Link to="/transfermoney" className=' flex items-center gap-2'><i className=" fa-regular fa-circle"></i>Transfer Money</Link></li>
            <li id="withdrawmoney"><Link to="/withdrawmoney" className='flex items-center gap-2'><i className=" fa-regular fa-circle"></i>Withdraw Money</Link></li>
            <li id="transaction"><Link to="/transaction" className='flex items-center gap-2'><i className=" fa-regular fa-circle"></i>Transactions History</Link></li>
          </ul>
        </li>
        <li className=''>
          <div className='menu'>
            <div className="flex items-center gap-4">
              <i className=" fa-solid fa-circle-check"></i>
              <p>Report</p>
            </div>
            <i className="fa-solid fa-chevron-left "></i>
          </div>
          <ul className="submenu">
            <li id="report"><Link to="/report" className='flex items-center gap-2'><i className=" fa-regular fa-circle"></i>game report</Link></li>
          </ul>
        </li>
        <li className=''>
          <Link to="/manage" className='menu' id="manage">
            <div className="flex items-center gap-4">
              <i className=" fa-solid fa-dice-five"></i>
              <p>Manage Game</p>
            </div>
          </Link>
        </li>
        <li className=''>
          <div className='menu'>
            <div className="flex items-center gap-4">
              <i className=" fa-solid fa-clock-rotate-left"></i>
              <p>Play History</p>
            </div>
            <i className="fa-solid fa-chevron-left "></i>
          </div>
          <ul className="submenu">
            <li id="total-bet"><Link to="/total-bet" className='flex items-center gap-2'><i className=" fa-regular fa-circle"></i>total bet</Link></li>
            <li id="bet-history"><Link to="/bet-history" className='flex items-center gap-2'><i className=" fa-regular fa-circle"></i>bet history</Link></li>
            <li id="user-bet-history"><Link to="/user-bet-history" className='flex items-center gap-2'><i className=" fa-regular fa-circle"></i>user bet history</Link></li>
          </ul>
        </li>
        <li className=''>
          <div className='menu'>
            <div className="flex items-center gap-4">
              <i className=" fa-solid fa-clock-rotate-left"></i>
              <p>Game Status</p>
            </div>
            <i className="fa-solid fa-chevron-left "></i>
          </div>
          <ul className="submenu">
            <li id="daily"><Link to="/daily" className='flex items-center gap-2'><i className=" fa-regular fa-circle"></i>daily report</Link></li>
            <li id="monthly"><Link to="/monthly" className='flex items-center gap-2'><i className=" fa-regular fa-circle"></i>monthly history</Link></li>
          </ul>
        </li>
        <li className=''>
          <div className='menu'>
            <div className="flex items-center gap-4">
              <i className=" fa-solid fa-file"></i>
              <p>Set Result</p>
            </div>
            <i className="fa-solid fa-chevron-left "></i>
          </div>
          <ul className="submenu">
            {
              data.length>0 && data?.map((cat, index) => (
                <li key={index} id={cat.ename?.toLowerCase().replace(' ', "-")}><Link to={`/category/${cat.ename?.toLowerCase().replace(' ', "-")}`} className='flex items-center gap-2'><i className="uppercase  fa-regular fa-circle"></i>{cat.ename}</Link></li>
              ))
            }
          </ul>
        </li>
        <li className=''>
          <Link to="/news" className='menu'>
            <div className="flex items-center gap-4">
              <i className=" fa-solid fa-list"></i>
              <p>Manage News Board</p>
            </div>
          </Link>
        </li>
        <li className=''>
          <Link to="/adduser" className='menu' id="adduser">
            <div className="flex items-center gap-4">
              <i className=" fa-solid fa-user-plus"></i>
              <p>Add Account</p>
            </div>
          </Link>
        </li>
        <li className='' >
          <Link to="/accountlist" className='menu' id="accountlist">
            <div className="flex items-center gap-4">
              <i className=" fa-solid fa-user"></i>
              <p>Account List</p>
            </div>
          </Link>
        </li>
        <li className=''>
          <Link to="/settings" className='menu' id="settings">
            <div className="flex items-center gap-4">
              <i className=" fa-solid fa-gear"></i>
              <p>Settings</p>
            </div>
          </Link>
        </li>

      </ul>



    </div>
  )
}

export default Sidebar
