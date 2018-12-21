import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { inputName, createHabit } from "../actions";
import custom from "../styles/custom.css"; // eslint-disable-line no-unused-vars
import demoStyle from "../styles/demo1.css"; // eslint-disable-line no-unused-vars

class Create extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
      event.preventDefault();
      const formData = new FormData(event.target);
      this.props.dispatch(createHabit(formData));
      this.props.history.push('/')
  }

  render() {
    const { dispatch } = this.props;
    return (
      <div styleName={"custom.container"}>
        <div styleName={"demoStyle.container"}>
          <h2>Create habit</h2>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <label htmlFor="nameField">
                Name
              </label>
              <input
                type="text"
                id="nameField"
                name="name"
                value={this.props.name}
              />
              <input type="submit" value="Save" />
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

Create.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
  };
};

export default connect(
  mapStateToProps,
  dispatch => ({ dispatch })
)(Create);
