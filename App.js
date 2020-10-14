import React, {Component} from 'react';
import StackNavigtor from './app/navigations/StackNavigator';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <StackNavigtor />;
  }
}

export default App;
