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

    const rows = habits.map((habit) => {
      const checkboxCells = dates.map((date) => {
        const key = habit.key + "-" + date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear() 
        return (
          <td> 
            <input 
              type="checkbox" 
              checked={!!checked[key]} 
              onChange={() => dispatch(toggleCheck(key))} 
              />
          </td>
        ) 
      })
      return (
        <tr>
          <td>
            <label styleName={"checkbox-label"} >
              <span> {habit.label} </span>
            </label>
          </td>
          {checkboxCells}
        </tr>
        )
    })
 
    const habitNames = habits.map((item) => (
        <tr>
          <td>
            <label
              key={item.key}
              styleName={"checkbox-label"}
              onChange={() => dispatch(toggleCheck(item.key))} >
              <span> {item.label} </span>
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
            {rows} 
          </tbody>
        </table>   
      </div>
    );
  }
}

DemoStates.propTypes = {
  checked: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    checked: state.checkBox.checked,
  };
};

export default connect(
  mapStateToProps,
  dispatch => ({ dispatch })
)(DemoStates);
