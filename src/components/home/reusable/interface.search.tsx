import {Grid,Box,Link, TextField,Typography} from '@mui/material';
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

export default function UserInterfaceSearch(props:any) {
    const {id} = useParams()
    const photo = require("../../main/user.1.png")
    const [people, setpeople] = useState<any[]>(["uni"])
    const [search, setsearch] = useState<string>("")
   const [state,setstate] =useState<any[]>([])
   let id_ = 0

  function enter(){
    if (search.length > 12){window.alert("The maximum of characters is 12")}
    fetch(`https://project-0-1.herokuapp.com/users/search`,{
      method: "POST",
      headers:{
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: search
      })
    })
    .then(res => res.json())
    .then(res => setstate(res))
  
  }

    useEffect(()=>{
      fetch(`https://project-0-1.herokuapp.com/users/random/${id}`)
      .then(res => res.json())
      .then(res => setpeople(res))

    },[])

   
  return (
  
        <>
        <Grid item xs={1} sx={{display:{xs: "block", md:"none"}}}></Grid>
        
        

        <Grid className={props.none === "true" && window.innerWidth < 900 ? "disabled" : ""} item md={3} xs={10} lg={2} borderLeft="1px solid rgb(150,150,150)" >

            <Grid  ml={2} mt={2} item xs={12}><form onSubmit={(e)=>{e.preventDefault(); enter()}}><TextField onChange={(e)=>{setsearch(e.target.value)}} sx={{width: "100%",border: "1px solid rgb(103, 184, 221)", borderRadius: "5%", outline: "none"}}
              label={localStorage.getItem("idiom") === null ? "🔍 Search" : "🔍 Buscar"}/></form></Grid>

            
            
            <Grid  ml={2} item className={localStorage.getItem("dark") === null ? "" : "dark-div"} bgcolor="rgb(240,240,240)" sx={{borderRadius: "5%", marginTop:{xs:"20px", md: "10px"}}}>
            <Grid item  xs={12} textAlign="center" padding={2}><Typography fontSize={20} fontWeight="600" variant="h4" color="initial">{localStorage.getItem("idiom") === null ? "People" : "Personas"}</Typography></Grid>
            
            <Grid item justifySelf="center" alignSelf="center" position="relative" xs={12} >
              
            { 
                state.map((stat)=>{
                  id_ = id_ + 1
                  if (stat.id == localStorage.getItem("token")){return <Box key={id_}></Box>}
                  else

                  {
                    return (
                    <Box ml={1} mt={1} key={id_} >
                    <Grid item><Box sx={{marginLeft: {xs:"5px", md: "0px"}}} width={50} height={50}><img className='img' src={stat.imgData === null || stat.imgData === undefined ? photo : `https://project-0-1.herokuapp.com/${stat.id}-img.png`} alt="user-image"/></Box></Grid>
                    <Grid item position="absolute"  ml="24%" sx={{transform: {md: "translateY(-155%)", xs: "translateY(-160%)"}}} xs={12}><Link href={stat.state == "none" ? "" : `/.user/${stat.id}`} sx={{textDecoration:"none"}}><Typography sx={{fontSize:{xs:"18px"}}} component="p" color="initial">{stat.name}{stat.state}{stat.id}</Typography></Link></Grid>
                    </Box>
                  )}
                })

              }
              { 
                people.map((stat)=>{
                  id_ = id_ + 1
                  if (stat.id == localStorage.getItem("token")){return <Box key={id_}></Box>}
                  else if (state.length !== 0){return <Box key={id_}></Box>}
                  else
                  {
                    return (
                    <Box ml={1} mt={1} key={id_}>
                    <Grid item><Box sx={{marginLeft: {xs:"5px", md: "0px"}}} width={50} height={50}><img className='img' src={stat.imgData === null || stat.imgData === undefined ? photo : `https://project-0-1.herokuapp.com/${stat.id}-img.png`} alt="user-image"/></Box></Grid>
                    <Grid item position="absolute"  ml="24%" sx={{transform: {md: "translateY(-155%)", xs: "translateY(-160%)"}}} xs={12}><Link href={`/.user/${stat.id}`} sx={{textDecoration:"none"}}><Typography sx={{fontSize:{xs:"18px"}}} component="p" color="initial">{stat.name}</Typography></Link></Grid>
                    </Box>
                  )}
                })
              }
            </Grid>

            </Grid>
        </Grid>
      </>
  );
}