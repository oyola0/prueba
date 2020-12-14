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
    this.childs.forEach((child) => child.current.detectComponents());
  }

  componentDidMount() {
    document.addEventListener('scroll', this.scrollDebounced);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollDebounced);
  }

  createEmployRow(employee) {
    const child = createRef();
    this.childs.push(child);
    return <EmployeeEventsRow ref={child} employee={employee} key={employee._id} handleOpenModal={this.props.handleOpenModal} calendar={this.props.weeklyCalendar}/>
  }

  render() {        
    console.log("employees",this.props.employees)
    this.childs = [];
    return (
      <div className="chart">
        <div className="content">
            <Week weeklyCalendar={this.props.weeklyCalendar}></Week>
        </div>
        <Columns weeklyCalendar={this.props.weeklyCalendar} employees={this.props.employees} handleUpdate={this.props.handleUpdate}></Columns>
        <div className="rows">
          {this.props.employees.map(this.createEmployRow.bind(this))}
        </div>
      </div>
    );
  }
}

export default GanttChart;
