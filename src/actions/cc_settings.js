import { axios } from './utilities_httpRequest';
import * as moment from 'moment';

//------------------------- TYPES -------------------------//

export const GET_REGISTRATION_STATS_SUCCESS = 'GET_REGISTRATION_STATS_SUCCESS';
export const GET_REGISTRATION_STATS_ERROR   = 'GET_REGISTRATION_STATS_ERROR';

export const GET_EVENT_INFORMATION_SUCCESS = 'GET_EVENT_INFORMATION_SUCCESS';
export const GET_EVENT_INFORMATION_ERROR = 'GET_EVENT_INFORMATION_ERROR';

export const GET_EVENT_SETTINGS_SUCCESS = 'GET_EVENT_SETTINGS_SUCCESS';
export const GET_EVENT_SETTINGS_ERROR = 'GET_EVENT_SETTINGS_ERROR';


//-------------------- ACTION CREATORS --------------------//

export function getRegistrationStats(data) {
	return function(dispatch) {
		axios.post(`methods.asmx/GetRegistrationStats`, {})
			.then((response) => {
				dispatch(getRegistrationStatsSuccess(response));
			})
			.catch((err) => {
				dispatch(getRegistrationStatsError(err));
			});
	};
}

function getRegistrationStatsSuccess(response) {
	return {
		type : GET_REGISTRATION_STATS_SUCCESS,
		payload : response.data.d
	};
}

function getRegistrationStatsError(err) {
	return {
		type : GET_REGISTRATION_STATS_ERROR,
		payload : err
	};
}

export function getEventInformation(data) {
	return function(dispatch) {
		axios.post(`methods.asmx/GetEventInformation`, {})
			.then((response) => {
				dispatch(getEventInformationSuccess(response.data.d.EventInformation));
			})
			.catch((err) => {
				dispatch(getEventInformationError(err));
			});
	};
}

function getEventInformationSuccess(response) {
	let eventInfo = Object.assign({}, {
		eventName : response.EventName
	});

	// Convert location to full string
	let locArr = [response.City, response.StateProvince, response.Country];
	eventInfo.Location = locArr.filter((str) => { return str; }).join(', ');

	eventInfo.eventStartDate = "";
	if(response.hasOwnProperty('StartDate') && response.StartDate !== null && response.StartDate.indexOf("/Date") === 0 ){
		let sDate = response.StartDate.slice(6, -2);
		eventInfo.eventStartDate = moment(sDate, 'x').format("MM/DD/YY");
	}

	return {
		type : GET_EVENT_INFORMATION_SUCCESS,
		payload : eventInfo
	};
}

function getEventInformationError(err) {
	return {
		type : GET_EVENT_INFORMATION_ERROR,
		payload : err
	};
}

export function getEventSettings(data) {
	return function(dispatch) {
		axios.post(`methods.asmx/GetEventSettings`, {})
			.then((response) => {
				dispatch(getEventSettingsSuccess(response));
			})
			.catch((err) => {
				dispatch(getEventSettingsError(err));
			});
	};
}

function getEventSettingsSuccess(response) {
	return {
		type : GET_EVENT_SETTINGS_SUCCESS,
		payload : response.data.d
	};
}

function getEventSettingsError(err) {
	return {
		type : GET_EVENT_SETTINGS_ERROR,
		payload : err
	};
}