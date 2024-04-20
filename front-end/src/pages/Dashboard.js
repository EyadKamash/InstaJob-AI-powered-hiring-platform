import { useState, useEffect } from "react";
import React from "react";
import image from "../Unknown.jpeg"
import Sidebar from "../components/Sidebar";
import '../CSS/Dashboard.css';
import { FaAlignJustify } from "react-icons/fa";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const mainPageElement = document.querySelector('.main-page');
    if (!isSidebarOpen) {
      mainPageElement.classList.add('sidebar-closed');
    } else {
      mainPageElement.classList.remove('sidebar-closed');
    }
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`main-page ${isSidebarOpen? '' : 'sidebar-closed'}`} >
      <div >
        <button onClick={toggleSidebar} style={{ color: 'white' }}><FaAlignJustify/></button>
        <Sidebar  isOpen={isSidebarOpen} />
      </div>
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@200..800&display=swap')
        </style>

        <div style={{ flex: 1, padding: '0.5rem' ,color:'black',backgroundColor:'white'}}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ flex: 1 }}> 
                    <h1 style={{ paddingLeft: '1rem', fontSize: '30px', fontWeight: 'bold' }}>Jobs</h1>
                </div>
                <button style={{ padding: '0.5rem 1rem', fontSize: '1rem', backgroundColor:'black',color:'white' , marginRight:'1rem' ,borderRadius:'15px'}}>Post Job</button>
            </div>
            <br></br>
            <div style={{padding:'10px'}}>
                <button style={{padding: '0.5rem 1rem' , backgroundColor:'#00df9a' , borderRadius:'6px 0 0 6px'}}>Open Jobs</button>
                <button style={{padding: '0.5rem 1rem' , backgroundColor:'#848484', borderRadius:'0 6px 6px 0'}}>Closed Jobs</button>
            </div>
            <div style={{alignItems:'center',justifyContent:'center',display:'flex'}}>
                <img src={image} width="700" height="700" style={{objectFit:'contain',marginTop:'1rem'}} alt="Girl working at home" />     
            </div>
            <div style={{ textAlign: 'center' }}>
                  <h1 style={{fontSize:'25px' , paddingTop:'1rem' , fontWeight:'bolder'}}>You have no jobs posted  </h1>
                  <h1 style={{fontSize:'20px',color:'gray'}}>Get started and post your new job on InstaJob</h1>
                </div>
            
    
        </div>

         </div>
      );
}

export default Dashboard
