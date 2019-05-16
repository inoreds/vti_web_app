import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { connect} from "remx";
import authStore from '../stores/auth'
import dataStore from "../stores/data"
import ReactTable from 'react-table';

import broker from "../utils/broker"  

import moment from 'moment';

class ModalListPekerja extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: false,   
        total_page: 0,
        page_index:1,
        page_size_option:10 ,
        body_data_table : {search: '', start:0, length: 0},
        selected_data:[],
        data_table: [],
        data_meta: {},
        columns: [{ Header: 'Nama Lengkap',id: 'name', accessor: 'name', style:{ 'whiteSpace': 'unset'}},
        { Header: 'Jenis Kelamin',id: 'gender', accessor: 'gender',
            Cell: row => {
                return <div className="text-center">
                        {(row.value) &&
                          (row.value === 1 ? 'LAKI-LAKI' : 'PEREMPUAN')
                        }
                    </div>
                }
        },
        { Header: 'No. Handphone',id: 'mobile', accessor: 'mobile', style:{ 'whiteSpace': 'unset'},
            Cell: row => {
                return <div className="text-center">
                        {row.value}
                    </div>
                }
        },
        { Header: 'Email',id: 'email',accessor: 'user', style:{ 'whiteSpace': 'unset'},
            Cell: row => {
                return <div className="text-center">
                        { row.value.email }
                    </div>
                }
        },
        { Header: 'Umur',id: 'umur', accessor: 'birthdate', style:{ 'whiteSpace': 'unset'},
            Cell: row => {
                return <div className="text-center">
                        {(row.value) &&
                          moment().diff(row.value, 'years',false) + " Tahun"
                        }
                    </div>
                }
        },
        { Header: 'Pilih Pekerja',id: 'btn_select', accessor: 'id', style:{ 'whiteSpace': 'unset'},
        Cell: row => {
                if(this.checkRekomendasi(row.value) === true){
                    return <div className="text-center">
                                Sudah Rekomendasi
                            </div>
                } else {
                    return <div className="text-center">
                                <Button size="sm" className="btn-outline-dark icon mr-1 mb-1" outline color="dark" 
                                    disabled={(this.checkButton(row.value) === true) ? true : false}
                                    onClick={() => this.setDataArray(row.value, row.row.name, row.row.umur, row.row.gender, row.row.mobile)}>
                                        <i className="fa fa-check"></i>
                                </Button>
                                <Button size="sm" className="icon mr-1 mb-1" color="dark"
                                    disabled={(this.checkButton(row.value) === true) ? false : true}
                                    onClick={() => this.removeDataArray(row.value)}>
                                        <i className="fa fa-remove"></i>
                                </Button>
                            </div>
                }
            
            }
        },]
    }
        this.getDataTable = this.getDataTable.bind(this);
        this.toggleModalPekerja = this.toggleModalPekerja.bind(this);

    }

    checkRekomendasi(id){
        var value=false;
        var array_of_object_rekomendasi = dataStore.getters.getModalListPekerja().data_rekomendasi;

        for (var i=0; i<array_of_object_rekomendasi.length; i++){
            if (array_of_object_rekomendasi[i].id === id)
                value=true; 
        }
        return value;
    }

    checkButton(id){
        console.log(id)
        var value=false;
        var array_of_object = dataStore.getters.getModalListPekerja().data;
        var array_of_object_rekomendasi = dataStore.getters.getModalListPekerja().data_rekomendasi;

        for (var i=0; i<array_of_object.length; i++){
            if (array_of_object[i].worker_id === id)
                value=true; 
        }
        for (var j=0; j<array_of_object_rekomendasi.length; j++){
            if (array_of_object_rekomendasi[j].id === id)
                value=true; 
        }
        return value;
    }

    removeDataArray(id){
        var array_of_object = dataStore.getters.getModalListPekerja().data;
        
        for (var i=0;i<array_of_object.length;i++){
            if (id === array_of_object[i].worker_id){
                array_of_object.splice(i,1);
            }
        }
        
        
        dataStore.setters.setModalListPekerja({modal:true, data: array_of_object, data_rekomendasi:this.props.modal_liist_pekerja.data_rekomendasi})

        this.getDataTable();
    }

    setDataArray(id, nama, umur, jk, no_hp){
        
        var array_of_object = dataStore.getters.getModalListPekerja().data;
        var object_pegawai = new Object();

        object_pegawai.worker_id = id;
        object_pegawai.name = nama;
        object_pegawai.mobile = no_hp;
        object_pegawai.birthdate = umur;

        array_of_object.push(object_pegawai);

        dataStore.setters.setModalListPekerja({modal:true, data: array_of_object, data_rekomendasi:this.props.modal_liist_pekerja.data_rekomendasi})

        this.getDataTable();
    }

    toggleModalPekerja(){
        dataStore.setters.setModalListPekerja({modal: false, data:this.props.modal_liist_pekerja.data, data_rekomendasi:this.props.modal_liist_pekerja.data_rekomendasi})
    }
    
    getDataTable() {
        this.setState({ loading: true });
        broker.fetch.get(`workers?page=${this.state.page_index}&size=${this.state.page_size_option}`).then(res => {
            const { data } = res;
            const { meta } = data;
            if (data) {
                this.setState({loading: false, data_table: data, data_meta: meta})
            } else {
                
            }
        }).catch(err => {
            this.setState({
                loading: false,
                message: ''
            })
        }).then(()=> {
            dataStore.setters.setReloadTable(false);
        });
    }

    getDataPaging(index){
        this.setState({page_index: index+1}, function(){
            this.getDataTable();
        })
        
    }

    componentDidMount(){
        this.getDataTable()
    }

    render() {
        return (
            <div className="animated">
                <Modal isOpen={this.props.modal_liist_pekerja.modal} toggle={this.toggleModalPekerja}
                       className={'modal-lg ' + this.props.className}>
                  <ModalHeader toggle={this.toggleModalPekerja}>Silahkan Pilih Pekerja yang Direkomendasikan</ModalHeader>
                  <ModalBody>
                  <ReactTable
                        columns={this.state.columns}
                        data={this.state.data_table.data}
                        loading={this.state.loading}
                        filterable={false}
                        sortable={false}
                       // page={this.state.data_meta.current_page}
                        pages={(this.state.data_meta) ? this.state.data_meta.page_count : 0}
                        pageSize={(this.state.data_meta) ? this.state.data_meta.page_size : this.state.page_size_option}
                        pageSizeOptions={[this.state.page_size_option]}
                        manual
                        onPageChange={(pageIndex) => {
                            this.getDataPaging(pageIndex)
                        }} 
                        className="table table-striped table-hover table-bordered -striped -highlight" />
                  </ModalBody>
                  <ModalFooter>
                     <Button color="secondary" onClick={this.toggleModalPekerja}>Close</Button>
                  </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(props) {
    return {
        user: authStore.getters.getUser(),
        modal_liist_pekerja: dataStore.getters.getModalListPekerja(),

    }
  }
export default connect(mapStateToProps)(ModalListPekerja);

