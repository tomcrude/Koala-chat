import {Grid,Box,Button,Typography} from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Main() {
    const video = require("./main-green.mp4")
    const navegate = useNavigate()
    localStorage.setItem("d", "1")
    useEffect(()=>{
      let token = localStorage.getItem("token")
      if (!token === undefined || !token === null || token){navegate(`/.user/${token}`); localStorage.setItem("d", "0")}
    })

    fetch("https://koala-server.onrender.com/start")

  return (
    <>
    <Box position="fixed" zIndex={-1} bgcolor="rgb(80, 151, 231)" sx={{right: "0", bottom: "0", minWidth: "100%", minHeight: "100%"}}>
    <video src={video} autoPlay muted loop ></video>
    </Box>

    <Grid container marginTop={3}>
        <Grid item xs={4} md={8} lg={9}><Box marginX={2} className='koala-image' width={50} height={50} sx={{backgroundImage: "url(../../logo-2.png)"}} ></Box></Grid>
        <Grid item xs={8} md={4} lg={3}><Button variant="contained" size="large" sx={{marginRight: {xs:"17px", md:"15px", lg: "30px"},paddingRight:{md:"30px",xs:"10px"}, paddingLeft: {md:"30px",xs:"10px"}}} href="/signup">{localStorage.getItem("idiom") === null ? "Sign Up" : "Registrarse"}</Button><Button sx={{paddingRight:{md:"30px"}, paddingLeft: {md:"30px"}}} variant="contained" size="large" href="/signin">{localStorage.getItem("idiom") === null ? "Sign In" : "Entrar"}</Button></Grid>
        <Grid item xs={12} mt={16}><Typography fontSize={120} variant="h1" color="initial" textAlign="center">Koala</Typography></Grid>
        <Grid item xs={12} mt={3} textAlign="center"><Button href="/signin" variant="contained" sx={{fontSize: "30px"}} >{localStorage.getItem("idiom") === null ? "Get start" : "Empezar"}</Button></Grid>
    </Grid>
    </>
  )

}