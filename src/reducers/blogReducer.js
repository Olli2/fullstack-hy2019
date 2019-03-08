import blogService from '../services/blogs'

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const createBlog = (blog) => {
    return async dispatch => {
        const response = await blogService.createNew(blog)
        dispatch({
            type: 'CREATE',
            data: response
        })
    }
}

const reducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'CREATE':
            const createdBlog = action.data
            return state.concat(createdBlog)
        default:
            return state
    }
}

export default reducer