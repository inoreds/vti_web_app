import React, {Component} from 'react';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";

import MasterViewer from "../../../components/MasterViewer"

import data_field from './_field';


class Kaos extends Component {
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
      url: { url_get_data : '/master/kaos', url_save_data: '/master/kaos', url_update_data: '/master/kaos', 
             url_delete_data: '/master/kaos', url_get_data_per: '/master/kaos' },
      title: 'Master Kaos',
      fields: data_field.data,
      columns: [
        { Header: 'Nama', id: 'name', accessor: 'nama_kaos', className: 'text-center'},
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

export default Kaos;
