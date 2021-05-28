import './App.css';
import LoginForm from './Pages/LoginForm';
import {Switch,Route, Link, useHistory} from 'react-router-dom'
import SignUpForm from './Pages/SignUpForm';
import PrivateRoute from './PrivateRoute'
import { useAuth } from './Context/AuthContext'
import Profile from './Pages/Profile';

const App=()=> {
  const history = useHistory();
  const auth= useAuth()

  const handleLogout=async ()=>{
    try{
      await auth.logout()
      console.log('logged out')
      history.push('/')

    }catch(e){
      console.log(e)
    }

  }
  return (
    <div className="App">

      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
        <button type="button" onClick={handleLogout}>Sign out</button>
      </nav>
      <Switch>
        
        <Route exact path="/">
          <h3>This is the Homepage</h3>
        </Route>
        <Route exact path="/login">
          <LoginForm/>   
        </Route>
        <Route exact path="/signup">
          <SignUpForm/>   
        </Route>
        <PrivateRoute path='/profile' component={Profile}/>
      </Switch>
      

    </div>
  );
}

export default App;
