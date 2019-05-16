export default {
    data : [
        {
            id:'data_kategori_pekerjaan', type:'info', label:'Data Kategori Pekerjaan', hidden: 'no',
            child: [
                {id:'id_m_pengguna', content_text: 'text', type:'text', label:'Id', hidden: 'yes'},
                {id:'id_m_grup_pengguna', content_text: 'text', type:'text_id', label:'Id Grup Pengguna', hidden: 'yes'},
                {id:'nama_pengguna', content_text: 'text', type:'text', label:'Nama Pengguna', hidden: 'no'},
                {id:'username_pengguna', content_text: 'text', type:'text', label:'Username Pengguna', hidden: 'no'},
                // {id:'password_pengguna', content_text: 'text', type:'password', label:'Password Pengguna', hidden: 'no'},
                {id:'password_pengguna', content_text: 'text', type:'password', label:'Password Pengguna', hidden: 'no', on_change: false, disabled: false},
            ]
        }
    ]
}