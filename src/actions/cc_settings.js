import { axios } from './utilities_httpRequest';

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
				dispatch(getEventInformationSuccess(response));
			})
			.catch((err) => {
				dispatch(getEventInformationError(err));
			});
	};
}

function getEventInformationSuccess(response) {
	console.log(response);
	return {
		type : GET_EVENT_INFORMATION_SUCCESS,
		payload : response.data.d
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