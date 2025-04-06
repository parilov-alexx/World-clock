import React from 'react';
import WatchForm from './WatchForm/WatchForm';
import WatchItem from './WatchItem/WatchItem';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const watchesDefaultValue = [
  {
    id: uuidv4(),
    title: 'Москва',
    timezone: 3,
  },
  {
    id: uuidv4(),
    title: 'Владивосток',
    timezone: 10,
  },
  {
    id: uuidv4(),
    title: 'Нью Йорк',
    timezone: -5,
  },
  {
    id: uuidv4(),
    title: 'Париж',
    timezone: 1,
  }
];

export default class WorldClock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { watches: watchesDefaultValue };

    this.handleAdd = this.handleAdd.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleAdd = (item) => {
    item.id = uuidv4();
    this.setState((prevState) => ({ ...prevState, watches: [...prevState.watches, item] }));
  }

  handleDelete = (item) => {
    this.setState((prevState) => ({
      ...prevState,
      watches: prevState.watches.filter((prevItem) => prevItem.id !== item.id)
    }));
  }

  render() {
    return (
      
      <div className={'watches'}>
        <WatchForm handleAdd={this.handleAdd} />

        <div className={'watches__items'}>
          {this.state.watches.map((item) =>
            <WatchItem
              key={item.id}
              item={item}
              handleDelete={this.handleDelete} />)}
        </div>
      </div>
    )
  }
}
