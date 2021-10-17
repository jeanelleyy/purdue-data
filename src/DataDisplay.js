import React, { useEffect, useState} from 'react';
import axios from 'axios';
import CsvDownload from 'react-json-to-csv';

function DataDisplay(props){
    const [mydata,setData] = useState(null);
    const [pwd, setPwd] = useState(false);

    useEffect(() => {
        console.log("called effect");
        getData();
    }, []);
    
    async function getData(){
        await axios.get(`https://wix-server.herokuapp.com/`)
        .then(res => {
            console.log("res", res);
            console.log("res.data", res.data);
    
            setData(res.data);
  
        });
    };

    function askPwd(){
        var name = prompt('Enter password:','');
        if (name == "shree") {
            setPwd(true);
        }
    }

    function showData(){
        return (
            <div>
                <h2>List of Available Data:</h2>
                {mydata && mydata.map(user => 
                    <div className="user_data">
                        <CsvDownload 
                            filename={`${user.user_id}.csv`} 
                            data={user.rows}>{user.user_id}
                        </CsvDownload>
                        <br></br>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            {pwd ? showData() : askPwd()}  
        </div>
         
    );
};

export default DataDisplay;