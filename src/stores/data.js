const remx = require('remx');

const state = remx.state({
    reload_table: false,
    data_tour_main : {form  : 'view', 'status' : 'view', data: {}},
    data_tour_ktp : {form  : 'view', 'status' : 'view', data: {}},
    data_tour_passport : {form  : 'view', 'status' : 'view', data: {}}
    
});

const setters = remx.setters({
    setReloadTable(reload_table) {
        state.reload_table = reload_table
    },
    setDataTourMain(data_tour_main){
        state.data_tour_main = data_tour_main
    },
    setDataTourKtp(data_tour_ktp){
        state.data_tour_ktp = data_tour_ktp
    },
    setDataTourPassport(data_tour_passport){
        state.data_tour_passport = data_tour_passport
    }
});

const getters = remx.getters({
    getReloadTable(){
        return state.reload_table;
    },
    getDataTourMain(){
        return state.data_tour_main;
    },
    getDataTourKtp(){
        return state.data_tour_ktp;
    },
    getDataTourPassport(){
        return state.data_tour_passport;
    },
    
});


module.exports = {
    setters,
    getters,
}