import SignIn from "./components/sign/sign-in"
import SignUp from "./components/sign/sign-up"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Verify from './components/sign/verify';
import Error from './components/error/error';
import Terms from './components/sign/terms';
import Main from './components/main/Main';
import Forgot from './components/sign/forgot-pass';
import User from './components/home/user';
import EditUser from './components/home/editUser';
import Settings from "./components/home/settings";
import Foll from './components/home/follow.er.ing';
import GlobalChat from './components/home/globalChat';
import { useEffect } from "react";

function App() {

  useEffect(()=>{
    let key:any = localStorage.getItem("key")
    if (key === undefined || key === "" || key === null){localStorage.setItem("key", "0")}
  })

  return (
  
   <Router>
    <Routes>

      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/signup/verify' element={<Verify/>}/>
      <Route path='/signup/terms' element={<Terms/>}/>
      <Route path='/forgot' element={<Forgot/>}/>
      
      
      <Route path='/user/foll/:id' element={<Foll/>}/>
      <Route path='/user/edit/:id' element={<EditUser/>}/>
      <Route path='/.user/:id' element={<User/>}/>
      <Route path='/' element={<Main/>}/>

      <Route path='/chat/:id' element={<GlobalChat/>}/>

      <Route path='/config' element={<Settings/>}/>

      <Route path='/*' element={<Error/>}></Route>
    </Routes>
   </Router>
   
  );
}

export default App;
