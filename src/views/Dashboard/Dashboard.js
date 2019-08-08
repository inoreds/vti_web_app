import React, {Component} from 'react';
import {Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";

import MasterViewer from "../../components/MasterViewer"

import data_field from './_field';


class Dashboard extends Component {
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
      id_pk_column: 'id',
      url: { url_get_data : '/vti/tur_reward', url_save_data: '/vti/tur_reward', url_update_data: '/vti/tur_reward', 
             url_delete_data: '/vti/tur_reward', url_get_data_per: '/vti/tur_reward' },
      title: 'Dashboard Reward',
      fields: data_field.data,
      columns: [
        { Header: 'Username 1', id: 'username', accessor: 'username', className: 'text-center'},
        { Header: 'Username 2', id: 'username2', accessor: 'username2', className: 'text-center'},
        { Header: 'Username 3', id: 'username3', accessor: 'username3', className: 'text-center'},
        { Header: 'Tujuan', id: 'tujuan', accessor: 'tujuan', className: 'text-center'},
        { Header: 'Tanggal Klaim', id: 'tgl_klaim', accessor: 'tgl_klaim', className: 'text-center'},
        { Header: 'Status', id: 'status', accessor: 'status',
        Cell: row => {
          return <div className="text-center">
                    <Badge color="warning"> {row.value}</Badge>
                </div>
          }
        },
        { Header: 'Data Tour',id: 'data_tour', accessor: 'id',
            Cell: row => {
                return <div className="text-center">
                        <Button size="sm" className="btn-outline-dark icon mr-1 mb-1" outline color="primary" onClick={() => this.props.history.push(`/dashboard/${row.value}/tour_reward`)}>
                            Lihat Data
                        </Button>
                    </div>  
                }
        },
    ],
    }
  }

  render() {
    return (
      <MasterViewer 
            columns={this.state.columns} 
            url={this.state.url} 
            title={this.state.title} 
            fields={this.state.fields} 
            id_pk={null} 
            id_pk_column={this.state.id_pk_column}
            add_form={false}
            column_option= {false}
            custom_query = {'q=IN-PROGRESS'}
      />
    );
  }
}

export default Dashboard;
