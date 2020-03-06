const _config = process.env._config || {};
const state = {
    ..._config
};

const mutations = {
    CHANGE_SETTING: (state, { key, value }) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value;
        }
    }
};

const actions = {};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
