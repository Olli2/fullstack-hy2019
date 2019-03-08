import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const style = {
    border: 'solid',
    margin: 5,
    padding: 3,
    borderWidth: 2
  }

  return (
    props.notification === ''
      ? <div></div>
      : <div style={style}>
          {props.notification}
        </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)
export default connectedNotification