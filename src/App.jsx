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

import Footer from "./components/Footer"
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

      </Routes>

      <Footer />

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