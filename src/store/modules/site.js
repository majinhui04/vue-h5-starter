import Vue from 'vue';
const API = Vue.prototype.$api
const state = {
    // 我的导航
    favorite: [],
    // 推荐导航
    recommend: []

};

const mutations = {
    AddFavorite(state, data) {
        console.log('1234', data);

        state.favorite.push(data)
    },
    RemoveFavorite(state, data) {
        const list = data.length ? data : [data];
        const favorite = state.favorite;
        console.log('1111', list);

        // 你想循环删除
        for (let index = favorite.length - 1; index >= 0; index--) {
            const item = favorite[index];
            const result = list.filter(site => site.id === item.id)
            if (result.length) {
                console.log('index', index);
                favorite.splice(index, 1)
            }
        }
    },
    SetRecommendData(state, data) {
        state.recommend = data;
    }
};

const actions = {
    SyncRecommendData({
        commit
    }, data = {
        opt: 1
    }) {
        return API.gateway(data, {
            $loading: true
        }).then(res => {
            const result = res.data || [];
            commit('SetRecommendData', result)
            return res;
        })
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
