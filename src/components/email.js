import axios from "axios";
import React, { useEffect, useState } from "react";

export function Email() {
  const [Bulkemail, setBulkemail] = useState({});
  const[data,setdata]=useState([]);
  const[Verified,setverified]=useState([]);
  const[unverified,setunverified]=useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getmail, setmail] = useState([]);
  // geting form data
  let name;
  let value;
  const handelinput = (e) => {

    name = e.target.name;
    value = e.target.value;
    setBulkemail({ ...Bulkemail, [name]: value })

  }

// postapi
  const handelsubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
      const res =await axios.post('https://bulkemails.herokuapp.com/api/checkmail',
     { mail:Bulkemail.mail})
     .then((data) =>{ setdata(data.data.data)})
     console.log(data,"data") 
     setIsLoading(false);
   }
  


// getapi
  async function GetData() {

    let arr = [];
    const getdata = await axios.get("https://bulkemails.herokuapp.com/api/email");
    for (let i of getdata.data.data) {
      arr.push(i.emails);
    }
    setmail(arr);
  }


  useEffect(async () => {
    await GetData();
  }, []);

  return (
    <div className="container    col-6">
      <div className="row ">
        <div className="col">
          <form >
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Bulk Domains</label>
              <textarea type="text" name="mail" placeholder={Bulkemail.email}
                onChange={handelinput} autoComplete="off" className="form-control" rows="5" id="email">
              </textarea>
            </div>
            <button style={{ width: "100%" }} onClick={handelsubmit} className="btn btn-danger">Submit</button>
          </form>
          <div>  <label htmlFor="validemails" className="form-label mt-3 ">Verified</label></div>
         
         
          {!isLoading ? data.verified.map((veri,i) => (
            <div>
             
              <span className="d-block p-2 border text-black pt-2 " key={i}>{veri}</span></div>)): null}
          
              <div><label htmlFor="validemails" className="form-label mt-3">unverified</label></div>
         
         {!isLoading ? data.unverified.map((veri,i) => (
           <div>
            
             <span className="d-block p-2 border text-black pt-2 " key={i}>{veri}</span></div>)): null}
          <label htmlFor="validemails" className="form-label mt-5">Valid emails</label>

          {getmail.map((mail, i) => (
            <div>
              {console.log(getmail, "mailing")}
              <span className="d-block p-2 border text-black pt-2 " key={i}>{mail}</span></div>))}
        </div>
      </div>
    </div>)
}