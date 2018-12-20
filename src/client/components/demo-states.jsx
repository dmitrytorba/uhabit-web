import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toggleCheck, incNumber, decNumber } from "../actions";
import "../styles/custom.css";

const habits = [
  {
    name: 'meditate',
    key: 'meditate',
    label: 'Meditate',
  },
  {
    name: 'cardio',
    key: 'cardio',
    label: 'Cardio',
  },  
  {
    name: 'laundry',
    key: 'laundry',
    label: 'Laundry',
  },
];



class DemoStates extends React.Component {
  render() {
    const { checked, value, dispatch } = this.props;

    const today = Date.now()
    const dates = [...Array(10).keys()].map(days => {
      const date = new Date(today)
      date.setDate(date.getDate() - days)
      return date
    });

    const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]
    const header = dates.map((date) => (
      <th>
        <div> { days[date.getDay()] } </div>
        <div> { date.getDate() } </div>
      </th>
    ));

    const habitList = habits.map((item) => (
        <tr>
          <td>
          <label
            key={item.key}
            styleName={"checkbox-label"}
            onChange={() => dispatch(toggleCheck(item.key))}
            >
            <span> {item.label} </span>
            <input type="checkbox" checked={!!checked[item.key]} onChange={() => null} />
          </label>
          </td>
        </tr>
    ))

    return (
      <div>
        <h6 styleName={"docs-header"}>Habits</h6>
        <table>
          <thead>
            <tr>
              <th> </th>
              {header}
            </tr>
          </thead>
          <tbody>
            {habitList} 
          </tbody>
        </table>   
      </div>
    );
  }
}

DemoStates.propTypes = {
  checked: PropTypes.bool,
  value: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    checked: state.checkBox.checked,
    value: state.number.value
  };
};

export default connect(
  mapStateToProps,
  dispatch => ({ dispatch })
)(DemoStates);
