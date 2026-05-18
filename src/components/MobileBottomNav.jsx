import { Link }
from "react-router-dom"

export default function MobileBottomNav(){

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

  return(

    <div className="bottom-nav">

      <Link to="/">

        🏠

        <span>Home</span>

      </Link>

      <Link to="/products">

        🛍

        <span>Products</span>

      </Link>

      <Link to="/wishlist">

        <div className="bottom-icon">

          ❤️

          {

          wishlist.length > 0 && (

            <div className="bottom-count">

              {wishlist.length}

            </div>

          )}

        </div>

        <span>Wishlist</span>

      </Link>

      <Link to="/cart">

        <div className="bottom-icon">

          🛒

          {

          cartCount > 0 && (

            <div className="bottom-count">

              {cartCount}

            </div>

          )}

        </div>

        <span>Cart</span>

      </Link>

      <Link to="/track">

        🚚

        <span>Track</span>

      </Link>

    </div>
  )
}