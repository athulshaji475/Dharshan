import React from 'react';
import '../Style/BodyStyle.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Select from 'react-select';
import {baseurl} from '../Urls/Urls';
import {local} from '../Urls/Urls';
import validator from 'validator';
import { useNavigate,useParams } from 'react-router-dom'
import DatePicker from 'react-datepicker';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css'
import { Modal, Button } from "react-bootstrap";
import moment from 'moment';
import { v4 as uuid } from 'uuid';


function Homewithlink() {

  const params = useParams(); //Accepting the LinkId
 // console.log(params.LinkID);

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
 // const [pdate, setpdate] = useState(moment(new Date()).format('YYYY-MM-DD'))
 const [pdate, setpdate] = useState(new Date());
  const [dview, setdview] = useState(false)
  const [Nolimit, setNolimit] = useState(0)
  const [lableview, setlabelview] = useState(false)
  const [isopen,setisopen]=useState(false)
  //const [managementlabel, setmanagementlabel] = useState('')
  const [noofp, setnoofp] = useState(null);
  const [remarks, setremarks] = useState('')
  const [link,setlink]=useState('')
  const [Linkudata,setLinkudata]=useState([])
  const [status,setstaus]=useState(0)
  const [TotalVisitersToday , setTotalVisitersToday ] = useState(0)
  const [Difference, setDifference] = useState(0)
  const [TotalLimitperDay, setTotalLimitperDay] = useState(0)
  //const [curdate,setcurdate]=useState('')
  useEffect(() => {
    try {
       // console.log(params.LinkID);
      //console.log(localStorage.getItem('IsView'))
     //let date=moment(new Date()).format('YYYY-MM-DD')
     


     
      if (localStorage.getItem('IsView') == 1) {
        setdview(true)
      }
      else {
        setdview((false)) //hiding the admin features non admin users
        setlabelview(true)//seting the label view for non admin users
        setselectedmanagement(localStorage.getItem('Mid'))  //seting the mid from local storage for non admin users
      }

      //sloat
      const today=convert(new Date())
      let mid=localStorage.getItem('Mid')
      const TotalLimitperDay= localStorage.getItem('TotalLimit')
       axios.get(`${baseurl}/Management?Id=${mid}&date=${today}`)
   
   
  .then((r)=>{
   if(r.data)
   {
    console.log(r.data)
    setTotalVisitersToday(r.data[0].Totalvisiter)
     setDifference(parseInt(TotalLimitperDay)-parseInt(r.data[0].Totalvisiter))
      console.log("Diffrence Is"+Difference)
   }
 })

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
    axios.get(`${baseurl}/GuestHome?Linkid=${params.LinkID}`).then((r)=>{//geting all the data of particular unique id
    //  console.log(r.data)
          setLinkudata(r.data) 
          //console.log(Linkudata)
            //setisopen(false)
           // alert(r.data[0].Status)
            if(r.data[0].Status==4 || r.data[0].Status==0 || r.data[0].Status==3)//If rejectd/approved/ideal link is invalid
            {
             setTimeout(() => {
                navigate('/Spage')
             }, 300);   
               
            }
            else{
                setisopen(false)
               
            }
         })


  }, []);

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  //------------------------------------------------------------------------------
  const Refresh = () => {
    setselectedmanagement('');
    setselectedsloat('');
    setselectedgate('');
    setvname('');
    setnoofp('')
    setVphone('');
    setVaddress('');
    setpdate(new Date());

    axios.get(`${baseurl + '/Management?d=1'}`).then((r) => {
      if (r.data) {      
         setmanagement(r.data)      
      }
    },(error)=>{console.log(error)})
      //------------------------------------------------------------------------------

    //gate
    axios.get(`${baseurl + '/Management'}`).then((r) => {
      if (r.data) {
        setgate(r.data)
      }
    },(error)=>{console.log(error)})
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

  //------SUBMIT HANDLING-----------------//

  const HandleDatas = (event) => {
    const re = /^[A-Za-z]+$/;
    //console.log(management)
    //console.log(selectedmanagement);
    //console.log(selectedgate)
    //console.log(selectedsloat)
    //console.log(pdate);
    


if(noofp>Nolimit)
{
  showToastMessagefailed(" No of vister Exceed The Limit....!")
  alert(" No of vister Exceed The Limit....!")
}
else
{

  if(vname&& vname.length>1&& Vphone&& validator.isDate(pdate) && re.test(vname) && noofp>=0)
  {
    if(noofp>Difference-1 || (Difference-1)<=0)
    {
      alert(`No of vister Exceed The Daily Limit....!,You Have only ${Difference} Person Left`)
      event.preventDefault(); 
    }else
    {
   // const enterdon = new Date();//Hard coded
   const printedon = ''
   // const vsstatus = 0
   // const entedby = 1
   
   //console.log( re.test(vname))
   if(vname&& vname.length>1&& Vphone&& validator.isDate(pdate) && re.test(vname) && noofp>=0)
   {
   
    const Data = {
      
      
      TsId:selectedsloat,
      VisiterName: vname,
      VisiterMobile: Vphone,
      VisiterPlace: Vaddress,
      PDate: pdate,
      PrintedOn: printedon,
      NoOfP: noofp,
      Remarks:remarks,
      LinkId:params.LinkID
    }
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
    ){
      if(Vphone.length==10)
       {
         axios.post(`${baseurl + '/UpdateLinkUser'}`, Data)
          .then((r) => {
        // console.log(r.data)
          if (r.data[0].error == 0) { // Check if the request was successful
          // alert("Data inserted Successfully")
           navigate('/Spage')
           showToastMessage();
           Refresh();
          } else {
             alert("Error While Inserting...")
            showToastMessagefailed()
           console.log('Request failed:', r.data.Error);
           }
           })
         .catch((error) => {
           console.log('An error occurred:', error);
          });
  
          }
         else{
         alert("Enterd Wrong Mobile Number")
        event.preventDefault()
           }
         
    }else
    {
      window.alert('Cant Allow BackDate');
    }
  
  
   }
   else{
   alert("Enter the Required Fields Correctly")
    event.preventDefault()
   }
   
  
    }
    
  }else{
    alert("Enter the Required Fields Correctly")
    event.preventDefault()
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

      // alert(e.target.value)
    } catch (error) {

    }
  }

  const handleGateChange = (e) => {
    try {
      // console.log(e.label)
      setselectedgate(e.value)


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

  const GenerateLink=()=>{
    try {
      
      let unique_id=uuid()
      setlink(`${local}/Home/${unique_id}`) //hard
      setisopen(true)
    } catch (error) {
      console.log(error)
    }
  }

  const handleModal=()=>{ setisopen(false) }


  return (


    <div className='html'>


    {
        
      

        
   
  
    }
   
    <Modal show={false} >
      <Modal.Header closeButton>
    <Modal.Title> <h3>Warning....!</h3> </Modal.Title>
  </Modal.Header>
  <Modal.Body style={{color:'red'}} >Link Sessin Closed.....!
  </Modal.Body>
  <Modal.Footer>
   {/* <Button variant="secondary" onClick={handleModal}>
      Close
    </Button>
    */
   }
  </Modal.Footer>
   </Modal>
    
  
      <div class="wrapper">
        <div class="title-text">

        </div>

        <div class="form-container">
          <label for="signup" class="slide signup">Guruvayur Devaswom</label> {/* <label>{localStorage.getItem('Mname')}</label>*/}

          <div class="slide-controls">
            {
              /*<input type="radio" name="slider" id="login" checked />
            <input type="radio" name="sl
    
            ider" id="signup" />*/

            }
          { /* <label for="login" class="slide login" onClick={HandleNavigate}  >DashBoard</label>*/}
            <label for="signup" class="slide signup"> Register</label>
          { /* <div class="slide-tab"></div>*/}
          </div>

          <div class="form-inner">


            <form action="#" class="login">



              {dview && <div class="field">
                <Select

                  onChange={handleManagementChange}
                  options={management.map((d) => (
                    {

                      value: d.Id,
                      label: d.Name
                    }))}
                    placeholder="managment"
                    required
                />
                <label>*</label>

              </div>
              }

              {/*lableview&& <div class="field">
        
        <label style={{color:'black',fontSize:'20px' ,alignItems:'center'}}>{localStorage.getItem('Mname')}</label>
     
          </div>*/
              }

              <div className='field' >
              {  /*<input
                  wrapperClass='mb-4'
                  label='*'
                  size='lg'
                  id='form2'
                  type='date'              
                  value={pdate}
                  onChange={(e) => setpdate(e.target.value)}
                  required
                />*/
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
              }
              </div>

              <div className='field' >
                <Select
                
                  placeholder="select slot"
                  onChange={handleSloatChange}
                  options={sloat.map((d) => (
                    {

                      value: d.id,
                      label: d.sloat
                    }
                  ))}
                  required
                />               
              </div>

             { <div className='field' >
              { /* <Select
                  placeholder="select gate"
                  onChange={handleGateChange}
                  options={gate.map((d) => (
                    {

                      value: d.id,
                      label: d.Name
                    }
                  ))}
                />*/
                <label>{Linkudata.map((r)=>(
                    r.Gate
                    
                ))}</label>
              }
                
              </div>
             }


              <div class="field">
                <input type="text"
                  placeholder="Name"
                  value={vname}
                  onChange={(e) => {
                  
                   setvname(e.target.value);
                   LoadBalance()}}
                  required />
                   <label>*</label>
              </div>

              <div class="field" style={{display:'flex'}}>
                <input  type="number"
                  placeholder="No of visitors"
                  value={noofp}
                  onChange={(e) => setnoofp(e.target.value)}
                  required />

                   <input type="number"
                  placeholder="Phone number"
                  value={Vphone}
                  onChange={(e) => setVphone(e.target.value)}
                  required />

                  
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
               {/* <label onClick={GenerateLink}>Generate Link</label>*/}
                <ToastContainer />
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
                <input type="submit" value="Signup" />
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homewithlink;
