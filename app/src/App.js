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

  const [reset, setReset] = useState({});
  return <div className='works'>
    <NavBar classname='flex-grow-0' force={setReset}/>
    <Todo hash={props.location.hash}/>
    <Footer className='flex-grow-0'/>
  </div>
}

const App = () => {
  return <Router>
      <Switch>
        <Route exact path='/' component={Wrapper}>
        </Route>
      </Switch>
  </Router> 
}

export default App;