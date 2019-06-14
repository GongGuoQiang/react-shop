import React, { Component } from 'react'
import {Route,Switch} from 'react-router-dom'
import Index from './page/index.js'

class Routes extends Component {
    componentDidMount(){
        //let vc = new VConsole();
    }
    render(){
        return (
            <div style={{height:"100%",overflow: 'hidden'}}>
                <Switch>
                    <Route component={Index}></Route>
                </Switch>
            </div>
        )
    }
}

export default Routes