import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';
import axios from 'axios';

const API_URL =
  'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0';

class Screen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedPosts: [],
      fetchingPosts: true,
      pageNumber: 0,
    };
  }

  fetchPosts = async () => {
    await axios
      .get(API_URL)
      .then((res) => {
        console.log('API RESPONSE IS ', res.data.data);
      })
      .catch((error) => {
        console.log('There was an error in feftching posts - ', error);
      });
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'red'}}>
        <Text> Screen </Text>
      </View>
    );
  }
}

export default Screen;
