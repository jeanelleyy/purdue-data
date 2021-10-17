import React, {useState} from 'react';

function Counting(props){

    const [fragile_count, setFragile] = useState(0);
    const [normal_count, setNormal] = useState(0);
    const [oversize_count, setOversize] = useState(0);

    function addFragile() {
        if(!props.mDone){
            alert("Please select number of objects.");
        }
        else{
            setFragile(fragile_count+1);
            props.completed(true);
            console.log("stop counting");
            props.result({...props.result, choice:"Fragile", count: fragile_count+1, duration: Date.now() - props.time});
        }
    }

    function emptyFragile(){
        setFragile(0);
        props.result({...props.result, count:0});
    }

    function addNormal() {
        if(!props.mDone){
            alert("Please select number of objects.");
        }
        else{
            setNormal(normal_count+1);
            props.completed(true);
            console.log("stop counting");
            props.result({...props.result, choice:"Normal", count:normal_count+1, duration: Date.now() - props.time});
        }
    }

    function emptyNormal() {
        setNormal(0);
        props.result({...props.result, count:0});
    }

    function addOversize() {
        if(!props.mDone){
            alert("Please select number of objects.");
        }
        else{
            setOversize(oversize_count+1);
            props.completed(true);
            console.log("stop counting");
            props.result({...props.result, choice:"Oversize", count:oversize_count+1, duration: Date.now() - props.time});
        }
    }

    function emptyOversize() {
        setOversize(0);
        props.result({...props.result, count:0});
    }

    return(
        <div className="counting_style">
            <h1>Fragile</h1>
            <h1>{fragile_count}</h1>
            <div className="count_btns">
                <button onClick={addFragile}><h2>Add</h2></button>
                <button onClick={emptyFragile}><h2>New Bin</h2></button>
            </div>
            
            <h1>Normal</h1>
            <h1>{normal_count}</h1>
            <div className="count_btns">
                <button onClick={addNormal}><h2>Add</h2></button>
                <button onClick={emptyNormal}><h2>New Bin</h2></button>
            </div>
            <h1>Oversize</h1>
            <h1>{oversize_count}</h1>
            <div className="count_btns">
                <button onClick={addOversize}><h2>Add</h2></button>
                <button onClick={emptyOversize}><h2>New Bin</h2></button>
            </div>
        </div>
        )
    };


export default Counting;