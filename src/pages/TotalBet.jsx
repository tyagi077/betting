import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import "./Table.css";
import { search } from "../assets";

function TotalBet() {
    let [data, setData] = useState({
        single: [
            {
                bid_number: 0,
                total_bid: 11,
                amount: 150,
                category: "CHENNAI MATKA",
                date: "2024-04-17",

            },
            {
                bid_number: 1,
                total_bid: 10,
                amount: 120,
                category: "CHENNAI MATKA",
                date: "2024-04-27",
            },
            {
                bid_number: 98,
                total_bid: 1,
                amount: 100,
                category: "CHENNAI MATKA",
                date: "2024-04-17",
            },
            {
                bid_number: 40,
                total_bid: 31,
                amount: 10,
                category: "CHENNAI MATKA",
                date: "2024-04-27",
            }
        ],
        jodi: [
            {
                bid_number: 0,
                total_bid: 1,
                amount: 10,
                category: "CHENNAI MATKA",
                date: "2024-04-17",
            },
            {
                bid_number: 0,
                total_bid: 1,
                amount: 10,
                category: "CHENNAI MATKA",
                date: "2024-04-27",
            },

        ],
        patti: [
            {
                bid_number: 80,
                total_bid: 1,
                amount: 10,
                category: "CHENNAI MATKA",
                date: "2024-04-27",
            },
            {
                bid_number: 60,
                total_bid: 71,
                amount: 10,
                category: "CHENNAI MATKA",
                date: "2024-04-27",
            },
            {
                bid_number: 25,
                total_bid: 91,
                amount: 10,
                category: "CHENNAI MATKA",
                date: "2024-04-17",
            },
            {
                bid_number: 54,
                total_bid: 1,
                amount: 10,
                category: "CHENNAI MATKA",
                date: "2024-04-17",
            },
            {
                bid_number: 67,
                total_bid: 1,
                amount: 10,
                category: "CHENNAI MATKA",
                date: "2024-04-17",
            }
        ]
    });
    let [filteredData, setFilteredData] = useState({});
    const [category, setCategory] = useState([]);
    const [amount, setAmount] = useState({});

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
        };

        filteredData?.single?.forEach((obj) => {
            newAmount.single_win += parseInt(obj.amount);
            newAmount.total_single += parseInt(obj.amount);
        });
        filteredData?.jodi?.forEach((obj) => {
            newAmount.jodi_win += parseInt(obj.amount);
            newAmount.total_jodi += parseInt(obj.amount);
        });
        filteredData?.patti?.forEach((obj) => {
            newAmount.patti_win += parseInt(obj.amount);
            newAmount.total_patti += parseInt(obj.amount);
        });
        filteredData?.cp?.forEach((obj) => {
            newAmount.cp_win += parseInt(obj.amount);
            newAmount.total_cp += parseInt(obj.amount);
        });

        setAmount(newAmount)

    }, [filteredData]);

    const fetchData = async () => {
        // axios.get('${import.meta.env.VITE_BACKEND_URL}/report/fetch.php')
        //     .then(res => { setData(res.data); })
        //     .catch(err => console.log(err))

        axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/game/display.php`)
            .then((res) => {
                setCategory(res.data);
            })
            .catch((err) => console.log(err));
    };

    const sortTable = (columnIndex) => {
        const table = document.getElementById("dataTable");
        let rows,
            switching,
            i,
            x,
            y,
            shouldSwitch,
            direction,
            switchCount = 0;
        switching = true;
        direction = "asc";
        while (switching) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < rows.length - 1; i++) {
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
    };

    const handleFilter = () => {
        let filterValue = document
            .getElementById("categorySelect")
            .value?.trim()
            ?.toUpperCase();
        let todayDate = document.getElementById("todayDate").value;

        if (filterValue || todayDate) {
            let filtered1 = data.single?.filter((cat) => {
                const categoryMatch = !filterValue || cat.category?.toUpperCase().includes(filterValue?.toUpperCase());
                if (todayDate) {
                    const dateMatch = cat.date === todayDate;
                    return categoryMatch && dateMatch;
                } else {
                    return categoryMatch;
                }
            });
            let filtered2 = data.jodi?.filter((cat) => {
                const categoryMatch = !filterValue || cat.category?.toUpperCase().includes(filterValue?.toUpperCase());
                if (todayDate) {
                    const dateMatch = cat.date === todayDate;
                    return categoryMatch && dateMatch;
                } else {
                    return categoryMatch;
                }
            });
            let filtered3 = data.cp?.filter((cat) => {
                const categoryMatch = !filterValue || cat.category?.toUpperCase().includes(filterValue?.toUpperCase());
                if (todayDate) {
                    const dateMatch = cat.date === todayDate;
                    return categoryMatch && dateMatch;
                } else {
                    return categoryMatch;
                }
            });
            let filtered4 = data.patti?.filter((cat) => {
                const categoryMatch = !filterValue || cat.category?.toUpperCase().includes(filterValue?.toUpperCase());
                if (todayDate) {
                    const dateMatch = cat.date === todayDate;
                    return categoryMatch && dateMatch;
                } else {
                    return categoryMatch;
                }
            });
            let filtered = { single: filtered1, jodi: filtered2, cp: filtered3, patti: filtered4 }
            setFilteredData(filtered);
        } else {
            document.querySelectorAll("#tableBody tr").forEach((tr) => {
                tr.style.display = "";
            });
            setFilteredData({});
        }
    };

    const handleRowsPerPageChange = (e) => {
        setStartIndex(0);
        setEndIndex(parseInt(e.target.value));
    };

    return (
        <div className="flex flex-col text-white gap-8">
            <h1 className="text-3xl font-semibold">Total bet</h1>

            <div className="bg-[#0e1726] py-3 px-5 rounded-lg ">
                <div className="filterData flex flex-col gap-6 md:w-[70%] xl:w-[50%]">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col gap-2">
                            <p>category</p>
                            <select
                                name="category"
                                id="categorySelect"
                                onChange={(e) => e.target.value}
                                className="bg-[#1A1B2D] py-1 px-3 w-[10rem]"
                            >
                                <option value={""}>Choose...</option>
                                {category?.map((cat, index) => (
                                    <option key={index} value={cat?.ename}>
                                        {cat?.ename}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>Date</p>
                            <input
                                type="date"
                                id="todayDate"
                                className="bg-[#1A1B2D] py-1 px-3"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p>time</p>
                            <select
                                name="category"
                                id="categorySelect"
                                onChange={(e) => e.target.value}
                                className="bg-[#1A1B2D] py-1 px-3 w-[10rem]"
                            >
                                <option value={""}>Choose...</option>
                                {category?.map((cat, index) => (
                                    <option key={index} value={cat?.ename}>
                                        {cat?.ename}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-end">
                    <div
                        onClick={handleFilter}
                        className="bg-[#2E4D6D] cursor-pointer w-max px-3 py-2 rounded-lg flex items-center"
                    >
                        <div className="w-6 h-6 bg-transparent">
                            <img src={search} className="w-full h-full object-cover" alt="" />
                        </div>
                        <p>Search</p>
                    </div>
                </div>
            </div>

            {
                filteredData?.single?.length > 0 &&
                <div className="bg-[#0e1726] py-3 px-5 rounded-lg">
                    <h1 className="text-xl font-semibold">single</h1>

                    <div className="table-container">
                        <table className="data-table" id="dataTable">
                            <thead>
                                <tr className="uppercase">
                                    <th onClick={() => sortTable(0)}>bid number</th>
                                    <th onClick={() => sortTable(1)}>total bid</th>
                                    <th onClick={() => sortTable(2)}>amount(₹)</th>
                                </tr>
                            </thead>

                            <tbody id="tableBody">
                                {filteredData?.single?.map((obj, index) => (
                                    <tr key={index}>
                                        <td>{obj?.bid_number}</td>
                                        <td>{obj?.total_bid}</td>
                                        <td>{obj?.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <thead>
                                <tr className="uppercase">
                                    <td className="text-red-700 font-bold" colSpan={2}>
                                        <div className="w-full text-center">
                                            <p>Total :</p>
                                        </div>
                                    </td>
                                    <td>Rs.{amount.single_win?.toFixed(2)}</td>
                                </tr>
                                <tr className="uppercase">
                                    <td className="text-red-700 font-bold" colSpan={2}>
                                        <div className="w-full text-center">
                                            <p>Total Win :</p>
                                        </div>
                                    </td>
                                    <td>Rs.{amount.total_single?.toFixed(2)}</td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            }
            {
                filteredData?.patti?.length > 0 &&
                <div className="bg-[#0e1726] py-3 px-5 rounded-lg">
                    <h1 className="text-xl font-semibold">patti</h1>

                    <div className="table-container">
                        <table className="data-table" id="dataTable">
                            <thead>
                                <tr className="uppercase">
                                    <th onClick={() => sortTable(0)}>bid number</th>
                                    <th onClick={() => sortTable(1)}>total bid</th>
                                    <th onClick={() => sortTable(2)}>amount(₹)</th>
                                </tr>
                            </thead>

                            <tbody id="tableBody">
                                {filteredData?.patti?.map((obj, index) => (
                                    <tr key={index}>
                                        <td>{obj?.bid_number}</td>
                                        <td>{obj?.total_bid}</td>
                                        <td>{obj?.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <thead>
                                <tr className="uppercase">
                                    <td className="text-red-700 font-bold" colSpan={2}>
                                        <div className="w-full text-center">
                                            <p>Total :</p>
                                        </div>
                                    </td>
                                    <td>Rs.{amount.total_patti?.toFixed(2)}</td>
                                </tr>
                                <tr className="uppercase">
                                    <td className="text-red-700 font-bold" colSpan={2}>
                                        <div className="w-full text-center">
                                            <p>Total Win :</p>
                                        </div>
                                    </td>
                                    <td>Rs.{amount.patti_win?.toFixed(2)}</td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            }
            {
                filteredData?.jodi?.length > 0 &&
                <div className="bg-[#0e1726] py-3 px-5 rounded-lg">
                    <h1 className="text-xl font-semibold">Jodi</h1>

                    <div className="table-container">
                        <table className="data-table" id="dataTable">
                            <thead>
                                <tr className="uppercase">
                                    <th onClick={() => sortTable(0)}>bid number</th>
                                    <th onClick={() => sortTable(1)}>total bid</th>
                                    <th onClick={() => sortTable(2)}>amount(₹)</th>
                                </tr>
                            </thead>

                            <tbody id="tableBody">
                                {filteredData?.jodi?.map((obj, index) => (
                                    <tr key={index}>
                                        <td>{obj?.bid_number}</td>
                                        <td>{obj?.total_bid}</td>
                                        <td>{obj?.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <thead>
                                <tr className="uppercase">
                                    <td className="text-red-700 font-bold" colSpan={2}>
                                        <div className="w-full text-center">
                                            <p>Total :</p>
                                        </div>
                                    </td>
                                    <td>Rs.{amount.jodi_win?.toFixed(2)}</td>
                                </tr>
                                <tr className="uppercase">
                                    <td className="text-red-700 font-bold" colSpan={2}>
                                        <div className="w-full text-center">
                                            <p>Total Win :</p>
                                        </div>
                                    </td>
                                    <td>Rs.{amount.total_jodi?.toFixed(2)}</td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            }
            {
                filteredData?.cp?.length > 0 &&
                <div className="bg-[#0e1726] py-3 px-5 rounded-lg">
                    <h1 className="text-xl font-semibold">CP</h1>

                    <div className="table-container">
                        <table className="data-table" id="dataTable">
                            <thead>
                                <tr className="uppercase">
                                    <th onClick={() => sortTable(0)}>bid number</th>
                                    <th onClick={() => sortTable(1)}>total bid</th>
                                    <th onClick={() => sortTable(2)}>amount(₹)</th>
                                </tr>
                            </thead>

                            <tbody id="tableBody">
                                {filteredData?.cp?.map((obj, index) => (
                                    <tr key={index}>
                                        <td>{obj?.bid_number}</td>
                                        <td>{obj?.total_bid}</td>
                                        <td>{obj?.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <thead>
                                <tr className="uppercase">
                                    <td className="text-red-700 font-bold" colSpan={2}>
                                        <div className="w-full text-center">
                                            <p>Total :</p>
                                        </div>
                                    </td>
                                    <td>Rs.{amount.cp_win?.toFixed(2)}</td>
                                </tr>
                                <tr className="uppercase">
                                    <td className="text-red-700 font-bold" colSpan={2}>
                                        <div className="w-full text-center">
                                            <p>Total Win :</p>
                                        </div>
                                    </td>
                                    <td>Rs.{amount.total_cp?.toFixed(2)}</td>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            }
        </div>
    );
}

export default TotalBet;
