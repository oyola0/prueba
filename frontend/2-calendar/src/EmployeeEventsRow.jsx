import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import moment from 'moment';
import './App.css';

function isElementInViewport (el) {
  const rect = el.getBoundingClientRect();
  const elemTop = rect.top;
  const elemBottom = rect.bottom;
  return (elemTop >= 0) && (elemBottom <= (window.innerHeight + 35));
}

class EmployeeEventsRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInViewPort: false
    };

    this.printDays = this.getPrintDays.bind(this);
    this.printEvents = this.getPrintEvents.bind(this);
  }

  detectComponents() {
    if (this.state.isInViewPort === false && isElementInViewport(ReactDOM.findDOMNode(this))) {      
      this.setState({
        isInViewPort: true
      });      
    }
  }

  componentDidMount() {        
    this.detectComponents();
  }
  
  getStyleForEvent (event,calendar){

    var columnWidth=57.14;
    var from=moment(event.from);
    var to=moment(event.to);
    var diff=to.diff(from, 'days');
    if (diff===0) diff=1;
    var awesomeWidth=(diff*columnWidth).toFixed(2)+'px';
    var firstDay=calendar.getFirstDay();
    var diffFirstDay=from.diff(firstDay,'days');
    var awesomeLeft=(diffFirstDay*columnWidth).toFixed(2)+'px';

    return {
      left:awesomeLeft,
      width:awesomeWidth
    }
  }

  getPrintDays() {
    var printDays=[];

    if(this.state.isInViewPort) {
      for (var i=0;i<35;i++){
        printDays.push(
          <div className="day-element" key={`day_${i}`}>
            <div className="add-shift js-add-shift" onClick={this.props.handleOpenModal}>+</div>
          </div>
        )
      }
    }    

    return printDays;
  }

  getPrintEvents() {
    var printEvents=[];

    if(this.state.isInViewPort) {
      var currentEvents=[];
      this.props.employee.events.forEach((event,i) => {
        var fromDate=moment(event.from);
        var firstDayOfCurrentCalendar=this.props.calendar.getFirstDay();
        var lastDayOfCurrentCalendar=this.props.calendar.getLastDay();
        if (fromDate.isBetween(firstDayOfCurrentCalendar, lastDayOfCurrentCalendar)){
          currentEvents.push(event);
        }
      })
      currentEvents.forEach((event,i) => {
        printEvents.push(
          <div className="event bright-green" key={i} style={this.getStyleForEvent(event,this.props.calendar)}>
          </div>
        )
      })
    }

    return printEvents;
  }

  render() {
    return (
      <div className="cat-row single" key={this.props.employee.firstName}>
        {this.printDays()}
        {this.printEvents()}
      </div>
    );
  }
}

export default EmployeeEventsRow;
