const INITIAL_STATE = { statistics :{}, loader : false };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'getStatistics':
            return {
                statistics: action.payload.data,
                loader: action.payload.success
            };
        default:
            return state;
    }
};
