import { Link,useNavigate} from "react-router-dom"

const Navbar = () => {
    const isUserSignedIn= !!localStorage.getItem('token')
    const navigate = useNavigate()
    function  handleLogout(){
        localStorage.removeItem('token')
        navigate('/login')
    }
  return (
    <div className='Navbar'>
      <nav className="navbar">
        <h1>Auth</h1>
        {(isUserSignedIn)?(
            <>
            <Link style={{color:'white',textDecoration:'none'}} to={'/account'}>Account</Link>
            <button onClick={handleLogout}>Signout</button>
            </>
        ):(
            <>
            <Link style={{color:'white',textDecoration:'none'}} to={'/login'}>Login</Link>
            <Link style={{color:'white',textDecoration:'none'}} to={'/signup'}>Signup</Link>
            </>
        )}
       
      
      </nav>
    </div>
  )
}

export default Navbar
