import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Navbar/Footer.jsx'
import { SessionProvider } from "../../contexts/session.context"
const Layout = () => {

    return (
          <SessionProvider>
            <Navbar />
            <Outlet />
            <Footer />
          </SessionProvider>
    )
}

export default Layout