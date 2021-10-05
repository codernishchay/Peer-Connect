
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserSignup from './pages/signup';
import UserLogin from './pages/login';
import HomePage from './pages/home';
import Search from './pages/search';
function App() {

  return (   
    <div>
     <BrowserRouter>
     <Switch>
       <Route exact path='/'  component={HomePage} />
       <Route path='/signup' component={UserSignup} />
       <Route path='/login' component={UserLogin} /> 
       <Route path='/search' component={Search} /> 
    
     </Switch>
     </BrowserRouter>
    </div>
  ) 
}


export default App;
