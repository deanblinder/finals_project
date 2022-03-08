import * as remx from 'remx';

const initialState = {
    agentType: 0,
    avgOff:3,
    gameTime:30
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
});

const getters = remx.getters({
    getAgentType() {
        return state.agentType;
    },
    getAvgOff() {
        return state.avgOff;
    },
    getGameTime() {
        return state.gameTime;    },
});

export const store = {
    ...setters,
    ...getters,
};

const state = remx.state(initialState);