import React from 'react';
import { Register } from './Register';
import { Login } from './Login'
import { Switch , BrowserRouter as Router, Route} from 'react-router-dom';


export const App = () => {
    return (
        <div className="h-screen">
            <Router>
            <Switch>
                <Route exact path='/SignUp'>
                    <Register/>
                </Route>
                <Route path = '/Login'>
                    <Login/>
                </Route>
            </Switch>
            </Router>
        </div>
    )
}

