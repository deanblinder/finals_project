const {test,expect} = require('@jest/globals');
const use_cases = require('./useCases');

var administrator_username = 'test_administrator'
var administrator_password = 'test_password'

var agent_type = 100
var latency = 30
var variance = 300

var mail = 'test@test.com'
var age = 26
var gender = 'test_gender'
var deviceUid = 'test_deviceUid'
var version = 'test_version'

var user_id = deviceUid
var qDict = {
    questionOne: 0 ,
    questionTwo: 0,
    questionThree: 0,
    questionFour: 0,
    questionFive: 0,
    questionSix: 0,
    questionSeven:'test_ans'
}
var game_num = 0

var feedBack = 'test_feedback'
var best_player = 0

var playerTimeStampArr = [0,0,0]
var agentTimeStampArr = [0,0,0]
var experimentInfo = 'test_experiment_info'

// ------------------------- TEST -------------------------
// administratorLoginUC Tesing
test('test administratorLogin OK',async()=>{
    expect.assertions(1);
    const response = await use_cases.administratorLoginUC(administrator_username,administrator_password)
    expect(response.status).toEqual(200);
    expect(response.data).toEqual('admin exists');
});

// changeAgentParams Tesing
test('test changeAgentParams OK',async()=>{
    expect.assertions(1);
    const response = await use_cases.changeAgentParamsUC(agent_type,latency,variance)
    expect(response.status).toEqual(200);
    expect(response.data).toEqual("The Agent added");
});

// registerPlayer Tesing
test('test registerPlayer OK',async()=>{
    expect.assertions(1);
    const response = await use_cases.registerPlayerUC(mail, age, gender, deviceUid, version)
    expect(response.status).toEqual(200);
    expect(response.data).toEqual("The User added");
});

// sendAnswers Tesing
test('test sendAnswers OK',async()=>{
    expect.assertions(1);
    const response = await use_cases.sendAnswersUC(user_id, agent_type, qDict, game_num)
    expect(response.status).toEqual(200);
    expect(response.data).toEqual("The Answer added");
});

// sendFeedBack Tesing
test('test sendFeedBack OK',async()=>{
    expect.assertions(1);
    const response = await use_cases.sendFeedBackUC(deviceUid, feedBack, best_player)
    expect(response.status).toEqual(201);
    expect(response.data).toEqual("The addFeedback added");
});

// sendPressTimeStamp Tesing
test('test sendPressTimeStamp OK',async()=>{
    expect.assertions(1);
    const response = await use_cases.sendPressTimeStampUC(deviceUid,playerTimeStampArr, agentTimeStampArr, experimentInfo)
    expect(response.status).toEqual(201);
    expect(response.data).toEqual("The addAction added");
});

// isUserModelExists Tesing
test('test isUserModelExists OK',async()=>{
    expect.assertions(1);
    const response = await use_cases.isUserModelExistsUC(deviceUid)
    expect(response.status).toEqual(201);
});

// ------------------------- DELETE -------------------------
// deleteAgent Tesing
test('test deleteAgent OK',async()=>{
    expect.assertions(1);
    const response = await use_cases.deleteAgentUC(agent_type)
    expect(response.status).toEqual(200);
});

// deleteUserByEmail Tesing
test('test deleteUserByEmail OK',async()=>{
    expect.assertions(1);
    const response = await use_cases.deleteAgentUC(mail)
    expect(response.status).toEqual(200);
});

// deleteAnswerByUserId Tesing
test('test deleteAnswerByUserId OK',async()=>{
    expect.assertions(1);
    const response = await use_cases.deleteAnswerByUserIdUC(user_id)
    expect(response.status).toEqual(200);
});

// deleteFeedbackByUserId Tesing
test('test deleteFeedbackByUserId OK',async()=>{
    expect.assertions(1);
    const response = await use_cases.deleteFeedbackByUserIdUC(user_id)
    expect(response.status).toEqual(200);
});

// deleteActionByUserSessionId Tesing
test('test deleteActionByUserSessionId OK',async()=>{
    expect.assertions(1);
    const response = await use_cases.deleteActionByUserSessionIdUC(user_id)
    expect(response.status).toEqual(200);
});

