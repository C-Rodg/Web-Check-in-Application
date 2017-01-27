import React, { Component } from 'react';
import { connect } from 'react-redux';

const loginStyles = {
    maxWidth: 380,
    backgroundColor: "#fff"   
}

class Login extends Component {
    constructor(props) {
        super(props);

        let stationName = window.localStorage.getItem('stationName') || "";
        this.state = {
            stationName,
            errorText : ""
        };

        this.startLogin = this.startLogin.bind(this);
        this.updateStation = this.updateStation.bind(this);
    }

    startLogin() {
        if(!this.state.stationName) {
            this.setState({
                errorText : "A station name is required..."
            });
            return false;
        }

        // Acquire Seat and on success navigate to list page...
    }

    updateStation(ev) {
        this.setState({
			stationName: event.target.value
		});
		window.localStorage.setItem('stationName', (event.target.value) || "");
    }

    render() {
        return (
            <div className="login">
                <div className="title">
                    <h1>Welcome</h1>
                    <h5>Please enter a station name</h5>
                </div>
                <div className="card">
                    <form onSubmit={this.startLogin}>
                        <div className="card-content">
                        <div className="form-group station-name-group">
                            <label for="stationName">Station Name</label>
                            <input className="form-control" type="text"
                                placeholder="Enter a station name.." 
                                value={this.state.stationName}  
                                onChange={this.updateStation} 
                                autoFocus                                                                
                            />
                            { this.state.errorText ? 
                                <span className="station-required" >{this.state.errorText}</span>
                                :
                                ""
                            }                            
                        </div>	
                        </div>
                        <button className="btn-full btn-large btn-none b-t-light btn-col-green v-a-sub p-l-0" onClick={this.startLogin} type="submit">
                            Start
                        </button>			                        
                    </form>
                </div>
                <div className="validar-logo">
                    <img src={require('../static/validar-logo-original.png')} />
                </div>
            </div>

        );
    }
}

export default Login;