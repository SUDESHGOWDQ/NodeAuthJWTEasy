import './Ls.css'
import { useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
    const[username,setUsername]=useState("")
    const[password,setPassword]=useState("")

    const navigate = useNavigate()

    function fetchUser(){
        axios.get('http://localhost:3001/register')
        .then(res=>console.log(res.data))
    }

    useEffect(()=>{
        fetchUser()
    },[])

    

    async function handleSubmit(e){
        e.preventDefault()
        try {
          const response = await axios.post('http://localhost:3001/login', { username, password })
          const token = response.data.token
          alert('Login successful')
          setUsername('')
          setPassword('')
          fetchUser();
          navigate('/account')
          window.location.reload();
          localStorage.setItem('token', token)
            
        } catch (error) {
            console.log(error);
        }
            
        
        
    }

  return (
    <div className="Ls">
      <form onSubmit={handleSubmit}>
         <h1>Login Form</h1>
        <input type="text" onChange={(e)=>setUsername(e.target.value)} value={username} placeholder="Enter Your Name"></input>
        <br></br>
        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter Your Password"></input>
        <br></br>
        <button type="submit">Submit</button>
        <p>Dont Have An Account <Link to={'/signup'}>Signup</Link></p>
      </form>
    </div>
  )
}

export default Login
