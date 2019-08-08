import React, {Component} from 'react';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";
import {Button, Modal, ModalBody, ModalHeader, ModalFooter, Badge} from 'reactstrap';

import MasterViewer from "../../components/MasterViewer"

import data_field from './_field';
import config from '../../utils/config'
import broker from '../../utils/broker'
import dataStore from '../../stores/data'
import SweetAlert from 'sweetalert-react';

class GrupPengguna extends Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 7,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }
    this.state = {
      reload:false,
      loading: false,
      id_pk_column: 'id_data_tour',
      url: { url_get_data : 'transaction/data_tour', url_save_data: '/data_trip', url_update_data: '/data_trip', 
             url_delete_data: '/data_trip', url_get_data_per: '/data_trip' },
      title: 'Tour Trip',
      fields: data_field.data,
      columns: [
        { Header: 'id', id: 'id_data_tour', accessor: 'id_data_tour', className: 'text-center', show: false},
        { Header: 'Nama', id: 'nama_lengkap', accessor: 'nama_lengkap', className: 'text-center'},
        { Header: 'Tanggal Lahir', id: 'tgl_lahir', accessor: 'tgl_lahir', className: 'text-center'},
        { Header: 'Tanggal Transaksi', id: 'tgl_transaksi', accessor: 'tgl_transaksi', className: 'text-center'},
        { Header: 'Trip', id: 'trip', accessor: 'trip', className: 'text-center'},
        { Header: 'Foto Terbaru',id: 'foto_terbaru', accessor: 'foto_terbaru', style:{ 'whiteSpace': 'unset'},
        Cell: row => {
            return <div className="text-center">
                  <Button active block color="link" aria-pressed="true" 
                        onClick={()=> this.onClickViewFile("Foto Terbaru", row.value)}>
                        Lihat Foto
                    </Button>
                </div>
            }
        },
        { Header: 'Akta Kelahiran',id: 'akta_kelahiran', accessor: 'akta_kelahiran', style:{ 'whiteSpace': 'unset'},
        Cell: row => {
            return <div className="text-center">
                  <Button active block color="link" aria-pressed="true" 
                        onClick={()=> this.onClickViewFile("Akta Kelahiran", row.value)}>
                        Lihat Data
                    </Button>
                </div>
            }
        },
        { Header: 'Bukku Nikah',id: 'buku_nikah', accessor: 'buku_nikah', style:{ 'whiteSpace': 'unset'},
        Cell: row => {
            return <div className="text-center">
                  <Button active block color="link" aria-pressed="true" 
                        onClick={()=> this.onClickViewFile("Bukku Nikah", row.value)}>
                        Lihat Data
                    </Button>
                </div>
            }
        },
        { Header: 'Rekening Tabungan',id: 'rekening_tabungan', accessor: 'rekening_tabungan', style:{ 'whiteSpace': 'unset'},
        Cell: row => {
            return <div className="text-center">
                  <Button active block color="link" aria-pressed="true" 
                        onClick={()=> this.onClickViewFile("Rekening Tabungan", row.value)}>
                        Lihat Data
                    </Button>
                </div>
            }
        },
        { Header: 'Status Validasi',id: 'status_validasi', accessor: 'status_validasi',
            Cell: row => {
                if (row.value === "0") {
                    return (<div className="text-center">
                            <Button size="sm" className="btn-outline-dark icon mr-1 mb-1" outline color="primary"
                            onClick={() => this.setState({modal_konfirm:true,  verifikasi_type: 'approve', modal_konfirm_text: 'Lanjutkan Verifikasi Data?', id_data_manage: row.row.id_data_tour})}><i className="fa fa-check"></i> Proses Verifikasi</Button>
                        </div>);
                } else {
                    return <div className="text-center"><Badge color="primary">SUDAH TERVERIFIKASI</Badge></div>
                }
            }
        },
    ],
    }
    this.onClickViewFile = this.onClickViewFile.bind(this);
    this.toggle = this.toggle.bind(this);
    this.verifikasiData = this.verifikasiData.bind(this);
  }

  toggle() {
    this.setState({
    modal: !this.state.modal,
    });
  }

  onClickViewFile(value, pict) {
    console.log(pict)
    this.setState({ modal: true, 
                    modal_title: value,
                    img: pict,
                    alt: 'Kartu Identitas',
                })
  }

  verifikasiData() {
    broker.fetch.get(`data_trip/verifikasi/${this.state.id_data_manage}`)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
            this.setState({modal_konfirm: false})
            dataStore.setters.setReloadTable(true)
        } else {

        }
    }).catch(err => {
        
    });
}

  render() {
    return (
      <div>
        <MasterViewer 
              columns={this.state.columns} 
              url={this.state.url} 
              title={this.state.title} 
              fields={this.state.fields} 
              id_pk={null} 
              id_pk_column={this.state.id_pk_column}
              add_form={false}
              column_option= {false}
        />
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={'modal-lg ' + this.props.className}>
            <ModalHeader toggle={this.toggle}>{this.state.modal_title}</ModalHeader>
            <ModalBody>
                <img className="d-block w-100" src={config.api_endpoint + this.state.img} alt={this.state.alt} />
            </ModalBody>
            <ModalFooter>
                {/* <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '} */}
                <Button color="secondary" onClick={this.toggle}>Close</Button>
            </ModalFooter>
        </Modal>
        <SweetAlert
            show={this.state.modal_konfirm}
            title="Konfirmasi"
            text={this.state.modal_konfirm_text}
            showCancelButton= {true}
            confirmButtonColor= "#0e5ab3"  
            confirmButtonText= "Ya, proses saja!" 
            cancelButtonText= "Tidak, tolong batalkan!"
            onConfirm={() => { this.verifikasiData()}}
            onCancel={() => this.setState({ modal_konfirm: false })}
        />    
      </div>

    );
  }
}

export default GrupPengguna;
