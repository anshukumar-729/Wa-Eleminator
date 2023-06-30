// AppContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const[theme, setTheme] = useState(0);
    const[language, setLanguage] = useState("cpp");
    const[stdin, setStdin] = useState("");
    const[stdin2, setStdin2] = useState("");
    const[stdout, setStdout] = useState("");
    const[stderr, setStderr] = useState("");
    const[isToggled, setIsToggled] = useState(false);
    const [script, setScript] = useState("");
    const [script2, setScript2] = useState("");
    const [script3, setScript3] = useState("");
    const [script1, setScript1] = useState("");
    const [running , setRunning] = useState(false);
    const [t, setT] = useState(0);
    const [test, setTest] = useState([]);
    const [v, setV] = useState(0);
    const [variables, setVariables] = useState([]);
    const [copied, setCopied] = useState(false);
    const [tilda, setTilda] = useState(false);
    const [plang, setPlang] = useState("cpp");
    const [plang1, setPlang1] = useState("cpp");
    const [plang2, setPlang2] = useState("cpp");
    const [language1, setLanguage1] = useState("cpp")
    const [language2, setLanguage2] = useState("cpp")
    const [out1,setOut1] = useState("");
    const [out2,setOut2] = useState("");
    const [cases, setCases ] = useState([]);
    const [foundCase, setFoundCase] = useState(false);
    const [msgOff, setmsgOff] = useState(0);

    useEffect(() => {
        let temp = [];
        let ppp = [];
        for(let i=0;i<v;i++){
            temp.push(i);
            ppp.push({
                name: "",
                type: "",
                lower: "",
                upper: "",
                size: "",
                edges: "",

            })

        }
        setVariables(temp);
        setTest(ppp);

    }, [v]);

  return (
    <AppContext.Provider value={{theme, language,stdin, stdin2, stdout, stderr, isToggled, script, script2, running, t, test, v, variables, copied, tilda, setTheme, setLanguage,setStdin, setStdin2, setStdout, setStderr, setIsToggled, setScript, setScript2, setRunning, setT, setTest, setV, setVariables, setCopied, setTilda, plang, setPlang,plang1, setPlang1, plang2, setPlang2, language1, setLanguage1, language2, setLanguage2, script3, setScript3 , script1, setScript1, out1, setOut1, out2, setOut2, cases, setCases, foundCase, setFoundCase,msgOff, setmsgOff}}>
        {children}
    </AppContext.Provider>
  );
};
