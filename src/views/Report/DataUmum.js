import React, {Component} from 'react';
import {Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Card, CardBody, CardHeader} from 'reactstrap';
import ReactTable from 'react-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";
import { connect} from "remx";
import authStore from '../../stores/auth'

import TableBasic from '../../reuse_components/Tables/TableBasic';
import broker from '../../utils/broker';

class DataUmum extends Component {
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
      total_page: 0,
      page_index:1,
      page_size_option:1 ,
      page_size: 0,
      data_table: [],
      body_data_table : {search: '', start:0, length: 0},
      columns: [
        { Header: 'id', id: 'id', accessor: 'id', className: 'text-center', show: false},
        { Header: 'Nama', id: 'nama_lengkap', accessor: 'nama_lengkap', className: 'text-center'},
        { Header: 'Tanggal Lahir', id: 'tgl_lahir', accessor: 'tgl_lahir', className: 'text-center'},
        { Header: 'Tanggal Transaksi', id: 'tgl_transaksi', accessor: 'tgl_transaksi', className: 'text-center'},
        { Header: 'Trip', id: 'trip', accessor: 'trip', className: 'text-center'},
        { Header: 'Airline', id: 'airline_id', accessor: 'airline_id', className: 'text-center',
            Cell : row => {
                return <div className="text-center">{(row.value) ? row.value.nama_airline : null}</div>
            }
        },
        { Header: 'Batch', id: 'batch_id', accessor: 'batch_id', className: 'text-center',
            Cell : row => {
                return <div className="text-center">{(row.value) ? row.value.nama_batch : null}</div>
            }
        },
        { Header: 'Hotel', id: 'hotel_id', accessor: 'hotel_id', className: 'text-center',
            Cell : row => {
                return <div className="text-center">{(row.value) ? row.value.nama_hotel : null}</div>
            }
        },
        { Header: 'Kaos', id: 'uk_kaos_id', accessor: 'uk_kaos_id', className: 'text-center',
            Cell : row => {
                return <div className="text-center">{(row.value) ? row.value.nama_kaos : null}</div>
            }
        },                
        { Header: 'Meals', id: 'meals_id', accessor: 'meals_id', className: 'text-center',
            Cell : row => {
                return <div className="text-center">{(row.value) ? row.value.nama_meal : null}</div>
            }
        },
        { Header: 'Hubungan Keluarga', id: 'hubungan_keluarga', accessor: 'hubungan_keluarga', className: 'text-center'},
        { Header: 'Validasi Diamond',id: 'status_validasi_diamond', accessor: 'status_validasi_diamond',
            Cell: row => {
                if (row.value === "0" || row.value === 0) {
                    return <div className="text-center"><Badge color="danger">BELUM TERVERIFIKASI</Badge></div>
                } else {
                    return <div className="text-center"><Badge color="primary">SUDAH TERVERIFIKASI</Badge></div>
                }
            }
        },
        { Header: 'Validasi Admin',id: 'status_validasi_admin', accessor: 'status_validasi_admin',
            Cell: row => {
                if (row.value === "0" || row.value === 0) {
                    return <div className="text-center"><Badge color="danger">BELUM TERVERIFIKASI</Badge></div>
                } else {
                    return <div className="text-center"><Badge color="primary">SUDAH TERVERIFIKASI</Badge></div>
                }
            }
        },
    ],
    }
    this.getDataPaging = this.getDataPaging.bind(this);
  }

  componentDidMount(){
    this.setState({body_data_table : {search: '', start:0, length: this.state.page_size}}, function(){
        this.getData();
    })
  }

  getDataPaging(index){
    this.setState({page_index: index+1}, function(){
        this.getData();
    })
    
}

  getData() {
    broker.fetch.get(`report/data_umum?page=${this.state.page_index}`)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
            this.setState({loading: false, 
                            data_table: data.data, 
                            total_page: data.data.last_page, 
                            page_size: data.data.per_page})
        } else {

        }
    }).catch(err => {
        
    });
  }

  render() {
    //   console.log(this.state.data)
    return (
      <div>
        <Card>
          <CardHeader>
              Report Data Umum
          </CardHeader>
          <CardBody>
            <ReactTable
                columns={this.state.columns}
                data={this.state.data_table.data}
                loading={this.state.loading}
                filterable={false}
                sortable={false}
                pages={this.state.total_page}
                pageSize={this.state.page_size}
                pageSizeOptions={[this.state.page_size]}
                manual
                onPageChange={(pageIndex) => {
                    this.getDataPaging(pageIndex)
                }} 
                className="table table-striped table-hover table-bordered -striped -highlight" />
          </CardBody>
        </Card>
        
      </div>
    );
  }
}

function mapStateToProps(props) {
  return {
      user: authStore.getters.getUser(),
  }
}
export default connect(mapStateToProps)(DataUmum);

