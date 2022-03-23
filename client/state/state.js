import * as remx from 'remx';

const initialState = {
    experimentType: 'latency',
    agentType: 0,
    avgOff:3,
    gameTime:30,
    latency:10,
    gitter:0,
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
});

export const store = {
    ...setters,
    ...getters,
};

const state = remx.state(initialState);
