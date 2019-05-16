const remx = require('remx');

const state = remx.state({
    id: null,
    vidstat: false,
    btn: false,
});

const setters = remx.setters({
    setId(id) {
        state.id = id;
    },
    clearId() {
        state.id = null;
    },
    setbtn(val) {
        state.btn = val;
    },
    setVidStat(val){
        state.vidstat = val;
    }
});

const getters = remx.getters({
    getId() {
        return state.id;
    },
    getbtn() {
        return state.btn;
    },
    getVidStat(){
        return state.vidstat;
    }
});

module.exports = {
    ...setters,
    ...getters,
}