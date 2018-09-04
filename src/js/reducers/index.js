const reducer = (state, action) => {

    switch (action.type) {

        case 'LIST':
        return Object.assign({}, state, {
            list: action.value
        })
        case 'POST':
        return Object.assign({}, state, {
            post: action.value
        })
        case 'LOGIN':
        return Object.assign({}, state, {
            login: action.value
        })

        default:
        return state;

    }

}

export default reducer;
