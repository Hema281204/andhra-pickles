import { useState }
from "react"

import { db }
from "../firebase/firebase"

import {
  collection,
  addDoc
}
from "firebase/firestore"

export default function Cart() {

  const cart =
  JSON.parse(localStorage.getItem("cart")) || []

  const [name,setName] = useState("")
  const [phone,setPhone] = useState("")
  const [address,setAddress] = useState("")

  const [showPopup,setShowPopup] =
  useState(false)

  const [currentOrderId,
  setCurrentOrderId] =
  useState("")

  const [confirmPopup,
  setConfirmPopup] =
  useState(false)

  const [paymentType,
  setPaymentType] =
  useState("")

  let total = 0

  cart.forEach(item=>{

    total += item.price * item.quantity

  })

  const increaseQty = (index)=>{

    let updatedCart = [...cart]

    updatedCart[index].quantity += 1

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    )

    window.location.reload()
  }

  const decreaseQty = (index)=>{

    let updatedCart = [...cart]

    if(updatedCart[index].quantity > 1){

      updatedCart[index].quantity -= 1
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    )

    window.location.reload()
  }

  const removeItem = (index)=>{

    let updatedCart = [...cart]

    updatedCart.splice(index,1)

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    )

    window.location.reload()
  }

  const clearCart = ()=>{

    localStorage.removeItem("cart")

    window.location.reload()
  }

  const onlinePayment = async ()=>{

    const orderId =
    "AP" + Date.now()

    await addDoc(

      collection(db,"orders"),

      {

        orderId,

        customerName:name,

        phone,

        address,

        cart,

        total,

        payment:"Online Payment",

        status:"Pending"

      }

    )

    let message =
    `Hello Andhra Pickles,%0A%0A`

    message +=
    `Order ID: ${orderId}%0A`

    message +=
    `Customer Name: ${name}%0A`

    message +=
    `Phone: ${phone}%0A`

    message +=
    `Address: ${address}%0A%0A`

    message +=
    `Ordered Items:%0A`

    cart.forEach(item=>{

      message +=
      `• ${item.name}%0A`

      message +=
      `Qty: ${item.quantity}%0A`

      message +=
      `Price: ₹${item.price * item.quantity}%0A%0A`

    })

    message +=
    `%0ATotal Amount: ₹${total}%0A`

    message +=
    `I will pay online.`

    localStorage.setItem(
      "customerPhone",
      phone
    )

    window.open(

      `https://wa.me/918317565117?text=${message}`,

      "_blank"

    )

    setCurrentOrderId(orderId)

    setShowPopup(true)
  }

  const codPayment = async ()=>{

    const orderId =
    "AP" + Date.now()

    await addDoc(

      collection(db,"orders"),

      {

        orderId,

        customerName:name,

        phone,

        address,

        cart,

        total,

        payment:"Cash On Delivery",

        status:"Pending"

      }

    )

    let message =
    `Hello Andhra Pickles,%0A%0A`

    message +=
    `Order ID: ${orderId}%0A`

    message +=
    `Customer Name: ${name}%0A`

    message +=
    `Phone: ${phone}%0A`

    message +=
    `Address: ${address}%0A%0A`

    message +=
    `Ordered Items:%0A`

    cart.forEach(item=>{

      message +=
      `• ${item.name}%0A`

      message +=
      `Qty: ${item.quantity}%0A`

      message +=
      `Price: ₹${item.price * item.quantity}%0A%0A`

    })

    message +=
    `%0ATotal Amount: ₹${total}%0A`

    message +=
    `I will pay Cash On Delivery.`

    localStorage.setItem(
      "customerPhone",
      phone
    )

    window.open(

      `https://wa.me/918317565117?text=${message}`,

      "_blank"

    )

    setCurrentOrderId(orderId)

    setShowPopup(true)
  }

  const confirmOrder = ()=>{

    if(
      !name ||
      !phone ||
      !address
    ){
      alert("Fill all details")
      return
    }

    setConfirmPopup(false)

    if(paymentType === "online"){

      onlinePayment()

    }else{

      codPayment()
    }
  }

  return (

    <div className="cart-page">

      <h1>Your Cart</h1>

      {cart.map((item,index)=>(

        <div className="cart-box" key={index}>

          <h3>{item.name}</h3>

          <p>
            ₹{item.price}
          </p>

          <div className="qty-box">

            <button
            onClick={()=>decreaseQty(index)}>

              -

            </button>

            <span>
              {item.quantity}
            </span>

            <button
            onClick={()=>increaseQty(index)}>

              +

            </button>

          </div>

          <button
          className="remove-btn"
          onClick={()=>removeItem(index)}>

            Remove

          </button>

        </div>

      ))}

      <h2 className="total">
        Total: ₹{total}
      </h2>

      <button
      className="clear-btn"
      onClick={clearCart}>

        Clear Cart

      </button>

      <input
      placeholder="Enter Name"
      onChange={(e)=>setName(e.target.value)}
      />

      <input
      placeholder="Enter Phone Number"
      onChange={(e)=>setPhone(e.target.value)}
      />

      <textarea
      placeholder="Enter Address"
      onChange={(e)=>setAddress(e.target.value)}
      />

      <div className="payment-buttons">

        <button
        className="online-btn"

        onClick={()=>{

          setPaymentType("online")

          setConfirmPopup(true)

        }}>

          Online Payment

        </button>

        <button
        className="cod-btn"

        onClick={()=>{

          setPaymentType("cod")

          setConfirmPopup(true)

        }}>

          Cash On Delivery

        </button>

      </div>

      {confirmPopup && (

        <div className="success-overlay">

          <div className="success-box">

            <h1>
              Confirm Order
            </h1>

            <p>

              Are you sure you want
              to place this order?

            </p>

            <button
            onClick={confirmOrder}>

              Confirm Order

            </button>

            <button

            className="continue-btn"

            onClick={()=>
            setConfirmPopup(false)}

            >

              Cancel

            </button>

          </div>

        </div>

      )}

      {showPopup && (

        <div className="success-overlay">

          <div className="success-box">

            <h1>
              🎉 Order Placed
            </h1>

            <p>

              Your order has been placed successfully.

            </p>

            <h2>

              Order ID:
              {currentOrderId}

            </h2>

            <button

            onClick={()=>
            window.location.href="/track"}

            >

              Track Order

            </button>

            <button

            className="continue-btn"

            onClick={()=>{

              setShowPopup(false)

              window.location.href="/products"

            }}

            >

              Continue Shopping

            </button>

          </div>

        </div>

      )}

    </div>
  )
}