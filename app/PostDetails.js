/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {View, Text} from 'react-native';

class PostDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {navigation} = this.props;
    const DATA = navigation.getParam('content');
    console.log(DATA);
    return (
      <View>
        <Text> {JSON.stringify(DATA)} </Text>
      </View>
    );
  }
}

export default PostDetails;
