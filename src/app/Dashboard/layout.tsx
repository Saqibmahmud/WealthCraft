import React from 'react'
import UsermenuNav from '../../../Components/UserMenuNavbar/page'
import FooterComponent from '../../../Components/Footer/page'
import NavbarComponent from '../../../Components/Navbar/page'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <>

    <NavbarComponent/>
    {children}
    < FooterComponent />
    
    
    </>
   
  )
}

export default Layout