import {Grid,Box,Typography,TextField} from '@mui/material';
import { useEffect, useState} from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import UserInterfaceHeader from './reusable/interface.header';
import SearchIcon from '@mui/icons-material/Search';
import SmsIcon from '@mui/icons-material/Sms';
import SendIcon from '@mui/icons-material/Send';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

export default function GlobalChat() {
   const {id} = useParams()
   const navegate = useNavigate()
   
   if (localStorage.getItem("dark") !== null ){document.body.style.backgroundColor= "rgb(10, 15, 19)"}

  const noUser = "true," + localStorage.getItem("token")

   const photo = require("../main/user.1.png")

   const chat = require("../main/lee.png")

  const [searchRooms, setsearchRooms] = useState("")

  const [message, setmessage] = useState<null | string>(null)

  const [list, setlist] = useState<any>([])
  const [chats, setchats] = useState<any>([])


  const [info, setinfo] = useState<any>([])
  const [state, setstate] = useState<string>("")
  const [px, setpx] = useState(window.innerWidth)

  let id_ = 0;

  function searchRoomss(e:any){
    e.preventDefault()
    fetch(`https://project-0-1.herokuapp.com/chat/room/search/${[searchRooms,localStorage.getItem("token")]}`)
    .then(res => res.json())
    .then(res => {console.log(res); if (res[0] === undefined || res[1] === undefined){setchats(["1"]); setlist(["1"])}else{setlist(res[0]); setchats(res[1]) }})


  }

 

    function search(){
        fetch(`https://project-0-1.herokuapp.com/chat/room/${[id,localStorage.getItem("token")]}`)
      .then(res => res.json())
      .then(res => {if (res[1] === undefined || res[2] === undefined){setchats(["1"]); setlist(["1"])}else{if (localStorage.getItem("search") !== "true"){setlist(res[1])};setchats(res[2])} ;if (res[0].state !== "error"){let array= res[0].messages.split("%%%%"); setinfo(array);} else {setstate(res[0].state)}})
    }

    function privateRoom(user:any){

      fetch(`https://project-0-1.herokuapp.com/chat/room/private/${localStorage.getItem("token")}`,{
        method: "POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: user
        })
    }).then(res => res.json())
    .then(res => {  navegate(`/chat/${res[0].id}`);window.location.reload()})
      
    }


    useEffect(()=>{
       setpx(window.innerWidth)
        let token = localStorage.getItem("token")


        if (!token === undefined || !token === null){navegate(`/.user/${token}`)}
        if (state === "error"){window.location.href ='/';}
        search()
        {setInterval(()=>{search()}, 2500)} 
    },[])

    useEffect(()=>{
         let token = localStorage.getItem("token")
      if (token === "" || token === undefined || token === null){navegate("/")}
      const cChat:any = document.querySelector("#container");
        cChat.scrollTop += cChat.scrollHeight;
    },[list,chats,info])

    useEffect(()=>{
      if (state === "error"){navegate("../chat/4")};
      if (searchRooms !== ""){localStorage.setItem("search", "true")}
      else {{localStorage.removeItem("search")}}
    })

    function send(e:any){
      e.preventDefault()
      const dateInfo = new Date()
      const month = dateInfo.getMonth() + 1
      const date =  dateInfo.getFullYear()+"-"+ month + "-" + dateInfo.getDate() + " " + dateInfo.getHours()+ ":" + dateInfo.getMinutes() + ":" + dateInfo.getSeconds()
      if (message === null || message === undefined || message === "" || message.length > 100){window.alert("the message must have no more than 100 characters and not be null")}
      else
      {
        setmessage("")
        let mess:any = document.getElementById("message")
        mess.value = ""

        fetch(`https://project-0-1.herokuapp.com/chat/room/${id}`,{
        method: "POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: localStorage.getItem("token"),
          messages: message,
          datee: date,
        })
    })
  }
  }
  
  return (
    <Grid container height="98.5vh" className={localStorage.getItem("dark") === null ? "" : "dark"}>
        <UserInterfaceHeader/>
        <Grid className={localStorage.getItem("movil") === "1" && px < 1200 ? "disabled" : ""} item borderBottom="rgb(150,150,150) 1px solid" xs={11} md={9} lg={3} mt={2} borderLeft="1px rgb(150,150,150) solid" sx={{overflowY: "auto"}}>
        <Box mx={2} mb={1} position="relative"><Box position="absolute" bgcolor="rgba(255,255,255,0) !important" zIndex="1" sx={{marginLeft: "85%", marginTop: "13px"}}><SearchIcon sx={{color:'rgb(155,155,155)',fontSize:"30px"}} /></Box><form onSubmit={(e)=>{searchRoomss(e)}}><TextField onChange={(e)=>{setsearchRooms(e.target.value)}} placeholder={localStorage.getItem("idiom") === null ? 'Search rooms' : "Buscar salas"} fullWidth/></form></Box>
        <Grid className={localStorage.getItem("dark") === null ? "" : "dark-button"} onClick={()=>{localStorage.setItem("movil", "1"); navegate(`../chat/4`);window.location.reload(); localStorage.setItem("color", "4"); localStorage.setItem("titleUser", "Global Chat")}} bgcolor={localStorage.getItem("color") === "4" && localStorage.getItem("dark") === null ? "rgb(240,240,240)" : "" } sx={{"&:hover": {bgcolor: "rgb(245,245,245)", cursor: "pointer"}}} position="relative" item xs={12} md={12} height={80} borderTop="1px rgb(155,155,155) solid" borderBottom="1px rgb(155,155,155) solid"> 
                    <Box  mt={0.5} ml={1} position="absolute" height="64px" width="65px" borderRadius="50%" border="2px solid rgb(150,150,150)"><img className='img' src={chat} alt="public room" /></Box>
                    <Box left="50%" top="26%" sx={{transform: "translate(-50%)"}} position="absolute"><Typography variant="h6" fontWeight={600} color="initial">{localStorage.getItem("idiom") === null ? 'Public room' : "Sala pública"}</Typography></Box>             
            </Grid>


            {list.map((stat:any) => {
              id_= id_ + 1
              
              if (stat[0] == "1"){return <Box key={id_}></Box>}
              if (stat.messages === null){return <Box  key={id_}></Box>}

              let search = stat.people.split(",")
              let info = stat

              chats.map((g:any)=>{
                if (g.id.toString() === search[0] || g.id.toString() === search[1]){
                  info["name"] = g.name
                  info["idPicture"] = g.id
                  info["imgType"] = g.imgType
                }
                return<Box key={id_}></Box>
              })
              let id = stat.id.toString()
           
            return (
              <Box key={id_}>
              <Box onClick={()=>{ navegate(`../.user/${info.idPicture}`);}} sx={{"&:hover": {cursor: "pointer"}}} bgcolor={"rgba(0,0,0,0) !important"} position="absolute" height={60} width={60} mt={1} ml={1.5} zIndex={5}></Box>
              <Grid onClick={()=>{localStorage.setItem("movil", "1"); navegate(`../chat/${stat.id}`); localStorage.setItem("titleUser", info.name); window.location.reload(); localStorage.setItem("color", id)}} bgcolor={localStorage.getItem("color") === stat.id.toString() && localStorage.getItem("dark") === null ? "rgb(240,240,240)" : "" } className={localStorage.getItem("dark") === null ? "" : "dark-button"} sx={{"&:hover": {bgcolor: "rgb(245,245,245)", cursor: "pointer"}}} position="relative" item xs={12} md={12} height={80} borderBottom="1px rgb(155,155,155) solid"> 
                    <Box position="absolute" borderRadius="50%" padding="2px" bgcolor="rgb(0,245,0) !important" height="20px" width="20px" m={0.7} zIndex={10} border="1px solid rgb(0,100,0) !important" className={stat.updatee === "none" || stat.updatee === noUser ? "disabled" : ""}><NotificationsActiveIcon sx={{fontSize: "19.5px"}}/></Box>
                    <Box zIndex={1}  mt={0.5} ml={1} position="absolute" height="64px" width="65px" borderRadius="50%" border="2px solid rgb(150,150,150)"><img className='img' src={info.name === undefined || info.imgType === undefined || info.imgType === null ? photo : `https://project-0-1.herokuapp.com/${info.idPicture}-img.png`} alt="public room " /></Box>
                    <Box left="50%" top="26%" sx={{transform: "translate(-50%)"}} position="absolute"><Typography variant="h6" fontWeight={600} color="initial">{info.name === undefined ? "Public Room" : info.name}</Typography></Box>             
            </Grid>
            </Box>
            )
           })}

        </Grid>

        <Grid className={localStorage.getItem("movil") !== "1" && px < 1200 ? "disabled" : ""} mt={2} item lg={4} xs={11} md={9} borderLeft="1px solid rgb(150,150,150)" borderBottom="rgb(150,150,150) 1px solid" borderRight="1px solid rgb(150,150,150)" sx={{display: {xs:"",lg:"block"}}}>
                
                <Grid position="relative" className='scroll' item xs={12} height="20%" borderBottom="1px rgb(200,200,200) solid">
                  <Box onClick={()=>{localStorage.removeItem("movil");window.location.reload()}} className={px < 1200 ? "" : "disabled"} margin="2%" position="absolute"><ArrowCircleLeftIcon sx={{fontSize: "50px", "&:hover":{cursor: "pointer"}}}/></Box>
                  <Typography component="h1" textAlign="center" sx={{fontSize:{xs:"220%",md:"300%"},padding:{xs:"12%",md:"8%"}}}><SmsIcon sx={{fontSize: {lg:"40px",xs: "30px"}, paddingRight: "10px"}}/>{localStorage.getItem("titleUser")}</Typography>
                </Grid>

                <Grid sx={{overflowY: "scroll"}} id="container" container height="70vh">

                    <Grid item xs={12}>
                      
                      {info.map((stat:any)=>{
                        let messageInfo= stat.split("%%%");
                        id_ = id_ + 1
                        if (stat !== ""){    
                        return (
                          <Box key={id_}>
                          <Box className={localStorage.getItem("dark") === null ? "" : "dark-div"} key={messageInfo[3]} margin="8px" bgcolor="rgb(240,240,240)" sx={{overflowX: "hidden"}} borderRadius="3%" display="flex">
                        <Box m={1}><Typography onClick={()=>{privateRoom(messageInfo[3]); localStorage.setItem("titleUser", messageInfo[2]);localStorage.setItem("color", messageInfo[4])}} sx={{"&:hover": {cursor: "pointer"}}} padding={0.3} component="p" fontWeight={600} color={messageInfo[3] === localStorage.getItem("token") ? "rgb(180,80,80) !important" : ""} >{messageInfo[2]}:</Typography></Box>
                        <Box ml={1} m={1} display="inline-block"><Typography component="p" sx={{wordWrap: "break-word", wordBreak: "break-word"}} padding={0.3} >{messageInfo[0]}</Typography></Box>
                        </Box>
                        <Box margin="8px" sx={{transform: "translateY(-10px)"}}><Typography fontSize={13} component="p">{localStorage.getItem("idiom") === null ? 'Sent' : "Enviado"} {messageInfo[1]} </Typography></Box>
                        </Box>
                        )}else{return <Box key={id_}></Box>}
                      })
                      }
                

                        

                      </Grid>

                </Grid>


                <Grid position="relative" item xs={12} height="4vh" borderTop="rgb(150,150,150) 1px solid">
                    <Grid item xs={12} mx={2} my={1}>
                      <form onSubmit={(e)=>{ send(e);search() }}>
                    <TextField className='inp2' id='message' onChange={(e)=>{setmessage(e.target.value)}} placeholder={localStorage.getItem("idiom") === null ? 'Send a message' : "Enviar mensaje"} fullWidth/>
                    </form>
                    <Box bgcolor="rgba(255,255,255,0)" position="absolute" onClick={(e)=> {send(e)}} borderRadius="50%" p={1} sx={{transform: "translateY(-50px)",left: "85%","&:hover": {bgcolor: "rgb(245,245,245)",cursor: "pointer"}}} title={localStorage.getItem("idiom") === null ? "Send a message" : "Enviar mensaje"}><SendIcon/></Box>
                    </Grid>
                </Grid>

            </Grid>
                    
    </Grid>
  );
}