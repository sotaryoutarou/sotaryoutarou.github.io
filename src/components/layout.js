import React from "react"
import * as GlocalStyle from '../styles/global.module.css'
import * as TopPageStyle from '../styles/top.module.css'
import MediaQuery from "react-responsive";
import HeaderImageSP from '../images/header-sota-noho-SP.png'
import HeaderImagePC from '../images/post-header.png'

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const headerBackgroundImageSP = {
    backgroundImage: `url(${HeaderImageSP})`,
    backgroundSize:  `contain`,
  }
  const headerBackgroundImagePC = {
    backgroundImage: `url(${HeaderImagePC})`,
    backgroundSize:  `contain`,
  }
  let header

  if (location.pathname === rootPath) {
    header = (
      <React.Fragment>
        <MediaQuery query="(max-width: 480px)">
          <header className={TopPageStyle.header__SP} style={headerBackgroundImageSP}>
          </header>
        </MediaQuery>
        <MediaQuery query="(min-width: 481px)">
          <header className={TopPageStyle.header__PC} style={headerBackgroundImagePC}>
          </header>
        </MediaQuery>
      </React.Fragment>
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
