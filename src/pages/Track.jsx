import { useState }
from "react"

import { db }
from "../firebase/firebase"

import {
  collection,
  getDocs
}
from "firebase/firestore"

export default function Track(){

  const [orderId,setOrderId] =
  useState("")

  const [status,setStatus] =
  useState("")

  const [payment,setPayment] =
  useState("")

  const trackOrder =
  async ()=>{

    const querySnapshot =
    await getDocs(
      collection(db,"orders")
    )

    let found = false

    querySnapshot.forEach((doc)=>{

      const data = doc.data()

      if(data.orderId === orderId){

        setStatus(data.status)

        setPayment(
          data.paymentStatus
          || "Unpaid"
        )

        found = true
      }

    })

    if(!found){

      setStatus("Order Not Found")

      setPayment("")
    }
  }

  return(

    <div className="track-page">

      <h1>Track Your Order</h1>

      <input

      placeholder="Enter Order ID"

      onChange={(e)=>
      setOrderId(e.target.value)}

      />

      <button onClick={trackOrder}>

        Track Order

      </button>

      <div className="track-result">

        <h2>
          Order Status:
          {status}
        </h2>

        <h2>
          Payment:
          {payment}
        </h2>

      </div>

    </div>
  )
}