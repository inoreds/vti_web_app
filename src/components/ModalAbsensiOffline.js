import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { connect} from "remx";
import authStore from '../stores/auth'
import dataStore from "../stores/data"
import ReactTable from 'react-table';

import broker from "../utils/broker"  

import moment from 'moment';

class ModalListAbsensiOffline extends Component {
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
        interview_session_id: this.props.interview_session_id,
        columns: [
            { Header: 'Nama Peserta',id: 'name', accessor: 'application', style:{ 'whiteSpace': 'unset'},
                Cell: row => {
                    return <div className="text-center">
                            {row.value.worker.name}
                        </div>
                    }
            },
            { Header: 'worker_present_at',id: 'worker_present_at',accessor: 'worker_present_at', show: false},
            { Header: 'Pilih Pekerja',id: 'btn_select', accessor: 'id', style:{ 'whiteSpace': 'unset'},
                Cell: row => {
                        if(row.row.worker_present_at !== null){
                            return <div className="text-center">
                                        Sudah Hadir
                                    </div>
                        } else {
                            return <div className="text-center">
                                        <Button size="sm" className="btn-outline-dark icon mr-1 mb-1" outline color="primary" 
                                        onClick={() => this.absensiPeserta(row.value)}><i className="fa fa-check"></i> Absen</Button>
                                    </div>
                        }
                    
                }
            },]
    }
        this.getDataTable = this.getDataTable.bind(this);
        this.toggleModalAbsensi = this.toggleModalAbsensi.bind(this);
        this.absensiPeserta = this.absensiPeserta.bind(this);

    }

    absensiPeserta(id){
        this.setState({ loading: true });
        broker.fetch.get(`interviews/admin/${id}/present`).then(res => {

        }).catch(err => {

        }).then(()=> {
            this.getDataTable(this.props.modal_list_absensi.id);
        });
    }

    toggleModalAbsensi() {
        var list_absensi = {modal: false}
        dataStore.setters.setListAbsensiOffline(list_absensi)
    }

    
    getDataTable(id) {
        this.setState({ loading: true });
        broker.fetch.get(`interviews/${id}/presents`).then(res => {
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
    
    componentWillReceiveProps (newProps) {
        if(newProps.modal_list_absensi.modal === true) {
            this.getDataTable(newProps.modal_list_absensi.id);
        }
    }

    render() {
        return (
            <div className="animated">
                <Modal isOpen={this.props.modal_list_absensi.modal} toggle={this.toggleModalAbsensi}
                       className={'modal-lg ' + this.props.className}>
                  <ModalHeader toggle={this.toggleModalAbsensi}>Silahkan Absensi Calon Pekerja Yang Datang</ModalHeader>
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
                     <Button color="secondary" onClick={this.toggleModalAbsensi}>Close</Button>
                  </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(props) {
    return {
        user: authStore.getters.getUser(),
        modal_list_absensi: dataStore.getters.getListAbsensiOffline(),

    }
  }
export default connect(mapStateToProps)(ModalListAbsensiOffline);

