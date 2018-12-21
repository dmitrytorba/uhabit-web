import React from "react";
import { connect } from "react-redux";
import "../styles/raleway.css";
import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars
import DemoStates from "./demo-states";
import { DemoButtons } from "./demo-buttons";


class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div styleName={"custom.container"}>
        <div styleName={"custom.docs-section"}>
          <DemoStates />
          <DemoButtons />
        </div>
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
