import React, { Component } from 'react';
import './App.css';

class Day extends Component {
  render() {
    var printWeekDays=[];
    var passedWeekDays=this.props.weekDays;
    //console.log("passedWeekDays",passedWeekDays)

    passedWeekDays.forEach((day,i) => {
      printWeekDays.push(
        <div className="day" key={i} data-date={day.format('YYYY-MM-DD')}>
          <div>{day.format('ddd')}</div>
          {day.format('DD/MM')}
        </div>
      )
    })
    return (
      <div className="each-week">
        {printWeekDays}
      </div>
    );
  }
}

export default Day;
