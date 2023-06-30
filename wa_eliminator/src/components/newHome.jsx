import React, {useState} from 'react';
import { myFunction } from '../helper/script';
import { compile } from '../helper/script';
import { Link } from 'react-router-dom';

const HomePage = () => {
  
    

   
  return (
    <div className='p-6 bg-gray-100 h-screen'>
        <div className='flex'>
           
            <div className='w-1/3 p-10'>
                <div className='w-ful border  rounded-md p-3 shadow-md shadow-stone-400 bg-'>
                    <div className='text-5xl text-gray-900 tracking-widest font-thin mb-6'>
                        <p>Code </p>
                        <p>& </p>
                        <p>Run</p>
                    </div>
                    <div className='mb-10'>
                        <Link to={"/run"} className="bg-gray-600 hover:bg-gray-700 text-white tracking-wider py-2 px-4 rounded mb-5"
                        
                        >
                            Get Started - -{">"}
                        </Link>
                    </div>
                </div>
            </div>
            <div className='w-1/3 p-10'>
                <div className='w-ful border  rounded-md p-3 shadow-md shadow-stone-400 '>
                    <div className='text-5xl text-gray-900 tracking-widest font-thin mb-6'>
                        <p>Check </p>
                        <p>your </p>
                        <p>Solution</p>
                    </div>
                    <div className='mb-10'>
                        <Link to={"/find"} className="bg-gray-600 hover:bg-gray-700 text-white tracking-wider py-2 px-4 rounded mb-5"
                        
                        >
                            Get Started - -{">"}
                        </Link>
                    </div>
                </div>
            </div>
            <div className='w-1/3 p-10'>
                <div className='w-ful border  rounded-md p-3 shadow-md shadow-stone-400 '>
                    <div className='text-5xl text-gray-900 tracking-widest font-thin mb-6'>
                        <p>Generate </p>
                        <p>Test </p>
                        <p>Cases</p>
                    </div>
                    <div className='mb-10'>
                        <Link to={"/generate"} className="bg-gray-600 hover:bg-gray-700 text-white tracking-wider py-2 px-4 rounded mb-5"
                        
                        >
                            Get Started - -{">"}
                        </Link>
                    </div>
                   
                </div>
            </div>
        </div>
        


    </div>
  );
};

export default HomePage;
