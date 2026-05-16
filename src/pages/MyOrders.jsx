import { useEffect,useState }
from "react"

import { db }
from "../firebase/firebase"

import {
  collection,
  getDocs
}
from "firebase/firestore"

export default function MyOrders(){

  const [orders,setOrders] =
  useState([])

  useEffect(()=>{

    getOrders()

  },[])

  const getOrders =
  async ()=>{

    const savedPhone =
    localStorage.getItem(
      "customerPhone"
    )

    const querySnapshot =
    await getDocs(
      collection(db,"orders")
    )

    let userOrders = []

    querySnapshot.forEach((doc)=>{

      const data = doc.data()

      if(data.phone === savedPhone){

        userOrders.push(data)
      }

    })

    setOrders(userOrders)
  }

  return(

    <div className="orders-page">

      <h1>My Orders</h1>

      <div className="orders-container">

        {orders.map((item,index)=>(

          <div
          className="order-card"
          key={index}>

            <h2>
              {item.orderId}
            </h2>

            <p>
              Payment:
              {item.payment}
            </p>

            <p>
              Status:
              {item.status}
            </p>

            <p>
              Total:
              ₹{item.total}
            </p>

            <p>
              Payment Status:
              {item.paymentStatus
              || "Unpaid"}
            </p>

          </div>

        ))}

      </div>

    </div>
  )
}