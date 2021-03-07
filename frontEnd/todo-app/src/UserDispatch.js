import React, { useEffect, useReducer } from 'react'
import { User } from './Icons/HeroIcons'

export const Context = React.createContext()

const UserContext = (props)=>{
    const initialState = {
        token: null,
    }
    const reducer = (state, action)=>{
        switch(action.type){
            case 'login': return {token: action.text.token}
            default: throw new Error();
        }
    }
     const [user, dispatch] = useReducer(reducer,initialState)

     useEffect(()=>{
         const myItem = localStorage.getItem('token_id');
         if(myItem!== null){
             //dispatch({type:'login', text: JSON.parse(myItem)})
         }else{
             localStorage.clear()
         }
     },[])
    return (<Context.Provider value={[user, dispatch]}>{props.children}</Context.Provider>)
}


export default UserContext