export default {
    data : [
        {
            id:'data_bank', type:'info', label:'Master Airline', hidden: 'no',
            child: [
                {id:'id', content_text: 'text', type:'text', label:'Id', hidden: 'yes'},
                {id:'nama_lengkap', content_text: 'text', type:'text', label:'Nama Lengkap', hidden: 'no'},
                {id:'username', content_text: 'text', type:'text', label:'Username', hidden: 'no'},
                {id:'role', content_text: 'text', type:'combobox', label:'Role', hidden: 'no', property:['ADMIN', 'DIAMOND', 'MEMBER'], value:['admin', 'diamond', 'member']},

 
            ]
        }
    ]
}