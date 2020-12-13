import React, { Component, createRef } from 'react';
import './App.css';
import Week from './Week.jsx';
import Columns from './Columns.jsx';
import EmployeeEventsRow from './EmployeeEventsRow.jsx';

function debounce(callback, wait, immediate = false) {
  let timeout = null 
  
  return function() {
    const callNow = immediate && !timeout
    const next = () => callback.apply(this, arguments)
    
    clearTimeout(timeout)
    timeout = setTimeout(next, wait)

    if (callNow) {
      next()
    }
  }
}

class GanttChart extends Component {
  constructor(props) {
    super(props);
    this.scrollDebounced = debounce(() => this.detectComponents(), 200, true);
  }

  detectComponents() {
    this.childs.forEach((child) => child.current.detectComponents && child.current.detectComponents());
  }

  componentDidMount() {
    document.addEventListener('scroll', this.scrollDebounced);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollDebounced);
  }

  createEmployRow(employee, i) {
    const child = createRef();
    this.childs.push(child);
    return <EmployeeEventsRow ref={child} employee={employee} key={i} handleOpenModal={this.props.handleOpenModal} calendar={this.props.weeklyCalendar}/>
  }

  render() {    
    var printEmployeeRows=[];
    var employees=this.props.employees;
    var searchText = this.props.searchText;
    var lcSearchText=searchText.toLowerCase();
    console.log("employees",employees)
    this.childs = [];
    employees.forEach((employee,i) => {
      var lcFirstName=employee.firstName.toLowerCase();
      var lcLastName=employee.lastName.toLowerCase();
      if(searchText !== '' &&  (lcFirstName.indexOf(lcSearchText) !== -1 || lcLastName.indexOf(lcSearchText)!==-1)){
        printEmployeeRows.push(this.createEmployRow(employee, i));
      }else if (!searchText){
        printEmployeeRows.push(this.createEmployRow(employee, i));
      }
    });

    return (
      <div className="chart">
        <div className="content">
            <Week weeklyCalendar={this.props.weeklyCalendar}></Week>
        </div>
        <Columns weeklyCalendar={this.props.weeklyCalendar} employees={this.props.employees} handleUpdate={this.props.handleUpdate}></Columns>
        <div className="rows">
          {printEmployeeRows}
        </div>
      </div>
    );
  }
}

export default GanttChart;
