import React from "react"  
import { Link, StaticQuery, graphql } from "gatsby"

const Nav = () => (  
  <div>
    <div>
<h1>hello</h1>
      <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link to="/">Newsletter</Link>
            </li>
          </ul>
        </div>

        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            
          </ul>
        </div>
      </nav>
    </div>
  </div>
)

export default Nav  