import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from "react-navigation";

import WelcomeScreen from "../../../../Downloads/finals_project-algo/client/screens/WelcomeScreen";
import WelcomeComponent  from "../../../../Downloads/finals_project-algo/client/compoenents/welcomeComponent";
import RegisterScreen from "../../../../Downloads/finals_project-algo/client/screens/RegisterScreen";
import QuestionnaireScreen from "../../../../Downloads/finals_project-algo/client/screens/QuestionnaireScreen";
import GuidelinesScreen from "../../../../Downloads/finals_project-algo/client/screens/GuidelinesScreen";
import GoodByeScreen from "../../../../Downloads/finals_project-algo/client/screens/GoodByeScreen";
import GamePlayScreen from "../../../../Downloads/finals_project-algo/client/screens/GamePlayScreen";
import FindPlayersScreen from "../../../../Downloads/finals_project-algo/client/screens/FindPlayersScreen";
import AdministratorScreen from "../../../../Downloads/finals_project-algo/client/screens/AdministratortScreen";
import ChangeParamAdministratorScreen from "../../../../Downloads/finals_project-algo/client/screens/ChangeParamAdministratorScreen";


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
