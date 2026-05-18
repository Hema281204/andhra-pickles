import { useState }
from "react"

import SmallFooter
from "../components/SmallFooter"

import { db }
from "../firebase/firebase"

import {
  collection,
  getDocs
}
from "firebase/firestore"

import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup
}
from "react-leaflet"

export default function Track(){

  const [orderId,setOrderId] =
  useState("")

  const [status,setStatus] =
  useState("")

  const [payment,setPayment] =
  useState("")

  const [found,setFound] =
  useState(false)

  const [customerCoords,
  setCustomerCoords] =
  useState(null)

  const [customerCity,
  setCustomerCity] =
  useState("")

  const sellerLocation =
  [16.5062,80.6480]

  const cityCoordinates = {

    Vijayawada:
    [16.5062,80.6480],

    Hyderabad:
    [17.3850,78.4867],

    Guntur:
    [16.3067,80.4365],

    Visakhapatnam:
    [17.6868,83.2185],

    Tirupati:
    [13.6288,79.4192]

  }

  const trackOrder =
  async ()=>{

    const querySnapshot =
    await getDocs(
      collection(db,"orders")
    )

    let orderFound = false

    querySnapshot.forEach((doc)=>{

      const data = doc.data()

      if(data.orderId === orderId){

        setStatus(data.status)

        setPayment(
          data.payment
        )

        setCustomerCity(
          data.location
        )

        const coords =

        cityCoordinates[
          data.location
        ]

        if(coords){

          setCustomerCoords(coords)
        }

        orderFound = true
      }

    })

    setFound(orderFound)

    if(!orderFound){

      alert("Order Not Found")
    }
  }

  const steps = [

    "Order Confirmed",

    "Preparing",

    "Shipped",

    "Out For Delivery",

    "Delivered"

  ]

  const currentStep =
  steps.indexOf(status)

  return(
    <div className="track-wrapper">

    <div className="track-page">

      <h1>

        Track Your Order

      </h1>

      <div className="track-search">

        <input

        placeholder="Enter Order ID"

        onChange={(e)=>
        setOrderId(e.target.value)}

        />

        <button
        onClick={trackOrder}>

          Track Order

        </button>

      </div>

      {found && (

        <div className="track-result">

          <h2>

            Status:
            {status}

          </h2>

          <h3>

            Payment:
            {payment}

          </h3>

          <h3>

            Delivery City:
            {customerCity}

          </h3>

          <div className="timeline">

            {steps.map((step,index)=>(

              <div
              className="timeline-step"
              key={index}>

                <div

                className={

                index <= currentStep

                ?

                "circle active"

                :

                "circle"

                }>

                  ✓

                </div>

                <p>

                  {step}

                </p>

              </div>

            ))}

          </div>

          {

          customerCoords && (

            <div className="map-wrapper">

              <MapContainer

              center={customerCoords}

              zoom={7}

              scrollWheelZoom={false}

              className="leaflet-map">

                <TileLayer

                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                />

                <Marker
                position={sellerLocation}>

                  <Popup>

                    Andhra Pickles Store

                  </Popup>

                </Marker>

                <Marker
                position={customerCoords}>

                  <Popup>

                    Customer Location

                  </Popup>

                </Marker>

                <Polyline

                positions={[

                  sellerLocation,

                  customerCoords

                ]}

                color="red"

                />

              </MapContainer>

            </div>

          )}

        </div>

      )}
      

    </div>
    <SmallFooter />
    </div>
    
  )
}