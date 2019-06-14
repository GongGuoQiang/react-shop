import React, { Component } from 'react';
class location extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
componentDidMount() {
        var iframe = document.getElementById('test').contentWindow;
        document.getElementById('test').onload = function(){
            iframe.postMessage('hello','https://m.amap.com/picker/');
        };
        window.addEventListener("message", function(e){
            alert('您选择了:' + e.data.name + ',' + e.data.location)
        }, false);
}


    render() {
        return (
            <div className="location">
                <iframe id="test" src='https://m.amap.com/picker/?center=116.3972,39.9696&key=608d75903d29ad471362f8c58c550daf'></iframe>
            </div>
        );
    }
}

export default location;