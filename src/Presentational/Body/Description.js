import React from 'react';
import Algorithms from './../../Algorithms/Information/Information';
import './../Styles/Description.css';

class Description extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            best_complexity: '',
            worst_complexity: '',
            average_complexity: '',
            space_complexity: '',
            advantages: [],
            disadvantages: [],
            use: [],
            sideNote: '',
            vlHeight: 0
        };
        this.myDiv = React.createRef();
    }

    getData = () => {
        if (this.props.sortType !== this.state.name) {
            Algorithms.algorithms.map(val => {
                if (val.name === this.props.sortType) {
                    this.setState({ 
                        name: val.name,
                        description: val.description,
                        best_complexity: val.best_complexity,
                        worst_complexity: val.worst_complexity,
                        average_complexity: val.average_complexity,
                        space_complexity: val.space_complexity,
                        advantages: val.advantages,
                        disadvantages: val.disadvantages,
                        use: val.use,
                        sideNote: val.name === 'Shell Sort' ? val.sideNote : ''
                     });
                }
            });
        }
    }

    getVLHeight = () => {
        let id = null;
        let height = 0;
        id = this.myDiv.current;
        height = id === null ? 0 : id.style.height;
        if (height !== 0 && height !== this.state.vlHeight) {
            this.setState({ vlHeight: height });
        }
    }

    render() {
        this.getData();
        this.getVLHeight();
        return (
            <div style={{ height: '210px', overflowY: 'scroll' }} >
                <p className='no-margin'><b>{this.state.name}</b></p>
                <p className='no-margin' style={{ marginBottom: '5px' }} >{this.state.description}</p>
                <div className='displayIF no-margin complexity-outside'>Best Complexity: O({this.state.best_complexity}), </div>
                <div className='displayIF no-margin complexity-outside'>Worst Complexity: O({this.state.worst_complexity}), </div>
                <div className='displayIF no-margin complexity-outside'>Average Complexity: O({this.state.average_complexity}), </div>
                <div className='displayIF no-margin complexity-outside'>Space Complexity: O({this.state.space_complexity})</div>
                <div className='chart' ref={this.myDiv}>
                    <div style={{ flexBasis: '50%'}}>
                        <p>Advantages</p>
                        <div className='horizontal-line' />
                        <ul>{this.state.advantages.map((val, index) => {
                            return <li key={index}>{val}</li>
                        })}</ul>
                    </div>
                    <div className='vertical-line' style={{ height: this.state.vlHeight }} />
                    <div style={{ flexBasis: '50%'}}>
                        <p>Disadvantages</p>
                        <div className='horizontal-line'/>
                        <ul>{this.state.disadvantages.map((val, index) => {
                            return <li key={index}>{val}</li>
                        })}</ul>
                    </div>
                </div>
                <p>When should you use {this.state.name}?</p>
                    <ul style={{ listStylePosition: 'inside' }} >{this.state.use.map((val, index) => {
                        return <li key={index}>{val}</li>
                    })}</ul>
                {this.state.sideNote ? <p>Note: {this.state.sideNote}</p> : ''}
            </div>
        )
    }
}

export default Description;