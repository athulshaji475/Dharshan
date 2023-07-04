import React from 'react';
import './Reg.css';
import {MDBBtn,  MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { useEffect } from 'react';
import  Select  from 'react-select';
import baseurl from '../Urls/Urls';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'

function Regtest() {

  const navigate = useNavigate();

  const [management, setmanagement] = useState([]);
  const [selectedmanagement,setselectedmanagement]=useState('')
  const [selectedsloat,setselectedsloat]=useState('')
  const [selectedgate,setselectedgate]=useState('')
  const [vname, setvname] = useState('')
  const [Vphone, setVphone] = useState('')
  const [Vaddress, setVaddress] = useState('')
  const [sloat,setsloat]=useState([])
  const [gate,setgate]=useState([])
  const [pdate,setpdate]=useState('')
  const [dview,setdview]=useState(false)


  useEffect(() => {
    try {
 console.log(localStorage.getItem('IsView'))
   if(localStorage.getItem('IsView')==1)
   {
     setdview(true)
   }
   else
   {
     setdview((false))
   }
 
      //sloat
 
      
     axios.get(`${baseurl+'/Management?dummyid=12'}`).then((r)=>{
       if(r.data){
        // console.log(r.data)
         setsloat(r.data)
        // console.log(sloat)
       }})
 
 
       //-managemet
       axios.get(`${baseurl+'/Management?d=1'}`).then((r)=>{
       if(r.data){
        // console.log(r.data)
         setmanagement(r.data)
        // console.log(management)
       }})
       //gate
       axios.get(`${baseurl+'/Management'}`).then((r)=>{
       if(r.data){
        // console.log(r.data)
         setgate(r.data)
        // console.log(gate)
       }})
     
    } catch (error) {
     console.log(error)
    }
 }, []);
  
 
 const Refresh = () => {
   setselectedmanagement('');
   setselectedsloat('');
   setselectedgate('');
   setvname('');
   setVphone('');
   setVaddress('');
   setpdate(new Date());
 };
 
 
 
  //-------toasty--------------------
  const showToastMessage = () => {
   toast.success('Success Notification !', {
       position: toast.POSITION.TOP_RIGHT
   });
 };
  
 //------SUBMIT HANDLING-----------------//
  
  const HandleDatas=()=>{
 //console.log(management)
 //console.log(selectedmanagement);
 //console.log(selectedgate)
 //console.log(selectedsloat)
 //console.log(pdate);
 
 
 
   const enterdon=new Date();//Hard coded
   const printedon=''
   const vsstatus=0
   const entedby=1
  const Data={Mid:selectedmanagement,
   TsId:selectedsloat,
   GId:selectedgate,
   VisiterName:vname,
   VisiterMobile:Vphone,
   VisiterPlace:Vaddress,
   Enterdon:enterdon,
   PDate:pdate,
   PrintedOn:printedon,
   Status:vsstatus,
   EnterdBy:entedby}
  if (
   selectedmanagement && selectedsloat && selectedgate && vname 
 ){
 
 axios.post(`${baseurl+'/Viewer'}`, Data)
 .then((r) => {
  console.log(r.data)
   if (r.data[0].Error === 0) { // Check if the request was successful
     
     showToastMessage();
     Refresh();
   } else {
     console.log('Request failed:', r.data.Error);
   }
 })
 .catch((error) => {
   console.log('An error occurred:', error);
 });
 }
 else
 {
   alert("Enter The RequireDatas")
 
 }
  
 
  }
  
 
  
  
  
  
  //---------CHANGE HANDLING------------------//
  const handleManagementChange=(e)=>{
   try {
    console.log(e)
     setselectedmanagement(e.value)
    
     alert(e.target.value)
   } catch (error) {
     
   }
  }
 
 
  const handleSloatChange=(e)=>{
   try {
    // console.log(e.label)
     setselectedsloat(e.value)
    
     alert(e.target.value)
   } catch (error) {
     
   }
  }
 
  const handleGateChange=(e)=>{
   try {
    // console.log(e.label)
     setselectedgate(e.value)
    
     
   } catch (error) {
     
   }
  }
 //-------------------------------------
 
 const HandleNavigate=()=>{
   try {
     navigate('/Dashboard')
   } catch (error) {
     
   }
 }
 

  return (
    

<div className='html'>
  <div class="wrapper">
    <div class="title-text">
     
    </div>

    <div class="form-container">
      <div class="slide-controls">
        {
          /*<input type="radio" name="slider" id="login" checked />
        <input type="radio" name="slider" id="signup" />*/
        }
        {dview&& <label for="login" class="slide login" onClick={HandleNavigate}  >DashBoard</label>}
        <label for="signup" class="slide signup"> Signup</label>
        <div class="slide-tab"></div>
      </div>

      <div class="form-inner">

       
        <form action="#" class="login">
         


          <div class="field">
          <Select
        
        onChange={ handleManagementChange}
          options={management.map((d)=>(
          {
            
            value:d.Id,
            label:d.Name
          } ))}
          placeholder="managment"

        />
        <label>*</label>
          </div>

<div className='field'>
           <MDBInput
           wrapperClass='mb-4' 
           label='*' 
           size='lg'
            id='form2'
             type='date'
             
            value={pdate}
            onChange={(e)=>setpdate(e.target.value)}
             />   
</div>

<div className='field'>
       <Select
        placeholder="select sloat"
        onChange={handleSloatChange}
          options={sloat.map((d)=>(
          {
            
            value:d.id,
            label:d.sloat
          }
          ))}
        />
        <label>*</label>
</div>

<div className='field'>
        <Select
        placeholder="select gate"
        onChange={handleGateChange}
          options={gate.map((d)=>(
          {
            
            value:d.id,
            label:d.Name
          }
          ))}
        />
        <label>*</label>
</div>


 <div class="field">
            <input type="text" 
            placeholder="Name"
            value={vname}
            onChange={(e)=>setvname(e.target.value)}
            required />
          </div>

          <div class="field">
            <input type="number" 
            placeholder="No of people"
            
           
            required />
          </div>

          <div class="field">
            <input type="number" 
            placeholder="Phone number"
            value={Vphone}
          onChange={(e)=>setVphone(e.target.value)}
            required />
          </div>

          <div class="field">
            <input type="text" 
            placeholder="Address"
            value={Vaddress}
             onChange={(e)=>setVaddress(e.target.value)}
            required />
          </div>

          


         
    
        { /* <div class="pass-link">
            <a href="#">
              Forgot password?
            </a>
          </div>
          */
        }
          <div class="field">
            <input type="submit" value="Sign up" onClick={HandleDatas} />
            <ToastContainer/>
          </div>
          <div class="signup-link">
            
          </div>
      
        </form>

     
         <form action="#" class="signup">
          <div class="field">

            <input type="text" placeholder="First Name" required />

          </div>
          <div class="field">

            <input type="text" placeholder="Last Name" required />

          </div>
          <div class="field">

            <input type="text" placeholder="Username" required />

          </div>
          <div class="field">
            <input type="text" placeholder="Email Address" required />
          </div>
          <div class="field">
            <input type="password" placeholder="Password" required />
          </div>
          <div class="field">
            <input type="password" placeholder="Confirm password" required />
          </div>
          <div class="field">

            <input type="text" placeholder="Coupon code" required />

          </div>
          <div class="field">

            <input type="text" placeholder="Refferal ID" required />

          </div>
    
          <div class="field">
            <input type="submit" value="Signup"  />
          </div>

        </form>
      </div>
    </div>
  </div>
  </div>
 );
}

export default Regtest;
