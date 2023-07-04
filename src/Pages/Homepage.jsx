import React from 'react';
import '../Style/BodyStyle.css';
import validator from 'validator';
import { useState } from 'react';
import { useEffect } from 'react';
import Select from 'react-select';
import {baseurl} from '../Urls/Urls';
import DatePicker from 'react-datepicker';
import {local} from '../Urls/Urls';
import { useNavigate,useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import {WhatsappIcon} from 'react-share'
import { Modal, Button } from "react-bootstrap";
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuid } from 'uuid';

function Homepage() {

  const params = useParams(); //Accepting the LinkId
 // console.log(params);

  const navigate = useNavigate();

  const [management, setmanagement] = useState([]);
  const [selectedmanagement, setselectedmanagement] = useState('')
  const [selectedsloat, setselectedsloat] = useState('')
  const [selectedgate, setselectedgate] = useState('')
  const [vname, setvname] = useState('')
  const [Vphone, setVphone] = useState('')
  const [Vaddress, setVaddress] = useState('')
  const [sloat, setsloat] = useState([])
  const [gate, setgate] = useState([])
  const [pdate, setpdate] = useState(new Date());
  const [dview, setdview] = useState(false)
  const [Nolimit, setNolimit] = useState(0)
  const [lableview, setlabelview] = useState(false)
  const [isopen,setisopen]=useState(false)
  const [noofp, setnoofp] = useState(null);
  const [remarks, setremarks] = useState('')
  const [link,setlink]=useState('')
  const [TotalVisitersToday , setTotalVisitersToday ] = useState(0)
  const [Difference, setDifference] = useState(0)
  const [TotalLimitperDay, setTotalLimitperDay] = useState(0)

  useEffect(() => {
    try {
     
     
      if (localStorage.getItem('IsView') == 1) {
        setdview(true)
      }
      else {
        setdview((false)) //hiding the admin features non admin users
        setlabelview(true)//seting the label view for non admin users
        setselectedmanagement(localStorage.getItem('Mid'))  //seting the mid from local storage for non admin users
      }
      const today=convert(new Date())
      let mid=localStorage.getItem('Mid')
      const TotalLimitperDay= localStorage.getItem('TotalLimit')
       axios.get(`${baseurl}/Management?Id=${mid}&date=${today}`)
   
  .then((r)=>{
   if(r.data)
   {
 
    setTotalVisitersToday(r.data[0].Totalvisiter)
    console.log(parseInt(TotalLimitperDay)-parseInt(r.data[0].Totalvisiter))
     setDifference(parseInt(TotalLimitperDay)-parseInt(r.data[0].Totalvisiter))
 
   }
 })
      //sloat
   

  //------------------------------------------------------------------------------
      axios.get(`${baseurl + '/Management?dummyid=12'}`).then((r) => {
        if (r.data) {
          // console.log(r.data)
          setsloat(r.data)
          // console.log(sloat)
        }
      },(error)=>{console.log(error)})

      //------------------------------------------------------------------------------
      axios.get(`${baseurl}/Settings`).then((r) => {
        //console.log("Settings" + r.data[0].LimitNoOfPeople)
        setNolimit(r.data[0].LimitNoOfPeople)

      },(error)=>{console.log(error)})

  //------------------------------------------------------------------------------
      //-managemet
      axios.get(`${baseurl + '/Management?d=1'}`).then((r) => {
        if (r.data) {
          // console.log(r.data)
          setmanagement(r.data)
          // console.log(management)
        }
      },(error)=>{console.log(error)})
        //------------------------------------------------------------------------------
      //gate
      axios.get(`${baseurl + '/Management'}`).then((r) => {
        if (r.data) {
          // console.log(r.data)
          setgate(r.data)
          // console.log(gate)
        }
      },(error)=>{console.log(error)})

    } catch (error) {
      console.log(error)
    }
  }, [Difference]);

  //------------------------------------------------------------------------------
  const Refresh = () => {
   // setselectedmanagement('');
    setselectedsloat('');
    setselectedgate('');
    setvname('');
    setVphone('');
    setnoofp('')
    setVaddress('');
    setpdate(new Date());
  

 
  };



  //-------toasty--------------------
  const showToastMessage = () => {
    toast.success('Success Notification !', {
      position: toast.POSITION.TOP_CENTER
    });
  };

  const showToastMessagefailed = (m) => {
    toast.error(m, {
      position: toast.POSITION.TOP_CENTER
    });
  };

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  //------SUBMIT HANDLING-----------------//

  const HandleDatas = (event) => {
    const re = /^[A-Za-z]+$/;
    event.preventDefault()
    
  



//Checkng The Single Entry Limit
if(noofp>Nolimit )
{  
 // showToastMessagefailed(" No of vister Exceed The Limit....!")
  alert(" No of vister Exceed The Individual Limit....!")
  event.preventDefault(); 
}
else
{
  
 let slt= selectedsloat==''?localStorage.getItem('Selectedslot'):selectedsloat
 let gate=selectedgate==''?localStorage.getItem('Selectedgate'):selectedgate
 console.log(slt)
 console.log(gate)
  if( selectedmanagement && slt && gate && vname&& vname.length>1 && Vphone&&validator.isDate(pdate) &&re.test(vname) && noofp>=0)
  {
   
    if(noofp>Difference-1 || ((Difference-1)<=0 & (Difference!=1)))
    {
      alert(`No of vister Exceed The Daily Limit....!,You Have only ${Difference} Person Left`)
      event.preventDefault(); 
    }else
    {
  
      const enterdon = new Date();//Hard coded
      const printedon = ''
      const vsstatus = 0
      const entedby = localStorage.getItem('Mid')
      const Data = {
        Mid: selectedmanagement,
        TsId: slt,
        GId: gate,
        VisiterName: vname,
        VisiterMobile: Vphone,
        VisiterPlace: Vaddress,
        Enterdon: enterdon,
        PDate: pdate,
        PrintedOn: printedon,
        Status: vsstatus,
        EnterdBy: entedby,
        NoOfP: noofp,
        Remarks:remarks
      }
      console.log(Data)
     
      if (
      //  alert(pdate),
     // alert(validator.isDate(pdate)),
        selectedmanagement && gate && slt && vname&& vname.length>1 && Vphone&&validator.isDate(pdate) &&re.test(vname) && noofp>=0 ) {
      
     var now=new Date()
     const pdateYear = pdate.getFullYear();
     const pdateMonth = pdate.getMonth();
     const pdateDay = pdate.getDate();
  
     const nowYear = now.getFullYear();
     const nowMonth = now.getMonth();
     const nowDay = now.getDate();
  
     if (
      pdateYear > nowYear ||
      (pdateYear === nowYear && pdateMonth > nowMonth) ||
      (pdateYear === nowYear && pdateMonth === nowMonth && pdateDay >= nowDay)
    ) {
      // Perform your operation here
      if(Vphone.length!==10  || validator.isMobilePhone(Vphone)===false || (pdate.getDay<now.getDay) )//Validating the mobile number
      {
        alert("Invalid Datas..")
        event.preventDefault(); 
      }
      else
      {
        
        axios.post(`${baseurl + '/Viewer'}`, Data)
        .then((r) => {
         console.log(r.data)
          if (r.data[0].Error == 0) { // Check if the request was successful
            toast.success('Registration Successful');
           // showToastMessage();
            //window.alert("Registration Successful..")
           
           Refresh();
          } else {
           // showToastMessagefailed()
            console.log('Request failed:', r.data.Error);
          
          }
         })
         .catch((error) => {
          console.log('An error occurred:', error);
          
        });
      }
  
    } else {
      window.alert('Cant Allow BackDate');
      event.preventDefault(); 
    }
  
  
  
  
  
     //console.log(""+ pdate+"and"+""+now)
    //console.log(pdate >=  now)
  
       
           
           }
           else {
            alert("Enter The Require Datas Correctly")
            event.preventDefault(); 
  
      }
  
  
    }
 

  }else{
    alert("Enter The Require Datas Correctly")
          event.preventDefault(); 
  }
 
  }
}

 const LoadBalance=() =>{
  const today=convert(new Date())
  let mid=localStorage.getItem('Mid')
  const TotalLimitperDay= localStorage.getItem('TotalLimit')
  axios.get(`${baseurl}/Management?Id=${mid}&date=${today}`)
.then((r)=>{
if(r.data)
{
setTotalVisitersToday(r.data[0].Totalvisiter) 
//console.log(localStorage.getItem('TotalLimit'))
//console.log((parseInt(TotalLimitperDay)-parseInt(r.data[0].Totalvisiter)))
setDifference(parseInt(TotalLimitperDay)-parseInt(r.data[0].Totalvisiter))
//console.log(Difference)
}
})

 }




  //---------CHANGE HANDLING------------------//
  const handleManagementChange = (e) => {
    try {
     // console.log(e)
      setselectedmanagement(e.value)
     
      alert(e.target.value)
    } catch (error) {

    }
  }


  const handleSloatChange = (e) => {
    try {
      // console.log(e.label)
      setselectedsloat(e.value)
   localStorage.setItem("Selectedslot",e.value)
      // alert(e.target.value)
    } catch (error) {

    }
  }

  const handleGateChange = (e) => {
    try {
      // console.log(e.label)
      setselectedgate(e.value)
      localStorage.setItem("Selectedgate",e.value)


    } catch (error) {

    }
  }
  //-------------------------------------

  const HandleNavigate = () => {
    try {
      if (dview) {
        navigate('/Dashboard')
      }
      else {
        navigate('/Staffdash')
      }

    } catch (error) {

    }
  }
//Generate Link
  const GenerateLink=()=>{
    try {
     
     if(selectedgate!=0)
     {
      let unique_id=uuid()
      const enterdon = new Date();//Hard coded
      const printedon = ''
      const vsstatus = 5
      const entedby = localStorage.getItem('Mid')
      const Data = {
        Mid: localStorage.getItem('Mid'),
        TsId: 1,
        GId: selectedgate,
        VisiterName: vname,
        VisiterMobile: Vphone,
        VisiterPlace: Vaddress,
        Enterdon: enterdon,
        PDate: pdate,
        PrintedOn: printedon,
        Status: vsstatus,
        EnterdBy: entedby,
        NoOfP: noofp,
        Remarks:remarks,
        Linkid:unique_id
      }
      axios.post(`${baseurl}/GuestHome`,Data).then((r)=>{
       // console.log(r.data);
        if(r.data[0].Error===0)
        {
          axios.get(`${baseurl}/GuestHome?Linkid=${unique_id}`).then((r)=>{//geting all the data of particular unique id
          //  console.log(r.data)
          })
          setlink(`${local}/GuestHome/${unique_id}`) //hardcoded
          setisopen(true)
         
        }
        else{
          alert("Error while insertion")
       
        }
      })
      
     }else{
      alert("Please Select Gate....")
     }
    
      } catch (error) {
      console.log(error)
    }
  }

  const handleModal=()=>{ setisopen(false) }


const HandleLogOut=()=>{
  try {
    if(window.confirm("Do You Want To LogOut......!"))
    {
      localStorage.removeItem('IsView')
      localStorage.removeItem('Mname')
      localStorage.removeItem('Mid')
      localStorage.removeItem('Currentsloatid')
      localStorage.removeItem('IsOtptrue')
      localStorage.removeItem('TotalLimit')
      localStorage.removeItem('Currentsloatid')
      localStorage.removeItem('Selectedslot')
      localStorage.removeItem('Selectedgate')
      localStorage.removeItem('Diff')
      navigate('/')
    }
    
  } catch (error) {
    console.log(error)
  }
}


  return (


    <div className='html'>
  {  <Modal show={isopen} >
     <Modal.Header closeButton>
     <Modal.Title> Link </Modal.Title>
     </Modal.Header>
      <Modal.Body>Your Link Address:<span style={{color:'blue'}}>  {link}</span>
      
       </Modal.Body>
      <Modal.Footer>
      <WhatsappIcon size={32} round onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(link)}`)}/>
     <Button variant="danger" onClick={handleModal}>
      Close
    </Button>
     </Modal.Footer>
   </Modal>
  }
      <div class="wrapper">
        <div class="title-text">

        </div>

        <div class="form-container">
          <label for="signup" class="slide signup" style={{marginBottom:'0px'}}>Guruvayur Devaswom</label> : <label>{localStorage.getItem('Mname')}</label>
          <div class="slide-controls" style={{marginTop:'0px'}}>
            {
              /*<input type="radio" name="slider" id="login" checked />
            <input type="radio" name="sl
    
            ider" id="signup" />*/

            }
            <label for="login" class="slide login" onClick={HandleNavigate}  >DashBoard</label>
            <label for="signup" class="slide signup"> Register</label>
            <div class="slide-tab"></div>
          </div>

          <div class="form-inner">


            <form  class="login">



              {dview && <div class="field">
                <Select
                  
                  onChange={handleManagementChange}
                  options={management.map((d) => (
                    {

                      value: d.Id,
                      label: d.Name
                    }))}
                  placeholder="*Managment"
                  required
                />

              </div>
              }

              {/*lableview&& <div class="field">
        
        <label style={{color:'black',fontSize:'20px' ,alignItems:'center'}}>{localStorage.getItem('Mname')}</label>
     
          </div>*/
              }

              <div className='field' >
                <DatePicker
                  wrapperClass='mb-4'
                label='*'
                size='lg'
                id='form2'
                selected={pdate}
               onChange={(date) => setpdate(date)}
                dateFormat='dd/MM/yyyy'
                 required
                />
              </div>

              <div className='field' >
                <Select
                
                  placeholder="Select slot"
                  onChange={handleSloatChange}
                  options={sloat.map((d) => (
                    {

                      value: d.id,
                      label: d.sloat
                    }
                  ))}
                  required
                />      
                <br></br>
                 <Select
                  placeholder="*Select gate"
                  onChange={handleGateChange}
                  options={gate.map((d) => (
                    {

                      value: d.id,
                      label: d.Name
                    }
                  ))}
                />         
              </div>

             {/* <div className='field' >
               
              </div>*/
             }

             <br></br>
             <br></br>
              <div class="field">
                <input type="text"

                  placeholder="*Visitor name"
                  value={vname}
                  onChange={(e) => setvname(e.target.value)}
                   />
              </div>

              <div class="field" style={{display:'flex'}}>
                <input  type="number"
                 inputMode='numeric'
                  placeholder="No of visitors"
                  value={noofp}
                  onChange={(e) => setnoofp(e.target.value)}  
                   />

                   <input type="number"
                    inputMode='numeric'
                  placeholder="* Phone No"
                  
                  value={Vphone}
                  onk
                  onChange={(e) =>{ setVphone(e.target.value);
                    LoadBalance()
                   } }/>
                 
                  
              </div>             

              <div class="field">
                <input type="text"
                  placeholder="Address"
                  value={Vaddress}
                  onChange={(e) => setVaddress(e.target.value)}
                 />
              </div>

              <div class="field">
                <input type="text"
                  placeholder="Remarks"
                  value={remarks}
                  onChange={(e)=>setremarks(e.target.value)}
                 
                  />
              </div>




              { /* <div class="pass-link">
            <a href="#">
              Forgot password?
            </a>
          </div>
          */
              }
              <div class="field" >
                <input type="submit" value="Register" onClick={HandleDatas} />
                
                <ToastContainer />
              </div>
              <div class="slide-controls">
              { !dview&&  <label for="login" class="slide login" onClick={GenerateLink}  >Generate Link</label>}
          {  /*<label for="signup" class="slide signup" onClick={()=>{navigate('/')}}  style={{color:'red'}}> Logout</label>*/}
          <label for="signup" class="slide signup" onClick={HandleLogOut}  style={{color:'White',backgroundColor:'#a445b2'}}> Logout</label>
            <div class="slide-tab"></div>
          </div>
            </form>


            {/* <form action="#" class="signup">
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
                <input type="submit" value="Signup" />
              </div>

            </form> */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Homepage;
