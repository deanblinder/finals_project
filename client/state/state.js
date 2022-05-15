import * as remx from 'remx';
///latency, followerLeader
import uuid from 'react-native-uuid';
import {Platform} from "react-native";

const initialState = {
    experimentType: 'followerLeader',
    agentType: 0,
    avgOff:3,
    gameTime:30,
    latency:10,
    gitter:0,
    weight:0,
    agentTypeForQuestionnaire: "",
    weightExp:[0.2,0.4,0.6],
    // weightExpRandom:[],
    gitterParams:[10,100,150],
    // gitterParamsRandom:[],
    latencyParams:[30,80,400],
    modelDevice:uuid.v4(),
    versionDevice:Platform.constants['Release'],
    // latencyParamsRandom:[],

    countMiniGames:0
};

const setters = remx.setters({
    setAgentType(agentType) {
        state.agentType = agentType;
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
    setCountMiniGames(countMiniGames) {
        state.countMiniGames = countMiniGames;
    },
});

const getters = remx.getters({
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
    // getGitterParamsRandom() {
    //     return state.gitterParamsRandom;
    // },
    // getLatencyParamsRandom() {
    //     return state.latencyParamsRandom;
    // },
    getCountMiniGames() {
        return state.countMiniGames;
    },
});

export const store = {
    ...setters,
    ...getters,
};

const state = remx.state(initialState);
