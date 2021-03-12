import React, { useContext } from 'react';
import { Register } from './Register';
import { Login } from './Login'
import { Switch , BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import UserReducer, { UserContext } from './UserDispatch'
import { Dashboard } from './Dashboard';
import { HomeNavbar } from './HomeNavbar';
import { SpinnerLoading } from './Icons/SpinnerLoading';

export const App = (props) => {
    const [user, setUser] = useContext(UserContext)
    const PrivateRoute = ({component: Component, ...rest})=>{
        const isAuth = localStorage.getItem('token_id')
        console.log(isAuth)
        console.log()
        console.log(rest)
        return (
            <Route {...rest} render={props =>{
                return isAuth ? (
                  <Component {...props} {...rest} />
                ) : (
                    <Redirect
                      to={'/Login'}
                    />
                  )
              }}
            />
          );
    }

    return (
        <div className="h-screen">
            <Router>
            <Switch>
                <UserReducer>
                <Route exact path='/home'>
                    <HomeNavbar/>
                </Route>
                <Route exact path='/SignUp'>
                    <Register/>
                </Route>
                <Route path = '/Login'>
                    <Login/>
                </Route>
                <PrivateRoute path='/dashboard' component={Dashboard}/>
                </UserReducer>
            </Switch>
            </Router>
        </div>
    )
}

