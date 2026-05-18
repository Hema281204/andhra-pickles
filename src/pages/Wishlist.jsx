import { useEffect,useState }
from "react"

import SmallFooter
from "../components/SmallFooter"

export default function Wishlist(){

  const [wishlist,setWishlist] =
  useState([])

  useEffect(()=>{

    const savedWishlist =

    JSON.parse(

      localStorage.getItem(
        "wishlist"
      )

    ) || []

    setWishlist(savedWishlist)

  },[])

  const removeWishlist = (id)=>{

    const updatedWishlist =

    wishlist.filter(
      item =>
      item.id !== id
    )

    setWishlist(updatedWishlist)

    localStorage.setItem(

      "wishlist",

      JSON.stringify(
        updatedWishlist
      )

    )
  }

  const addToCart = (item)=>{

    let cart =

    JSON.parse(
      localStorage.getItem(
        "cart"
      )
    ) || []

    cart.push(item)

    localStorage.setItem(

      "cart",

      JSON.stringify(cart)

    )

    alert("Added To Cart")
  }

  return(

    <>

      <div className="page-container">

        <div className="wishlist-page">

          <h1>

            My Wishlist ❤️

          </h1>

          {

          wishlist.length === 0

          ?

          <div className="empty-wishlist">

            No Wishlist Items Found

          </div>

          :

          <div className="wishlist-grid">

            {wishlist.map((item)=>(

              <div
              className="wishlist-card"
              key={item.id}

              onClick={()=>

              window.location.href =

              `/product/${item.id}`

              }>

                <img src={item.image} />

                <h2>

                  {item.name}

                </h2>

                <p>

                  ₹{item.price}

                </p>

                <button

                className="wishlist-cart-btn"

                onClick={(e)=>{

                  e.stopPropagation()

                  addToCart(item)

                }}>

                  Add To Cart

                </button>

                <button

                className="remove-wishlist-btn"

                onClick={(e)=>{

                  e.stopPropagation()

                  removeWishlist(item.id)

                }}>

                  Remove

                </button>

              </div>

            ))}

          </div>

          }

        </div>

      </div>

      <SmallFooter />

    </>

  )
}