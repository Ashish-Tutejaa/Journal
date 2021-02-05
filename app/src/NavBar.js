import React from 'react';
import {FiLogIn, FiLogOut} from 'react-icons/fi'

const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
'October', 'November', 'December'];

const ifToken = () => {
    if(localStorage.getItem('token') !== null)
        return true;
    return false;
}

const Username = ({value}) => {
    return <div className='username mx-4 text-lg'>
        {value}
    </div>
}

const Datee = () => {
    const date = new Date(); 
    let suff = 'th';
    if(date.getDate() === 1 || date.getDate() === 31)
        suff = 'st';
    else if(date.getDate() === 2)
        suff = 'nd';
    else if(date.getDate() === 3)
        suff = 'rd';
    return <div className='text-3xl'>
        {<h1> {date.getDate()}{suff} {month[date.getMonth()]}, {date.getFullYear()}</h1>}
    </div>
}

const Loginout = ({setter}) => {

    const text = ifToken();

    return <button onClick={() => {
        localStorage.removeItem('token');
        setter('Anonymous')
    }} className='log mx-4 text-lg'>
            {!text ? <FiLogIn/> : <FiLogOut/>}
        </button>
}

const NavBar = ({username, setUsername}) => {
    let choice = ifToken();
    console.log(choice);
    if(choice){
        return <div className='py-2 bg-navCol flex flex-row flex-wrap justify-between items-center w-full'>
            <Username value={username}/>
            <Datee/>
            <Loginout setter={setUsername}/>
        </div>
    } else {
        return <div className='py-2 bg-navCol flex flex-row flex-wrap justify-between items-center w-full'>
                <h1 className='text-3xl font-bold cursor-default'>Resolve.me</h1>
            </div>
    }

}

export default NavBar;