import { useEffect, useState } from "react"
import { Link,useNavigate} from "react-router-dom"
import './Ls.css'
import  axios  from 'axios';
const Signup = () => {
    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")


    const navigate = useNavigate()

    function fetchUser(){
        axios.get('http://localhost:3001/register')
        .then(res=>console.log(res.data))
    }

    useEffect(()=>{
        fetchUser()
    },[])



    function handleSubmit(e){
        e.preventDefault()
        axios.post('http://localhost:3001/register',{username,email,password})
        .then(()=>{
            navigate('/login')
            alert('Created Successfully')
            username('')
            email('')
            password('')
            fetchUser()
        })   
        .catch(err=>console.log(err))    
    }

  return (
    <div className="Ls">
       
      <form onSubmit={handleSubmit}>
         <h1>Signup Form</h1>
        <input type="text" onChange={(e)=>setUsername(e.target.value)} value={username} placeholder="Enter Your Name"></input>
        <br></br>
        <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter Your Email"></input>
        <br></br>
        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter Your Password"></input>
        <br></br>
        <button type="submit">Submit</button>
        <p>Already Have An Account <Link to={'/login'}>Login</Link></p>
      </form>
    </div>
  )
}

export default Signup
