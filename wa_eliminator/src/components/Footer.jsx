import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="bg-gray-900 text-white flex justify-between p-4">
        <footer className='text-center text-gray-400 text-xs w-full '>
            <p>Created by <Link to="/social" className='text-gray-200 hover:text-gray-500'>Team Wa-Eleminator</Link></p>
        </footer>

    </div>
    );
};

export default Footer;