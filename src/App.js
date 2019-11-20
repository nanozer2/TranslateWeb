import React, { Component } from 'react';
import logo from './logo.svg';
import NumberForm from './NumberForm';
import './App.css';

class App extends Component {

    constructor(props){
        super(props);
        this.state={
            page:[],
        }
    }
    componentWillMount(){
        var page =[];
        page.push(<NumberForm appContext={this} key={"NumberForm-screen"}/>);
        this.setState({
            page:page
        })
    }
    render() {
        return (
            <div className="App">
                <div >
                    <img src={logo} className="App-logo" alt="logo"/>
                    {this.state.page}
                </div>
            </div>
        )
    }
}

export default App;
