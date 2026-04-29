import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './styles/header.css'
import './styles/carousel.css'
import './styles/pages.css'
import './styles/footer.css'
import './styles/modal.css'
import './styles/auth.css'
import './styles/components.css'  // Add this line

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)