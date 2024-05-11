import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import {AccountList, AddMoney, AddAccount, Auth, GameName, Home, ManageGame, News, Settings, Slider, Slot, Transaction, Report, WithdrawMoney, TransferMoney, Category, Monthly, Daily, TotalBet, BetHistory, UserBetHistory, CPDigits, WinningPrice, Add, Update, AddBalance, DeductBalance } from './pages'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/slider" element={<Slider />} />
      <Route path="/slot" element={<Slot />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/adduser" element={<AddAccount />} />
      <Route path="/accountlist" element={<AccountList />} />
      <Route path="/game" element={<GameName />} />
      <Route path="/manage" element={<ManageGame />} />
      <Route path="/news" element={<News />} />
      <Route path="/addmoney" element={<AddMoney />} />
      <Route path="/transaction" element={<Transaction />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/report" element={<Report />} />
      <Route path="/withdrawmoney" element={<WithdrawMoney />} />
      <Route path="/transfermoney" element={<TransferMoney />} />
      <Route path="/monthly" element={<Monthly />} />
      <Route path="/daily" element={<Daily />} />
      <Route path="/total-bet" element={<TotalBet />} />
      <Route path="/bet-history" element={<BetHistory />} />
      <Route path="/user-bet-history" element={<UserBetHistory />} />
      <Route path="/winning" element={<WinningPrice />} />
      <Route path="/cpdigit" element={<CPDigits />} />
      <Route path="/addbalance" element={<AddBalance />} />
      <Route path="/deductbalance" element={<DeductBalance />} />
      <Route path="/category/:category" element={<Category />} />
      <Route path="/add/:page" element={<Add />} />
      <Route path="/update/:page/:id" element={<Update />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
