import React ,{useState} from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom"

function PostForm(){
    const url = "http://localhost:9000/user/"
    const history = useHistory()
    const [data,setData] = useState ({
        firstname : "",
        lastname : "",
        email : "",
        password : ""
    })
    function submit(e){
        e.preventDefault();
        Axios.post(url,{
            firstname : data.firstname,
            lastname: data.lastname,
            email:data.email,
            password:data.password
        })
        .then(res=>{
            console.log(res.data)
            alert('form submitted successfully')
            history.push("/")
        })
    }
    function handle(e){
        const newdata ={...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
        console.log(newdata)
    }
   
   
    return(
        <div>
        <form onSubmit={(e)=>submit(e)}>
        <h1>Register</h1>
        <input onChange={(e)=>handle(e)} id="firstname" value={data.firstname} placeholder="firstname" type="text"></input><br/>
        <input onChange={(e)=>handle(e)} id="lastname" value={data.lastname}placeholder="lastname" type="text"></input><br/>
        <input onChange={(e)=>handle(e)} id="email" value={data.email}placeholder="email" type="text"></input><br/>
        <input onChange={(e)=>handle(e)} id="password" value={data.password}placeholder="password" type="text"></input><br/>
        <button onClick={() => history.push("/table")}>Fetch</button>
        <button >submit</button>
        </form>
        </div>

    )
}

export default PostForm;