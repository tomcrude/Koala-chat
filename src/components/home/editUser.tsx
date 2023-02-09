import {Grid,Box,Button,TextareaAutosize, Typography} from '@mui/material';
import { useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserInterfaceHeader from './reusable/interface.header';
import UserInterfaceSearch from './reusable/interface.search';
import SaveIcon from '@mui/icons-material/Save';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';

export default function EditUser() {
  if (localStorage.getItem("dark") !== null ){document.body.style.backgroundColor= "rgb(10, 15, 19)"}
    const photo = require("../main/user.1.png")
    const {id} = useParams()
    const navegate = useNavigate()
    const [info, setinfo] = useState<any>([])
    
    const [file, setfile] = useState<any>()
  
    const [state, setstate] = useState<string>("")

    const [user, setuser] = useState<any>(localStorage.getItem("user"))

    const [color, setcolor] = useState<any>()
    const [name, setname] = useState<any>()
    const [des, setdes] = useState<any>()
    const token = localStorage.getItem("token")

    async function conection (){
      const fet1 = await fetch(`https://koala-server.onrender.com/user/${id}`)
      .then(res => res.json())
      .then(res => {setcolor(res[0].bgcolor);setname(res[0].name);setdes(res[0].des);setinfo(res[0]);setfile(res[3])})
    }
    

    useEffect(()=>{
        if (token != id){navegate("/")}
        if (state == "successful"){navegate(`../.user/${token}`)}
        conection()

    },[state])

    function change(){
      switch(color){
        case "rgb(190,200,200)": setcolor("rgb(37, 85, 240)"); break;
        case "rgb(37, 85, 240)": setcolor("rgb(238, 68, 68)"); break;
        case "rgb(238, 68, 68)": setcolor("rgb(250, 248, 131)"); break;
        case "rgb(250, 248, 131)": setcolor("rgb(187, 74, 202)"); break;
        case "rgb(187, 74, 202)": setcolor("rgb(190,200,200)"); break;
      }
    }

    function infoSend() {
      const formdata = new FormData()
      formdata.append("image", file[0])
      console.log(formdata)
      console.log(file)
      
      fetch(`https://koala-server.onrender.com/user/update/${token}/${name}/${des}/${color}/${user}`,{
        method: "PUT",
        body: formdata
      }).then((res)=>{return res.json()})
        .then((res)=> {setstate(res.state)})
       
    }

    async function send (){

      

      if (name.length > 12 || name.length <= 3){window.alert("Your username must have more than 4 characters and a maximum of 12.")}
      else if (des.length > 254 || des.length <= 9){window.alert("Your description must have more than 10 characters and a maximum of 255.")}
      else if (file.imgData === undefined){
        if (file[0].size > 500000 || file[0].type !== "image/png" && file[0].type !== "image/jpeg"){window.alert("The image must be less than 0.5mb and be in png or jpeg format")}
        
        else {
          infoSend()
        }
      }
      else{
        infoSend()
      }



    }
    


  return (
    <Grid container height="100vh" className={localStorage.getItem("dark") === null ? "" : "dark"}>
        <UserInterfaceHeader/>
        <Grid border={window.innerWidth < 900 ? "0.5px rgb(150,150,150) solid !important" : ""} item xs={11} md={6} sx={{borderLeft: "1px rgb(150,150,150) solid", borderBottom: {md:"1px rgb(150,150,150) solid"}}}>
            <Grid item xs={12}><Box title={localStorage.getItem("idiom") === null ? 'Change background color' : "Cambiar el color de fondo"} position="absolute" m={3} zIndex={10}><Box onClick={()=>{change()}} width={40} height={40} sx={{"&:hover":{cursor: "pointer"}}}><AutoFixNormalIcon/></Box></Box><Box position="relative" bgcolor={color} height={155} ></Box><Box position="absolute" bgcolor="rgb(220,220,220)" width={100} height={100} sx={{"&:hover":{ filter: "brightness(0.95)"},borderRadius: "50%", outline: "6px rgb(255,255,255) solid",right: {md:"0"},left: "0", margin: "auto", transform: {md:"translateY(-90px)", xs:"translateY(-90px) translateX(90px)"}}} title={localStorage.getItem("idiom") === null ? 'Change image' : "Cambiar imagen"}><img className='img' src={info.imgData === null ? photo : `https://koala-server.onrender.com/${id}-img.png`} alt="user-image"/><input type="file" className='inp' onChange={(e)=>{setfile(e.target.files) }}/></Box></Grid>
            <Grid item mt={4} xs={12} position="relative"><Box textAlign="center" border={"rgb(220,220,220) solid 1.5px"} borderRadius="2%" width="85%" sx={{right: "0",left: "0", margin: "auto" }}>
                <Typography my={2} variant="h2" fontSize={22} color="initial">{localStorage.getItem("idiom") === null ? "Username" : "Nombre de usuario"}</Typography>
                <input onChange={(e)=>{setname(e.target.value)}} style={{height: 20, fontSize: 15, fontWeight: 500}} type="text" placeholder={name}/>
                <Typography variant="subtitle2" sx={{color:"#ff0000"}}>{state}</Typography>
                <Typography my={2} variant="h2" fontSize={22} color="initial">{localStorage.getItem("idiom") === null ? "Description" : "Descripción"}</Typography>
                <TextareaAutosize  onChange={(e)=>{setdes(e.target.value)}} aria-label="empty textarea" placeholder={des} style={{ width: "70%", resize: "none", height: 60, fontSize: 14.5}}></TextareaAutosize>
                <Box my={2}><Button onClick={()=>{send()}} startIcon={<SaveIcon/>} variant="contained">{localStorage.getItem("idiom") === null ? "Save" : "Guardar"}</Button></Box>

                </Box></Grid>
        </Grid>

          <UserInterfaceSearch none={"true"}/>
    </Grid>
  );
}