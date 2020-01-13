import React from 'react';
import './../Styles/Graph.css';

export default class Graph extends React.Component {
    constructor() {
        super();
        this.state = {
            bars: 10,
            graphArr: [],
            tempStateArr: []
        }
    }

    componentDidUpdate = () => {
        if (this.props.bars !== this.state.bars && this.props.bars > 0) {
            this.CompleteChangeColor(this.props.barArr, '#3399FF');
            this.setState({ bars: this.props.bars });
        }
    }

    Bar = (prp) => {
        let height = prp.height;
        let index = prp.index;
        let dynStyle = {
            width: `${100 / this.props.bars}%`,
            height: `${height / this.props.bars * 400}px`,
            backgroundColor: '#3399FF'
        }
        return (
            <div className='bar' id={index} style={dynStyle}/>
        )
    }

    SingleGraph = () => {
        let arr = this.props.barArr;
        return (
            <div className='graph'>
                {arr.map((height, index) => {
                    return <this.Bar key={height} height={height} index={index}/>
                })}
            </div>
        )
    }

    render() {
        const isVisible = this.props.sortName === 'Merge Sort' ? 'none' : '';
        return (
            <div>
                <this.SingleGraph />
                <p>{this.props.sortName}</p>
                <button onClick={this.Shuffle}>Shuffle</button>
                <button onClick={this.Sort}>Sort</button>
                {/*<button style={{ display: isVisible }} onClick={this.SortOnce}>Sort Once</button>*/}
                <p>Sorted in {this.props.time} seconds.</p>
                <p>Sorted in {this.props.swaps} swaps.</p>
                <p>Compared {this.props.compared} values.</p>
            </div>
        )
    }

    /*************START METHOD LOGIC*********************/
    /**
     * Shuffles array values to prepare for sort.
     */
    Shuffle = async () => {
        let arr = this.props.barArr;
        this.CompleteChangeColor(arr, '#3399FF');
        let size = arr.length;
        for (let i = 0; i < arr.length * 5; i++) {
            const rNumOne = Math.floor(Math.random() * Math.floor(size));
            const rNumTwo = Math.floor(Math.random() * Math.floor(size));
            let temp = arr[rNumOne];
            let temp2 = arr[rNumTwo];
            arr[rNumTwo] = temp;
            arr[rNumOne] = temp2;
            this.props.onChangeArray(arr);
            if (size <= 50) await new Promise(res => setTimeout(res, 1));
        }
    }

    /**
     * Changes color of single bar to provide focus on compared objects.
     */
    ChangeColorSingle = (id, color) => {
        document.getElementById(id).style.backgroundColor = color;
    }

    /**
     * Changes color of two bars to provide focus on compared objects.
     */
    ChangeColor = (id1, id2, color) => {
        document.getElementById(id1).style.backgroundColor = color;
        document.getElementById(id2).style.backgroundColor = color;
    }

    /**
     * Changes color of all bars to show complete change of environment.
     * Example: when all bars are sorted, all bars will turn green.
     */
    CompleteChangeColor = (arr, color) => {
        for (let i = 0; i < arr.length; i++) {
            document.getElementById(i).style.backgroundColor = color;
        }
    }

    /**
     * Delays further action by set time.
     * Note: used only for demonstrational purpose.
     */
    Delay = (amount = this.props.speed) => {
        return new Promise((res) => {
            setTimeout(res, amount);
        })
    }

    /**
     * Performs any updates when two values will be swapped.
     */
    SortActions = async (val1, val2, arr, timerStart, swapCount) => {
        this.Swap(val1, val2, arr);
        this.UpdateTimer(timerStart);
        this.props.onChangeSwapCount(swapCount);
    }

    /**
     * Swaps elements in array.
     * Calls to update array.
     */
    Swap = (val1, val2, arr) => {
        let temp = arr[val1];
        let temp2 = arr[val2];
        arr[val1] = temp2;
        arr[val2] = temp;
        this.props.onChangeArray(arr)
    }

    /**
     * Calls to update compared count.
     */
    UpdateComparedCount = (comparedCount) => {
        comparedCount++;
        this.props.onChangeComparisonCount(comparedCount);
    }

    /**
     * Updates time passed for sort.
     */
    UpdateTimer = (timerStart) => {
        const time = new Date() - timerStart;
        this.props.onChangeTimer(time);
    }
    /*************END METHOD LOGIC***********************/

    /*************START SORTING ALGORITHMS***************/
    Sort = () => {
        this.CompleteChangeColor(this.props.barArr, '#3399FF');
        switch (this.props.sortName) {
            case 'Bubble Sort':
                this.BubbleSort();
                break;
            case 'Insertion Sort':
                this.InsertionSort();
                break;
            case 'Merge Sort':
                this.setState({ tempStateArr: [] });
                this.MergeSort(this.props.barArr, 0);
            case 'Selection Sort':
                this.SelectionSort();
            case 'Shell Sort':
                this.ShellSort();
            default:
                break;
        }
    }

    SortOnce = () => {
        switch (this.props.sortName) {
            case 'Bubble Sort':
                this.BubbleSortOnce();
                break;
            case 'Insertion Sort':
                this.InsertionSortOnce(0);
            case 'Selection Sort':
                this.SelectionSortOnce(0);
            default:
                break;
        }
    }

    /**
    * Sorts by swapping any consecutive pairs if the first value is greater than second value.
    * Checks final array to verify it is sorted.
    * [1 3 2]
    * [1 3 2]
    * [1 2 3]
    * [1 2 3] (checks, passed)
    */
    BubbleSort = async () => {
        let timerStart = new Date();
        let swapCount = 1;
        let comparedCount = 1;
        let arr = this.props.barArr;
        const size = arr.length;
        let isSorted = false;
        for (let j = 0; j < size; j++) {
            isSorted = true;
            for (let i = 0; i < size - 1; i++) {
                this.ChangeColor(i, i+1, 'red');
                await this.Delay();
                if (arr[i] > arr[i + 1]) {
                    isSorted = false;
                    this.SortActions(i, i+1, arr, timerStart, swapCount++);
                    await this.Delay();
                }
                this.ChangeColor(i, i+1, '#3399FF');
                this.UpdateComparedCount(comparedCount++);
            }
            if (isSorted) break;
        }
        this.CompleteChangeColor(arr, '#00ff00');
    }

    /**
     * Sorts by taking following element and places it as far left as possible:
     * [3 1 4 2] --> check for 3
     * [1 3 4 2]
     * [1 3 4 2] --> check for 4
     * [1 3 2 4] --> check for 2
     * [1 2 3 4]
     */
    InsertionSort = async (arr = this.props.barArr) => {
        let timerStart = new Date();
        let swapCount = 1;
        let comparedCount = 1;
        const size = arr.length;
        for (let i = 1; i < size; i++) {
            this.UpdateComparedCount(comparedCount++);
            this.ChangeColor(i, i-1, 'red');
            await this.Delay();
            let j = i;
            while (true) {
                if (j !== i) {
                    this.ChangeColor(j, j-1, 'red');
                    await this.Delay();
                    this.UpdateComparedCount(comparedCount++);
                }
                if (!(arr[j] < arr[j-1]) || j === 0) {
                    this.ChangeColor(j, j-1, '#3399FF');
                    break;
                }
                this.SortActions(j, j-1, arr, timerStart, swapCount++);
                await this.Delay();
                this.ChangeColor(j, j-1, '#3399FF');
                if (j > 1) j--;
            }
            this.ChangeColor(i, i-1, '#3399FF');
        }
        this.CompleteChangeColor(arr, '#00ff00');
    }

    /**
     * Sorts by dividing array recursively into lesser arrays until all values are in individual arrays.
     * Then, compares all values and rejoins arrays into larger arrays.
     * [3 1 4 5 2]
     * [3 1 4] [5 2]
     * [3 1] [4] [5] [2]
     * [3] [1] [4] [5] [2]
     * [1 3] [4] [2 5] (combing)
     * [1 3 4] [2 5]
     * [1 2 3 4 5]
     * 
     * (NOTE: THE ACTUAL ALGORITHM RELIES ON RECURSION! THIS ALGORITHM HAS BEEN MODIFIED FOR DEMONSTRATIONAL PURPOSES.)
     */
    MergeSort = async (arr, stage) => {
        this.MergeSort_Breakdown(arr, stage);
        await this.Delay(3000);
        console.log(this.state.tempStateArr);
    }

    MergeSort_Breakdown = async (arr, stage) => {
        //STEP 1A: BREAK DOWN ARRAY INTO SIZE ONE ARRAY FOR ALL VALUES
        let size = arr.length;
        if (size <= 1) {
            //returns smallest array and stage level
            return {arr: arr, stage: stage};
        };
        let halfSize = Math.ceil(size / 2);
        let arrLeft = arr.slice(0, halfSize);
        let left = this.MergeSort_Breakdown(arrLeft, stage+1);
        let arrRight = arr.slice(halfSize);
        let right = this.MergeSort_Breakdown(arrRight, stage+1);
        //STEP 1B: STORE PROGRESS TO MIMIC PROPER ARRAY SIZES
        let tempArr = this.state.tempStateArr;
        tempArr.push(left);
        tempArr.push(right);
        this.setState({ tempStateArr: tempArr });
    }

    MergeSort_Build = async (stateArr) => {
        //STEP 1C: SEPARATE PROCESS BY STAGE
        //get number of stages
        let tempArr = [];
        let maxVal = 0;
        for (let i = 0; i < stateArr.length; i++) {
            if (stateArr.stage > maxVal) maxVal = stateArr.stage;
        }
        //go through each stage
        for (let i = maxVal; i >= 0; i--) {
            tempArr = [];
            for (let i = 0; i < stateArr.length; i++) {
                if (stateArr.stage === i) tempArr.push(stateArr);
            }
            //STEP 2A: SORT ONCE
            //STEP 2B: COMBINE INTO ONE TEMPORARY ARRAY
            //STEP 2C: SAVE TEMPORARY ARRAY
        }
    }





    TEMP_MergeSort = async (arr, stage) => { //separate into two different arrays for visual purpose? (NEED TO UPDATE!!!!!)
        debugger;
        //TODO:
        //STEP 1A: BREAK DOWN ARRAY INTO SIZE ONE ARRAY FOR ALL VALUES
        let timerStart = new Date();
        let time = 0;
        let swapCount = 1;
        let comparedCount = 1;
        let size = arr.length;
        if (size <= 1) {
            return {arr, stage};
        }
        let halfSize = Math.ceil(size / 2);
        let arrLeft = arr.slice(0, halfSize);
        let left = this.MergeSort(arrLeft, stage+1);
        let arrRight = arr.slice(halfSize);
        let right = this.MergeSort(arrRight, stage+1);
        //STEP 1B: STORE PROGRESS TO MIMIC PROPER ARRAY SIZES



        /*let sortedArray = [];
        for (let i = 0; i < size; i++) {
            if (left.length === 0 || right.length === 0) {
                if (left.length === 0 && right.length === 0) {
                    break;
                } else if (left.length === 0) {
                    for (let j = 0; j < right.length; j++) {
                        sortedArray.push(right[j]);
                    }
                    break;
                } else {
                    for (let j = 0; j < left.length; j++) {
                        sortedArray.push(left[j]);
                    }
                    break;
                }
            } else {
                if (left[0] < right[0]) {
                    sortedArray.push(left[0]);
                    left = left.splice(1);
                } else {
                    sortedArray.push(right[0]);
                    right = right.splice(1);
                }
            }
        }
        this.props.onChangeArray(sortedArray);
        time = new Date() - timerStart;
        this.props.onChangeTimer(time);
        this.props.onChangeSwapCount(swapCount++);
        await this.Delay();
        return sortedArray;*/
    }

    /**
     * Sorts by taking each element, comparing to all elements, and selecting the minimum value.
     * The other element which was compared to all elements is swapped to where the minimum value was.
     * [2 5 4 1 3] -> selects 1
     * [1 5 4 2 3] -> selects 2
     * [1 2 4 5 3] -> selects 3
     * [1 2 3 5 4] -> selects 4
     * [1 2 3 4 5] complete
     */
    SelectionSort = async () => { //double check compared count?
        let timerStart = new Date();
        let swapCount = 1;
        let comparedCount = 1;
        let arr = this.props.barArr;
        let size = arr.length;
        let minVal = 1;
        for (let i = 0; i < size - 1; i++) {
            this.ChangeColorSingle(i, 'blue');
            minVal = i+1;
            for (let j = i + 2; j < size; j++) {
                this.ChangeColor(j, minVal, 'red');
                this.UpdateComparedCount(comparedCount++);
                await this.Delay();
                this.ChangeColor(j, minVal, '#3399FF');
                if (j === i + 1) {
                    minVal = j;
                }
                else if (arr[j] < arr[minVal]) {
                    minVal = j;
                } else {
                    continue;
                }
            }
            this.ChangeColor(i, minVal, 'red');
            await this.Delay();
            if (arr[i] > arr[minVal]) {
                this.SortActions(i, minVal, arr, timerStart, swapCount++);
                await this.Delay();
            }
            this.ChangeColor(i, minVal, '#3399FF');
            this.UpdateComparedCount(comparedCount++);
        }
        this.CompleteChangeColor(arr, '#00ff00');
    }

    /**
     * Sorts by taking gapped values and, similar to Insertion Sort, adjusts lower values accordingly within the subgroup.
     * This will repeat with smaller gaps until an Insertion Sort is utilized.
     * [7 1 4 8 3] -> gap is floor of (n/2), which is 2 in this case
     * [7 1 4 8 3] -> compare 7 and 4
     * [4 1 7 8 3]
     * [4 1 7 8 3] -> compare 1 and 8
     * [4 1 7 8 3] -> compare 7 and 3
     * [4 1 3 8 7] -> compare 4 and 3
     * [3 1 4 8 7] -> divide previous gap by 2, and take floor value, which is 1 in this case
     * [1 3 4 7 8] -> repeat until the gap is 0
     */
    ShellSort = async (arr = this.props.barArr) => { //update comments?
        let timerStart = new Date();
        let swapCount = 1;
        let comparedCount = 0;
        let gap = Math.floor(arr.length/2);
        while (gap > 0) {
            for (let i = gap; i < arr.length; i++) {
                let iValue = i;
                while (iValue - gap >= 0) {
                    this.UpdateComparedCount(comparedCount++);
                    this.ChangeColor(iValue, iValue - gap, 'red');
                    await this.Delay();
                    if (arr[iValue - gap] > arr[iValue]) {
                        this.SortActions(iValue, iValue - gap, arr, timerStart, swapCount++);
                        await this.Delay();
                        this.ChangeColor(iValue, iValue - gap, '#3399FF');
                        iValue = iValue - gap;
                    } else {
                        this.ChangeColor(iValue, iValue - gap, '#3399FF');
                        iValue = -1;
                    }
                }
            }
            gap = Math.floor(gap/2);
        }
        this.CompleteChangeColor(arr, '#00ff00');
    }
    /*************END SORTING ALGORITHMS*****************/

}