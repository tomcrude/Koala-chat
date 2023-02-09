
import { useState, useEffect } from 'react';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useNavigate } from 'react-router-dom';
import {createTheme, ThemeProvider,Box,Grid,Link,Checkbox,FormControlLabel,TextField,CssBaseline,Button,Avatar,Typography,Container} from '@mui/material';
const theme = createTheme();

export default function SignUp() {
  
  const navegate = useNavigate()
  const [user, setuser] = useState<string>("")
  const [pass, setpass] = useState<string>("")
  const [passveri, setpassveri] = useState<string>("")
  const [email, setemail] = useState<string>("")
  const [core, setcore] = useState<number>(0)
  const [state, setstate] = useState<string>("")
  const [max, setmax] = useState<number>(0)
  localStorage.setItem("d", "1")

 async function send (e:any){
    e.preventDefault()
    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const emailVeri = await expReg.test(email)
    if (emailVeri === false){return window.alert("You have to introduce a correct email.")}
    if (user.length > 12 || user.length <= 3){window.alert("Your username must have more than 4 characters and a maximum of 12.")}
    else if (pass.length > 12 || pass.length <= 3){window.alert("Your password must have more than 4 characters and a maximum of 12.")}
    else if (pass != passveri){window.alert("Passwords must match.")}
    else if (core === 0){window.alert("Please accept the terms and conditions.")}
    else if (localStorage.getItem("denegate") === "true"){window.alert("You are making many requests.");setmax(max + 4)}
    else {
      setmax(max + 1)
     await fetch("https://koala-server.onrender.com/c-a",{
        method: "POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: user,
          pass: pass,
          passveri: passveri,
          email: email
        })
        
      }).then(res => {return res.json()})
      .then(res => {setstate(res.state)}) 
    }
  }

  useEffect(()=>{
    let token0 = localStorage.getItem("token")
    if (state === "successful"){navegate("/signup/verify"); localStorage.setItem("email",email)}
    if (max > 2){localStorage.setItem("denegate", "true");
    setTimeout(()=>{localStorage.setItem("denegate", "false")},3000)
    if (!token0 === undefined || !token0 === null || token0){navegate("/")}
  }}
  ,[state,max]
  )

  return (
    <>
    <ThemeProvider theme={theme}>
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
            <LockOpenIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          {localStorage.getItem("idiom") === null ? "Sign Up" : "Registrarse"}
          </Typography>
          
          <Box component="form" onSubmit={(e)=>{send(e)}} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  onChange={(e)=>{
                    setuser(e.target.value)
                  }}
                  required
                  fullWidth
                  label={localStorage.getItem("idiom") === null ? "Username" : "Nombre de usuario"}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                 onChange={(e)=>{
                  setpass(e.target.value)
                }}
                  required
                  fullWidth
                  label={localStorage.getItem("idiom") === null ? "Password" : "Contraseña"}
                  autoComplete="Password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                onChange={(e)=>{
                  setpassveri(e.target.value)
                }}
                  required
                  fullWidth
                  label={localStorage.getItem("idiom") === null ? "Repeat Password" : "Repite la Contraseña"}
                  autoComplete="repeat Password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={(e)=>{
                  setemail(e.target.value)
                   }}
                  required
                  fullWidth
                  label="Email"
                  type="email"
                  autoComplete="Email"
                />
              </Grid>
              <Grid item xs={12}>
              <Typography className={state === "denied" ? "" : "disabled"}  variant="subtitle2" sx={{color:"#ff0000"}}>{localStorage.getItem("idiom") === null ? "The username or email is already taken." : "El nombre de usuario o Email ya esta en uso."}</Typography>
                <FormControlLabel
                  onChange={(e)=>{
                    if (core === 0){
                    setcore(1)} else setcore(0)
                     }}
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label={localStorage.getItem("idiom") === null ? "I accept the terms and conditions." : "Acepto los terminos y condiciones."}
                />
                <Link href='/signup/terms'>{localStorage.getItem("idiom") === null ? "See the terms and conditions" : "Ver los terminos y condiciones"}</Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {localStorage.getItem("idiom") === null ? "Sign Up" : "Registrarse"}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./signin" variant="body2">
                   {localStorage.getItem("idiom") === null ? "Already have an account? Sign in" : "Ya tienes una cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    </>
  );
}