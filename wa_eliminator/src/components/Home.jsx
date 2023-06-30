import React,{useState} from "react";
import { json } from "react-router-dom";

const Home = () => {

    // program is for optimal code and bprogram is for brute force code

    const [program, setProgram] = useState("");
    const [stdin, setStdin] = useState("");
    const [stdout, setStdout] = useState("");
    const [error, setError] = useState("");

    const [bprogram, setBProgram] = useState("");
    const [bstdout, setBStdout] = useState("");
    const [berror, setBError] = useState("");
    const [found , setFound] = useState(false);
    const [required, setRequired] = useState(false);

    // for random test cases

    const [iprogram, setIProgram] = useState("");

    // output of the input program is stored in stdin

    const [verdict, setVerdict] = useState("");

    const [wrongTestCaseInput, setWrongTestCaseInput] = useState([]);

  
    

    async function compile(input) {
        console.log(program);
        fetch("http://localhost:3020/api/compile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                script: program,
                stdin: input
            }
            )
          })
            .then((response) => {
              console.log("statusCode:", response.status);
              return response.json();
            })
            .then((data) => {
              console.log("body:", data);
                setStdout(data.output);
                compileB(input, data.output);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          
       
    }

    function compareOutput(output1, output2, input){
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
            setVerdict("Wrong Answer on test case "+wrongTestCase);
            console.log(input.split("\n"));
            let tline = (input.split("\n").length-2)/numberOfTestCases;
            console.log(tline)
            let ppp=[]
            for(let i=0;i<tline;i++){
                // temp+=input.split("\n")[(wrongTestCase-1)*tline+i+1]+"\n";
                ppp.push(input.split("\n")[(wrongTestCase-1)*tline+i+1]);
            }
            
            setWrongTestCaseInput(ppp);


        }
    }

    async function compileB(input, output1) {
        console.log(bprogram);
        fetch("http://localhost:3020/api/compile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                script: bprogram,
                stdin: input
            }
            )
        })

            .then((response) => {
                console.log("statusCode:", response.status);
                return response.json();
            })
            .then((data) => {
                console.log("body:", data);
                setBStdout(data.output);
                compareOutput(output1, data.output, input);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
            
    }

    async function compileI() {
        console.log(iprogram);
        setVerdict("");
        setStdout("");
        setBStdout("");
        
        setWrongTestCaseInput([]);
        if(iprogram==""){
            compile(stdin);
            return;
        }
        setStdin("");
        fetch("http://localhost:3020/api/compile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                script: iprogram,
                stdin: stdin
            }
            )
        })

            .then((response) => {
                console.log("statusCode:", response.status);
                return response.json();
            })
            .then((data) => {
                console.log("body:", data);
                setStdin(data.output);
                compile(data.output);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
            
    }

                
  
    return (
        <div className="p-3 bg-slate-200 w-full">
          
           <div className="flex">
                <div className="w-1/2 m-5">
                   {/* // optimal code, input program and stdout */}
                   <h1 className="m-3 text-fuchsia-800 font-bold">Optimal Code </h1>
                     <textarea
                        className="w-full h-96 p-4 border border-black bg-slate-300"
                        value={program}
                        placeholder="Paste your optimal code here"
                        onChange={(e) => setProgram(e.target.value)}
                    />
                    <h1 className="m-3 text-fuchsia-800 font-bold">Input Generator Program</h1>
                    <textarea
                        className="w-full h-96 p-4 border border-black bg-slate-300"
                        value={iprogram}
                        placeholder="Leave it blank if you don't want to generate input for your code Or you can use chatgpt to generate code for generating input and paste it here"
                        onChange={(e) => setIProgram(e.target.value)}
                    />
                    <h1 className="m-3 text-fuchsia-800 font-bold">Output of Optimal Code</h1>
                    <textarea
                        className="w-full h-96 p-4 border border-black bg-slate-300"
                        value={stdout}
                        placeholder="Output of optimal code"
                        onChange={(e) => setStdout(e.target.value)}
                    />
                    
                </div>
                <div className="w-1/2 m-5">
                   {/* // brute force code and stdin ans bstdout */}
                     <h1 className="m-3 text-fuchsia-800 font-bold">Brute Force Code</h1>
                    <textarea
                        className="w-full h-96 p-4 border border-black bg-slate-300"
                        value={bprogram}
                        placeholder="Paste your brute force code here"
                        onChange={(e) => setBProgram(e.target.value)}
                    />
                    <h1 className="m-3 text-fuchsia-800 font-bold">Input test Cases</h1>
                    <textarea
                        className="w-full h-96 p-4 border border-black bg-slate-300"
                        value={stdin}
                        placeholder="Enter input test cases here Or leave it blank if you want to generate input for your code"
                        onChange={(e) => setStdin(e.target.value)}
                    />
                    <h1 className="m-3 text-fuchsia-800 font-bold">Output of Brute force Code</h1>
                    <textarea
                        className="w-full h-96 p-4 border border-black bg-slate-300"
                        value={bstdout}
                        placeholder="Output of brute force code"
                        onChange={(e) => setBStdout(e.target.value)}
                    />


                </div>
                
           </div>
             <button onClick={compileI} className="m-3 bg-black text-white h-10 rounded-md p-2">Find Wrong Test Case</button>
                {verdict!="" && <h2 className="text-cyan-600 font-bold"><span className="text-orange-950">Verdict:</span> {verdict}</h2> }
                {wrongTestCaseInput.length!=0 && <h2 className="text-red-600 font-bold">Wrong Test Case Input</h2> }
                {wrongTestCaseInput.map((item, index) => (
                    <div key={index} className="text-orange-500">
                        <p>{item}</p>
                    </div>
                ))}
                {wrongTestCaseInput.length!=0 && <h2>Required : {required} Found : {found}</h2>}

                <br />
        </div>
    );
    }

export default Home;