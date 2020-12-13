import React, { Component } from 'react';
import './App.css';
import Day from './Day.jsx';

class Week extends Component {
  render() {
    var printWeeks=[];
    var returnedWeeks=this.props.weeklyCalendar.getWeeks();
    console.log("weeklyCalendar",returnedWeeks);

    returnedWeeks.forEach((week,i) => {
      printWeeks.push(<div className="week" key={i}>
        <div className="number">
          {week.month} {week.year}
        </div>
        <Day weekDays={week.days} />
      </div>)
    });

    return (
        <div className="cal-nav">
          {printWeeks}
        </div>
    );
  }
}

export default Week;
