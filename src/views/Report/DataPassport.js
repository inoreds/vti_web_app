import React, {Component} from 'react';
import {Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Card, CardBody, CardHeader} from 'reactstrap';
import ReactTable from 'react-table';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";
import { connect} from "remx";
import authStore from '../../stores/auth'

import TableBasic from '../../reuse_components/Tables/TableBasic';
import broker from '../../utils/broker';

class DataPassport extends Component {
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
        { Header: 'Nama (utama)', id: 'data_tour', accessor: 'data_tour', className: 'text-center',
            Cell : row => {
                return <div className="text-center">{(row.value) ? row.value.nama_lengkap : null}</div>
            }
        },   
        { Header: 'Trip', id: 'data_tour', accessor: 'data_tour', className: 'text-center',
            Cell : row => {
                return <div className="text-center">{(row.value) ? row.value.trip : null}</div>
            }
        },      
        { Header: 'Nama', id: 'nama_lengkap', accessor: 'nama_lengkap', className: 'text-center'},
        { Header: 'Warga Negara', id: 'warga_negara', accessor: 'warga_negara', className: 'text-center'},
        { Header: 'Tgl. Lahir', id: 'tgl_lahir', accessor: 'tgl_lahir', className: 'text-center'},
        { Header: 'Tempat Lahir', id: 'tempat_lahir', accessor: 'tempat_lahir', className: 'text-center'},
        { Header: 'Tgl. Lahir', id: 'tgl_lahir', accessor: 'tgl_lahir', className: 'text-center'},
        { Header: 'Tgl. Pengeluaran', id: 'tgl_pengeluaran', accessor: 'tgl_pengeluaran', className: 'text-center'},
        { Header: 'Tgl. Habis Berlaku', id: 'tgl_habis_berlaku', accessor: 'tgl_habis_berlaku', className: 'text-center'},
        { Header: 'Kantor Yg. Mengeluarkan', id: 'kantor_yang_mengeluarkan', accessor: 'kantor_yang_mengeluarkan', className: 'text-center'},

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
    broker.fetch.get(`report/data_passport?page=${this.state.page_index}`)
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
              Report Data Passport
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
export default connect(mapStateToProps)(DataPassport);

