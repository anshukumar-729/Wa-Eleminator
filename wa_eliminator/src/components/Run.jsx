import React, { useContext } from "react";
import { useState } from "react";
import { compile } from "../helper/script";
import EditorPage from "./Editor";
import { AppContext } from "../helper/AppContext";

const Run = () => {
    
    const {language, setLanguage} = useContext(AppContext);


    const {isToggled, setIsToggled} = useContext(AppContext);
  
    const handleToggle = () => {
      setIsToggled(!isToggled);
    };

    
    return (
        <div className="p-1 bg-white">
            <div className="flex items-center">
               <p className="m-2 font-light"> Dark Theme</p>
                <button
                    className={`relative rounded-full w-11 h-7  bg-gray-300 focus:outline-none ${isToggled ? 'bg-gray-300' : ''}`}
                    onClick={handleToggle}
                >
                    <div
                    className={`absolute top-0 left-0 mt-1 w-5 h-5 rounded-full ${isToggled ? 'bg-black' : 'bg-white'} shadow transition-transform ${
                        isToggled ? 'transform translate-x-full' : ''
                    }`}
                    ></div>
                </button>
     
            </div>
            <div className="flex items-center">
               <p className="m-2 font-light"> Language</p>
               <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
               >
                     <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="py">Python</option>
                        <option value="c">C</option>
                        <option value="csharp">C#</option>
                        <option value="ruby">Ruby</option>
                        <option value="go">Go</option>
                        <option value="scala">Scala</option>
                        <option value="kotlin">Kotlin</option>
               </select>
     
            </div>
            <EditorPage tg={isToggled} lang = {language}/>
        </div>
    );
}

export default Run;