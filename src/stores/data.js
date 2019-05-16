const remx = require('remx');

const state = remx.state({
    modal_interview: false,
    modal_note_interview: false,
    modal_jadwal: false,
    modal_list_absensi_offline: false,
    confirm_save_interview: false,
    room_status: false,
    room_id: '',
    room_type:'',
    reload_table: false,
    reload_detail: false,
    user_jadwal: '',
    user_jadwal_id:'',
    is_interviewing:'',
    show_message_inbox: {
        layout: 'inbox',
        reload: true,
        id: null,
        user: 'worker',
        type: '',
        page_index: 1,
        meta:{},
        status: 'New'
    },
    modal_district: false,
    district_id:'',
    district_name:'',
    data_blast_sms:{
        pekerja: [],
        count: 0
    },
    modal_list_pekerja: {
        modal: false,
        data: [],
        data_rekomendasi:[],
    },
    modal_list_pegawai_head_hunt: {
        modal: false,
        contract_id: null,
        job_id: null,
    },
    modal_crud: {
        id:'',
        url:'',
        modal: false,
        fields:  null,
        data_per:  null,
        header_text:'',
        get_data:[],
        field_data:[],
    },
    list_absensi_offline: {
        id:'',
        modal: false,
    },
    review_vacancy: {
        id:'',
        modal: false,
        is_accept: true,
        
    },
    update_vacancy: {
        id:'',
        modal: false,
        start_hour: null,
        end_hour: null,
        
    },
    upload_pict: {
        id:'',
        modal:false,
        url: '',
        sub_url:'',
        image_upload:'',
    },
    data_special_client: {
        client: '',
        pegawai: ''
    }
});

const setters = remx.setters({
    setReloadTable(reload_table) {
        state.reload_table = reload_table
    },

    setReloadDetail(reload_detail) {
        state.reload_detail = reload_detail
    },

    // for scheduling
    setModalJadwal(modal_jadwal){
        state.modal_jadwal = modal_jadwal
    },

    setUserJadwalId(user_jadwal_id){
        state.user_jadwal_id = user_jadwal_id
    },

    setUserJadwal(user_jadwal){
        state.user_jadwal = user_jadwal
    },

    // for interview
    setRoomType(room_type){
        state.room_type = room_type
    },
    setRoomId(room_id){
        state.room_id = room_id;
    },
    setIsInterviewing(is_interviewing){
        state.is_interviewing = is_interviewing;
    },
    setModalInterview(modal_interview){
        state.modal_interview = modal_interview;
    },
    setModalNoteInterview(modal_note_interview){
        state.modal_note_interview = modal_note_interview
    },
    setListAbsensiOffline(list_absensi_offline){
        state.list_absensi_offline = list_absensi_offline
    },
    setConfirmSaveInterview(confirm_save_interview){
        state.confirm_save_interview = confirm_save_interview
    },
    setRoomStatus(room_status) {
        state.room_status = room_status
    },

    //resolusi center
    setShowMessageInbox(show_message_inbox){
        state.show_message_inbox = show_message_inbox
    },

    //modal district
    setModalDistrict(modal_district){
        state.modal_district = modal_district
    },
    
    setDataDisrictId(district_id) {
        state.district_id = district_id
    },

    setDataDisrictName(district_name) {
        state.district_name = district_name
    },

    //modal review vacancy
    setReviewVacancy(review_vacancy){
        state.review_vacancy = review_vacancy
    },

    //modal update vacancy
    setUpdateVacancy(update_vacancy){
        state.update_vacancy = update_vacancy
    },

    //modal upload
    setUploadPict(upload_pict){
        state.upload_pict = upload_pict
    },

    //modal crud
    setModalCRUD(modal_crud){
        state.modal_crud = modal_crud
    },

    //modal table pekerja
    setModalListPekerja(modal_list_pekerja){
        state.modal_list_pekerja = modal_list_pekerja
    },

    //modal table pekerja head hunt
    setModalListPegawaiHeadHunt(modal_list_pegawai_head_hunt){
        state.modal_list_pegawai_head_hunt = modal_list_pegawai_head_hunt
    },

    //blast sms password user
    setDataBlastSMS(data_blast_sms){
        state.data_blast_sms = data_blast_sms
    },

    //special client
    setDataSpecialClient(data_special_client){
        state.data_special_client = data_special_client 
    }
    
});

const getters = remx.getters({
    getReloadTable(){
        return state.reload_table;
    },
    getReloadDetail(){
        return state.reload_detail;
    },
    getUserJadwal(){
        return state.user_jadwal;
    },
    getUserJadwalId(){
        return state.user_jadwal_id;
    },
    getModalJadwal(){
        return state.modal_jadwal;
    },
    getRoomType(){
        return state.room_type;
    },
    getRoomId(){
        return state.room_id;
    },
    getIsInterviewing(){
        return state.is_interviewing;
    },
    getModalInterview(){
        return state.modal_interview;
    },
    getModalNoteInterview(){
        return state.modal_note_interview;
    },
    getListAbsensiOffline(){
        return state.list_absensi_offline;
    },
    getConfirmSaveInterview() {
        return state.confirm_save_interview;
    },
    getRoomStatus(){
        return state.room_status;
    },
    getShowMessageInbox(){
        return state.show_message_inbox;
    },
    getModalDistrict(){
        return state.modal_district;
    },
    getDataDistrictId(){
        return state.district_id;
    },
    getDataDistrictName(){
        return state.district_name;
    },
    getReviewVacancy(){
        return state.review_vacancy;
    },
    getUpdateVacancy(){
        return state.update_vacancy;
    },
    getUploadPict(){
        return state.upload_pict;
    },
    getModalCRUD(){
        return state.modal_crud
    },
    getModalListPekerja(){
        return state.modal_list_pekerja
    },
    getModalListPegawaiHeadHunt(){
        return state.modal_list_pegawai_head_hunt
    },
    getDataBlastSMS(){
        return state.data_blast_sms
    },
    getDataSpecialClient(){
        return state.data_special_client
    }
});


module.exports = {
    setters,
    getters,
}