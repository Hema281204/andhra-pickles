import { useParams }
from "react-router-dom"

import { useState }
from "react"
import { toast }
from "react-toastify"
const products = [

  {
    id:1,
    name:"Mango Pickle",
    price:250,
    image:"https://www.seema.com/wp-content/uploads/2022/01/mango-pickle1.jpg",
    description:
    "Traditional mango pickle made with handpicked mangoes and authentic Andhra spices.",
    ingredients:
    "Raw Mango, Red Chilli, Mustard, Fenugreek, Oil, Salt",
    shelfLife:"12 Months"
  },

  {
    id:2,
    name:"Chicken Pickle",
    price:500,
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU7aXX2xKEVfhCoaCoYhaJRIR1Vb4I4nwtcA&s",
    description:
    "Spicy and flavorful chicken pickle made with tender pieces and aromatic spices.",
    ingredients:
    "Chicken, Chilli Powder, Garlic, Oil, Salt",
    shelfLife:"6 Months"
  },

  {
    id:3,
    name:"Prawn Pickle",
    price:700,
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTY2U-VSxlY6iAO0recaS_JSxUuv_E6BFTseA&s",
    description:
    "Delicious prawn pickle with rich spices and traditional homemade taste.",
    ingredients:
    "Prawns, Chilli Powder, Garlic, Oil, Salt",
    shelfLife:"6 Months"
  },

  {
    id:4,
    name:"Fish Pickle",
    price:450,
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjmy-RCln86FAFOishwQDEpn7EiUJ6NwCfXg&s",
    description:
    "Authentic fish pickle packed with spicy flavors.",
    ingredients:
    "Fish, Chilli Powder, Garlic, Oil, Salt",
    shelfLife:"6 Months"
  },

  {
    id:5,
    name:"Gongura Pickle",
    price:220,
    image:"https://vellankifoods.com/cdn/shop/products/gongura_pickle_2.jpg?v=1680180278",
    description:
    "Tangy gongura pickle prepared traditionally.",
    ingredients:
    "Gongura Leaves, Chilli Powder, Garlic, Oil, Salt",
    shelfLife:"10 Months"
  },

  {
    id:6,
    name:"Tomato Pickle",
    price:200,
    image:"https://i.ytimg.com/vi/u_gJ5PHkYDs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD5l0723kWH3YwXr4cOTOGipgdPtw",
    description:
    "Spicy tomato pickle with homemade taste.",
    ingredients:
    "Tomato, Chilli Powder, Garlic, Oil, Salt",
    shelfLife:"8 Months"
  },

  {
    id:7,
    name:"Mutton Pickle",
    price:850,
    image:"https://patnamlopalleruchulu.in/wp-content/uploads/2024/09/MUTTON-BONLESS-580x480.jpg",
    description:
    "Premium mutton pickle with aromatic spices.",
    ingredients:
    "Mutton, Chilli Powder, Garlic, Oil, Salt",
    shelfLife:"6 Months"
  },

  {
    id:8,
    name:"Lemon Pickle",
    price:180,
    image:"https://tulasipickles.com/wp-content/uploads/2024/11/Lemon.jpg",
    description:
    "Classic lemon pickle with spicy Andhra flavor.",
    ingredients:
    "Lemon, Chilli Powder, Mustard, Oil, Salt",
    shelfLife:"12 Months"
  },

  {
    id:9,
    name:"Garlic Pickle",
    price:240,
    image:"https://vellankifoods.com/cdn/shop/products/garlic_pickle.jpg?v=1680180055",
    description:
    "Strong flavorful garlic pickle with rich masala.",
    ingredients:
    "Garlic, Chilli Powder, Oil, Salt",
    shelfLife:"10 Months"
  },

  {
    id:10,
    name:"Crab Pickle",
    price:950,
    image:"https://patnamlopalleruchulu.in/wp-content/uploads/2024/09/CRAB-1-580x480.jpg",
    description:
    "Special coastal crab pickle with spicy masala.",
    ingredients:
    "Crab, Chilli Powder, Garlic, Oil, Salt",
    shelfLife:"5 Months"
  },

  {
    id:11,
    name:"Amla Pickle",
    price:210,
    image:"https://tulasipickles.com/wp-content/uploads/2024/11/Amla.jpg",
    description:
    "Healthy gooseberry pickle rich in flavor.",
    ingredients:
    "Amla, Chilli Powder, Mustard, Oil, Salt",
    shelfLife:"10 Months"
  },

  {
    id:12,
    name:"Paneer Pickle",
    price:320,
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhYphZdtY1lV9t3AxfejcM6ZQm3RWy2eDv9A&s",
    description:
    "Unique spicy paneer pickle with creamy texture.",
    ingredients:
    "Paneer, Chilli Powder, Garlic, Oil, Salt",
    shelfLife:"4 Months"
  }

]

export default function ProductDetails(){

  const {id} =
  useParams()

  const product =
  products.find(
    item =>
    item.id === Number(id)
  )

  const [qty,setQty] =
  useState(1)

  const [selectedWeight,
  setSelectedWeight] =
  useState("250g")

  const [review,setReview] =
  useState("")

  const [selectedRating,
  setSelectedRating] =
  useState(5)

  const [reviews,setReviews] =
  useState([])

  const [openSection,
  setOpenSection] =
  useState("description")

  if(!product){

    return <h1>
      Product Not Found
    </h1>
  }

  const weightPrices = {

    "250g":product.price,

    "500g":product.price * 2,

    "1kg":product.price * 4

  }

  const addToCart = ()=>{

    let cart =
    JSON.parse(localStorage.getItem("cart")) || []

    cart.push({

      ...product,

      quantity:qty,

      weight:selectedWeight,

      total:
      weightPrices[selectedWeight] * qty

    })

    localStorage.setItem(

      "cart",

      JSON.stringify(cart)

    )

    toast.success(
"Added To Cart"
)
  }

  const whatsappOrder = ()=>{

    const message =

    `Order Details:%0A
    Product: ${product.name}%0A
    Weight: ${selectedWeight}%0A
    Quantity: ${qty}%0A
    Total: ₹${weightPrices[selectedWeight] * qty}`

    window.open(

      `https://wa.me/919999999999?text=${message}`,

      "_blank"
    )
  }

  const submitReview = ()=>{

    if(review.trim() === ""){

      return
    }

    setReviews([

      ...reviews,

      {

        text:review,

        rating:selectedRating

      }

    ])

    setReview("")
  }

  const totalRatings =

  reviews.reduce(

    (acc,item)=>

    acc + item.rating,

    0

  )

  const averageRating =

  reviews.length > 0

  ?

  (
    totalRatings /
    reviews.length
  ).toFixed(1)

  :

  4.9

  return(

    <div className="details-page">

      <div className="details-container">

        <div className="details-image">

          <img src={product.image} />

        </div>

        <div className="details-content">

          <h1>

            {product.name}

          </h1>

          <div className="details-rating">

            ⭐ {averageRating}

            ({reviews.length} Reviews)

          </div>

          <h2>

            ₹{weightPrices[selectedWeight] * qty}

          </h2>

          <div className="weight-buttons">

            <button

            className={
            selectedWeight === "250g"
            ?
            "active-weight"
            :
            ""
            }

            onClick={()=>
            setSelectedWeight("250g")}>

              250g

            </button>

            <button

            className={
            selectedWeight === "500g"
            ?
            "active-weight"
            :
            ""
            }

            onClick={()=>
            setSelectedWeight("500g")}>

              500g

            </button>

            <button

            className={
            selectedWeight === "1kg"
            ?
            "active-weight"
            :
            ""
            }

            onClick={()=>
            setSelectedWeight("1kg")}>

              1kg

            </button>

          </div>

          <div className="details-qty">

            <button
            onClick={()=>
            qty > 1 &&
            setQty(qty-1)}>

              -
            </button>

            <span>

              {qty}

            </span>

            <button
            onClick={()=>
            setQty(qty+1)}>

              +
            </button>

          </div>

          <button

          className="details-cart-btn"

          onClick={addToCart}>

            Add To Cart

          </button>

          <button

          className="details-whatsapp-btn"

          onClick={whatsappOrder}>

            WhatsApp Order

          </button>

          <div className="toggle-box">

            <button
            onClick={()=>
            setOpenSection(
              openSection ===
              "description"
              ?
              ""
              :
              "description"
            )}>

              Description

            </button>

            {openSection ===
            "description" && (

              <div className="toggle-content">

                {product.description}

              </div>

            )}

            <button
            onClick={()=>
            setOpenSection(
              openSection ===
              "ingredients"
              ?
              ""
              :
              "ingredients"
            )}>

              Ingredients

            </button>

            {openSection ===
            "ingredients" && (

              <div className="toggle-content">

                {product.ingredients}

              </div>

            )}

            <button
            onClick={()=>
            setOpenSection(
              openSection ===
              "reviews"
              ?
              ""
              :
              "reviews"
            )}>

              Reviews

            </button>

            {openSection ===
            "reviews" && (

              <div className="toggle-content">

                <textarea

                className="review-input"

                placeholder=
                "Write your review..."

                value={review}

                onChange={(e)=>
                setReview(
                  e.target.value
                )}

                />

                <div className="star-select">

                  {[1,2,3,4,5]
                  .map((star)=>(

                    <span

                    key={star}

                    onClick={()=>
                    setSelectedRating(
                      star
                    )}

                    className={

                    selectedRating
                    >= star

                    ?

                    "active-star"

                    :

                    ""

                    }>

                      ★

                    </span>

                  ))}

                </div>

                <button

                className="review-btn"

                onClick={submitReview}>

                  Submit Review

                </button>

                {reviews.map(
                (item,index)=>(

                  <div
                  className="review-card"
                  key={index}>

                    {"★".repeat(
                    item.rating)}

                    <p>

                      {item.text}

                    </p>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

</div>

<div className="related-section">

  <h2>

    Related Pickles

  </h2>

  <div className="related-grid">

    {products

    .filter(
      item =>
      item.id !== product.id
    )

    .slice(0,4)

    .map((item)=>(

      <div

      className="related-card"

      key={item.id}

      onClick={()=>

      window.location.href =

      `/product/${item.id}`

      }>

        <img src={item.image} />

        <h3>

          {item.name}

        </h3>

        <p>

          ₹{item.price}

        </p>

      </div>

    ))}

  </div>

</div>

</div>
  )
}