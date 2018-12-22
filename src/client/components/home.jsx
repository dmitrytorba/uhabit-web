import React from "react";
import { connect } from "react-redux";
import "../styles/raleway.css";
import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars
import Checkboxes from "./checkboxes";
import { Buttons } from "./buttons";
import firebase from "../firebase"

class Home extends React.Component {
  constructor(props) {
    super(props);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        firebase.push('users/' + user.uid + '/test', {name: 'test'})
      } else {
        this.props.history.push('/login')
      }
    });
  }

  render() {
    return (
      <div styleName={"custom.container"}>
        <Checkboxes/>
        <Buttons />
      </div>
    );
  }
}

Home.propTypes = {};

const mapStateToProps = () => {
  return {};
};

export default connect(
  mapStateToProps,
  dispatch => ({ dispatch })
)(Home);
