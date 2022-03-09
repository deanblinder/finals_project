import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from "react-navigation";
// import os from 'os'
// x = os.

import WelcomeScreen from "../screens/WelcomeScreen";
// import WelcomeComponent  from "../../../../Downloads/finals_project-algo/client/compoenents/welcomeComponent";
import RegisterScreen from "../screens/RegisterScreen";
import QuestionnaireScreen from "../screens/QuestionnaireScreen";
import GuidelinesScreen from "../screens/GuidelinesScreen";
import GoodByeScreen from "../screens/GoodByeScreen";
import GamePlayScreen from "../screens/GamePlayScreen";
import FindPlayersScreen from "../screens/FindPlayersScreen";
import AdministratorScreen from "../screens/AdministratortScreen";
import ChangeParamAdministratorScreen from "../screens/ChangeParamAdministratorScreen";


export const AppNavigator = createStackNavigator({
    Welcome:WelcomeScreen,
    Guidelines:GuidelinesScreen,
    Register:RegisterScreen,
    FindPlayer:FindPlayersScreen,
    Play:GamePlayScreen,
    Questionnaire:QuestionnaireScreen,
    GoodBye:GoodByeScreen,
    Administrator:AdministratorScreen,
    ChangeParam:ChangeParamAdministratorScreen,




});
export default createAppContainer(AppNavigator)
