import { useState }
from "react"

import { db }
from "../firebase/firebase"

import {
  collection,
  addDoc
}
from "firebase/firestore"

import SmallFooter
from "../components/SmallFooter"

export default function Cart() {

  const cart =
  JSON.parse(
    localStorage.getItem("cart")
  ) || []

  const [name,setName] =

  useState(

    localStorage.getItem(
      "customerName"
    ) || ""

  )

  const [phone,setPhone] =

  useState(

    localStorage.getItem(
      "customerPhone"
    ) || ""

  )

  const [house,setHouse] =

  useState(

    localStorage.getItem(
      "customerHouse"
    ) || ""

  )

  const [street,setStreet] =

  useState(

    localStorage.getItem(
      "customerStreet"
    ) || ""

  )

  const [landmark,setLandmark] =

  useState(

    localStorage.getItem(
      "customerLandmark"
    ) || ""

  )

  const [pincode,setPincode] =

  useState(

    localStorage.getItem(
      "customerPincode"
    ) || ""

  )

  const [location,setLocation] =

  useState(

    localStorage.getItem(
      "customerCity"
    ) || ""

  )

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

    total +=
    (item.total || item.price)
    * item.quantity

  })

  let deliveryCharge = 0

  if(total < 999){

    deliveryCharge = 80

  }else{

    deliveryCharge = 0
  }

  const finalTotal =
  total + deliveryCharge

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

    if(
      updatedCart[index]
      .quantity > 1
    ){

      updatedCart[index]
      .quantity -= 1
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

  const placeOrder = async ()=>{

    const orderId =
    "AP" + Date.now()

    let message =
    `Hello Andhra Pickles,\n\n`

    message +=
    `Order ID: ${orderId}\n`

    message +=
    `Customer Name: ${name}\n`

    message +=
    `Phone: ${phone}\n`

    message +=
    `House: ${house}\n`

    message +=
    `Street: ${street}\n`

    message +=
    `Landmark: ${landmark}\n`

    message +=
    `City: ${location}\n`

    message +=
    `Pincode: ${pincode}\n\n`

    message +=
    `Ordered Items:\n`

    cart.forEach(item=>{

      message +=
      `• ${item.name}\n`

      message +=
      `Weight: ${item.weight}\n`

      message +=
      `Qty: ${item.quantity}\n`

      message +=
      `Price: ₹${item.total}\n\n`

    })

    message +=
    `Subtotal: ₹${total}\n`

    message +=
    `Delivery Charge: ₹${deliveryCharge}\n`

    message +=
    `Final Total: ₹${finalTotal}\n\n`

    message +=
    `Payment Method: `

    message +=

    paymentType === "online"

    ?

    "Online Payment"

    :

    "Cash On Delivery"

    localStorage.setItem(
      "customerName",
      name
    )

    localStorage.setItem(
      "customerPhone",
      phone
    )

    localStorage.setItem(
      "customerHouse",
      house
    )

    localStorage.setItem(
      "customerStreet",
      street
    )

    localStorage.setItem(
      "customerLandmark",
      landmark
    )

    localStorage.setItem(
      "customerPincode",
      pincode
    )

    localStorage.setItem(
      "customerCity",
      location
    )

    localStorage.setItem(
      "latestOrderId",
      orderId
    )

    await addDoc(

      collection(db,"orders"),

      {

        orderId,

        customerName:name,

        phone,

        house,

        street,

        landmark,

        pincode,

        location,

        cart,

        subtotal:total,

        deliveryCharge,

        total:finalTotal,

        payment:
        paymentType === "online"

        ?

        "Online Payment"

        :

        "Cash On Delivery",

        paymentStatus:"Unpaid",

        status:"Order Confirmed",

        date:new Date()
        .toLocaleString()

      }

    )

    const whatsappURL =

    `https://api.whatsapp.com/send?phone=918317565117&text=${encodeURIComponent(message)}`

    window.open(
      whatsappURL,
      "_blank"
    )

    setCurrentOrderId(orderId)

    setShowPopup(true)
  }

  const confirmOrder = ()=>{

    if(
      !name ||
      !phone ||
      !house ||
      !street ||
      !location ||
      !pincode
    ){

      alert(
        "Fill all required details"
      )

      return
    }

    setConfirmPopup(false)

    placeOrder()
  }

  return (

    <div className="cart-wrapper">

      <div className="cart-page">

        <h1 className="cart-heading">

          Your Cart

        </h1>

        {

        cart.length === 0

        ?

        (

          <h2 className="empty-cart">

            Cart is Empty

          </h2>

        )

        :

        (

          <>
          
          {

          cart.map((item,index)=>(

            <div
            className="modern-cart-box"
            key={index}>

              <div className="cart-left">

                <img
                src={item.image}
                alt={item.name}
                className="cart-image"
                />

                <div className="cart-details">

                  <h2>

                    {item.name}

                  </h2>

                  <p
                  className="cart-weight">

                    {item.weight}

                  </p>

                  <h3>

                    ₹{item.total}

                  </h3>

                  <button
                  className="remove-btn"

                  onClick={()=>
                  removeItem(index)}>

                    Remove

                  </button>

                </div>

              </div>

              <div className="cart-right">

                <button
                onClick={()=>
                decreaseQty(index)}>

                  -

                </button>

                <span>

                  {item.quantity}

                </span>

                <button
                onClick={()=>
                increaseQty(index)}>

                  +

                </button>

              </div>

            </div>

          ))}

          <div className="bill-box">

            <h3>

              Subtotal:
              ₹{total}

            </h3>

            <h3>

              Delivery:

              {

              deliveryCharge === 0

              ?

              " FREE"

              :

              ` ₹${deliveryCharge}`

              }

            </h3>

            <h2
            className="final-total">

              Final Total:
              ₹{finalTotal}

            </h2>

          </div>

          {

          total >= 999 && (

            <p
            className="free-delivery">

              🎉 You Got Free Delivery

            </p>

          )}

          <button
          className="clear-btn"
          onClick={clearCart}>

            Clear Cart

          </button>

          <div className="address-grid">

            <input
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Full Name *"
            value={name}
            onChange={(e)=>
            setName(e.target.value)}
            />

            <input
            type="tel"
            name="tel"
            autoComplete="tel"
            placeholder="Phone Number *"
            value={phone}
            onChange={(e)=>
            setPhone(e.target.value)}
            />

            <input
            type="text"
            name="address-line1"
            autoComplete="address-line1"
            placeholder="House / Flat No *"
            value={house}
            onChange={(e)=>
            setHouse(e.target.value)}
            />

            <input
            type="text"
            name="street-address"
            autoComplete="street-address"
            placeholder="Street / Area *"
            value={street}
            onChange={(e)=>
            setStreet(e.target.value)}
            />

            <input
            type="text"
            name="address-level3"
            autoComplete="address-level3"
            placeholder="Landmark"
            value={landmark}
            onChange={(e)=>
            setLandmark(e.target.value)}
            />

            <input
            type="text"
            name="address-level2"
            autoComplete="address-level2"
            placeholder="City *"
            value={location}
            onChange={(e)=>
            setLocation(e.target.value)}
            />

            <input
            type="text"
            name="postal-code"
            autoComplete="postal-code"
            placeholder="Pincode *"
            value={pincode}
            onChange={(e)=>
            setPincode(e.target.value)}
            />

          </div>

          <div className="payment-buttons">

            <button
            className="online-btn"

            onClick={()=>{

              setPaymentType(
                "online"
              )

              setConfirmPopup(true)

            }}>

              Online Payment

            </button>

            <button
            className="cod-btn"

            onClick={()=>{

              setPaymentType(
                "cod"
              )

              setConfirmPopup(true)

            }}>

              Cash On Delivery

            </button>

          </div>

          </>

        )}

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

      <SmallFooter />

    </div>
  )
}