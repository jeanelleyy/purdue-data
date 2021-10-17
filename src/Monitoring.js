import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class Monitoring extends React.Component{

    constructor(props){
        super(props);
        let addImgs = require.context('./Additional_Screening', true, /\.jpg$/);
        this.addimgs = addImgs.keys().map(path=>{return {path, file: addImgs(path)}});

        this.state = { 
            select: false,
            button0: false,
            button1: false,
            button2: false,
            button3: false,
            button4: false,
            isAddScreen: false,
            addImg: "",
            wrong_count:0,
            count: -1,
            duration:-1
        }
    }
    
    clicked(number){
        if(!this.props.timerOk){
            alert("Please sort bag into a bin.");
            return;
        }
        this.setState({select:true});
        const duration = Date.now() - this.props.time;
        console.log("stop monitoring");
        switch(number){
            case 0:
                this.setState({button0:true});
                this.setState({button1:false});
                this.setState({button2:false});
                this.setState({button3:false});
                this.setState({button4:false});
                this.setState({count:0, duration:duration});
                break;
            case 1:
                this.setState({button0:false});
                this.setState({button1:true});
                this.setState({button2:false});
                this.setState({button3:false});
                this.setState({button4:false});
                this.setState({count:1, duration:duration});
                break;
            case 2:
                this.setState({button0:false});
                this.setState({button1:false});
                this.setState({button2:true});
                this.setState({button3:false});
                this.setState({button4:false});
                this.setState({count:2, duration: duration});
                break;
            case 3:
                this.setState({button0:false});
                this.setState({button1:false});
                this.setState({button2:false});
                this.setState({button3:true});
                this.setState({button4:false});
                this.setState({count:3, duration: duration});
                break;
            case 4:
                this.setState({button0:false});
                this.setState({button1:false});
                this.setState({button2:false});
                this.setState({button3:false});
                this.setState({button4:true});
                this.setState({count:4, duration: duration});
                break;
            default:
                break;
        }

        //additional screening
        if(!this.props.addDone && this.props.trials%4 == 0){
            
            /*
            this.changeImg();
            this.setState({isAddScreen:true});
            this.props.setAddStart(true);
            */
            
            // uncomment to disable additional screening
            this.props.result({count:number, duration: duration, wrong: -1});
            console.log("start counting");
            this.props.setMTime(Date.now());
            this.props.completed(true);
            
        }
        else{
            this.props.result({count:number, duration: duration, wrong: -1});
            console.log("start counting");
            this.props.setMTime(Date.now());
            this.props.completed(true);
        }

        
    }

    isClicked(count, btn){
        if (this.props.weaponCount == count && !this.state.select && this.props.highlightOk){
            return "highlightRed";
        }
        return btn ? "clickedBtn" : "unclickedBtn";
    }

    closePopup(){
        if(this.props.correctAdd == this.state.addImg){
            this.setState({isAddScreen:false});
            this.props.setAdd(true);
            this.props.result({count:this.state.count, duration:this.state.duration, wrong: this.state.wrong_count});
            this.props.setMTime(Date.now());
            console.log("start counting");
            this.props.completed(true);
        }
        else{
            alert("Try again");
            this.setState({wrong_count:this.state.wrong_count+1});
        }
        
    }

    changeImg(){
        let pattern_index = Math.round(Math.random() * 3);    
        while(this.state.addImg == this.addimgs[pattern_index].file){
            pattern_index = Math.round(Math.random() * 3);
        }
        this.setState({addImg:this.addimgs[pattern_index].file});
    }

    render(){
        
        return(
            <div className="monitoring_style">
                <h2>Select number of objects:</h2>
                <button className={this.isClicked(0, this.state.button0)} onClick={() => this.clicked(0)}><h2>0</h2></button>
                <button className={this.isClicked(1, this.state.button1)} onClick={() => this.clicked(1)}><h2>1</h2></button>
                <button className={this.isClicked(2, this.state.button2)} onClick={() => this.clicked(2)}><h2>2</h2></button>
                <button className={this.isClicked(3, this.state.button3)} onClick={() => this.clicked(3)}><h2>3</h2></button>
                <button className={this.isClicked(4, this.state.button4)} onClick={() => this.clicked(4)}><h2>4</h2></button>
                <Popup open={this.state.isAddScreen} closeOnDocumentClick={false} modal>
                    <div className="modal add-popup">
                        <h2>Please do additional screening on this baggage.</h2>
                        <img src={this.state.addImg}/>
                        <div>
                            <button onClick={this.changeImg.bind(this)}><h2>Next</h2></button>
                            <button onClick={this.closePopup.bind(this)}><h2>Finish</h2></button>
                        </div>
                    </div>
                </Popup>
            </div>
            
        )
    }
};


export default Monitoring;