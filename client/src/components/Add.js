import "../App.css";
import { useState } from "react";
import Axios from 'axios';

function Add() {
  const [name,setName] = useState('');
  const [age,setAge] = useState(0);
  const [country,setCountry] = useState('');
  const [designation,setDesignation] = useState('');
  const [salary,setSalary] = useState(0);

  const addEmployee = () =>{
    Axios.post('http://localhost:3005/create',{
      name:name,
      age:age,
      country:country,
      designation:designation,
      salary:salary
    }).then(()=>{
      console.log("Success");
    });
  };


  return (
    <div className="App">
      <div className="information">
        <label>Name : </label>
        <input type="text" onChange={e=>setName(e.target.value)} />
        <label>Age : </label>
        <input type="number" onChange={e=>setAge(e.target.value)} />
        <label>Country : </label>
        <input type="text" onChange={e=>setCountry(e.target.value)} />
        <label>Designation : </label>
        <input type="text" onChange={e=>setDesignation(e.target.value)} />
        <label>Salary(per year) : </label>
        <input type="number" onChange={e=>setSalary(e.target.value)} />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
    </div>
  );
}

export default Add;
