import React, { Component, Fragment } from 'react';
import Employees from './Employees.jsx';
import GanttChart from './GanttChart.jsx';
import './App.css';

class EmployeesAndChart extends Component {
  render() {
    var employees=[];
    var searchText = this.props.searchText;
    var lcSearchText=searchText.toLowerCase();
    
    this.props.employees.forEach((employee,i) => {
      var lcFirstName=employee.firstName.toLowerCase();
      var lcLastName=employee.lastName.toLowerCase();
      if (!searchText){
        employees.push(employee);
      } else if (searchText !== '' &&  (lcFirstName.indexOf(lcSearchText) !== -1 || lcLastName.indexOf(lcSearchText)!==-1)){
        employees.push(employee);
      }
    });


    return (
      <Fragment>
        <Employees employees={employees}/>
        <GanttChart employees={employees} weeklyCalendar={this.props.weeklyCalendar} handleOpenModal={this.props.handleOpenModal} handleUpdate={this.props.handleUpdate}/>
      </Fragment>
    );
  }
}

export default EmployeesAndChart;
