import React, { Component } from 'react';
import employeeArray from "./employeeArray.js";
import './App.css';
import Employees from './Employees.jsx';
import GanttChart from './GanttChart.jsx';
import WeeklyCalendar from './WeeklyCalendar.js';
import moment from 'moment';
import ReactModal from 'react-modal';
import Search from './Search.jsx';

var calendar= new WeeklyCalendar();
const customStyle={
  overlay : {
    position          : 'fixed',
    top               : '0px',
    left              : '0px',
    right             : '0px',
    bottom            : '0px',
    backgroundColor   : 'rgba(0,0,0,.5)',
    zIndex: 9999
  },
  content : {
    position                   : 'absolute',
    top                        : '40px',
    left                       : '40px',
    right                      : '40px',
    bottom                     : '40px',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '4px',
    outline                    : 'none',
    padding                    : '20px',
    boxShadow                 : '0 7px 17px 0 rgba(0,0,0,.15)'

  }
};
class App extends Component {

  constructor(props) {
    super(props);
    var lotsOfEmployees=[]
    for (var i=1;i<=1000;i++){
      lotsOfEmployees=lotsOfEmployees.concat(employeeArray)
    }
    lotsOfEmployees.forEach(function(emp,i){
      emp._id=i;
    })
    this.state = {
      employees:lotsOfEmployees,
      weeklyCalendar: calendar,
      showModal: false,
      searchText:''
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }
  handleSearch(searchText) {
    this.setState({searchText: searchText});
  }

  prevWeek(){
    var currentCalendar=this.state.weeklyCalendar;
    currentCalendar.prevWeek();
    this.setState({
      weeklyCalendar:currentCalendar
    })
  }

  nextWeek(){
    var currentCalendar=this.state.weeklyCalendar;
    currentCalendar.nextWeek();
    this.setState({
      weeklyCalendar:currentCalendar
    })
  }
  update(day,event){

    var currentEmployees=this.state.employees;

    var selectedEmployee=Math.floor(event.nativeEvent.offsetY/45);

    var currentDayFormatted=day.format('YYYY-MM-DD');
    var nextDayFormatted=moment(currentDayFormatted).add(1,'days').format('YYYY-MM-DD');
    var newelement={from:currentDayFormatted,to:nextDayFormatted,type:'vacation'};
    currentEmployees[selectedEmployee].events.push(newelement);

    this.setState({
      employees:currentEmployees
    });
  }
  render() {
    return (
      <div className="gantt">
        <div className="row calendar-buttons">
          <button type="button" onClick={this.prevWeek.bind(this)} className="btn btn-default btn-rounded waves-effect waves-light">
             <span className="btn-label"><i className="fa fa-arrow-left"></i>
             </span>Anterior
           </button>
           <button type="button" onClick={this.nextWeek.bind(this)}  className="btn btn-default btn-rounded waves-effect waves-light">
              Siguiente
              <span className="btn-label btn-label-right"><i className="fa fa-arrow-right"></i>
              </span>
            </button>
        </div>
        <Search handleSearch={this.handleSearch.bind(this)}></Search>

        <Employees employees={this.state.employees}  searchText={this.state.searchText} />
        <GanttChart weeklyCalendar={this.state.weeklyCalendar} searchText={this.state.searchText} employees={this.state.employees} handleOpenModal={this.handleOpenModal} handleUpdate={this.update.bind(this)}/>
          <ReactModal
            isOpen={this.state.showModal}
            style={customStyle}
            contentLabel="Minimal Modal Example">
           <button onClick={this.handleCloseModal}>Close Modal</button>
         </ReactModal>
      </div>
    );
  }
}

export default App;
