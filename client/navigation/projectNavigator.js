import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from "react-navigation";
// import os from 'os'
// x = os.

import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import QuestionnaireScreen from "../screens/QuestionnaireScreen";
import GuidelinesScreen from "../screens/GuidelinesScreen";
import GoodByeScreen from "../screens/GoodByeScreen";
import LeaderFollowerPlayScreen from "../screens/LeaderFollowerPlayScreen";
import LatencyPlayScreen from "../screens/LatencyPlayScreen";
import FindPlayersScreen from "../screens/FindPlayersScreen";
import AdministratorScreen from "../screens/AdministratortScreen";
import ChangeParamAdministratorScreen from "../screens/ChangeParamAdministratorScreen";
import FindScreen from "../screens/screens/findScreen";


export const AppNavigator = createStackNavigator({
    // Questionnaire:QuestionnaireScreen,
    // FindPlayer:FindPlayersScreen,
    // Questionnaire:QuestionnaireScreen,
    // LatencyPlay:LatencyPlayScreen,
    // LeaderFollowerPlay:LeaderFollowerPlayScreen,
    // GoodBye:GoodByeScreen,
    FindPlayer:FindPlayersScreen,

    Welcome:WelcomeScreen,
    Guidelines:GuidelinesScreen,
    Register:RegisterScreen,
    LatencyPlay:LatencyPlayScreen,
    LeaderFollowerPlay:LeaderFollowerPlayScreen,
    Questionnaire:QuestionnaireScreen,
    GoodBye:GoodByeScreen,
    Administrator:AdministratorScreen,
    ChangeParam:ChangeParamAdministratorScreen,
    Find: FindScreen



});
export default createAppContainer(AppNavigator)
