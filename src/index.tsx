import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Typography,Link,Box } from '@mui/material';
import "./style.css"


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
   
    <App />
    

    <Typography  component="footer" display={localStorage.getItem("d") === "0" ? "none" : ""} variant="body2" color="text.secondary" align="center" mt={5}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Koala
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  </React.StrictMode>
);
