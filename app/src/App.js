import React, {useState, useEffect} from 'react';
// import './App.css';
import NavBar from './NavBar.js';
import Todo from './Todo.js';
import Footer from './Footer.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const Wrapper = (props) => {

  const [username, setUsername] = useState('Anonymous');

  return <>
    <NavBar setUsername={setUsername} username={username}/>
    <Todo setUsername={setUsername} hash={props.location.hash}/>
    <Footer/>
  </>
}

const App = () => {
  return <Router>
    <div className='works'>
      <Switch>
        <Route exact path='/' component={Wrapper}>
        </Route>
      </Switch>
    </div>
  </Router> 
}

export default App;