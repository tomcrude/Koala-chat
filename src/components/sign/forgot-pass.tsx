import {useState, useEffect} from 'react';
import {Typography,Container,Box,Grid,Link,TextField,Button,Avatar,CssBaseline} from '@mui/material';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { useNavigate } from 'react-router-dom';

export default function Forgot() {
    const navegate = useNavigate()
    const [email, setemail] = useState<string>("")
    const [state, setstate] = useState<string>("")
   async function send(e:any){
        e.preventDefault()
        var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        const emailVeri = await expReg.test(email)
        if (emailVeri === false){return window.alert("You have to introduce a correct email.")}
        else {
            const send = await fetch("https://koala-server.onrender.com/c-c",{ 
        method: "POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email
        })
        
      }).then(res => {return res.json()})
      .then(res => {setstate(res.state)}) 
        }

    }

    useEffect(()=>{
        if (state === "successful"){navegate("/signup/verify"); localStorage.setItem("email",email)}
      },[state]
      )

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'rgb(45, 150, 230)' }}>
            <MarkEmailReadIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          {localStorage.getItem("idiom") === null ? "Enter your Email" : "Ingresa tu Correo Electrónico"}
          </Typography>
          <Box component="form" onSubmit={(e)=>{send(e)}} noValidate sx={{ mt: 1 }}>
          <Typography className={state === "denied" ? "" : "disabled"} variant="subtitle2" sx={{color:"#ff0000"}}> {localStorage.getItem("idiom") === null ? "Email not found." : "Email no encontrado."}</Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={localStorage.getItem("idiom") === null ? "Email address" : "Email"}
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>{setemail(e.target.value)}}
              
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2,fontSize: "18px" }}
            >
              {localStorage.getItem("idiom") === null ? "Send" : "Enviar"}
            </Button>
            <Grid container>
              <Grid item xs mb={8}>
                <Link href="/signin" variant="body2">
                {localStorage.getItem("idiom") === null ? "Return" : "Volver"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
     
  );
}