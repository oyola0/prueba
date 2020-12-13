import React, { Component } from 'react';
import './App.css';

class Employees extends Component {
  render() {
    var employeesNames=[];
    var searchText = this.props.searchText;
    var lcSearchText=searchText.toLowerCase();
    this.props.employees.forEach((employee,i) => {
      var lcFirstName=employee.firstName.toLowerCase();
      var lcLastName=employee.lastName.toLowerCase();
      if(searchText!= '' &&  (lcFirstName.indexOf(lcSearchText) !== -1 || lcLastName.indexOf(lcSearchText)!==-1)){
        // console.log("must be in the filter")
        employeesNames.push(<div key={i} className="person"><span >{employee.firstName} {employee.lastName}</span></div>)
      }
      else if (!searchText){
        // console.log("not search text")
        employeesNames.push(<div key={i} className="person"><span >{employee.firstName} {employee.lastName}</span></div>)
      }
    });

    return (
      <div className="people">
        {employeesNames}
      </div>
    );
  }
}

export default Employees;
