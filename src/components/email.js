import axios from "axios";
import React, { useEffect, useState } from "react";

export function Email() {
  const [Bulkemail, setBulkemail] = useState({});
  const [data, setdata] = useState([]);
  const[loading,setloading]=useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [getmail, setmail] = useState([]);
  const [Value,setValue]=useState('');
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
    setloading(true);
    setIsLoading(true);
    const res = await axios.post(`https://bulkemails.herokuapp.com/api/checkmail/${Value}`,
      { mail: Bulkemail.mail })
      .then((data) => { setdata(data.data.data)
      setloading(false) })
    console.log(data, "data")
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
    <div className="container-fluid ">
      <div className="row ">
        <div className="col">
          <form >
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">Bulk Domains</label>
              <textarea type="text" name="mail" placeholder={Bulkemail.email}
                onChange={handelinput} autoComplete="off" className="form-control" rows="5" id="email">
              </textarea>
            </div>
            <select className="form-select form-select-sm mb-3 " onChange={(e)=>{const select=e.target.value;
            setValue(select);}} aria-label=".form-select-sm example">
              <option  selected>select</option>
              <option value="gmail.com">Gmail</option>
              <option value="yahoo.com">Yahoo</option>
              <option value="outlook.com">Outlook</option>
              <option value="hotmail.com">Hotmail</option>
            </select>
          
            
           {!loading && <button style={{ width: "100%" }} onClick={handelsubmit} className="btn btn-primary">Submit</button>}
           {loading && <button style={{ width: "100%" }}  className="btn btn-primary" disabled>
             <i className="fas fa-spinner fa-spin"></i>Submiting</button>}
          </form>


        </div>
        <div className="col mt-0 pt-0 ">
          <div>  <label htmlFor="validemails" className="form-label  fw-bold ">Verified</label></div>


          {!isLoading ? data.verified.map((veri, i) => (
            <div>

              <span className="d-block p-2 border text-black pt-2 " key={i}>{veri}</span></div>)) : null}

          <div><label htmlFor="validemails" className="form-label mt-4 fw-bold">unverified</label></div>

          {!isLoading ? data.unverified.map((veri, i) => (
            <div>

              <span className="d-block p-2 border text-black pt-2 " key={i}>{veri}</span></div>)) : null}

        </div>
      </div>
      <div className="row ">

        <label htmlFor="validemails" className="form-label fw-bold mt-3 ">Valid emails</label>


        {getmail.map((mail, i) => (
          <div>
            {console.log(getmail, "mailing")}
            <span className="d-block p-2 border text-black pt-2 " key={i}>{mail}</span></div>))}

      </div>
    </div>)
}