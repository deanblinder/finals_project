import * as remx from 'remx';

const initialState = {
    agentType: 1,
};

const setters = remx.setters({

    setAgentType(agentType) {
        state.agentType = agentType;
    },
});

const getters = remx.getters({
    getAgentType() {
        return state.agentType;
    },
});

export const store = {
    ...setters,
    ...getters,
};

const state = remx.state(initialState);