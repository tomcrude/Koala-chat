import {Grid,Box,Button,Typography,Link} from '@mui/material';
import { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserInterfaceHeader from './reusable/interface.header';
import UserInterfaceSearch from './reusable/interface.search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';


export default function User() {
  if (localStorage.getItem("dark") !== null ){document.body.style.backgroundColor= "rgb(10, 15, 19)"}
    const photo = require("../main/user.1.png")
    const {id} = useParams()
    const navegate = useNavigate()
    const [info, setinfo] = useState<any>([])
    
    const [state, setstate] = useState<any>("")
    const [color, setcolor] = useState<any>("")
    
    const [permission, setpermission] = useState<any>()
    const [follow, setfollow] = useState<any>()

    const [followers, setfollowers] = useState<any>([])
    const [followings, setfollowings] = useState<any>([])

    function rooms (){
      fetch(`https://project-0-1.herokuapp.com/chat/room/private/${localStorage.getItem("token")}`,{
        method: "POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: id
        })
    }).then(res => res.json())
    .then(res => {let idRoom = res[0].id ;localStorage.setItem("titleUser", info.name); localStorage.setItem("color", idRoom);  navegate(`/chat/${res[0].id}`);})
    }

    async function conection (){
      const fet1 = await fetch(`https://project-0-1.herokuapp.com/user/${id + "," + localStorage.getItem("token")}`)
      .then(res => res.json())
      .then(res => {if(res[0] !== undefined || res[1] !== undefined ){setinfo(res[0]);setstate(res[2]);setcolor(res[1]); } if(res[0].following !== null || res[0].following !== undefined){let array = res[0].following.split(",").filter((item:any) => item !== ""); setfollowings(array)};if(res[0].followers !== null || res[0].followers !== undefined){let array2 = res[0].followers.split(",").filter((item:any) => item !== ""); setfollowers(array2)} })
    }

    useEffect(()=>{
      fetch("https://project-0-1.herokuapp.com/images/get")
      let token = localStorage.getItem("token")
      if (token === "" || token === undefined || token === null){navegate("/")}
      else {
       conection()
      }
    },[state])

    useEffect(()=>{
      let token = localStorage.getItem("token")
      if (token == id){setpermission(<Grid item xs={12} mt={1} sx={{marginLeft: {xs: "40%",md: "65%"}}}><Button href={`../user/edit/${token}`}variant='contained'>{localStorage.getItem("idiom") === null ? "Edit profile" : "Editar perfil"}</Button></Grid>)}
      else {setfollow(<Grid item xs={12} mt={1} ml="40%"><Button variant='contained' sx={{bgcolor: color}} onClick={()=>{send()}}>{state === "follow" && localStorage.getItem("idiom") !== null ? "seguir" : ""}{state == "follow" && localStorage.getItem("idiom") === null ? "follow" : ""} {state === "unfollow" && localStorage.getItem("idiom") !== null ? "Dejar de seguir" : ""}{state == "unfollow" && localStorage.getItem("idiom") === null ? "unfollow" : ""} </Button><MailOutlineIcon onClick={()=>{rooms()}} sx={{fontSize: "30px",padding:"6px",border: "rgb(200,200,200) solid 1px",borderRadius:"50%",position:"absolute",marginLeft: "5%",marginTop: "-3px","&:hover":{bgcolor: "rgb(220,220,220)",cursor:"pointer"}}} /></Grid>)}
      
    },[state,info,color])
    
    
    useEffect(()=>{
      if(info.status === "error"){navegate("/404")} 
      localStorage.setItem("user",info.name)
    },[info])

   async function send(){
      await fetch(`https://project-0-1.herokuapp.com/users/follower`,{
        method: "POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          followers: localStorage.getItem("token"),
          following: id
        })
      }).then(res => res.json())
      .then(res => {window.location.reload()}) 
    }
  return (
    <>
   
    <Grid container height="100vh" className={localStorage.getItem("dark") === null ? "" : "dark"}>
        <UserInterfaceHeader/>
        <Grid item xs={11} md={6} sx={{borderLeft: "1px rgb(150,150,150) solid", borderBottom: {md:"1px rgb(150,150,150) solid"}}}>
            <Grid item xs={12}><Box position="relative" bgcolor={info.bgcolor} height={244}></Box><Box m={5} mt={-12} position="absolute" bgcolor="rgb(220,220,220)" width={150} height={150} sx={{borderRadius: "50%", outline: "6px rgb(255,255,255) solid"}}><img className='img' src={info.imgData === null ? photo : `https://project-0-1.herokuapp.com/${id}-img.png`} alt="user-image"/></Box></Grid>
            {permission}
            {follow}
            <Grid item><Typography component="h1" color="initial" mt={3.5} fontSize={23} ml={4} fontWeight="600">{info.name}</Typography></Grid>
            <Grid item ><Typography component="p" color="initial" mt={1} fontSize={15} ml={4}>{info.des}</Typography></Grid>
            <Grid item xs={12} ml={4} mt={1.5}><Link fontSize={19} color="rgb(0,0,0)" sx={{textDecoration: "none", "&:hover":{textDecoration: "underline"}}} href={`../user/foll/${id}`} onClick={()=>{localStorage.setItem("key", "0")}}>{localStorage.getItem("idiom") === null ? "Followers" : "Seguidores"} {followers.length}</Link><Link sx={{textDecoration: "none", "&:hover":{textDecoration: "underline"}}} fontSize={19} color="rgb(0,0,0)"  href={`../user/foll/${id}`} ml={4} onClick={()=>{localStorage.setItem("key", "1")}}>{localStorage.getItem("idiom") === null ? "Following" : "Siguiendo"} {followings.length} </Link></Grid>
        </Grid>
          <UserInterfaceSearch/>
    </Grid>
    </>
  );
}