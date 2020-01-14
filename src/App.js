import React from 'react';
import HeaderFile from './Presentational/Header/HeaderFile';
import Graph from './Presentational/Body/Graph';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      barArr: [],
      colorArr: [],
      compared: 0,
      bars: 10,
      sortName: 'Bubble Sort',
      speed: 100,
      swaps: 0,
      time: 0
    }
  }

  componentWillMount = () => {
    this.onChangeBarCount(10);
  }

  onChangeArray = async (arr) => {
    await this.setState({ barArr: arr });
  }

  onChangeColorArray = async (arr) => {
    await this.setState({ colorArr: arr });
  }

  onChangeBarCount = (num) => {
    let arr = new Array(num);
    let arrColor = new Array(num);
    for (let i = 0; i < num; i++) {
      arr[i] = i+1;
      arrColor[i] = 'blue';
    }
    this.setState({
      barArr: arr,
      bars: num,
      colorArr: arrColor
    });
  }

  onChangeComparisonCount = (num) => {
    if (!isNaN(num)) {
      this.setState({ compared: num });
    }
  }
  
  onChangeSpeed = (num) => {
    this.setState({ speed: num });
  }

  onChangeSwapCount = (num) => {
    if (!isNaN(num)) {
      this.setState({ swaps: num});
    }
  }

  onChangeTimer = (num) => {
    if (!isNaN(num)) {
      this.setState({ time: num });
    }
  }

  onSelectSort = (val) => {
    this.setState({ sortName: val });
  }

  render() {
    return (
      <div className="App">
        <HeaderFile barArr={this.state.barArr} 
          onChangeBarCount={this.onChangeBarCount} 
          bars={this.state.bars} 
          onChangeSpeed={this.onChangeSpeed} 
          speed={this.state.speed}
          onSelectSort={this.onSelectSort}
          sortName={this.state.sortName} />
        <Graph barArr={this.state.barArr}
          bars={this.state.bars}
          colorArr={this.state.colorArr}
          speed={this.state.speed} 
          onChangeArray={this.onChangeArray} 
          onChangeColorArray={this.onChangeColorArray}
          sortName={this.state.sortName}
          onChangeTimer={this.onChangeTimer}
          swaps={this.state.swaps}
          onChangeSwapCount={this.onChangeSwapCount}
          compared={this.state.compared}
          onChangeComparisonCount={this.onChangeComparisonCount}
          time={this.state.time/1000} />
      </div>
    )
  }
}

export default App;
