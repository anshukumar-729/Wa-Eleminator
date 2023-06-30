import React, {useContext, useState} from 'react';
import MonacoEditor from 'react-monaco-editor';
import { compile } from "../helper/script";
import RandomInputGenerator from './Input';
import { AppContext } from '../helper/AppContext';

const EditorPage = (props) => {
 const {script, setScript} = useContext(AppContext)
 const {stdin, setStdin} = useContext(AppContext)
  const {stdout, setStdout} = useContext(AppContext)
  const {plang, setPlang} = useContext(AppContext)
  const [error, setError] = useState(0);
  
  const [running , setRunning] = useState(false);

  async function compiler () {
    setError(0);
    setRunning(true);
    console.log("sending")
    let data = await compile(script, stdin, props.lang);
    setRunning(false);
    if(data.error){
      setError(1);
      return;
    }
    
    console.log(data);
    setStdout(data.output);
}

  const editorOptions = {
    selectOnLineNumbers: true,
    roundedSelection: false,
    readOnly: false,
    cursorStyle: 'line',
    automaticLayout: true,
  };



  const handleEditorChange = (value, event) => {
    // Handle editor content change
    // console.log(value);
  };

  React.useEffect(() => {
    console.log(props.lang);
    if(plang === props.lang && script !== ''){
      return;
    }
    setPlang(props.lang);
    if (props.lang === 'cpp') {
      setScript(`#include <bits/stdc++.h>
using namespace std;
int main() {

    return 0;
}`);
    } else if (props.lang === 'java') {
      setScript(`import java.util.*;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
    }
}`);

    } else if (props.lang === 'py') {
      setScript(`# Write your code here`);
    } else if (props.lang === 'c') {
      setScript(`#include <stdio.h>
int main() {

    return 0;
}`);
    } else if (props.lang === 'csharp') {
      setScript(`using System;
class Program {
    static void Main(string[] args) {
        Console.WriteLine("Hello World!");
    }
}`);
    } else if (props.lang === 'ruby') {
      setScript(`# Write your code here`);  
    } else if (props.lang === 'go') {
      setScript(`package main
import "fmt"
func main() {
    fmt.Println("Hello World!")
}`);
    } else if (props.lang === 'scala') {
      setScript(`object Main extends App {
    println("Hello World!")
}`);
    } else if (props.lang === 'kotlin') {
      setScript(`fun main(args: Array<String>) {
    println("Hello World!")
}`);
    }
  }, [props.lang]);


  const [theme, setTheme] = React.useState('vs-dark');

    React.useEffect(() => {
        console.log(props.tg);
        if(props.tg){
            setTheme('vs-dark');
        }
        else{
            setTheme('vs-white');
        }
    }, [props.tg]);




  
  return (
    <>
    <div className="editor-container flex text-left">
      <div className='w-2/3 border'>
        <div className="editor-header text-left ml-10">Code</div>
        <MonacoEditor
          height="400"
          language={props.lang} // specify the language mode
          theme={theme} // specify the theme
          value={script} // set the initial value for editor 1
          options={editorOptions}
          onChange={(value, event) => setScript(value)} // update editorValue1 state
          className="text-left m-1"
        />

        
      </div>
      
      <div className='w-1/3  border'>
      <div className="editor-header text-left ml-10">Input</div>
      <MonacoEditor
        height="400"
        language={props.lang} // specify the language mode
        theme={theme} // specify the theme
        value={stdin} // set the initial value for editor 2
        options={editorOptions}
        onChange={(value, event) => setStdin(value)} // update editorValue2 state
        className="text-left m-1"
      />
      
      </div>
    </div>
    

    <div className='flex justify-start'>
    <button className='text-left ml-10 mt-2 mb-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded' onClick={compiler}>{running?"Running...":"Run"}</button>
  
   
    </div>
    {/* {error==1&& (<div>Server Error</div>)} */}
    <br />
    <div className="editor-container flex">
      <div className='w-full border'>
        <div className="editor-header text-left ml-10">Output</div>
        <MonacoEditor
        height="400"
        language={props.lang} // specify the language mode
        theme={theme} // specify the theme
        value={stdout} // set the initial value for editor 2
        options={editorOptions}
        onChange={(value, event) => setStdout(value)} // update editorValue2 state
        className="text-left"
      />
      </div>
      </div>

    

    </>
  );
};

export default EditorPage;
