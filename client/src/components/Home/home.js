import React, { Component } from 'react'

import './home.css'
import './st.css'
import './iofrm-theme4.css'
import './bootstrap.min.css'
//import './fontawesome-all.min.css'
import './datepicker.css'
import "react-datepicker/dist/react-datepicker.css";

const HomePage = () => (
  <div>
    <ConnecteursBase />
  </div>
)


class ConnecteursBase extends Component {
  onChange = (date) => {
    console.log('home onChange: ' + date)
  }


  render () {
    return (
      <div className="connecteurs">
        <h1> Welcome to LaBriqueterie-TodoList </h1>
      </div>
    )
  }
}

export default HomePage
