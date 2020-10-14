/* eslint-disable prettier/prettier */
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import PostScreen from '../PostScreen';
import PostDetails from '../PostDetails';

const Stack = createStackNavigator(
  {
    PostScreen: PostScreen,
    PostDetails: PostDetails,
  },
  {
    initialRouteName: 'PostScreen',
  },
);

export default StackNavigtor = createAppContainer(Stack);
