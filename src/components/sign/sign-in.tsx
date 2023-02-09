import {useState, useEffect} from 'react';
import {Box,Grid,Link,Checkbox,FormControlLabel,TextField,CssBaseline,Button,Avatar,Typography,Container} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function SignIn() {
  const navegate = useNavigate()
  const [max, setmax] = useState<number>(0)
  const [core, setcore] = useState<boolean>(false)
  const [pass, setpass] = useState<any>(localStorage.getItem("pass"))
  const [email, setemail] = useState<any>(localStorage.getItem("email2"))
  const [state, setstate] = useState<string>("")
  const [token, settoken] = useState<string>("")
  const [name, setname] = useState<string>("")
  localStorage.setItem("d", "1")

  async function send (e:any){
    e.preventDefault()
    var expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    const emailVeri = await expReg.test(email)
    if (emailVeri === false){return window.alert("You have to introduce a correct email.")}
    else if (pass.length > 12 || pass.length <= 3){window.alert("The password is not correct.")}
    else if (max > 2){window.alert("You are making many requests.")}
    else{
      setmax(max + 1)
      fetch("https://project-0-1-1.herokuapp.com/c-b",{
        method: "POST",
        headers:{
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pass: pass,
          email: email
        })

     

      })
      .then((res)=>{return res.json()})
      .then((res)=> {setstate(res.state);settoken(res.token);setname(res.name)})
    }
      }


      useEffect(()=>{
        let token0 = localStorage.getItem("token")
        if (state === "successful"){navegate("/");localStorage.setItem("token",token);localStorage.setItem("user", name)}
        if (core === true && state === "successful"){localStorage.setItem("pass",pass);localStorage.setItem("email2",email);localStorage.setItem("core", "true")}
        if (localStorage.getItem("core") === "true"){setcore(true)}
        if (!token0 === undefined || !token0 === null || token0){navegate("/")}
      },[state]

      )
    
  return (
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          {localStorage.getItem("idiom") === null ? "Sign In" : "Loguearse"}
          </Typography>
          <Box component="form" onSubmit={(e)=>{send(e)}} noValidate sx={{ mt: 1 }}>
            <TextField
              value={email}
              margin="normal"
              required
              fullWidth
              id="email"
              label={localStorage.getItem("idiom") === null ? "Email address" : "Correo Electrónico"}
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>{setemail(e.target.value)}}
            />
            <TextField
              value={pass}
              margin="normal"
              required
              fullWidth
              name="password"
              label={localStorage.getItem("idiom") === null ? "Password" : "Contraseña"}
              type="password"
              id="password"
              onChange={(e)=>{setpass(e.target.value)}}
            />
            <Typography component="p" color="initial" sx={{color: "rgb(255,0,0)"}}>{state}</Typography>
            <FormControlLabel
              control={<Checkbox checked={core} value="remember" color="primary" id='pepe' />}
              label={localStorage.getItem("idiom") === null ? "Remember me." : "Recordarme"}
              onChange={()=>{
                if (core === false){setcore(true)}
                else {setcore(false)}
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {localStorage.getItem("idiom") === null ? "Sign In" : "Entrar"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/forgot" variant="body2">
                 {localStorage.getItem("idiom") === null ? "Forgot password?" : "Olvidaste tu contraseña?"}
                </Link>
              </Grid>
              <Grid item>
                <Link href="./signup" variant="body2">
                {localStorage.getItem("idiom") === null ? "Don't have an account? Sign Up" : "No tienes una cuenta? Crea una"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}