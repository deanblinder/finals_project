import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from "react-navigation";

import WelcomeScreen from "../screens/WelcomeScreen";
import WelcomeComponent  from "../compoenents/welcomeComponent";
import RegisterScreen from "../screens/RegisterScreen";
import QuestionnaireScreen from "../screens/QuestionnaireScreen";
import GuidelinesScreen from "../screens/GuidelinesScreen";
import GoodByeScreen from "../screens/GoodByeScreen";
import GamePlayScreen from "../screens/GamePlayScreen";
import FindPlayersScreen from "../screens/FindPlayersScreen";


export const AppNavigator = createStackNavigator({
    Welcome:WelcomeScreen,
    Guidelines:GuidelinesScreen,
    Register:RegisterScreen,
    FindPlayer:FindPlayersScreen,
    Play:GamePlayScreen,
    Questionnaire:QuestionnaireScreen,
    GoodBye:GoodByeScreen,



});
export default createAppContainer(AppNavigator)
