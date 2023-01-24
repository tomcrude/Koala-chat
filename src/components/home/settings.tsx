import {Grid,Select,MenuItem,InputLabel,FormControl,Typography,Button,Box,FormGroup,FormControlLabel,Switch} from '@mui/material';
import UserInterfaceHeader from './reusable/interface.header';
import UserInterfaceSearch from './reusable/interface.search';
import {useEffect, useState} from "react"
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate} from 'react-router-dom';

export default function Settings() {

  const navegate = useNavigate()
  useEffect(()=>{
    let token = localStorage.getItem("token")
      if (token === "" || token === undefined || token === null){navegate("/")}
  })

  if (localStorage.getItem("dark") !== null ){document.body.style.backgroundColor= "rgb(10, 15, 19)"}
   
    const [idiom, setidiom] = useState<any>(localStorage.getItem("idiom"))
    if (idiom === null || idiom === undefined){setidiom("english")}
    const [dark, setdark] = useState<any>(localStorage.getItem("dark"))

    function save(){
        if (idiom === "english"){localStorage.removeItem("idiom")}
        else if (idiom === "spanish") { localStorage.setItem("idiom", "spanish")}

        if (dark === 0){localStorage.setItem("dark", "true")}
        else if (dark === 1 || dark === null){localStorage.removeItem("dark")}

        window.location.reload()
    }
 
  return (
    <Grid container height="100vh" className={localStorage.getItem("dark") === null ? "" : "dark"} >
        <UserInterfaceHeader/>
        <Grid alignContent="center" justifyContent="center" textAlign="center" mt={2} item xs={11} md={6} sx={{borderLeft: "1px rgb(150,150,150) solid", borderBottom: {md:"1px rgb(150,150,150) solid"}}}>
            <Grid item><Typography variant="h1"fontWeight={100} fontSize={70}>{localStorage.getItem("idiom") === null ? "Settings" : "Ajustes"}</Typography></Grid>
            
            <Grid mt={6} container alignContent="center" justifyContent="center">
            <Grid item xs={4} md={4} lg={2}><FormGroup>

      <FormControlLabel checked={dark === "true" || dark === 0 ? true : false}  onChange={(e)=>{if(dark === "true" || dark === 0){setdark(1)}else setdark(0)}} control={<Switch/>} label={localStorage.getItem("idiom") === null ? "Dark mode" : "Modo oscuro"} />

    </FormGroup></Grid>

    <Grid item xs={12}  mt={4}></Grid>
    <Grid item xs={3} md={4} lg={2}>
    <FormControl fullWidth sx={{bgcolor: "rgba(255,255,255,0.5)",borderRadius: "5%"}}>
  <InputLabel  id="simple-select-label">{localStorage.getItem("idiom") === null ? "Languaje" : "Lenguaje"}</InputLabel>
  <Select
    labelId="simple-select-label"
    id="simple-select"
    label="Idiom"
    value={idiom}
    onChange={(e)=>{setidiom(e.target.value)}}
  >
    <MenuItem value="english">{localStorage.getItem("idiom") === null ? "English" : "Inglés"}</MenuItem>
    <MenuItem value="spanish">{localStorage.getItem("idiom") === null ? "Spanish" : "Español"}</MenuItem>
  </Select>
</FormControl>

    </Grid>
    <Grid item xs={12}>
    <Box my={6}><Button onClick={()=>{save()}} startIcon={<SaveIcon/>} variant="contained">{localStorage.getItem("idiom") === null ? "Save" : "Guardar"}</Button></Box>
    </Grid>
    </Grid>
        </Grid>
          <UserInterfaceSearch/>
    </Grid>
  );
}