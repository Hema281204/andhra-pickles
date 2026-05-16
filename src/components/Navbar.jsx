import { Link } from "react-router-dom"

export default function Navbar(){

  const cart =
  JSON.parse(localStorage.getItem("cart")) || []

  let totalItems = 0

  cart.forEach(item=>{

    totalItems += item.quantity
  })

  return(

    <nav className="navbar">

      <h1>
        🌶 Andhra Pickles
      </h1>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/products">
          Products
        </Link>

        <Link to="/cart">

          Cart

          <span className="cart-count">

            {totalItems}

          </span>

        </Link>

        <Link to="/track">
          Track
        </Link>

        <Link to="/myorders">
          My Orders
        </Link>

        <Link to="/admin">
          Admin
        </Link>

      </div>

    </nav>
  )
}