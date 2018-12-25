import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import GoogleButton from 'react-google-button' 

export const Login = (props) => {
  if (props.auth.isLoaded) {
    props.history.push('/') 
  }
  return (
    <div>
      <GoogleButton 
        onClick={() => props.firebase.login({ provider: 'google', type: 'redirect' })}
      />
    </div>
  )
}

Login.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(Login)