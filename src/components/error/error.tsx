import {Link,Box,Grid,Typography }from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

export default function Error() {
  if (localStorage.getItem("dark") !== null ){document.body.style.backgroundColor= "rgb(10, 15, 19)"}

  return (
    <Box className={localStorage.getItem("dark") === null ? "" : "dark"}>
    <Grid sx={{background: "#f1f1f1"}} className={localStorage.getItem("dark") === null ? "" : "dark-div"} container textAlign="center" width="100%" height="100%">
        <Grid item xs={12} marginTop={8}><SearchOffIcon sx={{fontSize: "190px",padding: "15px", background: "rgb(210, 210, 210)", borderRadius: "55%"}}/></Grid>
    </Grid>
    <Typography my={4} textAlign="center" variant="h6">{localStorage.getItem("idiom") === null ? "This page is not available. Sorry for the inconvenience." : "Esta página no esta disponible, perdón por el inconveniente."}</Typography>
   <Box textAlign="center" marginBottom={14}><Link sx={{color: "rgb(0,0,0)", fontSize: "22px", "&:hover":{color: "rgb(140, 20, 20)"} }} href="/">{localStorage.getItem("idiom") === null ? "Back to top." : "Volver."}</Link></Box>
    </Box>
  );

}