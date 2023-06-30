import React, { useContext, useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import MonacoEditor from 'react-monaco-editor';
import { Link } from 'react-router-dom';
import { AppContext } from '../helper/AppContext';
import {saveData} from "../helper/script";

const RandomInputGenerator = (props) => {

    const { v, setV, tilda, setTilda, test, setTest, variables, setVariables, copied, setCopied, stdin2, setStdin2, t, setT, script2, setScript2, cases, setCases } = useContext(AppContext);

    
    

    const editorOptions = {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: true,
      };

     
  
    const handleCopy = () => {
        setCopied(true);
      };

    

    const handleToggle = () => {
        setTilda(!tilda);
    }

    



    useEffect(() => {
        console.log(test);
    }, [test]);

    function evaluateExpression(expression, pp) {
        console.log("dddd",expression);

        try {
          const evaluatedExpression = expression.replace(/([a-zA-Z]+)/g, match => pp[match] || match);
          const result = eval(evaluatedExpression);
          console.log(result)
          return result;
        } catch (error) {
          return "Invalid expression";
        }
      }
      
    const isStringInteger = (str , pp) => {
        if(typeof str !== "string") return false;
        // Use parseInt with radix 10 to parse the string as a decimal number
        // If the parsed value is not NaN and the parsed value equals the original string (without leading/trailing whitespace),
        // then the string is an integer.
        let ans = evaluateExpression(str, pp);
        console.log(ans);
        return ans;
      };

      function generateRandomTreeEdges(n) {
        const edges = new Array(n - 1).fill(null).map((_, i) => [i + 2, Math.floor(Math.random() * i) + 1]);
      
        return edges;
      }

      function generateRandomConnectedGraphEdges(n, m) {
        const edges = new Set();
      
        // Create a connected path
        
        const edges2 = new Array(n - 1).fill(null).map((_, i) => [i + 2, Math.floor(Math.random() * i) + 1]);
        edges2.forEach(edge => edges.add(edge.join('-')));

      
        // Add remaining random edges
        while (edges.size < m) {
          const u = Math.floor(Math.random() * n) + 1;
          const v = Math.floor(Math.random() * n) + 1;
      
          if (u !== v) {
            edges.add(`${u}-${v}`);
          }
        }
      
        return Array.from(edges).map(edge => {
          const [u, v] = edge.split('-');
          return [parseInt(u), parseInt(v)];
        });
      }

      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      useEffect(() => {
        console.log(cases);
      }, [cases]);
      
     
      

    const generate = () => {
        let ans = "";
        ans+=t;
        ans+="\n";
        console.log(test)
        let temp_cases = [];
        for(let i=0;i<t;i++){
            let pp = {};
            console.log("test",test);
            for(let j=0;j<test.length;j++){
                var prev = {...test[j]};
                console.log(prev.lower,prev.upper,prev.size);
                prev.lower = isStringInteger(prev.lower, pp)
                prev.upper = isStringInteger(prev.upper, pp)
                prev.size = isStringInteger(prev.size, pp)
                prev.edges = isStringInteger(prev.edges, pp)

                console.log(prev.lower,prev.upper,prev.size);
                if(prev.type === "int"){
                    pp[prev.name] = Math.floor(Math.random() * (prev.upper - prev.lower + 1)) + prev.lower;
                }
                else if(prev.type === "float"){
                    pp[prev.name] = Math.random() * (prev.upper - prev.lower) + prev.lower;
                }
                else if (prev.type === "char") {
                    pp[prev.name] = String.fromCharCode(
                      Math.floor(Math.random() * (prev.upper - prev.lower + 1)) + prev.lower + 96
                    );
                    
                  } else if (prev.type === "string") {
                    let len = prev.size;
                    let str = "";
                    for (let k = 0; k < len; k++) {
                      str += String.fromCharCode(
                        Math.floor(Math.random() * (prev.upper - prev.lower + 1)) + prev.lower + 96
                      );
                    }
                    pp[prev.name] = str;
                  }
                else if(prev.type === "array"){
                    let len = prev.size;
                    let arr = [];
                    for(let k=0;k<len;k++){
                        arr.push(Math.floor(Math.random() * (prev.upper - prev.lower + 1)) + prev.lower);
                    }
                    pp[prev.name] = arr;
                }
                else if(prev.type === "darray"){
                    let len = prev.size;
                    let arr = new Set();
                   let limit = 1e6;
                    while(arr.size < len){
                        arr.add(Math.floor(Math.random() * (prev.upper - prev.lower + 1)) + prev.lower);
                        limit--;
                        if(limit === 0) break;
                    }
                    arr = Array.from(arr);

                    pp[prev.name] = arr;

                }
                else if(prev.type === "per"){
                    let len = prev.size;
                    let arr = [];
                    for(let k=1;k<=len;k++){
                        arr.push(k);
                    }
                    let i = arr.length, j, temp;
                    while(--i > 0){
                        j = Math.floor(Math.random() * (i+1));
                        temp = arr[j];
                        arr[j] = arr[i];
                        arr[i] = temp;
                    }
                    pp[prev.name] = arr;
                }
                else if(prev.type === "tree"){
                    let len = prev.size;
                    let edges = generateRandomTreeEdges(len);
                    edges = shuffleArray(edges);
                    pp[prev.name] = edges;
                }
                else if(prev.type === "graph"){
                    let len = prev.size;
                    let noOfedges = prev.edges
                    let edges = generateRandomConnectedGraphEdges(len, noOfedges);
                    edges = shuffleArray(edges);

                    pp[prev.name] = edges;
                }
                // console.log(prev);

            }
            // console.log("test",test);
            // console.log(pp);
            let temp_ans = "";
            for(let k=0;k<script2.split("\n").length;k++){
                let line  = script2.split("\n")[k];
                // console.log(line);
                for(let l=0;l<line.split(" ").length;l++){

                    let word = line.split(" ")[l];
                    // console.log(word);
                    if(1){
                        let temp = word.substring(0, word.length);
                        if(pp[temp] !== undefined){
                            let myans = "";
                            console.log(pp[temp])
                            if(pp[temp].length === undefined || typeof pp[temp]==="string") myans+=pp[temp];
                            else{
                                for(let m=0;m<pp[temp].length;m++){
                                    if(pp[temp][m].length === undefined) {myans+=pp[temp][m]; myans+=" ";}
                                    else{
                                        for(let n=0;n<pp[temp][m].length;n++){
                                            myans+=pp[temp][m][n];
                                            myans+=" ";
                                        }
                                        myans+="\n";
                                    }

                                }

                            }
                            // console.log(myans);

                            line = line.replace(word, myans);
                        }
                    }
    
                }
                ans+=line;
                temp_ans+=line;
                if(ans[ans.length-1] !== "\n"){
                  ans+="\n";
                  temp_ans+="\n";
                }
                
    
            }
            // console.log("cases", temp_ans);
            temp_cases.push(temp_ans);
            // console.log("cases", temp_cases);
            if(tilda){
                ans+="~\n"; 
            }
        }
        setCases(temp_cases);
        saveData("",ans,"");
        
        setStdin2(ans);
        // console.log(ans);

    }
    useEffect(() => {
        setCopied(false);
    }, [stdin2]);

  return(
    <div className='font-light p-2 item-center'>
        <div className='flex mb-6'>
            <div className='w-1/2'>

                {"no of test cases (t) = "}<input type="number" className='border-black border p-2 m-2 rounded-md' onChange={(e)=>{setT(e.target.value)}} value={t} />
            </div>
            <div className='w-1/2'>
        {"no of variables in one test case = "}<input type="number" className='border-black border p-2 m-2 rounded-md' onChange={(e)=>{setV(e.target.value)}} value={v} />
            </div>
        </div>
        {test.map((variable, index) => {
            return(
                <div className='flex mb-2  justify-between'>
                       <span className='pt-1 mr-1'>Variable Name : </span> <input type="text" className='border-black border p-2 w-32 rounded-md mr-3' onChange={(e)=>{let temp = [...test]; temp[index].name = e.target.value; setTest(temp)}}  />
                       <span className='pt-1 mr-1'>Variable Type : </span><select className='border-black border p-2 w-32 rounded-md mr-3' onChange={(e)=>{let temp = [...test]; temp[index].type = e.target.value; setTest(temp)}}>

                        <option value="--">Select</option>
                        <option value="int">int</option>
                        <option value="float">float</option>
                        <option value="char">char</option>
                        <option value="string">string</option>
                        <option value="array">Array</option>
                        <option value="darray">Distinct Array</option>
                        <option value="per">Permutaion</option>
                        <option value="tree">Tree</option>
                        <option value="graph">Graph</option>


                    </select>
                    <span className='pt-1 mr-1'>Lower Limit : </span><input type="text" className='border-black border p-2 w-32 rounded-md mr-3' onChange={(e)=>{let temp = [...test]; temp[index].lower = e.target.value; setTest(temp)}} />
                    <span className='pt-1 mr-1'>Upper Limit : </span><input type="text" className='border-black border p-2 w-32 rounded-md mr-3' onChange={(e)=>{let temp = [...test]; temp[index].upper = e.target.value; setTest(temp)}} />
                    <span className='pt-1 mr-1'>Size : </span><input type="text" className='border-black border p-2 w-32 rounded-md mr-3' onChange={(e)=>{let temp = [...test]; temp[index].size = e.target.value; setTest(temp)}} />
                    {test[index].type==="graph"?<><span className='pt-1 mr-1'>No of edges : </span><input type="text" className='border-black border p-2 w-32 rounded-md mr-3' onChange={(e)=>{let temp = [...test]; temp[index].edges = e.target.value; setTest(temp)}} /></>:null}
                    <br />
                </div>
            )
        })}

    <div className="flex items-center">
               <p className="m-2 font-light">Tilda separated test</p>
                <button
                    className={`relative rounded-full w-11 h-7  bg-gray-300 focus:outline-none ${tilda ? 'bg-gray-300' : ''}`}
                    onClick={handleToggle}
                >
                    <div
                    className={`absolute top-0 left-0 mt-1 w-5 h-5 rounded-full ${tilda ? 'bg-black' : 'bg-white'} shadow transition-transform ${
                        tilda ? 'transform translate-x-full' : ''
                    }`}
                    ></div>
                </button>
     
            </div>

        <br />
        <div className='flex justify-between'>
        <div className='w-1/3 border'>
            <h3>Template for a single test case in terms of variable</h3>
        <MonacoEditor
          height="400"
          language="javascript" // specify the language mode
          theme="vs-dark" // specify the theme
          value={script2} // set the initial value for editor 1
          options={editorOptions}
          onChange={(value, event) => setScript2(value)} // update editorValue1 state
          className="text-left m-1"
        />
        </div>
        <div className='w-3/5 border'> 
        <div className='flex justify-between'>  
        <h3>Generated Input</h3>
        {!props.f &&
        <CopyToClipboard text={stdin2} onCopy={handleCopy}>
        <button>
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </CopyToClipboard>
    }
      </div>
        <MonacoEditor
          height="400"
          language="javascript" // specify the language mode
          theme="vs-dark" // specify the theme
          value={stdin2} // set the initial value for editor 1
          options={editorOptions}
          onChange={(value, event) => setStdin2(value)} // update editorValue1 state
          className="text-left m-1"
        />
        </div>
        </div>

        <button className='mt-10 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-3' onClick={generate}>Generate Input</button> 
        
        {!props.f && <Link to="/" className='ml-6'>Go to Home</Link>}
        

    </div>
  )
 
};

export default RandomInputGenerator;
