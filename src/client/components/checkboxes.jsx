import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { toggleCheck } from "../actions";
import "../styles/custom.css";
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

class Checkboxes extends React.Component {
  constructor(props) {
    // props.firebase.set({ 
    //       name: 'Meditate', 
    //       checks: {
    //         'cardio-12-25-2018': false,
    //         'cardio-12-26-2018': true
    //       }
    //     })
    debugger
    super(props)
  }

  render() {
    const { checked, habits, dispatch } = this.props;

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

Checkboxes.propTypes = {
  /* eslint-disable react/no-unused-prop-types */
  uid: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    checked: state.checkBox.checked,
    habits: state.create.habits
  };
};

// export default connect(
//     mapStateToProps,
//     dispatch => ({ dispatch })
//   )
// )(Checkboxes);

const enhance = compose(
  firebaseConnect((props) => {
    debugger
    return [
      {
        path: `/users/${props.uid}/habits`
      }
    ]
  }),
  connect(state => ({
    habits: state.firebase.ordered.habits
  }))
)

export default enhance(Checkboxes)