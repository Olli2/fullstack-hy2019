export const showNotification = (text) => {
    return async dispatch => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: {
                text: text,
            }
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION'
            })
        }, 3000);
    }
}

const reducer = (state = '', action) => {
    switch(action.type) {
        case 'SHOW_NOTIFICATION':
            return action.data.text !== '' ? 'New blog created: '.concat(action.data.text) : ''
        case 'HIDE_NOTIFICATION':
            return ''
        default: 
            return state
    }
}

export default reducer