import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import './index.scss';
import UserReducer from './UserDispatch';

ReactDOM.render(
    <UserReducer>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </UserReducer>,
    document.getElementById('root')
)