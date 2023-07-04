import React from 'react'
import '../Style/Login.css'
import '../Style/BodyStyle.css'
import { useState ,useEffect} from 'react'
import axios from 'axios'
import {baseurl} from '../Urls/Urls'
import { useNavigate } from 'react-router-dom'
import logo from '../Images/guruvayurappan.png'

function Loginpage() {

  const navigate=useNavigate()  
const [login, setlogin] = useState(true)
const [otp, setotp] = useState(false)
const [phoneno, setphonno] = useState('')
const [ot,setot]=useState('')
const [load,setload]=useState(false)



//Check if already logined
useEffect(() => {
if(localStorage.getItem('Mname'))
{
  if(localStorage.getItem('IsView') == 1 &&  localStorage.getItem('IsOtptrue')==1)
  {  
      
        navigate('/Dashboard')
     
      
          
 }else if(localStorage.getItem('IsView') == 0 &&  localStorage.getItem('IsOtptrue')==1)
 {
  
    navigate('/Home')
  
 
  }
     
  }

}, []);


//Number Checking
const Checknumber=(e)=>{
  //  console.log(phoneno)
 
   try {
    setload(true)
        axios.get(`${baseurl}/Management?mnum=${phoneno}`)
        .then((r)=>{
          console.log(r.data)
            if(r.data)
            {
           
             localStorage.setItem('IsView',r.data[0].Dview) //seting Isview Local Storage
             localStorage.setItem('Mname',r.data[0].Name) //seting name local storage
             localStorage.setItem('Mid',r.data[0].Id)
             localStorage.setItem('TotalLimit',r.data[0].TotalLimitPerDay)
            
            if(localStorage.getItem('IsView') == 1)
            {  
                axios.post(`${baseurl}/Login?phone=${phoneno}`)
                .then((r)=>{
                 //For dash board
                    if(r.data[0].Error==0)
                    {
                      console.log(r.data)
                        setlogin(false)
                        setotp(true)
                      //  navigate('/Dashboard')
                    }
                })
               
            }
            else{
              axios.post(`${baseurl}/Login?phone=${phoneno}`)
                .then((r)=>{
                 //For Home user
                    if(r.data[0].Error==0)
                    {
                      console.log(r.data)
                        setlogin(false)
                        setotp(true)
                      //  navigate('/Home')
                    }
                })
               
            }
            }
            else
            {
                alert("enterd wrong number..!")
                setload(false)
            }
        })
    } catch (error) {
       console.log("error when check number"+error) 
    }
}

//Handle otp

const HandleOtp=(e)=>{
  try {
   // alert(ot+phoneno)
    axios.post(`${baseurl}/Login?otp=${ot}&phone=${phoneno}`)
    .then((res)=>{
     
       if(res.data && res.data.length > 0 && res.data[0].otp)
       {

        //After getting the otp
         localStorage.setItem('IsOtptrue',1) 
        if(localStorage.getItem('IsView') == 1)
        {  
                navigate('/Dashboard')
              
        }
        else{
                   navigate('/Home')
          
           
        }

       }
       else{
        alert("Invalid otp...!")
       }
      
    })
  } catch (error) {
    console.log(error)
  }
}


  return (

    <>

    <div className='logbody'>
    
  {

     login&& <div class="container create-formcon" >
    
      <div class="row justify-content-center" style={{ maxHeight: '444px' }}>
         <div class="col-lg-4 col-md-7 login-otp-height">
        
           <div class="loginotp-holder">
           <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
    <img src={logo} style={{height:'20vh'}} alt='ib' ></img>
    </div>
           <h3>Login</h3>
             <p>Please enter your Phone number</p>
             <div class="login-form-item">
               <i class="far fa-envelope"></i>
               <input
                 type='number'
                 inputMode='numeric'
                 
                 class="form-control"
                 placeholder="Enter Number"
                 value={phoneno}
                 onChange={(e)=>setphonno(e.target.value)}
                
               />
             </div>
 
             <div class="row justify-content-center">
               <div class="col-lg-6">
                 <button class="create-btns"
                   style={{ backgroundColor: 'rgb(23, 88, 81)', transition: 'background-color 0.3s' }}
                   onClick={Checknumber} >
                   Continue
                 </button>
               </div>
             </div>
           </div>
         </div>
       </div>
      {load&& <div class="loader"></div>}
     </div>
  }
  { otp&& <div class="container create-formcon">
     <div class="row justify-content-center" style={{ maxHeight: '444px' }}>
         <div class="col-lg-4 col-md-7 login-otp-height">
             <div class="loginotp-holder">
             <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
    <img src={logo} style={{height:'20vh'}} alt='ib' ></img>
    </div>
                 <h3>Enter OTP</h3>
                 <p>We have send OTP to your WhatsApp.
                    </p>
                 <div class="login-form-item">
                     <i class="fas fa-dot-circle"></i>
                     <input type="text"
                      class="form-control"
                       placeholder="Enter Code"
                       value={ot}
                       onChange={(e)=>setot(e.target.value)}
                         />
                 </div>
 
                 <div class="row justify-content-center">
                     <div class="col-lg-6">
                         <button class="create-btns" 
                          style={{ backgroundColor: 'rgb(23, 88, 81)', transition: 'background-color 0.3s' }}
                          onClick={HandleOtp}
                         >Continue</button>
                     </div>
                 </div>
             </div>
         </div>
     </div>
 </div>
  }
  </div>
 </>
  )
}

export default Loginpage