import React, { lazy, Profiler, Suspense, useEffect, useState } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import Login from "./Auth/2-Login/Login"
import Navbar from "./Components/NavBar"
import { CartProvider } from "./context/CartContext"
import FallbackLoader from "./Components/FallbackLoader"
import { onRenderCallback } from "./Components/onRenderCallback"

const Registration= lazy(()=>import('./Auth/1-Register/Registration'))
const HomePage= lazy(()=>import('./Pages/1-Home/HomePage'))
const ProductDetailsPage= lazy(()=>import('./Pages/1-Home/ProductDetailsPage'))
const MyCart= lazy(()=>import('./Pages/2-Cart/MyCart'))

function App() {

  const location = useLocation();

  const hideNavbar = location.pathname === "/login" || location.pathname === "/";

  const [showLoader, setShowLoader] = useState(true); 

  useEffect(() => {
    setShowLoader(true);
    const timer = setTimeout(() => setShowLoader(false), 1000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <CartProvider>
   <Profiler id="MainApp" onRender={onRenderCallback}>
        {!hideNavbar && <Navbar />}
  
        <Suspense fallback={<FallbackLoader />}>
          {showLoader ? (
            <FallbackLoader />
          ) : (
            <Routes>
              <Route path="/" element={<Registration />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<MyCart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Registration />} />
            </Routes>
          )}
        </Suspense>
      </Profiler>  
    </CartProvider>
  )
}

export default App
