
import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const blogList = (props) => {
    return (
        <div>
            <h2>blogs</h2>
            {props.blogs.map(blog =>
                <Blog key={blog._id} blog={blog} />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      blogs: state.blogs
    }
  }


const connectedBlogList = connect(mapStateToProps)(blogList)

export default connectedBlogList