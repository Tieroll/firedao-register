const reducer = (state, action) => {
    switch (action.type) {
        case "CONNECT_INIT":
            return {...state, apiState: "CONNECT_INIT"};
        case "CONNECT":
            return {...state, api: action.payload, apiState: "CONNECTING"}
        case "CONNECT_SUCCESS":
            return {...state, apiState: "READY"}
        case 'CONNECT_ERROR':
            return {...state, apiState: 'ERROR', apiError: action.payload};
        case 'SET_ACCOUNT':
            return {...state, account: action.payload};
        case "SET_NETWORKID":
            return {...state, networkId: action.payload};
    }
}
export default reducer
