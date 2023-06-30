import logo from "./logo.png";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Run from "./components/Run";
import HomePage from "./components/newHome";
import Navbar from "./components/Nav";
import Footer from "./components/Footer";
import EditorPage from "./components/Editor";
import RandomInputGenerator from "./components/Input";
import { AppContext, AppProvider } from "./helper/AppContext";
import About from "./components/About";
import Discuss from "./components/Discuss";
import Social from "./components/Social";
import Find from "./components/Find";
import { useContext, useState } from "react";



function App() {

  const [msgOff, setmsgOff] = useState(1)

  return (
    <div className="App">
      <AppProvider>
        <Router>
          <div className="bg-cover">
          
            <Navbar />
            {msgOff==0 &&
            <div className="flex p-2" >
              <marquee>We are facing compiler related problem. Although you can use "Generate Test Cases" also If you want to check your solution, go to "Check your solution" and simply paste both program's outputs in the output editors after generating input from there and output from your local machine. Thank you</marquee>
              <button className="pl-3 font-bold pr-1 text-red-400" 
              onClick={()=>setmsgOff(1)}
              >X</button>
              </div>  
            }




            
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/run" element={<Run />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/generate" element={<RandomInputGenerator />} />
              <Route path="/about" element={<About />} />
              <Route path="/discuss" element={<Discuss />} />
              <Route path="/social" element={<Social />} />
              <Route path="/find" element={<Find />} />

            </Routes>
            <Footer />
          </div>
        </Router>
        </AppProvider>
    </div>
  );
}

export default App;
