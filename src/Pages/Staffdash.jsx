import React from 'react'
import '../Style/Dash.css'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {baseurl} from '../Urls/Urls'
import moment from 'moment/moment'
import  Select  from 'react-select';
function Staffdash() {

 const navigate = useNavigate();
const [viewers, setviewers] = useState([])
const [sloat,setsloat]=useState([])
const [selectedsloat,setselectedsloat]=useState('')


useEffect(() => {
  const staffid=  localStorage.getItem('Mid')

  //let sltid=-1
    axios.get(`${baseurl}/Viewer?Staffid=${staffid}`)
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
      console.log(error)
    }
}


const GotoBylinkDash=()=>{
  try {
    navigate('/Bylinkdash')
  } catch (error) {
    console.log(error)
  }
}
//----------------------------------reject req
const RejectReq=(e)=>{
 // let sltid=localStorage.getItem('Currentsloatid')
  const staffid=  localStorage.getItem('Mid')
 // console.log(sltid)
    try {
      if(window.confirm("Do you Want to Reject The Entry...!"))
      {
       // console.log(e.target.value)
        const vid=e.target.value
       axios.post(`${baseurl}/Viewer?Vid_delete=${vid}`)
       .then
       ((r)=>
       //axios.get(`${baseurl+'/Viewer'}`)
       
       axios.get(`${baseurl}/Viewer?Staffid=${staffid}`)
    .then((r)=>{
       // console.log(r.data)
        setviewers(r.data)
    },(error)=>{console.log("Error while feting the viewrslist "+error)}))
  }
    } catch (error) {
       console.log(error) 
    }
}

//---------------------------------accept req

    const ChangebtnStatus=(e)=>{
  let sltid=localStorage.getItem('Currentsloatid')
  const staffid=  localStorage.getItem('Mid')
  try {
    if(window.confirm("Do you Want to Approve The Entry...!"))
    {
      //console.log(e.target.value)
      const vid=e.target.value
      axios.post(`${baseurl}/Viewer?vid_to_admin=${vid}`)
     .then
     ((r)=>
    // axios.get(`${baseurl+'/Viewer'}`)
   // axios.get(`${baseurl}/Viewer?sltid=${sltid}`)
   
   axios.get(`${baseurl}/Viewer?Staffid=${staffid}`)
  .then((r)=>{
    
      setviewers(r.data)
  },(error)=>{console.log("Error while feting the viewrslist "+error)}),)
}
  } catch (error) {
     console.log(error) 
  }

}
{
/*
//-------------for select box of sloat-----------------------
const handleSloatChange=(e)=>{
  try {
   console.log(e)
    setselectedsloat(e.value)
   
    alert(e.target.value)
  } catch (error) {
    
  }
 }
//-----------for button click of sloat----------------
 const HandleSoartdata=(e)=>{
console.log(e.target.value)
localStorage.setItem('Currentsloatid',e.target.value)
axios.get(`${baseurl}/Viewer?sltid=${e.target.value}`)
.then((r)=>{
    console.log(r.data)
    setviewers(r.data)
},(error)=>{console.log("Error while feting the viewrslist "+error)})

 }
*/}

  return (
    < >
    <div className='row my-table-container'>
    <div className="col-12 ">
    <div style={{justifyItems:'center'}}>
    <div  style={{position:'sticky',top:'0px',width:'95%',height:'6vh',display:'flex',justifyContent:'right'}}>
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
         /* sloat.map((d)=>(
            
            <button
            className='btn btn-outline-info'
            onClick={HandleSoartdata}
            value={d.id}
            >
             {d.sloat}
            </button>
          ))*/
        }
     
 {/*   <button type="button"  class="btn btn-warning" onClick={ShowAll}>All</button>
<input style={{float:'right',marginRight:'7px',width:'10vh'}} type='button' className='btn btn-success' value='Home'/>*/}
</div>
</div>


<table>
<tr style={{backgroundColor:'lightgray'}}>
        <th style={{backgroundColor:'lightgray',color:'black'}} colSpan={5}><h5>Guruvayur Devaswom</h5></th>
        
      { /*<th style={{backgroundColor:'lightgray'}}  ><button type="button"  class="btn btn-secondary" onClick={GotoBylinkDash} >Link</button></th>*/}
        <th style={{backgroundColor:'lightgray'}}  ><button type="button"  class="btn btn-secondary" onClick={GotoHome} >Home</button></th>
       
      </tr>
</table>
          
    <table className="table">
   
      <thead>
     
        <tr>
        <th>No</th>
          <th>Staff</th>
          <th colSpan={2}>Visitor</th>
          
          
          <th>Visitors</th>
         <th>Gate</th>
          <th>Slot</th>
          <th >Date </th>
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
     { <td data-label="Slot">{data.TimeSloat}</td>}
      <td data-label="PerformanceDate">{new Date(data.PDate).toLocaleDateString('en-GB')}</td>
       
     
     
     {
    data.Status==4&&
     
      <td  data-label="Status">
        <button
          className="btn btn-success"
          value={data.Id}
          onClick={ChangebtnStatus}
        >
        Approve
        </button>
        </td>
     
      
      
        
     }
        <td >
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


export default Staffdash