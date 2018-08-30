const reducer = (state, action) => {

    switch (action.type) {

        case 'LIST':
        return Object.assign({}, state, {
            list: action.value
        })

        default:
        return state;

    }

}

export default reducer;
