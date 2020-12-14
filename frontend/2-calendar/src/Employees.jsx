import React, { Component } from 'react';
import './App.css';

class Employees extends Component {
  render() {
    return (
      <div className="people">
        {this.props.employees.map((employee, i) => <div key={i} className="person"><span >{employee.firstName} {employee.lastName}</span></div>)}
      </div>
    );
  }
}

export default Employees;
