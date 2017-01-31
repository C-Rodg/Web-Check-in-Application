import React from 'react';
const moment = require('moment');

const ActiveSeatTile = (props) => {
    let stationEx = props.ClientInfoXml.match("<stationName>(.*)</stationName>");
    let name = stationEx[1];
    let currentDevice = props.currentSeat === props.ClientGuid ? true : false;
    return (
        <div className="seat-block col-xs-12 col-sm-6">
            <div className={"seat-block-container " + (props.active ? "" : "seat-block-inactive ") + (currentDevice ? "seat-current" : "")}>
                <div className="seat-text-container">
                    <div className="seat-block-title">{name} {(currentDevice && props.active) ? <em>(this device)</em> : ""}</div>
                    <div className="seat-block-sub">{props.ClientGuid}</div>
                    {
                        props.active ? 
                         <div className="seat-block-sub">{moment(props.AcquiredDateTime, 'YYYY-MM-DDTHH:mm:ss.SSSSSS').format('MMM Do, YYYY, h:mm a')}</div> :
                          <div className="seat-block-sub">{moment(props.ReleasedDateTime, 'YYYY-MM-DDTHH:mm:ss.SSSSSS').format('MMM Do, YYYY, h:mm a')}</div>
                    }
                   
                </div>
                <div className="seat-icon-container" onClick={() => props.removeActiveSeat(props.SeatGuid, currentDevice)}>
                    <i className="material-icons">close</i>
                </div>
            </div>
        </div>
    );
};

export default ActiveSeatTile;