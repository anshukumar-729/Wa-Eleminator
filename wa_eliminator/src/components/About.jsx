import React from "react";

const About = () => {

    return (
        <div className="text-left font-light p-4">
            <h2 className="font-bold mt-10 ">Functionality: </h2>
            <p>Code and Run: This feature allows the user to write code in the editor and run it. The user can also provide input to the code. The code is run on the server and the output is displayed to the user.</p>
            <p>Check your solution: This feature allows the user to check if their solution to a problem is correct or not. The user can provide the optimal and the brute force solution to the problem. The server will check if the solution is correct or not and display the result to the user.</p>
            <p>Generate Test Cases: This feature allows the user to generate test cases for a problem. The user can provide the constraints for the problem and the server will generate test cases for the problem.</p>

            <h2 className="font-bold mt-10 ">Technologies Used: </h2>
            <p>Frontend: ReactJS, TailwindCSS, Monaco Editor</p>
            <p>Backend: NodeJS, ExpressJS</p>
            <p>Database: MongoDB</p>
            <p>Deployment: Netlify</p>
            <p>Compiler: Using Api made by <a href="https://github.com/Jaagrav/CodeX-API">Jaagrav</a></p>


            <h2 className="font-bold mt-10 ">Team Members: </h2>
            <p>1. Anshu Kumar</p>


            <h2 className="font-bold mt-10 ">How to use: </h2>

            <p>1. Code and Run: Select the language and write the code in the editor. Provide the input if required and click on Run.</p>
            <p>2. Check your solution: Select the language and write the optimal and brute force solution in the editor. Click on Check Solution.</p>
            <p>3. Generate Test Cases: Select the language and provide the constraints for the problem. Click on Generate Test Cases.</p>

            <br />
                CodeForces blog: <a href="https://codeforces.com/blog/entry/116819" target="_blank" className="text-blue-500">Link</a>
            <br />

            <h2 className="font-bold mt-10 ">How to contribute: </h2>
            <p> Connect me on linkedIN : </p>
            <a href="https://www.linkedin.com/in/anshu-kumar-363030203/"  target="_blank" className="text-blue-500">Anshu Kumar</a>

            <h2 className="font-bold mt-10 ">Suggestion: </h2>
            <p> If you have any suggestion or want to add any feature, feel free to contact me.</p>
            Mail me at : <a href="mailto:anshukumar@iitbhilai.ac.in" className="text-blue-500">Email</a>
            

            <h1 className="text-3xl text-center">More to add...</h1>

        </div>
    );
};

export default About;

