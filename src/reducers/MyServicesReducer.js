const INITIAL_STATE = { myServices : [], loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getMyServices':
            return {
                myServices: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
