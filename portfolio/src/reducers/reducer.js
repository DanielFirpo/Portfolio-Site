import {
    SET_AUTH, SET_USER_INFO
} from "../actions/actions"

let initialState = {
    auth: {
        token: undefined,
        userID: undefined
    },
    userInfo: {
        id: undefined,
        login: undefined,
        display_name: undefined,
        type: undefined,
        broadcaster_type: undefined,
        description: undefined,
        profile_image_url: undefined,
        offline_image_url: undefined,
        view_count: undefined,
        created_at: undefined
    }
}

function reducer(state = initialState, action) {
    console.log(
        "Reducer working, current action: ",
        action.type,
        " Payload: ",
        action.payload
    );

    switch (action.type) {
        case SET_AUTH:
            return {
                ...state,
                auth: {
                    token: action.payload.token,
                    userID: action.payload.userID
                }
            }
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: {...action.payload}
            }
        default:
            console.log(`\nUnknown action type:\n${action.type}`);
            return {
                ...state
            };
    }
}

export default reducer;