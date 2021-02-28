import React from 'react'
import {Cross, Check} from './Icons/HeroIcons'

const messages = {
    wrongUsername: 'Please fill a valid username.',
    correctUsername: 'Username is correct.',
    wrongEmail: 'Please fill a valid email.',
    correctEmail: 'Email is correct.',
    wrongName: 'Please fill a valid name.',
    correctName: 'Name is correct.',
}
const colors ={
    red: '#ff0000',
    green: '#33cc33'
}
export const RegisterDispatch = ({show, placeholder, value}) => {
    const switchRender = (show, placeholder,value)=>{
        if(show === false && placeholder==='Username'){
            return<Span message={messages.wrongUsername} icon={'cross'} color={colors.red}/>;
        }else if(show===true && placeholder==='Username'){
            return <Span message={messages.correctUsername} icon={'check'} color={colors.green}/>
        }else if(show === false && placeholder==='Name'){
            return <Span message={messages.wrongName} icon={'cross'} color={colors.red}/>
        }else if(show === true && placeholder==='Name'){
            return <Span message={messages.correctName} icon={'check'} color={colors.green}/>
        }else if(show === false && placeholder==='Email'){
            return <Span message={messages.wrongEmail} icon={'cross'} color={colors.red}/>
        }else if(show===true && placeholder === 'Email'){
            return <Span message={messages.correctEmail} icon={'check'} color={colors.green}/>
        }
    }
    return (<>{switchRender(show, placeholder, value)}</>);
}
const Span = ({message, icon, color})=>{
    const renderSwitch = (icon)=>{
        switch(icon){
            case 'cross': return <Cross/>
            case 'check': return <Check/>
            default: return <Cross/>
        }
    }
    return(
        <>
        <div className="mx-5 flex flex-row items-center mt-2">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke={color} height="18px" width="18px">
        {renderSwitch(icon)}
        </svg>
        <span className="mx-2">{message}</span>
        </div>
        </>
    )
}
export const NotGoodRequest = ({onClick})=>{
    
    return (
        <div className="mx-5 my-5 bg-red-300 bg-opacity-75 rounded flex flex-row-reverse items-center shadow-md">
            <div className="mx-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke='#000000' onClick={onClick} height="18px" width="18px">
                <Cross/>
            </svg>
            </div>
            <div className='flex-grow my-3 mx-3'>
            <p className="w-full">Please check fields, email or username is already in use.</p>
            </div>
        </div>
    )
}