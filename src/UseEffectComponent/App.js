import React, { useState ,useEffect} from "react";
import axios from "axios"
import UsePrevState from"./hooks/prevStateUseRef"



const App=()=>{
  const[term,setTerm]=useState("");
  const[result,setResult]=useState([]);
  const tempUseRef=UsePrevState(term);
  


// useEffect Api wikipedia Connect api 
useEffect(()=>{
  const Search=async()=>{
    const Data =await axios.get("https://nl.wikipedia.org/w/api.php",{
      params:{
        action:"query",
        list:"search",
        origin:"*",
        format:"json",
        srsearch:term,
      },
    });
setResult(Data.data.query.search)
  }

  if(!result.length){

    if(term){
      Search();
    }
  }else if(tempUseRef!==term){
    const Time=setTimeout(()=>{
 

      if(term){
        Search();
      }
    
   
   },1500)
   return()=>{
     clearTimeout(Time)
   }
   }
   
  }

,[term,result.length,tempUseRef])
//  fetch data 
const fetchResult =result.map((el)=>(
  <tr key={el.pageid}>
    <th>{el.pageid}</th>
    <td>{el.title}</td>
    <td><span dangerouslySetInnerHTML={{"__html":el.snippet}}/></td>
  </tr>
))
  return(
          <div className="container">
              <div className="row">
                <div className="col">
    <div className="my-3">
          <label htmlFor="Search" className="form-label">
  Search Input
          </label>
      <input type="text" className="form-control" onChange={(e)=>setTerm(e.target.value)}></input>
      </div>
  
      </div>
          </div>
          <div className="row">

    <div className="col">
    <table className="table">
      <thead>
        <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Desc</th>
        </tr>
      </thead>
      <tbody>
      {fetchResult}
      </tbody>
    </table>
    </div>
       
          </div>
        </div>
  
    )
}
export default App