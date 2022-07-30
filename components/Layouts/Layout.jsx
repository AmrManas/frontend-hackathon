import React from 'react'
import TopBar from './TopBar'
import Sidebar from './Sidebar'

const Layout = ({children}) => {
  return (
    <>
        <TopBar/>
        <Sidebar />
        <main>{children}</main>
    </>
  )
}

export default Layout