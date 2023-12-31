import React from 'react'
import ReactDOM, {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './styles/index.scss';

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
