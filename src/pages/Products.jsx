import { useState,useEffect }
from "react"

const products = [

  {
    id:1,
    name:"Mango Pickle",
    category:"Veg",
    badge:"Best Seller",
    price:250,
    oldPrice:350,
    stock:"In Stock",
    quantity:1,
    description:"Traditional spicy Andhra mango pickle.",
    image:"https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000"
  },

  {
    id:2,
    name:"Chicken Pickle",
    category:"Non Veg",
    badge:"Hot",
    price:500,
    oldPrice:650,
    stock:"In Stock",
    quantity:1,
    description:"Delicious homemade chicken pickle.",
    image:"https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1000"
  },

  {
    id:3,
    name:"Prawn Pickle",
    category:"Sea Food",
    badge:"Premium",
    price:700,
    oldPrice:900,
    stock:"Limited",
    quantity:1,
    description:"Premium prawn pickle with rich spices.",
    image:"https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1000"
  }

]

export default function Products(){

  const [search,setSearch] =
  useState("")

  const [category,setCategory] =
  useState("All")

  const [selectedProduct,
  setSelectedProduct] =
  useState(null)

  const [reviewName,
  setReviewName] =
  useState("")

  const [reviewText,
  setReviewText] =
  useState("")

  const [reviewRating,
  setReviewRating] =
  useState("5")

  const [reviews,setReviews] =
  useState({})

  useEffect(()=>{

    const savedReviews =

    JSON.parse(
      localStorage.getItem("reviews")
    ) || {}

    setReviews(savedReviews)

  },[])

  const addToCart = (item)=>{

    let cart =
    JSON.parse(localStorage.getItem("cart")) || []

    const existingProduct =
    cart.find(
      product => product.id === item.id
    )

    if(existingProduct){

      existingProduct.quantity += 1

    }else{

      cart.push(item)
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    )

    alert("Added To Cart")
  }

  const addReview = ()=>{

    if(
      !reviewName ||
      !reviewText
    ){
      alert("Fill all review details")
      return
    }

    const productReviews =

    reviews[selectedProduct.id] || []

    const newReview = {

      name:reviewName,

      text:reviewText,

      rating:Number(reviewRating)

    }

    const updatedReviews = {

      ...reviews,

      [selectedProduct.id]:
      [...productReviews,newReview]

    }

    setReviews(updatedReviews)

    localStorage.setItem(

      "reviews",

      JSON.stringify(updatedReviews)

    )

    setReviewName("")
    setReviewText("")
    setReviewRating("5")
  }

  const getAverageRating = (id)=>{

    const productReviews =
    reviews[id] || []

    if(productReviews.length === 0){

      return "5.0"
    }

    let total = 0

    productReviews.forEach(item=>{

      total += item.rating

    })

    return (
      total /
      productReviews.length
    ).toFixed(1)
  }

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

  return(

    <div>

      <div className="filter-section">

        <input

        placeholder="Search Pickles"

        onChange={(e)=>
        setSearch(e.target.value)}

        />

        <select
        onChange={(e)=>
        setCategory(e.target.value)}>

          <option>All</option>
          <option>Veg</option>
          <option>Non Veg</option>
          <option>Sea Food</option>

        </select>

      </div>

      <div className="products-grid">

        {filteredProducts.map((item)=>(

          <div className="card" key={item.id}>

            <img
            src={item.image}

            onClick={()=>
            setSelectedProduct(item)}

            />

            <div className="card-content">

              <span className="badge">

                {item.badge}

              </span>

              <h2>{item.name}</h2>

              <h3 className="rating">

                ⭐ {getAverageRating(item.id)}

              </h3>

              <h4 className="stock">

                {item.stock}

              </h4>

              <div className="price-box">

                <p className="new-price">

                  ₹{item.price}

                </p>

                <p className="old-price">

                  ₹{item.oldPrice}

                </p>

              </div>

              <button
              onClick={()=>addToCart(item)}>

                Add To Cart

              </button>

            </div>

          </div>

        ))}

      </div>

      {selectedProduct && (

        <div className="modal-overlay">

          <div className="modal-box">

            <button
            className="close-btn"

            onClick={()=>
            setSelectedProduct(null)}>

              ×

            </button>

            <img
            src={selectedProduct.image}
            />

            <h1>
              {selectedProduct.name}
            </h1>

            <h3>

              ⭐
              {getAverageRating(
                selectedProduct.id
              )}

            </h3>

            <p>
              {selectedProduct.description}
            </p>

            <h2>
              ₹{selectedProduct.price}
            </h2>

            <button
            onClick={()=>
            addToCart(selectedProduct)}>

              Add To Cart

            </button>

            <div className="review-section-box">

              <h2>
                Reviews
              </h2>

              {(reviews[selectedProduct.id]
              || []).map((item,index)=>(

                <div
                className="review-item"
                key={index}>

                  <h4>
                    {item.name}
                  </h4>

                  <h5>
                    ⭐ {item.rating}
                  </h5>

                  <p>
                    {item.text}
                  </p>

                </div>

              ))}

              <input

              placeholder="Your Name"

              value={reviewName}

              onChange={(e)=>
              setReviewName(e.target.value)}

              />

              <textarea

              placeholder="Write Review"

              value={reviewText}

              onChange={(e)=>
              setReviewText(e.target.value)}

              />

              <select

              value={reviewRating}

              onChange={(e)=>
              setReviewRating(e.target.value)}>

                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>

              </select>

              <button
              onClick={addReview}>

                Submit Review

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}