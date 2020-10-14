import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const API_URL =
  'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedPosts: [],
      fetchingPosts: true,
      pageNumber: 0,
    };
    this.fetchPosts();
  }

  // componentDidMount = () => {
  //   this.interval = setInterval(() => {
  //     this.fetchPosts();
  //   }, 100000);
  // };

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  fetchPosts = async () => {
    await axios
      .get(API_URL)
      .then(async (res) => {
        this.setState({fetchingPosts: false, fetchedPosts: res.data.hits});
        console.log('API RESPONSE IS ', this.state.fetchedPosts);
      })
      .catch((error) => {
        console.log('There was an error in feftching posts - ', error);
      });
  };

  render() {
    const {fetchingPosts, fetchedPosts} = this.state;
    return (
      <View style={styles.container}>
        {fetchingPosts ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="small" color="#121212" />
          </View>
        ) : (
          <View>
            <FlatList
              data={fetchedPosts}
              keyExtractor={(item) => item.created_at}
              renderItem={({item}) => {
                return (
                  <View>
                    <Text>{item.title}</Text>
                  </View>
                );
              }}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loaderContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default App;
