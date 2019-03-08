import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import { useField } from './hooks/useField'
import { showNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
import { connect } from 'react-redux'
import BlogList from './components/BlogList'
import { initializeBlogs } from './reducers/blogReducer'

const App = (props) => {
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const username = useField('text')
    const password = useField('text')


    useEffect(() => {
        props.initializeBlogs()
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username: username.value, password: password.value
            })
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUser(user)
            username.reset()
            password.reset()
        } catch(e) {
            setErrorMessage('virhe salasanassa tai käyttäjätunnuksessa')
        }
    }

    const handleLogout = event => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
    }

    const loginForm = () => (
        <div>
            <h2>Kirjaudu sisään</h2>

            <form onSubmit={ handleLogin }>
                <p value={errorMessage}></p>
                <div>
                  Käyttäjätunnus
                    <input
                        name="username"
                        type={username.type}
                        value={username.value}
                        onChange={username.onChange}/>
                </div>

                <div>
                    Salasana
                    <input
                        name="password"
                        type={password.type}
                        value={password.value}
                        onChange={password.onChange}/>
                </div>

                <button type="submit"> Kirjaudu </button>
            </form>
        </div>
    )

    return (
        <div>
            { user === null ?
                loginForm() :
                <div>
                    <p>Kirjautuneena {user.name}</p>
                    <button onClick={ handleLogout }> Kirjaudu ulos </button>
                    <Notification/>
                    <Togglable buttonLabel='Luo blogi'>
                        <CreateBlogForm user={user}/>
                    </Togglable>
                    <BlogList/>
                </div>
            }
        </div>
    )
}

const connectedApp = connect(null, { showNotification, initializeBlogs })(App)
export default connectedApp