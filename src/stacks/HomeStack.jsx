import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Users from '../screens/users/Users';
import UserDetails from '../screens/users/UserDetails';
import Todo from '../screens/todos/Todo';
import Gallery from '../screens/gallery/Gallery'

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName='Gallery'>
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="UserDetails" component={UserDetails} />
      <Stack.Screen name="Todos" component={Todo} />
      <Stack.Screen name="Gallery" component={Gallery} />
    </Stack.Navigator>
  );
};

export default HomeStack;