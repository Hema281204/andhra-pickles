import { Link }
from "react-router-dom"

import { useState }
from "react"

export default function Navbar(){

  const [menuOpen,setMenuOpen] =
  useState(false)

  const cart =

  JSON.parse(

    localStorage.getItem(
      "cart"
    )

  ) || []

  const wishlist =

  JSON.parse(

    localStorage.getItem(
      "wishlist"
    )

  ) || []

  const cartCount =

  cart.reduce(

    (acc,item)=>

    acc + item.quantity,

    0

  )

  const wishlistCount =

  wishlist.length

  return(

    <nav className="navbar">

      <div className="nav-left">

        <button

        className="menu-btn"

        onClick={()=>{

          setMenuOpen(!menuOpen)

        }}>

          ☰

        </button>

        <h1 className="logo">

          Andhra Pickles

        </h1>

      </div>

      <div className="nav-links desktop-menu">

        <Link to="/">

          🏠 Home

        </Link>

        <Link to="/products">

          🛍 Products

        </Link>

        <Link to="/wishlist">

          <div className="nav-item">

            ❤️ Wishlist

            {

            wishlistCount > 0 && (

              <span className="menu-count">

                {wishlistCount}

              </span>

            )}

          </div>

        </Link>

        <Link to="/cart">

          <div className="nav-item">

            🛒 Cart

            {

            cartCount > 0 && (

              <span className="menu-count">

                {cartCount}

              </span>

            )}

          </div>

        </Link>

        <Link to="/track">

          🚚 Track

        </Link>

        <Link to="/myorders">

          📦 My Orders

        </Link>

        <Link to="/admin">

          🛠 Admin

        </Link>

      </div>

      {

      menuOpen && (

        <div className="mobile-menu">

          <Link
          to="/"

          onClick={()=>{

            setMenuOpen(false)

          }}>

            🏠 Home

          </Link>

          <Link
          to="/products"

          onClick={()=>{

            setMenuOpen(false)

          }}>

            🛍 Products

          </Link>

          <Link
          to="/wishlist"

          onClick={()=>{

            setMenuOpen(false)

          }}>

            <div className="nav-item">

              ❤️ Wishlist

              {

              wishlistCount > 0 && (

                <span className="menu-count">

                  {wishlistCount}

                </span>

              )}

            </div>

          </Link>

          <Link
          to="/cart"

          onClick={()=>{

            setMenuOpen(false)

          }}>

            <div className="nav-item">

              🛒 Cart

              {

              cartCount > 0 && (

                <span className="menu-count">

                  {cartCount}

                </span>

              )}

            </div>

          </Link>

          <Link to="/myorders"
          onClick={()=>{
            setMenuOpen(false)
          }}
          >

          📦 My Orders

        </Link>

          <Link
          to="/track"

          onClick={()=>{

            setMenuOpen(false)

          }}>

            🚚 Track

          </Link>

          

          <Link
          to="/admin"

          onClick={()=>{

            setMenuOpen(false)

          }}>

            🛠 Admin

          </Link>

        </div>

      )}

    </nav>
  )
}