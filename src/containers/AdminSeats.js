import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getSeatUsage, releaseOtherSeat, releaseThisSeat, acquireSeat, setSeatGuid } from '../actions/cc_settings';
import { sendNotification } from '../actions/cc_registrant';

import SeatTile from '../components/SeatTile';

class AdminSeats extends Component {
    constructor(props) {
        super(props);
        this.handleRemoveSeat = this.handleRemoveSeat.bind(this);
        this.acquireNewSeat = this.acquireNewSeat.bind(this);

        this.state = {
            inactiveOpen : false
        };
    }   

    componentDidMount() {
        console.log("Component Mounted, getSeatUsage()");
        this.props.getSeatUsage();
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        console.log("END OF NEXTPROPS");
        //if (nextProps.seatGuid && nextProps.seats.ActiveSeats && (nextProps.seats.ActiveSeats.length !== this.props.seats.ActiveSeats.length)) {
        if (nextProps.seats.SeatsUsed !== this.props.seats.SeatsUsed) {
            console.log("Receiving props and SeatsUsed have changed");
            nextProps.getSeatUsage();
        }
    }

    handleRemoveSeat(guid, currentDevice) {
        if (currentDevice) {
            this.props.releaseThisSeat(guid);
        } else {
            this.props.releaseOtherSeat(guid);
        }
    }

    acquireNewSeat() {
        let station = window.localStorage.getItem('stationName');
        acquireSeat(station).then((response) => {
            if(response.data.d.StationGuid) {
                this.props.setSeatGuid(response.data.d.StationGuid);
                this.props.getSeatUsage();
            } else {
                this.props.sendNotification("We are unable to provide this device with a seat at this time.", false);
            }        
        })
        .catch((err) => {
            this.props.sendNotification("We are unable to provide this device with a seat at this time.", false);
        });
    }

    renderSeats() {
        if (!this.props.seatGuid || !this.props.seats.ActiveSeats) {
            return (
                 <div className="text-center" >
                    <button className="btn-flat border-0 inline-btn" onClick={this.acquireNewSeat}><span>Acquire New Seat?</span></button>
                </div>
            );
        }
        return (
            <div>
                 <div className="active-seats clearfix">
                    <div className="col-xs-12 seats-title">Active Seats ({this.props.seats.ActiveSeats.length})</div>
                    {this.props.seats.ActiveSeats.map((seat) => <SeatTile {...seat} active={true} removeActiveSeat={this.handleRemoveSeat} currentSeat={this.props.seatGuid} />)}
                </div>
                <div className="inactive-seats clearfix">
                    <div className="col-xs-12 seats-title">Inactive Seats ({this.props.seats.InactiveSeats.length})<span className="expand-btn" onClick={() => this.setState({inactiveOpen: !this.state.inactiveOpen})}><i className="material-icons">{this.state.inactiveOpen ? 'expand_less' : 'expand_more'}</i></span></div>
                    {
                        this.state.inactiveOpen ? 
                        <div>{this.props.seats.InactiveSeats.map((seat) => <SeatTile {...seat} active={false} currentSeat={this.props.seatGuid} />)}</div> :
                        ""
                    }                 
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="admin-seats clearfix">
                <div className="seat-count col-xs-12 text-center clearfix">
                    <div>
                        <span className="number">{this.props.seats.SeatsUsed}/{this.props.seats.MaxSeats}</span><span className="number-title"> Seats Used</span>
                    </div>                   
                    <div>
                        <em>Note:  Removing an active seat will cause that specific device to no longer function</em>
                    </div>
                </div> 
                <div className="seats-box clearfix">
                    {this.renderSeats()}
                </div>                       
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        seatGuid : state.settings.seatGuid,
        seats : state.settings.seats
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSeatUsage : () => dispatch(getSeatUsage()),
        releaseOtherSeat : (guid) => dispatch(releaseOtherSeat(guid)),
        releaseThisSeat : () => dispatch(releaseThisSeat()),
        sendNotification : (msg, isSuccess) => dispatch(sendNotification(msg, isSuccess)),
        setSeatGuid : (guid) => dispatch(setSeatGuid(guid))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminSeats);