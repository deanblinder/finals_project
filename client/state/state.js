import * as remx from 'remx';
///latency, followerLeader
import uuid from 'react-native-uuid';
import {Platform} from "react-native";
import api from "../api";
// import DeviceInfo from 'react-native-device-info';
// import { getUniqueId, getManufacturer } from 'react-native-device-info';
// import { NativeModules } from 'react-native'


const initialState = {
    isLoading: true,
    experimentType: 'followerLeader',
    agentType: 0,
    avgOff:3,
    gameTime:30,
    latency:0,
    jitter:0,
    weight:0.2,
    agentTypeForQuestionnaire: "",
    gameNumber:0,
    jitterParams:[0,30,60,0,30,60,0,30,60],
    latencyParams:[300,300,300,150,150,150,70,70,70],
    weightExp:[0.2,0.4,0.6],
    mail:'',
    latencyJitterObject : [{jitter:0,latency:300},{jitter:30,latency:300},{jitter:60,latency:300}],
    // modelDevice:uuid.v4(),
    // modelDevice:NativeModules.PlatformConstants.serial,
    // modelDevice:DeviceInfo.getUniqueId(),
    versionDevice:Platform.constants['Release'],
};

const setters = remx.setters({
    setMail(mail) {
        state.mail = mail;
    },
    setWeightExpSameForEach(weightExp) {
        state.weightExp = [weightExp,weightExp,weightExp];
    },
    setLatencyJitterObjectSameForEach(jitter,latency) {
        state.latencyJitterObject = [{jitter:jitter,latency:latency},{jitter:jitter,latency:latency},{jitter:jitter,latency:latency}];
    },
    setAgentType(agentType) {
        state.agentType = agentType;
    },
    deleteJitterLatencyByIndex(jitterIndex) {
        state.latencyJitterObject.splice(jitterIndex,1)
    },
    setJitterLatencyParams(latencyJitterObject) {
        state.latencyJitterObject = latencyJitterObject
    },
    setAvgOf(avgOff) {
        state.avgOff = avgOff;
    },
    setGameTime(gameTime) {
        state.gameTime = gameTime;
    },
    setExperimentType(experimentType) {
        state.experimentType = experimentType;
    },
    setLatency(latency) {
        state.latency = latency;
    },
    setJitter(jitter) {
        state.jitter =jitter;
    },
    setDeleteWeightExp(weightIndex) {
        state.weightExp.splice(weightIndex,1)
    },
    setWeight(weight) {
        state.weight = weight
    },
    setGameNumber(gameNumber) {
        state.gameNumber = gameNumber
    },
    // setJitterParamsRandom(jitterParam) {
    //     state.jitterParamsRandom.push(jitterParam)
    // },
    setDeleteJitterParams(jitterIndex) {
        state.jitterParams.splice(jitterIndex,1)
    },
    setDeleteLatencyParams(latencyIndex) {
        state.latencyParams.splice(latencyIndex,1)
    },
    // setLatencyParamsRandom(latencyParam) {
    //     state.latencyParamsRandom.push(latencyParam)
    // },
    setAgentTypeForQuestionnaire(agentTypeForQuestionnaire) {
        state.agentTypeForQuestionnaire = agentTypeForQuestionnaire;
    },
});

const getters = remx.getters({
    getJitterLatencyParams() {
        return state.latencyJitterObject;
    },
    getMail() {
        return state.mail;
    },
    getAgentType() {
        return state.agentType;
    },
    getAvgOff() {
        return state.avgOff;
    },
    getGameTime() {
        return state.gameTime;
    },
    getExperimentType() {
        return state.experimentType;
    },
    getLatency() {
        return state.latency;
    },
    getJitter() {
        return state.jitter;
    },
    getAgentTypeForQuestionnaire() {
        return state.agentTypeForQuestionnaire;
    },
    getWeightExp() {
        return state.weightExp;
    },
    getJitterParams() {
        return state.jitterParams;
    },
    getLatencyParams() {
        return state.latencyParams;
    },
    getWeight() {
        return state.weight;
    },
    getModel() {
        // const userExist = api.isUserModelExists(store.getModel())
        // console.log("device UUID: ", state.modelDevice+"-"+userExist)
        return (state.modelDevice);
    },
    getVersion() {
        return state.versionDevice;
    },
    getGameNumber() {
        return state.gameNumber
    },
    // getJitterParamsRandom() {
    //     return state.jitterParamsRandom;
    // },
    // getLatencyParamsRandom() {
    //     return state.latencyParamsRandom;
    // },
});

export const store = {
    ...setters,
    ...getters,
};

const state = remx.state(initialState);
