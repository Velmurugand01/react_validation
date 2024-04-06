
import './App.css';

import SignUp from './component/Signup/SignUp';
import Login from './component/Login/Login';
import {BrowserRouter,Route,Routes} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter >
    <Routes>

      <Route path='/' element={<SignUp />}/>
      <Route path='/login' element={<Login></Login>}/>
    </Routes>
 

    
 
   
    </BrowserRouter>
  );
}

export default App;
