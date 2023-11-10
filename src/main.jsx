import React from 'react'
import ReactDOM from 'react-dom/client'
import Cursor from './cursor'
import Nav from './nav'
import './style.css'
import Para from './para'
import SearchBar from './searchbar'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Cursor />
  </React.StrictMode>,
)

ReactDOM.createRoot(document.getElementById('main')).render(
  <React.StrictMode>
    <Nav />
    <Para />
    <SearchBar />
  </React.StrictMode>,
)
