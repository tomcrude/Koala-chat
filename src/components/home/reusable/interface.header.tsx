import {Grid,Box,Button,Link} from '@mui/material';
import { useNavigate} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

export default function UserInterfaceHeader() {
    const navegate = useNavigate()
  return (
    <>
    
    <Grid item position="relative" sx={{textAlign: {xs:"center", md:"end"}}} xs={1}> 
        <Grid item xs={12}><Link href='/'><HomeIcon sx={{fontSize: {md:"30px",xs:"31px"}, marginTop:{xs:"15px", md:"90px"},color: "rgb(0,0,0)"}}/></Link></Grid> 
        <Grid item xs={12}my={3.1}><Link onClick={()=>{localStorage.setItem("color", "4");localStorage.removeItem("movil");localStorage.setItem("titleUser", "Global Chat")}} href={`/chat/4`}><ChatIcon sx={{fontSize: {md:"30px",xs:"29px"},color: "rgb(0,0,0)"}}/></Link></Grid> 
        <Grid item xs={12}my={3}><Link href='/' onClick={()=>{localStorage.setItem("token", ""); navegate("/")}}><LogoutIcon sx={{fontSize: {md:"30px",xs:"29px"},color: "rgb(0,0,0)"}}/></Link></Grid> 
        <Grid item xs={12}my={1}><Link href='/config'><SettingsIcon sx={{fontSize: {md:"30px",xs:"29px"},color: "rgb(0,0,0)"}}/></Link></Grid> 
        </Grid>
        
        <Grid component="header" item position="relative" xs={1} md={2} sx={{display:{xs: "none", md:"block"}}}>
        <Grid item xs={4}><Box marginX={2} mt={1} mb={3} className={localStorage.getItem("dark") === null ? "" : "dark-img"} width={50} height={50} sx={{backgroundImage: "url(../../logo-2.png)"}} ></Box></Grid>
        <Grid item xs={12} my={1.5} marginX={1}><Button href='/' sx={{fontSize: "20px",color: "rgb(0,0,0)", textTransform: "none"}}>{localStorage.getItem("idiom") === null ? "Home" : "Casa"}</Button></Grid>
        <Grid item xs={12} my={1.5} marginX={1}><Button sx={{fontSize: "20px",color: "rgb(0,0,0)", textTransform: "none"}} onClick={()=>{localStorage.setItem("color", "4");localStorage.setItem("titleUser", "Global Chat")}} href={`/chat/4`}>Chat</Button></Grid>
        <Grid item xs={12} my={1.5} marginX={1}><Button onClick={()=>{localStorage.setItem("token", ""); navegate("/")}} sx={{fontSize: "20px",color: "rgb(0,0,0)", textTransform: "none"}}>{localStorage.getItem("idiom") === null ? "Log Out" : "Salir"}</Button></Grid>
        <Grid item xs={12} my={1.5} marginX={1}><Button sx={{fontSize: "20px",color: "rgb(0,0,0)", textTransform: "none"}} href='/config'>{localStorage.getItem("idiom") === null ? "Setting" : "Configurar"}</Button></Grid>
        </Grid>
        </>
  );
}