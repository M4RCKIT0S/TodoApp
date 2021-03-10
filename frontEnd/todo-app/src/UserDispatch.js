import React, { useEffect, useReducer } from 'react'

export const UserContext = React.createContext()

const UserReducer = (props)=>{
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
             dispatch({type:'login', text: myItem})
         }else{
             localStorage.clear()
         }
     },[])
    return (<UserContext.Provider value={[user, dispatch]}>{props.children}</UserContext.Provider>)
}


export default UserReducer