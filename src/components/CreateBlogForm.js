import React from 'react'
import { connect } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const CreateBlogForm = (props) => {

    const addBlog = async (event) => {
        event.preventDefault()
        blogService.setToken(props.user.token)
        const blog = {
            title: event.target.title.value,
            author: event.target.author.value,
            url: event.target.url.value,
            likes: 0,
        }
        const createdBlog = await blogService.createNew(blog)
        props.createBlog(createdBlog)
        props.showNotification(createdBlog.title)
    }

    return (
        <div>
            <h2>Uusi blogi</h2>
            <form onSubmit={ addBlog }>
                <div>
                    otsikko:
                    <input name="title" />
                </div>
                <div>
                    kirjoittaja:
                    <input name="author"/>
                </div>
                <div>
                    url:
                    <input name="url"/>
                </div>
                <button type="submit"> Luo </button>
            </form>
        </div>
    )
}

const connectedBlogForm = connect(null, { createBlog, showNotification })(CreateBlogForm)
export default connectedBlogForm
