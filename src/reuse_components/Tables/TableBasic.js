import React, {Component} from 'react';
import ReactTable from 'react-table';
import {Row, Col} from 'reactstrap';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";

class TableBasic extends Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }
    this.state = {
      loading: false,
      data: this.props.data,
      columns: this.props.columns,
    }
  }

  render() {
    return (
        <div>
            <Row>
                <Col xs="12" sm="12">
                    <h5>{this.props.title}</h5>
                    <hr className="my-2" />                
                    <ReactTable
                        columns={this.props.columns}
                        data={this.props.data}
                        loading={this.state.loading}
                        filterable={false}
                        sortable={false}
                        defaultPageSize={5}
                        className="table table-striped table-hover table-bordered -striped -highlight" />
                </Col>
            </Row>
        </div>
    );
  }
}

export default TableBasic;
