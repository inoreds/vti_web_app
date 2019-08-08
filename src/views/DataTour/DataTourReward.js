import React, {Component} from 'react';
import {Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Card, CardBody, CardHeader} from 'reactstrap';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";
import { connect} from "remx";
import authStore from '../../stores/auth'

import MasterViewer from "../../components/MasterViewer"

import data_field from './_field';
import TableBasic from '../../reuse_components/Tables/TableBasic';
import broker from '../../utils/broker';
import dataStore from '../../stores/data'
import config from '../../utils/config'

import SweetAlert from 'sweetalert-react';

class DataTourReward extends Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 6,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }
    this.state = {
      reload:false,
      loading: false,
      reward_id: this.props.match.params.reward_id,
      data: [],
      columns: [
        { Header: 'id', id: 'id', accessor: 'id', className: 'text-center', show: false},
        { Header: 'id reward', id: 'reward_id', accessor: 'reward_id', className: 'text-center', show: false},
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
        { Header: 'Validasi Diamond',id: 'status_validasi_diamond', accessor: 'status_validasi_diamond',
            Cell: row => {
                if (row.value === 0) {
                    return (<div className="text-center">
                            <Button size="sm" className="btn-outline-dark icon mr-1 mb-1" outline color="primary"
                            onClick={() => this.setState({modal_konfirm_diamond:true,  verifikasi_type: 'approve', modal_konfirm_diamond_text: 'Lanjutkan Verifikasi Data?', id_data_manage: row.row.id})}><i className="fa fa-check"></i> Verifikasi</Button>
                        </div>);
                } else {
                    return <div className="text-center"><Badge color="primary">SUDAH TERVERIFIKASI</Badge></div>
                }
            }
        },
        { Header: 'Validasi Admin',id: 'status_validasi_admin', accessor: 'status_validasi_admin', show : ((this.props.user.role === 'admin') ? true : false),
            Cell: row => {
                if (row.value === 0) {
                    return (<div className="text-center">
                            <Button size="sm" className="btn-outline-dark icon mr-1 mb-1" outline color="primary"
                            onClick={() => this.setState({modal_konfirm_admin:true,  verifikasi_type: 'approve', modal_konfirm_admin_text: 'Lanjutkan Verifikasi Data?', id_data_manage: row.row.id})}><i className="fa fa-check"></i> Verifikasi</Button>
                        </div>);
                } else {
                    return <div className="text-center"><Badge color="primary">SUDAH TERVERIFIKASI</Badge></div>
                }
            }
        },
        { Header: 'Lihat Data',id: 'view_data', accessor: 'id',
            Cell: row => {
              return (<div className="text-center">
                          <Button size="sm" className="btn-outline-white icon mr-1 mb-1" color="primary"
                          onClick={() => this.props.history.push(`/dashboard/${row.row.reward_id}/tour_reward/${row.value}`)}><i className="fa fa-cogs"></i> Manage Data</Button>
                      </div>);
            }
        },
    ],
    }
    this.onClickViewFile = this.onClickViewFile.bind(this);
    this.toggle = this.toggle.bind(this);
    this.verifikasiAdmin = this.verifikasiAdmin.bind(this);
    this.verifikasiDiamond = this.verifikasiDiamond.bind(this);
  }

  componentDidMount(){
    this.getData();
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

  verifikasiAdmin() {
      broker.fetch.get(`transaction/data_tour/validate_admin/${this.state.id_data_manage}`)
      .then(res => {
          const { data } = res;
          if (data.status === true) {
              this.setState({modal_konfirm_admin: false})
              this.getData()
              dataStore.setters.setReloadTable(true)
          } else {

          }
      }).catch(err => {
          
    });
  }

  verifikasiDiamond() {
      broker.fetch.get(`transaction/data_tour/validate_diamond/${this.state.id_data_manage}`)
      .then(res => {
          const { data } = res;
          if (data.status === true) {
              this.setState({modal_konfirm_diamond: false})
              this.getData()
              dataStore.setters.setReloadTable(true)
          } else {

          }
      }).catch(err => {    
    });
  }

  getData() {
    broker.fetch.get(`vti/tur_reward/${this.state.reward_id}?page=1`)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
            const {data_tour} = data.data
            this.setState({data: data_tour})
        } else {

        }
    }).catch(err => {
        
    });
  }

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
              Reward Tour
          </CardHeader>
          <CardBody>
            <TableBasic 
                  columns={this.state.columns} 
                  data={this.state.data} 
            />
          </CardBody>
        </Card>
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
            show={this.state.modal_konfirm_admin}
            title="Konfirmasi"
            text={this.state.modal_konfirm_admin_text}
            showCancelButton= {true}
            confirmButtonColor= "#0e5ab3"  
            confirmButtonText= "Ya, proses saja!" 
            cancelButtonText= "Tidak, tolong batalkan!"
            onConfirm={() => { this.verifikasiAdmin()}}
            onCancel={() => this.setState({ modal_konfirm_admin: false })}
        /> 
        <SweetAlert
            show={this.state.modal_konfirm_diamond}
            title="Konfirmasi"
            text={this.state.modal_konfirm_diamond_text}
            showCancelButton= {true}
            confirmButtonColor= "#0e5ab3"  
            confirmButtonText= "Ya, proses saja!" 
            cancelButtonText= "Tidak, tolong batalkan!"
            onConfirm={() => { this.verifikasiDiamond()}}
            onCancel={() => this.setState({ modal_konfirm_diamond: false })}
        /> 
      </div>
    );
  }
}

function mapStateToProps(props) {
  return {
      user: authStore.getters.getUser(),
  }
}
export default connect(mapStateToProps)(DataTourReward);

