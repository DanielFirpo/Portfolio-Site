export const SET_AUTH = "SET_AUTH";
export const SET_USER_INFO = "SET_USER_INFO";

export const setAuth = (token, userID) => dispatch => {

    dispatch({ type: SET_AUTH, payload: {token: token, userID: userID} });

}

export const setUserInfo = (userInfo) => dispatch => {

    dispatch({ type: SET_USER_INFO, payload: userInfo });

}