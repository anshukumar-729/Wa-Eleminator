import React, { useContext , useState} from "react";
import RandomInputGenerator from "./Input";
import {  AppContext } from "../helper/AppContext"
import MonacoEditor from 'react-monaco-editor';
import { compile } from "../helper/script";

const Find = () => {
    const { script3, setScript3, stdin, setStdin, running, setRunning, script1, setScript1, stdin2, setStdin2, stdout, setStdout, language1, setLanguage1, language2, setLanguage2, theme, setTheme, plang1, setPlang1, plang2, setPlang2, out1, setOut1, out2, setOut2, cases, setCases, foundCase, setFoundCase} = useContext(AppContext);
    const editorOptions = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: true,
      };
      const {isToggled, setIsToggled} = useContext(AppContext);
  
      const handleToggle = () => {
        setIsToggled(!isToggled);
      };
      React.useEffect(() => {
        console.log(isToggled);
        if(isToggled){
            setTheme('vs-dark');
        }
        else{
            setTheme('vs-white');
        }
    }, [isToggled]);

    React.useEffect(() => {
        if(plang1 === language1 && script3 !== ''){
          return;
        }
        setPlang1(language1);
        if (language1 === 'cpp') {
          setScript3    (`#include <bits/stdc++.h>
    using namespace std;
    int main() {
    
        return 0;
    }`);
        } else if (language1 === 'java') {
          setScript3    (`import java.util.*;
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
        }
    }`);
    
        } else if (language1 === 'py') {
          setScript3    (`# Write your code here`);
        } else if (language1 === 'c') {
          setScript3    (`#include <stdio.h>
    int main() {
    
        return 0;
    }`);
        } else if (language1 === 'csharp') {
          setScript3    (`using System;
    class Program {
        static void Main(string[] args) {
            Console.WriteLine("Hello World!");
        }
    }`);
        } else if (language1 === 'ruby') {
          setScript3    (`# Write your code here`);  
        } else if (language1 === 'go') {
          setScript3    (`package main
    import "fmt"
    func main() {
        fmt.Println("Hello World!")
    }`);
        } else if (language1 === 'scala') {
          setScript3    (`object Main extends App {
        println("Hello World!")
    }`);
        } else if (language1 === 'kotlin') {
          setScript3    (`fun main(args: Array<String>) {
        println("Hello World!")
    }`);
        }
      }, [language1]);
    
    React.useEffect(() => {
        if(plang2 === language2 && script1 !== ''){
          return;
        }
        setPlang2(language2);
        if (language2 === 'cpp') {
          setScript1(`#include <bits/stdc++.h>
    using namespace std;
    int main() {
    
        return 0;
    }`);
        } else if (language2 === 'java') {
          setScript1(`import java.util.*;
    public class Main {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);
        }
    }`);
    
        } else if (language2 === 'py') {
          setScript1(`# Write your code here`);
        } else if (language2 === 'c') {
          setScript1(`#include <stdio.h>
    int main() {
    
        return 0;
    }`);
        } else if (language2 === 'csharp') {
          setScript1(`using System;
    class Program {
        static void Main(string[] args) {
            Console.WriteLine("Hello World!");
        }
    }`);
        } else if (language2 === 'ruby') {
          setScript1(`# Write your code here`);  
        } else if (language2 === 'go') {
          setScript1(`package main
    import "fmt"
    func main() {
        fmt.Println("Hello World!")
    }`);
        } else if (language2 === 'scala') {
          setScript1(`object Main extends App {
        println("Hello World!")
    }`);
        } else if (language2 === 'kotlin') {
          setScript1(`fun main(args: Array<String>) {
        println("Hello World!")
    }`);
        }
      }, [language2]);

      const [error, setError] = useState(0);

      async function compiler () {
        setFound(false);
        setRequired(false);
        setVerdict(false);
        setWrongTestCase(-1);
        setWrongTestCaseInput([]);
        setRunning(true);
        setError(0);


        let data1 = await compile(script3, stdin2, language1);
        let data2 = await compile(script1, stdin2, language2);
        setRunning(false);
        if(data1.error){
            setError(1);
            compareOutput(out1, out2, stdin2);
            return ;

        }

        setOut1(data1.output)
        setOut2(data2.output)

        compareOutput(data1.output, data2.output, stdin2);
        

        
    }
    const [found , setFound] = useState(false);
    const [required, setRequired] = useState(false);
    const [verdict, setVerdict] = useState(false);
    const [wrongTestCase, setWrongTestCase] = useState(-1);
    const [wrongTestCaseInput, setWrongTestCaseInput] = useState([]);
    function compareOutput(output1, output2, input){
        console.log(output1, output2, input);
        console.log(cases); 
        let O1 = output1.split("\n");
        let O2 = output2.split("\n");
        console.log(O1);
        console.log(O2);
        let numberOfTestCases = parseInt(input.split("\n")[0]);
        let wrongTestCase = -1;
        let noOfLineinEachTestCase = parseInt(O1.length/numberOfTestCases);
        console.log(noOfLineinEachTestCase);
        console.log(numberOfTestCases);
        for(let i=0;i<numberOfTestCases;i++){
            for(let j=0;j<noOfLineinEachTestCase;j++){
                if(O1[i*noOfLineinEachTestCase+j]!=O2[i*noOfLineinEachTestCase+j]){
                    setFound(O1[i*noOfLineinEachTestCase+j]);
                    setRequired(O2[i*noOfLineinEachTestCase+j]);
                    wrongTestCase = i+1;
                    break;
                }
            }
            if(wrongTestCase!=-1){
                break;
            }
        }
        wrongTestCase = parseInt(wrongTestCase);
        console.log(wrongTestCase);
        if(wrongTestCase==-1){
            setVerdict("Accepted");
        }
        else{
            console.log("Wrong Answer on test case "+wrongTestCase, cases, cases[wrongTestCase-1]);
            setVerdict("Wrong Answer on test case "+wrongTestCase);
            console.log(input.split("\n"));
            let tline = (input.split("\n").length-2)/numberOfTestCases;
            console.log(tline)
            let ppp=[]
            cases[wrongTestCase-1].split("\n").forEach((line, index)=>{
                
                    ppp.push(line);
                
            })
            setFoundCase(cases[wrongTestCase-1]);
            
            setWrongTestCaseInput(ppp);


        }
    }
    

    return(
        <div className="font-light">
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
            
            <div className="flex p-6 "> 
                
                <div className='w-1/2 border'>
                <div className="flex items-center">
               <p className="m-2 font-light"> Language</p>
               <select 
                    value={language1}
                    onChange={(e) => setLanguage1(e.target.value)}
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
                    <div className="editor-header text-left ml-10">Optimal Code</div>
                    <MonacoEditor
                    height="400"
                    language={language1} // specify the language mode
                    theme={theme} // specify the theme
                    value={script3} // set the initial value for editor 1
                    options={editorOptions}
                    onChange={(value, event) => setScript3  (value)} // update editorValue1 state
                    className="text-left m-1"
                    />
                </div>
                <div className='w-1/2 border'>
                <div className="flex items-center">
               <p className="m-2 font-light"> Language</p>
               <select 
                    value={language2}
                    onChange={(e) => setLanguage2(e.target.value)}
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
                    <div className="editor-header text-left ml-10">Brute Code</div>
                    <MonacoEditor
                    height="400"
                    language={language2} // specify the language mode
                    theme={theme} // specify the theme
                    value={script1} // set the initial value for editor 1
                    options={editorOptions}
                    onChange={(value, event) => setScript1(value)} // update editorValue1 state
                    className="text-left m-1"
                    />
                </div>


                
            </div>
            <RandomInputGenerator f={1}/>

            <div className="flex justify-start">
                <button className='text-left ml-10 mt-2 mb-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' onClick={compiler}>{running?"Checking...":"Check"}</button>
            </div>
            {/* {error==1 && <span>Server Error</span>} */}
            <div className="flex p-6 "> 
                
                <div className='w-1/2 border'>
              
                    <div className="editor-header text-left ml-10">Optimal Code Output</div>
                    <MonacoEditor
                    height="400"
                    language={language1} // specify the language mode
                    theme={theme} // specify the theme
                    value={out1} // set the initial value for editor 1
                    options={editorOptions}
                    onChange={(value, event) => setOut1  (value)} // update editorValue1 state
                    className="text-left m-1"
                    />
                </div>
                <div className='w-1/2 border'>
               
                    <div className="editor-header text-left ml-10">Brute Code Output</div>
                    <MonacoEditor
                    height="400"
                    language={language2} // specify the language mode
                    theme={theme} // specify the theme
                    value={out2} // set the initial value for editor 1
                    options={editorOptions}
                    onChange={(value, event) => setOut2(value)} // update editorValue1 state
                    className="text-left m-1"
                    />
                </div>


                
            </div>
            <div className="m-10 text-left font-light">
                <h3 className="text-left m-4  text-2xl">Verdict : {running&& (<p className="text-md">Running on test Cases...</p>)}</h3>
                {verdict!="" && <h2 className={`font-bold ml-4 ${verdict=="Accepted"?"text-green-500":"text-red-700"} `}> {verdict}</h2> }
                {wrongTestCaseInput.length!=0 && 
                    <div className='w-1/2 border'>
                   
                    <div className="editor-header text-left ml-10">Wrong Test case</div>
                        <MonacoEditor
                        height="400"
                        language={language2} // specify the language mode
                        theme={theme} // specify the theme
                        value={foundCase} // set the initial value for editor 1
                        options={editorOptions}
                        onChange={(value, event) => setFoundCase(value)} // update editorValue1 state
                        className="text-left m-1"
                        />
                    </div>
    
    
                    
                }
                {wrongTestCaseInput.length!=0 && <h2><span className="text-green-500">Required :</span> {required} &nbsp;<span className="text-red-500">Found :</span> {found}</h2>}
            </div>
        </div>
    )
}

export default Find;
