import axios from 'axios';

//------------------------- TYPES -------------------------//

export const TURN_CAMERA_ON_SUCCESS = 'TURN_CAMERA_ON_SUCCESS';
export const TURN_CAMERA_ON_ERROR = 'TURN_CAMERA_ON_ERROR';

export const TURN_CAMERA_OFF_SUCCESS = 'TURN_CAMERA_OFF_SUCCESS';
export const TURN_CAMERA_OFF_ERROR = 'TURN_CAMERA_OFF_ERROR';

//-------------------- ACTION CREATORS --------------------//

// Turn Camera On
export function turnCameraOn(data) {
	return function(dispatch) {
		axios.post(`https://localhost/ShowBarCodeReader`, "ON;X:80;Y:175;W:180;H:180")
			.then((response) => {				
				dispatch(turnCameraOnSuccess(response));
			})
			.catch((err) => {				
				dispatch(turnCameraOnError(err));
			});
	};
}

function turnCameraOnSuccess(response) {
	alert(response);
	return {
		type : TURN_CAMERA_ON_SUCCESS,
		payload : response
	};
}

function turnCameraOnError(err) {
	alert(err);
	return {
		type: TURN_CAMERA_ON_ERROR,
		payload : err
	};
}