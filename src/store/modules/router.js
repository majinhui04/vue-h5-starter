const cache = {
    namespaced: true,
    state: {
        views: []
    },

    mutations: {
        ADD_EXCLUDE_VIEW: (state, view) => {
            if (state.views.includes(view.name)) return;
            state.views.push(view.name);
        },
        DEL_EXCLUDE_VIEW: (state, view) => {
            const index = state.views.indexOf(view.name);
            if (index > -1) {
                state.views.splice(index, 1);
            }
        }
    },
    actions: {}
};

export default cache;
