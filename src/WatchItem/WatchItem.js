import React from 'react';
import './watchItem.css';

export default class WatchItem extends React.Component {
  constructor(props) {
    super(props);
    this.interval = null;
    this.state = {
      time: {
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      style: {
        arrow: {
          hours: {},
          minutes: {},
          seconds: {},
        }
      },
    }
  }

  getTime() {
    const date = new Date();
    const currentTimeZoneOffsetInHours = date.getTimezoneOffset() / 60;
    const OffsetInHours = currentTimeZoneOffsetInHours + this.props.item.timezone;

    date.setHours(date.getHours() + OffsetInHours);

    return {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    }
  }

  getArrowStyle(deg) {
    return { transform: `translate(-50%, -100%) rotate(${deg}deg)` };
  }

  changeTime() {
    const time = this.getTime();

    this.setState((prevState) => ({
      ...prevState,
      time,
      style: {
        arrow: {
          hours: this.getArrowStyle(time.hours * 30 + time.minutes / 2),
          minutes: this.getArrowStyle(time.minutes * 6),
          seconds: this.getArrowStyle(time.seconds * 6),
        }
      }
    }));
  }

  componentDidMount() {
    this.changeTime();

    const diff = 1000 - new Date().getMilliseconds();

    setTimeout(() => {
      this.interval = setInterval(() => this.changeTime(), 1000);
    }, diff);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  formatTime(digit) {
    return digit > 9 ? digit : `0${digit}`;
  }

  render() {
    const { item, handleDelete } = this.props;
    const { time: { hours, minutes, seconds }, style } = this.state;

    return (
      <div className={'watches__item item-watches'}>
        <div className={'item-watches__title'}>{item.title}</div>
        <div className={'item-watches__main'}>
          <div className='item-watches__time-digit-wrap'>
            <div className={'item-watches__time-digit'}>
              {this.formatTime(hours)}:{this.formatTime(minutes)}:{this.formatTime(seconds)}
            </div>
          </div>
          <div className={'item-watches__clock-face clock-face'}>
            <div className={'clock-face__arrow clock-face__hour-arrow'} style={style.arrow.hours}></div>
            <div className={'clock-face__arrow clock-face__minute-arrow'} style={style.arrow.minutes}></div>
            <div className={'clock-face__arrow clock-face__second-arrow'} style={style.arrow.seconds}></div>
          </div>

          <button className={'item-watches__btn-remove'} onClick={() => handleDelete(item)}>
            <span className={'_visually-hidden'}>Удалить</span>
          </button>
        </div>
      </div>
    )
  }
}

