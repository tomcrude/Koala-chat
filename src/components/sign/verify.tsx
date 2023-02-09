import {Link,Typography,Grid} from "@mui/material"
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';


export default function Verify() {
    const navegate = useNavigate()
    
    var email:any = localStorage.getItem("email")
   
    useEffect(()=>{
        if (email === undefined || email === null || email === "" || email.length === 0){
            navegate("/")
        }
    })
   
    setTimeout(()=>{
      email = localStorage.setItem("email", "")
    },3000)

  return (
    <Grid container textAlign="center" width="100%" height="60%">
        <Grid item xs={12} marginTop={8}><MarkEmailUnreadOutlinedIcon sx={{fontSize: "150px",padding: "20px", background: "rgb(200, 200, 200)", borderRadius: "45%"}}/></Grid>
        <Grid xs={12} item><Typography marginBottom={2} marginTop={2} variant="h3" color="initial" sx={{fontSize:{xs: "65px", md:"80px", padding:"25px"}}}>{localStorage.getItem("idiom") === null ? "Please confirm your email" : "Porfavor confirma tu Email"}</Typography><Typography sx={{fontSize:{xs: "17px", md:"20px"}}} variant="subtitle2" color="initial">{localStorage.getItem("idiom") === null ? "An email was sent to" : "Se ha enviado un Email a"} {email} {localStorage.getItem("idiom") === null ? "Please click the link in the Email to continue." : "Porfavor haga click en el link que hemos mandado a su Email para continuar."}</Typography></Grid>
        <Grid item xs={12} marginTop={5} marginBottom={3} sx={{fontSize: "20px"}}><Link href='../signin'>{localStorage.getItem("idiom") === null ? "Sign in" : "Loguearse"}</Link></Grid>
    </Grid>
  );
}