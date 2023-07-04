import React from 'react'
import '../Style/Dash.css'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {baseurl} from '../Urls/Urls'
import moment from 'moment/moment'
import  Select  from 'react-select';
function Dashboard() {

 const navigate = useNavigate();
const [viewers, setviewers] = useState([])
const [sloat,setsloat]=useState([])
const [selectedsloat,setselectedsloat]=useState('')


useEffect(() => {
  let sltid=-1
  localStorage.setItem('Currentsloatid',"undefined") //for defauld selected slot is undefined
    axios.get(`${baseurl}/Viewer?sltid=${sltid}`)
    .then((r)=>{
        console.log(r.data)
        setviewers(r.data)
    },(error)=>{console.log("Error while feting the viewrslist "+error)})
//sloat
    axios.get(`${baseurl+'/Management?dummyid=12'}`).then((r)=>{
      if(r.data){
       // console.log(r.data)
        setsloat(r.data)
       // console.log(sloat)
      }})

}, []);


//All list view
const ShowAll=()=>{
  try {
    localStorage.setItem('Currentsloatid',"undefined")
   // localStorage.setItem('Currentsloatid',undefined)
    let sltid=-1
    axios.get(`${baseurl}/Viewer?sltid=${sltid}`)
    .then((r)=>{
      //  console.log(r.data)
        setviewers(r.data)
    },(error)=>{console.log("Error while feting the viewrslist "+error)})

    
  } catch (error) {
    console.log(error)
  }
}

const  GotoHome=()=>{
    try {
        navigate('/Home')
    } catch (error) {
        
    }
}

//----------------------------------reject req
const RejectReq = (e) => {
  let sltid = localStorage.getItem('Currentsloatid');
  try {
    if (window.confirm("Do you Want to Reject The Entry...!")) {
      const vid = e.target.value;
      axios.post(`${baseurl}/Viewer?Vid_delete=${vid}`).then((r) => {
        let sltidParam = sltid !== "undefined" ? sltid : -1;
        window.alert(sltidParam)
        axios.get(`${baseurl}/Viewer?sltid=${sltidParam}`).then((r) => {
          setviewers(r.data);
        }, (error) => {
          console.log("Error while fetching the viewers list: " + error);
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};


//---------------------------------accept req
const ChangebtnStatus = (e) => {
  let sltid = localStorage.getItem('Currentsloatid');
console.log(sltid)
  try {
    if (window.confirm("Do you want to approve the entry?")) {
      const vid = e.target.value;
      axios.post(`${baseurl}/Viewer?Vid_tobeprint=${vid}`).then((r) => {
      //  window.alert(sltid);
        let sltidParam =  sltid !== "undefined"  ? sltid : -1;
        console.log(sltidParam)
          axios.get(`${baseurl}/Viewer?sltid=${sltidParam}`).then((r) => {
            setviewers(r.data);
          }, (error) => {
            console.log("Error while fetching the viewers list: " + error);
          });
      
      });
    }
  } catch (error) {
    console.log(error);
  }
};



const ChangebtnStatusback = (e) => {
  let sltid = localStorage.getItem('Currentsloatid');

  try {
    if (window.confirm("Do you Want to Approve The Entry...!")) {
      const vid = e.target.value;
      axios.post(`${baseurl}/Viewer?Vid_tobeprint=${vid}`).then((r) => {
        console.log(sltid)
       // let sltidParam = sltid !== undefined ? sltid : -1;
       let sltidParam = sltid !== null && sltid !== undefined ? sltid : -1;
        console.log(sltidParam)
    // console.log(localStorage.getItem('Currentsloatid'));
        axios.get(`${baseurl}/Viewer?sltid=${sltidParam}`).then((r) => {
          setviewers(r.data);
        }, (error) => {
          console.log("Error while fetching the viewers list: " + error);
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//-------------for select box of sloat-----------------------
const handleSloatChange=(e)=>{
  try {
 //  console.log(e)
    setselectedsloat(e.value)
   
    alert(e.target.value)
  } catch (error) {
    
  }
 }
//-----------for button click of sloat----------------
 const HandleSoartdata=(e)=>{
//console.log(e.target.value)
localStorage.setItem('Currentsloatid',e.target.value)
console.log(localStorage.getItem('Currentsloatid'))
axios.get(`${baseurl}/Viewer?sltid=${e.target.value}`)
.then((r)=>{
  //  console.log(r.data)
    setviewers(r.data)
},(error)=>{console.log("Error while feting the viewrslist "+error)})

 }

 //Handle  Logout 
 
const HandleLogOut=()=>{
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
}



  return (
    < >
    <div className='row my-table-container'>
    <div className="col-12 ">
    <div style={{justifyItems:'center',position:'sticky',top:'0px',zIndex:'1'}} >
    <div  style={{position:'sticky',top:'0px',width:'95%',height:'11vh',display:'flex',overflowX:'scroll',backgroundColor:'white'}}>
 {/*   <h4  style={{width:'50%',float:'left'}}>Guruvayur Dewosom</h4>
    <Select
        placeholder="select sloat"
        onChange={handleSloatChange}
          options={sloat.map((d)=>(
          {
            
            value:d.id,
            label:d.sloat
          }
          ))}
        />*/
 }
        {
          sloat.map((d)=>(
            
            <button
            className='btn btn-info'
            onClick={HandleSoartdata}
            style={{margin:'2px'}}
            value={d.id}
            >
             {d.sloat}
            </button>
          ))
        }
     
    <button type="button" style={{margin:'2px', width:'125px'}} value={-1}  class="btn btn-warning" onClick={ShowAll}>All</button>
{/*<input style={{float:'right',marginRight:'7px',width:'10vh'}} type='button' className='btn btn-success' value='Home'/>*/}
</div>
</div>


<table>
<tr style={{backgroundColor:'lightgray'}}>
        <th style={{backgroundColor:'lightgray',color:'black'}} colSpan={5}><h5>Guruvayur Devaswom</h5></th>
        <div style={{display:'inline'}}>
      
        <th style={{backgroundColor:'lightgray'}}  ><button type="button"  class="btn btn-secondary" onClick={GotoHome} >Home</button></th>
        <th style={{backgroundColor:'lightgray',float:'right'}}  ><button type="button"  class="btn btn-danger" onClick={HandleLogOut} >LogOut</button></th>
        </div>
      </tr>
</table>
          
    <table className="table">
   
      <thead>
    { /* <tr style={{backgroundColor:'lightgray'}}>
        <th style={{backgroundColor:'lightgray',color:'black'}} colSpan={9}><h4>Guruvayur Devoswam</h4></th>
        <th style={{backgroundColor:'lightgray',float:'right'}}><button type="button"  class="btn btn-secondary" onClick={GotoHome} >Home</button></th>
      </tr>*/
    }
        <tr>
        <th>No</th>
          <th>Staff</th>
          <th colSpan={2}>Visitor</th>
          <th  >Visitors</th>
          
          <th>Gate</th>
         { <th>Slot</th>}
          <th>Date</th>
          
           
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
  {viewers.map((data,index)=>(

 
    <tr  key={index}>
    <td  data-label="SerialNo">{index+1}</td>
      <td  data-label="Staff">{data.Staff}</td>
      <td colSpan={2} data-label="Visiter">{data.VisiterName+'-'+data.VisiterPlace}</td>
      <td data-label="NoOfPeoples">{data.NoOfPeoples}</td>
      <td data-label="Gate">{data.Name}</td>
     { <td data-label="Sloat">{data.TimeSloat}</td>}
      {/*<td data-label="PerformanceDate">{ moment(data.PDate).utc().format('YYYY-MM-DD')}</td>*/}
      
      
      {

        <td data-label="PerformanceDate">{new Date(data.PDate).toLocaleDateString('en-GB')}</td>}
      <td  data-label="Status">
        <button
          className="btn btn-success"
          value={data.Id}
          onClick={ChangebtnStatus}
        >
          Approve
        </button>
        </td>
        <td>
        <button
          className="btn btn-danger"
          value={data.Id}
         onClick={RejectReq}
          >   
        
          Reject
        </button>
      </td>
    </tr>
    )) }
  {/* <tr style={{ textAlign: "end", fontWeight: "bold", backgroundColor: "#f8f9fa" }}>
    <td className="text-center"></td>
    <td className="text-center">Total coupons requested</td>
    <td className="text-center">{RequstData.reduce((total, data) => total + data.NoOfCoupons, 0)}</td>
    <td className="text-center"></td>
  </tr> */}
</tbody>
    </table>
  </div>
    </div>
    </>
  )
}


export default Dashboard