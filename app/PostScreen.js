/* eslint-disable prettier/prettier */
import React, {PureComponent} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';

const API_URL =
  'https://hn.algolia.com/api/v1/search_by_date?tags=story&page=0';

class PostScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fetchedPosts: [],
      fetchingPosts: true,
      pageNumber: 0,
      searchString: '',
    };
    this.fetchPosts();
    // clearInterval(this.interval);
  }

  // NOT SURE WHY THE INTERVAL IS BEHAVING SO AWKWARD :(

  // componentDidMount() {
  //   this.interval = setInterval(() => {
  //     this.setState({pageNumber: this.state.pageNumber + 1});
  //     this.fetchPosts();
  //   }, 10000);
  // }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  fetchPosts = async () => {
    await axios
      .get(API_URL)
      .then(async (res) => {
        this.setState({
          fetchingPosts: false,
          fetchedPosts:
            this.state.pageNumber === 0
              ? res.data.hits
              : [...this.state.fetchedPosts, ...res.data.hits],
        });
        console.log('API RESPONSE IS ', this.state.fetchedPosts);
      })
      .catch((error) => {
        this.setState({fetchingPosts: false});
        alert(
          'There was an error in fetching posts, please restart the App.' +
            JSON.stringify(error),
        );
      });
  };

  loadWithPagination = () => {
    this.setState({pageNumber: this.state.pageNumber + 1});
    this.fetchPosts();
  };

  searchItems = async (text) => {
    const {fetchedPosts} = this.state;
    await this.setState({searchString: text});
    var sear = fetchedPosts.filter((item) => {
      return item.title == text;
    });
    console.log(sear);
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
            <TextInput
              onChangeText={(text) => this.searchItems(text)}
              placeholder="Search here"
              style={styles.searchBox}
            />
            <FlatList
              data={fetchedPosts}
              onEndReachedThreshold={0.7}
              onEndReached={() => this.loadWithPagination()}
              keyExtractor={(item) => item.created_at_i.toString()}
              renderItem={({item}) => {
                return (
                  <View>
                    <View style={styles.backgroundBox}>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('PostDetails', {
                            content: item,
                          })
                        }>
                        <Text style={{marginVertical: 4}}>
                          Title: {item.title}
                        </Text>
                        <Text style={{marginVertical: 4}}>URL: {item.url}</Text>
                        <Text style={{marginVertical: 4}}>
                          Created At: {item.created_at}
                        </Text>
                        <Text style={{marginVertical: 4}}>
                          Author: {item.author}
                        </Text>
                      </TouchableOpacity>
                    </View>
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
    backgroundColor: '#fff',
    paddingHorizontal: '3%',
  },
  loaderContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  backgroundBox: {
    backgroundColor: '#ffa',
    marginVertical: 12,
    padding: 8,
    borderRadius: 5,
  },
  searchBox: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    height: 35,
    marginTop: 15,
  },
});

export default PostScreen;
