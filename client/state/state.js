import * as remx from 'remx';

const initialState = {
    agentType: 0,
    avgOff:3
};

const setters = remx.setters({
    setAgentType(agentType) {
        state.agentType = agentType;
    },
    setAvgOf(avgOff) {
        state.avgOff = avgOff;
    },
});

const getters = remx.getters({
    getAgentType() {
        return state.agentType;
    },
    getAvgOff() {
        return state.avgOff;
    },
});

export const store = {
    ...setters,
    ...getters,
};

const state = remx.state(initialState);