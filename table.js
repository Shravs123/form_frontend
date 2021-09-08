import React ,{Component} from "react";
import Axios from 'axios';
import {Link} from 'react-router-dom'

class Table extends Component{
    constructor(props){
        super(props)
        this.state = {
            users:[],
            isLoading : false,
            isError:false
        }
    }
    

    async componentDidMount(){
        this.setState({isLoading:true})

        const response = await fetch("http://localhost:9000/user/")
        if(response.ok){
            const users = await response.json()
            console.log(users)
            this.setState({users,isLoading:false})
        }
        else{
            this.setState({isError:true,isLoading:false})
        }
        
    }
    deleteData=(id)=>{
        Axios.delete(`http://localhost:9000/user/${id}`)
    }

    
//    handleEdit=(id)=>{
//        const filterItems = this.state.users.filter(user =>
//         user._id !== id);
//         const selectedItem = this.state.users.find(user => user._id === id);
//         console.log(selectedItem)
//         // this.setState({
//         // user:filterItems,
//         // users:selectedItem.firstname,        
//         // id:id
//         // })
        
        
//    }

    renderTableHeader = () =>{
        return Object.keys(this.state.users[0]).map(attr => <th key={attr}>
            {attr.toUpperCase()}
            </th>)

        
    }
    

    renderTableRows = () =>{
        return this.state.users.map(user => {
            
            return(
                
                <tr key={user.firstname}>
                
                <td>{user._id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>

                <td><Link to={'/file/'+user._id}>Edit</Link></td>
                <td><button onClick={()=>this.deleteData(user._id)}>Delete</button></td>
                
                </tr>
            )
        })
    }
                
   
    render(){
        const {users,isLoading,isError} = this.state
        if(isLoading){
            return <div> Loading ....</div>
        }
        if(isError){
            return <div> Error ....</div>
        }
        
        return users.length >0 
        ?(
            <table border="1" cellPadding="10">
            <thead>
            <tr>
            {this.renderTableHeader()}
            </tr>
            </thead>
            
            <tbody> 
                       
            {this.renderTableRows()}
            </tbody>
            
            </table>
        ):(
            <div> No Users</div>
        )
    }
}
// function Table(){
//     <div> 
//     <h1> Table Page </h1></div>
//     return(
//         <div> 
//         <h1> Table Page </h1></div>)
// }


export default Table;