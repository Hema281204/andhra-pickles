import { useState } from "react"

import { useNavigate } from "react-router-dom"

import SmallFooter
from "../components/SmallFooter"

const products = [

  {
    id:1,
    name:"Mango Pickle",
    category:"Veg",
    price:250,
    quantity:1,

    reviews:[],

    description:
    "Traditional mango pickle with authentic Andhra spices.",

    image:
    "https://www.seema.com/wp-content/uploads/2022/01/mango-pickle1.jpg",

    icon:"🥭"
  },

  {
    id:2,
    name:"Chicken Pickle",
    category:"Non Veg",
    price:500,
    quantity:1,

    reviews:[],

    description:
    "Spicy chicken pickle with rich homemade flavor.",

    image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU7aXX2xKEVfhCoaCoYhaJRIR1Vb4I4nwtcA&s",

    icon:"🍗"
  },

  {
    id:3,
    name:"Prawn Pickle",
    category:"Sea Food",
    price:700,
    quantity:1,

    reviews:[],

    description:
    "Delicious prawn pickle with coastal spices.",

    image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY2U-VSxlY6iAO0recaS_JSxUuv_E6BFTseA&s",

    icon:"🍤"
  },

  {
    id:4,
    name:"Fish Pickle",
    category:"Sea Food",
    price:450,
    quantity:1,

    reviews:[],

    description:
    "Authentic fish pickle packed with spicy flavors.",

    image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjmy-RCln86FAFOishwQDEpn7EiUJ6NwCfXg&s",

    icon:"🐟"
  },

  {
    id:5,
    name:"Gongura Pickle",
    category:"Veg",
    price:220,
    quantity:1,

    reviews:[],

    description:
    "Tangy gongura pickle prepared traditionally.",

    image:
    "https://vellankifoods.com/cdn/shop/products/gongura_pickle_2.jpg?v=1680180278",

    icon:"🌿"
  },

  {
    id:6,
    name:"Tomato Pickle",
    category:"Veg",
    price:200,
    quantity:1,

    reviews:[],

    description:
    "Spicy tomato pickle with homemade taste.",

    image:
    "https://i.ytimg.com/vi/u_gJ5PHkYDs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD5l0723kWH3YwXr4cOTOGipgdPtw",

    icon:"🍅"
  },

  {
    id:7,
    name:"Mutton Pickle",
    category:"Non Veg",
    price:850,
    quantity:1,

    reviews:[],

    description:
    "Premium mutton pickle with aromatic spices.",

    image:
    "https://patnamlopalleruchulu.in/wp-content/uploads/2024/09/MUTTON-BONLESS-580x480.jpg",

    icon:"🍖"
  },

  {
    id:8,
    name:"Lemon Pickle",
    category:"Veg",
    price:180,
    quantity:1,

    reviews:[],

    description:
    "Classic lemon pickle with spicy Andhra flavor.",

    image:
    "https://tulasipickles.com/wp-content/uploads/2024/11/Lemon.jpg",

    icon:"🍋"
  },

  {
    id:9,
    name:"Garlic Pickle",
    category:"Veg",
    price:240,
    quantity:1,

    reviews:[],

    description:
    "Strong flavorful garlic pickle with rich masala.",

    image:
    "https://vellankifoods.com/cdn/shop/products/garlic_pickle.jpg?v=1680180055",

    icon:"🧄"
  },

  {
    id:10,
    name:"Crab Pickle",
    category:"Sea Food",
    price:950,
    quantity:1,

    reviews:[],

    description:
    "Special coastal crab pickle with spicy masala.",

    image:
    "https://patnamlopalleruchulu.in/wp-content/uploads/2024/09/CRAB-1-580x480.jpg",

    icon:"🦀"
  },

  {
    id:11,
    name:"Amla Pickle",
    category:"Veg",
    price:210,
    quantity:1,

    reviews:[],

    description:
    "Healthy gooseberry pickle rich in flavor.",

    image:
    "https://tulasipickles.com/wp-content/uploads/2024/11/Amla.jpg",

    icon:"🍈"
  },

  {
    id:12,
    name:"Paneer Pickle",
    category:"Veg",
    price:320,
    quantity:1,

    reviews:[],

    description:
    "Unique spicy paneer pickle with creamy texture.",

    image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYphZdtY1lV9t3AxfejcM6ZQm3RWy2eDv9A&s",

    icon:"🧀"
  }

]

export default function Products(){

  const navigate = useNavigate()

  const [search,setSearch] =
  useState("")

  const [category,setCategory] =
  useState("All")

  const [wishlist,setWishlist] =

  useState(

    JSON.parse(

      localStorage.getItem(
        "wishlist"
      )

    ) || []

  )

  const filteredProducts =
  products.filter((item)=>{

    const matchesSearch =

    item.name
    .toLowerCase()
    .includes(search.toLowerCase())

    const matchesCategory =

    category === "All" ||

    item.category === category

    return (

      matchesSearch &&
      matchesCategory

    )

  })

  const toggleWishlist = (item)=>{

    const exists =

    wishlist.find(
      product =>
      product.id === item.id
    )

    let updatedWishlist

    if(exists){

      updatedWishlist =

      wishlist.filter(
        product =>
        product.id !== item.id
      )

    }else{

      updatedWishlist =

      [...wishlist,item]
    }

    setWishlist(updatedWishlist)

    localStorage.setItem(

      "wishlist",

      JSON.stringify(
        updatedWishlist
      )

    )
  }

  return(

    <div className="products-page">

      <h1 className="products-heading">

        Our Pickles

      </h1>

      <div className="products-design">

        ✦ ✦ ✦

      </div>

      <p className="products-subheading">

        Pure Taste. Homemade Goodness.

      </p>

      <div className="products-top-bar">

        <input

        type="text"

        placeholder="Search Pickles..."

        onChange={(e)=>
        setSearch(e.target.value)}

        />

        <select

        onChange={(e)=>
        setCategory(e.target.value)}>

          <option value="All">
            All
          </option>

          <option value="Veg">
            Veg
          </option>

          <option value="Non Veg">
            Non Veg
          </option>

          <option value="Sea Food">
            Sea Food
          </option>

        </select>

      </div>

      <div className="products-grid">

        {filteredProducts.map((item)=>(

          <div
          className="product-card"
          key={item.id}

          onClick={()=>{

            navigate(

              `/product/${item.id}`

            )

          }}>

            <div className="product-image-box">

              <div

              className="wishlist-icon"

              onClick={(e)=>{

                e.stopPropagation()

                toggleWishlist(item)

              }}>

                {

                wishlist.find(
                  product =>
                  product.id === item.id
                )

                ?

                "❤️"

                :

                "🤍"

                }

              </div>

              <img src={item.image} />

              <div className="product-icon">

                {item.icon}

              </div>

            </div>

            <div className="product-content">

              <h2>

                {item.name}

              </h2>

              <div className="product-rating">

                ⭐

                {

                item.reviews.length > 0

                ?

                (

                  item.reviews.reduce(

                    (acc,review)=>

                    acc + review.rating,

                    0

                  )

                  /

                  item.reviews.length

                ).toFixed(1)

                :

                "5.0"

                }

                (

                {item.reviews.length}
                Reviews

                )

              </div>

              <div className="product-features">

                <div>

                  🌿

                  <span>
                    100% Natural
                  </span>

                </div>

                <div>

                  🏠

                  <span>
                    Homemade
                  </span>

                </div>

                <div>

                  🕒

                  <span>
                    No Preservatives
                  </span>

                </div>

              </div>

              <p>

                {item.description}

              </p>

              <div className="product-divider">

                ✦

              </div>

              <h1 className="product-price">

                ₹{item.price}

              </h1>

              <button
              className="product-btn">

                Buy

              </button>

            </div>

          </div>

        ))}

      </div>

      <SmallFooter />

    </div>

  )
}