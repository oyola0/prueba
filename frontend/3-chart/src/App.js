
import React, { Component } from 'react';
import logo from './logo.svg';
import ChartD3 from './ChartD3.jsx';
import * as _ from 'lodash';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 1,
      title: 'HubSpot Stock in D3',
      type: 'd3',
      isLoading:true
    };
  }
  componentDidMount(){
    fetch('/react-charts-and-maps/random.json')
     .then(response => response.json())
     .then(data => this.setState({ data: data,isLoading:false}))
     .catch(error => this.setState({ error:true,isLoading:false}));
  }

  render() {
    let content;
    if (this.state.isLoading) {
      content = <div>Loading...</div>
    }else if(this.state.error){
      content = <div>ERROR!</div>
    }else {
      content = <ChartD3 data={this.state.data} title={this.state.title} />;;
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Charts with React.</h2>
        </div>
        <div className="container">
          {content}
        </div>
      </div>
    );
  }
}

export default App;
