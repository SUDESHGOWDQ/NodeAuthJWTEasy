import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Account from './Pages/Account';
import Navbar from './Components/Navbar';
import './App.css'

const App = () => {

  const isUserSignedIn= !!localStorage.getItem('token')

  return (
   <BrowserRouter>
   <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      {isUserSignedIn && <Route path='/account' element={<Account/>}/>}
    </Routes>
   </BrowserRouter>
  )
}

export default App