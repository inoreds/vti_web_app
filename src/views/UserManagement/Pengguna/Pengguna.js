import React, {Component} from 'react';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";

import MasterViewer from "../../../components/MasterViewer"

import data_field from './_field';


class JobCategories extends Component {
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
      id_pk_column: 'id_m_pengguna',
      id: this.props.match.params.id,
      url: { url_get_data : `/pengguna/${this.props.match.params.id}`, url_save_data: '/pengguna', url_update_data: '/pengguna', 
             url_delete_data: '/pengguna', url_get_data_per: '/pengguna' },
      title: 'Pengguna',
      fields: data_field.data,
      columns: [
        { Header: 'Nama', id: 'nama_pengguna', accessor: 'nama_pengguna', className: 'text-center'},
        { Header: 'username', id: 'username_pengguna', accessor: 'username_pengguna', className: 'text-center'},
        { Header: 'email', id: 'email_pengguna', accessor: 'email_pengguna', className: 'text-center'},
        
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
            id_pk={this.state.id} 
            id_pk_column={this.state.id_pk_column}
            add_form={true}
      />
      // null
    );
  }
}

export default JobCategories;
