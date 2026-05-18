import { useEffect,useState }
from "react"

import { db }
from "../firebase/firebase"

import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc
}
from "firebase/firestore"

export default function Admin(){

  const [orders,setOrders] =
  useState([])

  const [selectedOrder,
  setSelectedOrder] =
  useState(null)

  const [search,setSearch] =
  useState("")

  const [filterStatus,
  setFilterStatus] =
  useState("All")

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

  const deleteOrder =
  async (id)=>{

    const confirmDelete =
    window.confirm(

      "Delete this order?"

    )

    if(!confirmDelete){

      return
    }

    await deleteDoc(

      doc(db,"orders",id)

    )

    getOrders()
  }

  const filteredOrders =

  orders.filter((item)=>{

    const matchesSearch =

    item.customerName
    ?.toLowerCase()
    .includes(
      search.toLowerCase()
    )

    ||

    item.orderId
    ?.toLowerCase()
    .includes(
      search.toLowerCase()
    )

    const matchesStatus =

    filterStatus === "All"

    ||

    item.status === filterStatus

    return (
      matchesSearch &&
      matchesStatus
    )
  })

  const totalOrders =
  orders.length

  const pendingOrders =

  orders.filter(item=>

  item.status === "Pending"

  ).length

  const shippedOrders =

  orders.filter(item=>

  item.status === "Shipped"

  ||

  item.status ===
  "Out For Delivery"

  ).length

  const deliveredOrders =

  orders.filter(item=>

  item.status === "Delivered"

  ).length

  const totalRevenue =

  orders.reduce((total,item)=>{

    return total +
    Number(item.total || 0)

  },0)

  const paidRevenue =

  orders
  .filter(item=>

  item.paymentStatus === "Paid"

  )

  .reduce((total,item)=>{

    return total +
    Number(item.total || 0)

  },0)

  const unpaidRevenue =

  orders
  .filter(item=>

  item.paymentStatus !== "Paid"

  )

  .reduce((total,item)=>{

    return total +
    Number(item.total || 0)

  },0)

  return(

    <div className="admin-page">

      <h1>
        Admin Dashboard
      </h1>

      <div className="dashboard-cards">

        <div className="dash-card">

          <h2>
            Total Orders
          </h2>

          <h1>
            {totalOrders}
          </h1>

        </div>

        <div className="dash-card pending-card">

          <h2>
            Pending
          </h2>

          <h1>
            {pendingOrders}
          </h1>

        </div>

        <div className="dash-card shipped-card">

          <h2>
            Shipped
          </h2>

          <h1>
            {shippedOrders}
          </h1>

        </div>

        <div className="dash-card delivered-card">

          <h2>
            Delivered
          </h2>

          <h1>
            {deliveredOrders}
          </h1>

        </div>

        <div className="dash-card revenue-card">

          <h2>
            Total Revenue
          </h2>

          <h1>
            ₹{totalRevenue}
          </h1>

        </div>

        <div className="dash-card paid-revenue-card">

          <h2>
            Paid Revenue
          </h2>

          <h1>
            ₹{paidRevenue}
          </h1>

        </div>

        <div className="dash-card unpaid-revenue-card">

          <h2>
            Unpaid Amount
          </h2>

          <h1>
            ₹{unpaidRevenue}
          </h1>

        </div>

      </div>

      <div className="admin-filters">

        <input

        placeholder="Search Orders"

        onChange={(e)=>
        setSearch(e.target.value)}

        />

        <select

        onChange={(e)=>
        setFilterStatus(
          e.target.value
        )}>

          <option>
            All
          </option>

          <option>
            Pending
          </option>

          <option>
            Preparing
          </option>

          <option>
            Shipped
          </option>

          <option>
            Out For Delivery
          </option>

          <option>
            Delivered
          </option>

        </select>

      </div>

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

          {filteredOrders.map((item,index)=>(

            <tr

            key={index}

            className="admin-row"

            onClick={()=>
            setSelectedOrder(item)}>

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

                onClick={(e)=>{

                  e.stopPropagation()

                  markPaid(
                    item.firebaseId
                  )

                }}>

                  Mark Paid

                </button>

                <button
                className="prepare-btn"

                onClick={(e)=>{

                  e.stopPropagation()

                  updateStatus(
                    item.firebaseId,
                    "Preparing"
                  )

                }}>

                  Preparing

                </button>

                <button
                className="ship-btn"

                onClick={(e)=>{

                  e.stopPropagation()

                  updateStatus(
                    item.firebaseId,
                    "Shipped"
                  )

                }}>

                  Shipped

                </button>

                <button
                className="ship-btn"

                onClick={(e)=>{

                  e.stopPropagation()

                  updateStatus(
                    item.firebaseId,
                    "Out For Delivery"
                  )

                }}>

                  Out For Delivery

                </button>

                <button
                className="deliver-btn"

                onClick={(e)=>{

                  e.stopPropagation()

                  updateStatus(
                    item.firebaseId,
                    "Delivered"
                  )

                }}>

                  Delivered

                </button>

                <button
                className="delete-btn"

                onClick={(e)=>{

                  e.stopPropagation()

                  deleteOrder(
                    item.firebaseId
                  )

                }}>

                  Delete

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {selectedOrder && (

        <div className="success-overlay">

          <div className="modal-box">

            <button
            className="close-btn"

            onClick={()=>
            setSelectedOrder(null)}>

              ×

            </button>

            <h1>
              Order Details
            </h1>

            <h3>

              Customer:
              {selectedOrder.customerName}

            </h3>

            <h3>

              Phone:
              {selectedOrder.phone}

            </h3>

            <h3>

              House:
              {selectedOrder.house}

            </h3>

            <h3>

              Street:
              {selectedOrder.street}

            </h3>

            <h3>

              Landmark:
              {selectedOrder.landmark}

            </h3>

            <h3>

              City:
              {selectedOrder.location}

            </h3>

            <h3>

              Pincode:
              {selectedOrder.pincode}

            </h3>

            <h3>

              Payment:
              {selectedOrder.payment}

            </h3>

            <h3>

              Total:
              ₹{selectedOrder.total}

            </h3>

            <h2>
              Ordered Items
            </h2>

            {selectedOrder.cart.map((item,index)=>(

              <div
              className="review-item"
              key={index}>

                <h3>
                  {item.name}
                </h3>

                <p>
                  Quantity:
                  {item.quantity}
                </p>

                <p>
                  Price:
                  ₹{item.price}
                </p>

              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  )
}