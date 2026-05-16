import { useEffect,useState }
from "react"

import { db }
from "../firebase/firebase"

import {
  collection,
  getDocs,
  doc,
  updateDoc
}
from "firebase/firestore"

export default function Admin(){

  const [orders,setOrders] =
  useState([])

  useEffect(()=>{

    getOrders()

  },[])

  const getOrders =
  async ()=>{

    const querySnapshot =
    await getDocs(
      collection(db,"orders")
    )

    let allOrders = []

    querySnapshot.forEach((docItem)=>{

      allOrders.push({

        firebaseId:docItem.id,

        ...docItem.data()

      })

    })

    setOrders(allOrders)
  }

  const markPaid =
  async (id)=>{

    const orderRef =
    doc(db,"orders",id)

    await updateDoc(orderRef,{

      paymentStatus:"Paid"

    })

    getOrders()
  }

  const updateStatus =
  async (id,status)=>{

    const orderRef =
    doc(db,"orders",id)

    await updateDoc(orderRef,{

      status

    })

    getOrders()
  }

  return(

    <div className="admin-page">

      <h1>Admin Dashboard</h1>

      <table>

        <thead>

          <tr>

            <th>Order ID</th>

            <th>Name</th>

            <th>Phone</th>

            <th>Payment</th>

            <th>Status</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {orders.map((item,index)=>(

            <tr key={index}>

              <td>
                {item.orderId}
              </td>

              <td>
                {item.customerName}
              </td>

              <td>
                {item.phone}
              </td>

              <td>

                {item.paymentStatus
                || "Unpaid"}

              </td>

              <td>
                {item.status}
              </td>

              <td>

                <button
                className="paid-btn"
                onClick={()=>
                markPaid(item.firebaseId)}>

                  Mark Paid

                </button>

                <button
                className="prepare-btn"
                onClick={()=>
                updateStatus(
                  item.firebaseId,
                  "Preparing"
                )}>

                  Preparing

                </button>

                <button
                className="ship-btn"
                onClick={()=>
                updateStatus(
                  item.firebaseId,
                  "Shipped"
                )}>

                  Shipped

                </button>

                <button
                className="deliver-btn"
                onClick={()=>
                updateStatus(
                  item.firebaseId,
                  "Delivered"
                )}>

                  Delivered

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}