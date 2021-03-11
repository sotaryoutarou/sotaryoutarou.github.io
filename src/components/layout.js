import React from "react"
import Image from './image'
import GlocalStyle from '../styles/global.module.css'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <header className={GlocalStyle.header}>
        <Image filename='header-sota-noho.png' />
      </header>
    )
  }

  return (
    <div
      className={GlocalStyle.main}
    >
      {header}
      <main>{children}</main>
      <footer style={{ textAlign: 'center' }}>
        Copyright © 2021. ソタ
      </footer>
    </div>
  )
}

export default Layout
