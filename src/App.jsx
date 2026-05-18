import "./firebase/firebase"

import {
BrowserRouter,
Routes,
Route
}
from "react-router-dom"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Products from "./pages/Products"
import Cart from "./pages/Cart"
import Track from "./pages/Track"
import Admin from "./pages/Admin"
import MyOrders from "./pages/MyOrders"
import ProductDetails
from "./pages/ProductDetails"
import Wishlist
from "./pages/Wishlist"
import { ToastContainer }
from "react-toastify"
import MobileBottomNav
from "./components/MobileBottomNav"


import WhatsAppButton from "./components/WhatsAppButton"

export default function App() {

  const scrollTop = ()=>{

    window.scrollTo({

      top:0,
      behavior:"smooth"

    })
  }

  return (

    <BrowserRouter>

      <Navbar />
      <MobileBottomNav />

      <Routes>

        <Route
        path="/"
        element={<Home />}
        />

        <Route
        path="/products"
        element={<Products />}
        />

        <Route
        path="/cart"
        element={<Cart />}
        />

        <Route
        path="/track"
        element={<Track />}
        />

        <Route
        path="/admin"
        element={<Admin />}
        />

        <Route
        path="/myorders"
        element={<MyOrders />}
        />
        <Route
path="/product/:id"
element={<ProductDetails/>}
/>
      <Route
path="/wishlist"
element={<Wishlist/>}
/>

      </Routes>
      <ToastContainer />

      

      <WhatsAppButton />

      <button

      className="scroll-top"

      onClick={scrollTop}

      >

        ↑

      </button>

    </BrowserRouter>
  )
}