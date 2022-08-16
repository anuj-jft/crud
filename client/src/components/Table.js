
import React, { useState } from "react";
import Axios from 'axios';
import '../App.css';

const Table = () =>{
    const [employeesList , setEmployeesList] = useState([]);

    const getEmployees = () =>{
    Axios.get('http://localhost:3005/employees').then((response)=>{
      setEmployeesList(response.data)
    });
    }
    return(
        <div className="employees">
        <button onClick={ getEmployees }>Show Employees</button>

        {employeesList.map((val,key) =>{
           return (
            
               <div className="emp" > 
               <h3>Name : {val.name}</h3> 
               <h3>Age : {val.age}</h3>
               <h3>Country : {val.country}</h3>
               <h3>Designation : {val.designation}</h3>
               <h3>Salary : {val.salary}</h3>
               </div>
           )
        })}
        </div>
    )
}

export default Table;