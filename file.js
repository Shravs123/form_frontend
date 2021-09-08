import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
export default class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            password: '',
            redirect: false,
            users:[]
        }
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:9000/user/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    firstname: response.data.firstname,
                    lastname: response.data.lastname,
                    email: response.data.email,
                    password: response.data.password
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeFirstName(e) {
        this.setState({
            firstname: e.target.value
        })
    }
    onChangeLastName(e) {
        this.setState({
            lastname: e.target.value
        })
    }
    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleSubmit(e) {
        // const uri ='http://localhost:9000/user/'+this.props.match.params.id
        // e.preventDefault();
        
        
        // axios.put(uri,{
        //     firstname: this.state.firstname,
        //     lastname: this.state.lastname,
        //     email: this.state.email,
        //     passowrd: this.state.password
        // } )
        // .then(res=>{
        //     console.log(res)
        //     alert('updated successfully')
        // })
        // .catch(error=>console.log(error.response.data))
       //this.props.history.push('/view');
    e.preventDefault();
    const{firstname,lastname,email,password} = this.state;
    axios.put('http://localhost:9000/user/'+this.props.match.params.id,{
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:password
    })
    .then((res)=>{
        console.log(res)
        alert('updated successfully')
        this.props.history.push('/table')
    })
    .catch((err)=>{
        console.log(err)
    })
    }

    
    

    render() {
        const { redirect } = this.state;
         if (redirect) {
          return <Redirect to='/table'/>;
         }
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Add New User</h3>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>First Name</label>
                        <input type="text" value={this.state.firstname} onChange={this.onChangeFirstName} />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type="text" value={this.state.lastname} onChange={this.onChangeLastName} />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text" value={this.state.email} onChange={this.onChangeEmail} />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="text" value={this.state.password} onChange={this.onChangePassword} />
                    </div>
                    <div>
                        <input type="submit" value="Update User" />
                    </div>
                </form>
            </div>
        )
    }
}

