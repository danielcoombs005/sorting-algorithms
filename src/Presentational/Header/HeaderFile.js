import React from 'react';
import './../Styles/HeaderFile.css';

class HeaderFile extends React.Component {
    constructor() {
        super();
    }

    onChangeBarCount = (e) => {
        this.props.onChangeBarCount(e.target.value);
    }
    
    onChangeSpeed = (e) => {
        this.props.onChangeSpeed(e.target.value);
    }

    onSelectSort = (e) => {
        this.props.onSelectSort(e.target.value);
    }

    render() {
        return (
            <div className='header'>
                <div style={{ width: '20%', margin: 'auto', display: 'flex' }}>
                    <div style={{ display: 'inline' }}><input type='number' onChange={this.onChangeBarCount} value={this.props.bars}/><p>items</p></div>
                    <div style={{ display: 'inline' }}><input type='number' onChange={this.onChangeSpeed} value={this.props.speed}/><p>milliseconds</p></div>
                    <div style={{ display: 'inline' }}>
                        <select onChange={this.onSelectSort} value={this.props.sortName}>
                            <option value='Bubble Sort'>Bubble Sort</option>
                            <option value='Cocktail Sort'>Cocktail Sort</option>
                            <option value='Heapsort'>Heapsort</option>
                            <option value='Insertion Sort'>Insertion Sort</option>
                            {/*<option value='Merge Sort'>Merge Sort</option>*/}
                            <option value='Selection Sort'>Selection Sort</option>
                            <option value='Shell Sort'>Shell Sort</option>
                        </select>
                    </div>
                </div>
            </div>
        )
    }
}

export default HeaderFile;