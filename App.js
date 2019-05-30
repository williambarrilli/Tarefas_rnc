import { createAppContainer, createStackNavigator } from "react-navigation";
import Home from './src/Home';
import Login from "./src/Login";


const AppNavigator = createStackNavigator(

  {
    Home: Home,
    Login:Login
  },
  {
    initialRouteName: "Login"
  }
);
export default createAppContainer(AppNavigator);
