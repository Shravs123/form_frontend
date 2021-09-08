import React, { Component }  from 'react';
import PostForm from './component/form';
import Table from './component/table';
import Edit from './component/file';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



class App extends Component{
  render(){
  return (
   
    <Router>
    <Switch>
    
    <Route path="/user">
            <PostForm/>
    </Route>
    <Route path="/table">
       <Table />
    </Route>
   
     <Route path="/file/:id" component={Edit}>
     
     </Route>
    </Switch>
    </Router>
  );
}}

export default App;
