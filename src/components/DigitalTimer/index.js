import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSeconds: 0,
  timerLimitInMinutes: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () =>
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))

  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isButtonsDisabled = timeElapsedInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedInSeconds, timerLimitInMinutes} =
      this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            alt={startOrPauseAltText}
            className="timer-controller-icon"
            src={startOrPauseImageUrl}
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer

// import {Component} from 'react'
// import './index.css'

// class DigitalTimer extends Component {
//   state = {minutes: 25, seconds: 0, isRunning: true, standardTime: 25}

//   decreamentButton = () => {
//     const {isRunning} = this.state
//     if (!isRunning) {
//       this.setState(prevState => ({
//         standardTime: prevState.standardTime - 1,
//         minutes: prevState.minutes - 1,
//       }))
//     }
//   }

//   increamentButton = () => {
//     const {isRunning} = this.state

//     if (!isRunning) {
//       this.setState(prevState => ({
//         standardTime: prevState.standardTime + 1,
//         minutes: prevState.minutes + 1,
//       }))
//     }
//   }

//   onStartClick = () => {
//     const timerId = setInterval(this.decreamentButton, 1000)
//     this.setState({isRunning: true})
//   }

//   PauseClick = () => {
//     clearInterval(this.timerId)
//     this.setState({isRunning: false})
//   }
//   startTheButton = () => {
//     return (
//       <div className="start-container">
//         <button
//           className="statBtnDesign"
//           type="button"
//           onClick={this.onStartClick}
//         >
//           <img
//             src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
//             alt="play icon"
//             className="imgStartDesign"
//           />
//         </button>
//         <h1 className="start-heading"> Start</h1>
//       </div>
//     )
//   }

//   pauseTheButton = () => {
//     return (
//       <div className="start-container">
//         <button
//           className="statBtnDesign"
//           type="button"
//           onClick={this.PauseClick}
//         >
//           <img
//             src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
//             alt="pause icon"
//             className="imgStartDesign"
//           />
//         </button>
//         <h1 className="start-heading"> Pause</h1>
//       </div>
//     )
//   }

//   resetTheValue = () => {
//     clearInterval(this.timerId)
//     this.setState({minutes: 25, seconds: 0, isRunning: true})
//   }
//   render() {
//     const {isRunning, minutes, seconds, standardTime} = this.state
//     const processCondition = isRunning ? 'Paused' : 'Running'
//     return (
//       <div className="main-container">
//         <h1 className="main-heading "> Digital Timer</h1>
//         <div className="sub-container">
//           <div className="first-part-container ">
//             <div className="digital-time-constructor">
//               <div className="timer-container ">
//                 <h1 className="timer-heading">
//                   {minutes}:{seconds}
//                 </h1>
//                 <p className="run-pause-paragraph">{processCondition} </p>
//               </div>
//             </div>
//           </div>

//           <div className="part-one-container ">
//             <div className="ResetStart-container">
//               {isRunning ? this.startTheButton() : this.pauseTheButton()}
//               <div className="reset-container ">
//                 <button
//                   className="statBtnDesign"
//                   type="button"
//                   onClick={this.resetTheValue}
//                 >
//                   <img
//                     src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
//                     alt="reset icon"
//                     className="imgStartDesign"
//                   />
//                 </button>
//                 <h1 className="start-heading ">Reset </h1>
//               </div>
//             </div>

//             <div className="buttons-container ">
//               <p className="timer-limit-paragraph">Set Timer limit </p>
//               <div className="container">
//                 <button
//                   className="minus-button"
//                   type="button"
//                   onClick={this.decreamentButton}
//                 >
//                   -
//                 </button>
//                 <div className="time-heading-constructor">
//                   <button className="time-heading ">{standardTime}</button>
//                 </div>
//                 <button
//                   className="minus-button"
//                   type="button"
//                   onClick={this.increamentButton}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default DigitalTimer
