import React, {Component} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { connect} from "remx";
import authStore from '../stores/auth'
import dataStore from "../stores/data"
import ReactTable from 'react-table';

import broker from "../utils/broker"  

import moment from 'moment';

class ModalListPegawaiHeadHunt extends Component {
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
        id_set_pegawai: null,
        array_id_pegawai:[],
        columns: [
        { Header: 'Nama',id: 'name', accessor: 'worker',
            Cell: row => {
                return <div className="text-center">
                        {row.value.name}
                    </div>
                }
        },
        { Header: 'Jenis Kelamin',id: 'gender', accessor: 'worker',
            Cell: row => {
                return <div className="text-center">
                        {(row.value.gender) &&
                          (row.value.gender === 1 ? 'LAKI-LAKI' : 'PEREMPUAN')
                        }
                    </div>
                }
        },
        { Header: 'No. Handphone',id: 'mobile', accessor: 'worker', style:{ 'whiteSpace': 'unset'},
            Cell: row => {
                return <div className="text-center">
                        {row.value.mobile}
                    </div>
                }
        },
        // { Header: 'Email',id: 'email',accessor: 'user', style:{ 'whiteSpace': 'unset'},
        //     Cell: row => {
        //         return <div className="text-center">
        //                 { row.value.email }
        //             </div>
        //         }
        // },
        { Header: 'Umur',id: 'umur', accessor: 'worker', style:{ 'whiteSpace': 'unset'},
            Cell: row => {
                return <div className="text-center">
                        {(row.value.birthdate) &&
                          moment().diff(row.value.birthdate, 'years',false) + " Tahun"
                        }
                    </div>
                }
        },
        { Header: 'interview_processes',id: 'interview_processes',accessor: 'interview_processes', show: false},
        { Header: 'Pilih Pegawai',id: 'btn_select', accessor: 'id', style:{ 'whiteSpace': 'unset'},
        Cell: row => {
                return <div className="text-center">
                            <Button size="sm" className="icon mr-1 mb-1" color="dark" 
                                disabled={(this.checkButton(row.value) === true) ? true : false}
                                onClick={() => this.setDataArray(row.value)}>
                                    <i className="fa fa-check"></i>
                            </Button>
                            <Button size="sm" className="icon mr-1 mb-1" color="dark"
                                disabled={(this.checkButton(row.value) === true) ? false : true}
                                onClick={() => this.removeDataArray(row.value)}>
                                    <i className="fa fa-remove"></i>
                            </Button>
                        </div>
            
            }
        },]
    }
        this.getDataTable = this.getDataTable.bind(this);
        this.toggleModalPekerja = this.toggleModalPekerja.bind(this);
        this.checkButton = this.checkButton.bind(this);
        this.swapPegawai = this.swapPegawai.bind(this);

    }

    toggleModalPekerja(){
        dataStore.setters.setModalListPegawaiHeadHunt({modal: false})
    }

    checkButton(id){
        console.log(id)
        var value=false;
        var array_of_object = this.state.array_id_pegawai;

        for (var i=0; i<array_of_object.length; i++){
            if (array_of_object[i] === id)
                value=true; 
        }
        return value;
    }

    removeDataArray(id){
        
        var array_of_object = this.state.array_id_pegawai;
        
        for (var i=0;i<array_of_object.length;i++){
            if (id === array_of_object[i]){
                array_of_object.splice(i,1);
            }
        }
        
        
        this.setState({array_id_pegawai: array_of_object})
    }

    setDataArray(id){
        
        var array_of_object = this.state.array_id_pegawai;

        for (var i=0;i<array_of_object.length;i++){
            array_of_object.splice(i,1);
        }

        this.setState({array_id_pegawai: array_of_object});
        
        array_of_object.push(id);

        this.setState({array_id_pegawai: array_of_object});

        this.setState({id_set_pegawai: id})
    }
    
    getDataTable(id) {
        this.setState({ loading: true });
        broker.fetch.get(`vacancies/${id}/interview_recommendation?page=${this.state.page_index}&size=${this.state.page_size_option}`).then(res => {
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

    swapPegawai(){
        var body = {
          "id": this.props.modal_list_pegawai_head_hunt.contract_id
        }
        broker.fetch.post(`applications/${this.state.id_set_pegawai}/contract_guarantee`, body)
        .then(res => {
            const { data } = res;
            if (data.status === true) {
                dataStore.setters.setModalListPegawaiHeadHunt({modal: false})
                dataStore.setters.setReloadTable(true)
            } else {
    
            }
        }).catch(err => {
            
        });
      }

    getDataPaging(index){
        this.setState({page_index: index+1}, function(){
            this.getDataTable();
        })
        
    }

    componentWillReceiveProps (newProps) {
        if(newProps.modal_list_pegawai_head_hunt.modal === true) {
            this.getDataTable(newProps.modal_list_pegawai_head_hunt.job_id);
        }
    }


    render() {
        return (
            <div className="animated">
                <Modal isOpen={this.props.modal_list_pegawai_head_hunt.modal} toggle={this.toggleModalPekerja}
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
                     <Button color="primary" onClick={this.swapPegawai}>Ganti Pegawai</Button>`
                  </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(props) {
    return {
        user: authStore.getters.getUser(),
        modal_list_pegawai_head_hunt: dataStore.getters.getModalListPegawaiHeadHunt(),

    }
  }
export default connect(mapStateToProps)(ModalListPegawaiHeadHunt);

