import { createAppContainer, createStackNavigator } from "react-navigation";
import Home from './src/Home';
import Login from "./src/Login";
import Cadastro from "./src/Cadastro";


const AppNavigator = createStackNavigator(

  {
    Home: Home,
    Login:Login,
    Cadastro:Cadastro
  },
  {
    initialRouteName: "Login"
  }
);
export default createAppContainer(AppNavigator);
