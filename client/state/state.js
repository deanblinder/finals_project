import * as remx from 'remx';
///latency, followerLeader
import uuid from 'react-native-uuid';
import {Platform} from "react-native";

const initialState = {
    isLoading: true,
    experimentType: 'followerLeader',
    agentType: 0,
    avgOff:3,
    gameTime:30,
    latency:0,
    gitter:0,
    weight:0.2,
    agentTypeForQuestionnaire: "",
    gameNumber:0,
    gitterParams:[0,30,60,0,30,60,0,30,60],
    latencyParams:[300,300,300,150,150,150,70,70,70],
    weightExp:[0.2,0.4,0.6],

    latacyGitterObject : [{gitter:0,latency:300},{gitter:30,latency:300},{gitter:60,latency:300}],
    modelDevice:uuid.v4(),
    versionDevice:Platform.constants['Release'],
};

const setters = remx.setters({
    setWeightExpSameForEach(weightExp) {
        state.weightExp = [weightExp,weightExp,weightExp];
    },
    setLatacyGitterObjectSameForEach(gitter,latency) {
        state.latacyGitterObject = [{gitter:gitter,latency:latency},{gitter:gitter,latency:latency},{gitter:gitter,latency:latency}];
    },
    setAgentType(agentType) {
        state.agentType = agentType;
    },
    deleteGitterLatacyByIndex(gitterIndex) {
        state.latacyGitterObject.splice(gitterIndex,1)
    },
    setGitterLatacyParams(latacyGitterObject) {
        state.latacyGitterObject = latacyGitterObject
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
    setGitter(gitter) {
        state.gitter = gitter;
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
    // setGitterParamsRandom(gitterParam) {
    //     state.gitterParamsRandom.push(gitterParam)
    // },
    setDeleteGitterParams(gitterIndex) {
        state.gitterParams.splice(gitterIndex,1)
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
    getGitterLatacyParams() {
        return state.latacyGitterObject;
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
    getGitter() {
        return state.gitter;
    },
    getAgentTypeForQuestionnaire() {
        return state.agentTypeForQuestionnaire;
    },
    getWeightExp() {
        return state.weightExp;
    },
    getGitterParams() {
        return state.gitterParams;
    },
    getLatencyParams() {
        return state.latencyParams;
    },
    getWeight() {
        return state.weight;
    },
    getModel() {
        return state.modelDevice;
    },
    getVersion() {
        return state.versionDevice;
    },
    getGameNumber() {
        return state.gameNumber
    },
    // getGitterParamsRandom() {
    //     return state.gitterParamsRandom;
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
