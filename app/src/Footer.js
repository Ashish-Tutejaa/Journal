import React from 'react';
import {AiFillGithub} from 'react-icons/ai'

const Footer = () => {
    return <div className='cursor-pointer w-full h-8 bg-navCol flex flex-row justify-center items-center'>
        <AiFillGithub onClick={() => {window.location.href = 'https://github.com/Jobandeep2417/DemoBlog/tree/master'}}/>
    </div>
}

export default Footer;