import React from "react";
import { connect } from "react-redux"
import { compose } from "redux";
import "../styles/raleway.css";
import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars
import Checkboxes from "./checkboxes";
import { Buttons } from "./buttons";
// import firebase from "../firebase";
import PropTypes from "prop-types";
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

class Home extends React.Component {
  constructor(props) {
    debugger
    this.uid = props.auth.uid
    super(props);
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     // User is signed in.
    //     const ref = firebase.ref('users/' + user.uid + '/habits')
    //     ref.set({ 
    //       name: 'Cardio', 
    //       checks: {
    //         'cardio-12-25-2018': false,
    //         'cardio-12-26-2018': true
    //       }
    //     })
    //   } else {
    //     this.props.history.push('/login')
    //   }
    // });
  }

  render() {
    return (
      <div styleName={"custom.container"}>
        <Checkboxes uid={this.uid} />
        <Buttons />
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

// export default connect(
//   mapStateToProps,
//   dispatch => ({ dispatch })
// )(Home);


Home.propTypes = {
  auth: PropTypes.object
}

export default firebaseConnect((state) => {
  debugger
    return { auth: state.firebase.auth }
  }) (Home)
