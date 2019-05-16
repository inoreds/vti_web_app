import React, {Component} from 'react';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";
import {Button} from 'reactstrap';

import MasterViewer from "../../../components/MasterViewer"

import data_field from './_field';


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
      id_pk_column: 'id_m_grup_pengguna',
      url: { url_get_data : '/grup_pengguna', url_save_data: '/grup_pengguna', url_update_data: '/grup_pengguna', 
             url_delete_data: '/grup_pengguna', url_get_data_per: '/grup_pengguna' },
      title: 'Grup Pengguna',
      fields: data_field.data,
      columns: [
        { Header: 'Nama', id: 'name', accessor: 'nama_grup_pengguna', className: 'text-center'},
        { Header: 'Daftar Pengguna',id: 'daftar_pengguna', accessor: 'id_m_grup_pengguna',
          Cell: row => {
            return <div className="text-center">
                      <Button size="sm" className="btn-outline-dark icon mr-1 mb-1" outline color="primary" onClick={() => this.props.history.push(`/grup_user/${row.value}/user`)}>Lihat Daftar</Button>
                  </div>  
          }
        }
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
            add_form={true}
      />
    );
  }
}

export default GrupPengguna;
