import { Link }
from "react-router-dom"

import { useEffect,useState }
from "react"
import Footer
from "../components/Footer"

const banners = [

  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600",

  "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1600",

  "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1600"

]

export default function Home(){

  const [currentBanner,
  setCurrentBanner] =
  useState(0)

  useEffect(()=>{

    const interval =

    setInterval(()=>{

      setCurrentBanner(

        prev =>
        (prev + 1) %
        banners.length

      )

    },3000)

    return ()=>clearInterval(interval)

  },[])

  return(

    <div>

      <section

      className="hero"

      style={{

        backgroundImage:

        `url(${banners[currentBanner]})`

      }}

      >

        <div className="hero-content">

          <h1>

            Authentic Andhra Pickles

          </h1>

          <p>

            Homemade Traditional Spicy Pickles

          </p>

          <Link to="/products">

            <button>

              Order Now

            </button>

          </Link>

        </div>

      </section>

      <section className="features-section">

        <div className="feature-box">

          <h2>
            🌶 Authentic Taste
          </h2>

          <p>
            Traditional Andhra recipes with rich spices.
          </p>

        </div>

        <div className="feature-box">

          <h2>
            🚚 Fast Delivery
          </h2>

          <p>
            Quick and safe delivery to your doorstep.
          </p>

        </div>

        <div className="feature-box">

          <h2>
            ❤️ Homemade Quality
          </h2>

          <p>
            Freshly prepared with premium ingredients.
          </p>

        </div>

      </section>

      <section className="offer-section">

        <h1>
          Special Offers
        </h1>

        <div className="offer-container">

          <div className="offer-card">

            <h2>

              20% OFF

            </h2>

            <p>

              On Mango Pickle

            </p>

          </div>

          <div className="offer-card">

            <h2>

              Buy 2 Get 1

            </h2>

            <p>

              Chicken Pickle Combo

            </p>

          </div>

          <div className="offer-card">

            <h2>

              Free Delivery

            </h2>

            <p>

              Orders Above ₹999

            </p>

          </div>

        </div>

      </section>

      <Footer />
    </div>
  )
}