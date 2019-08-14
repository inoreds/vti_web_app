import React, {Component} from 'react';
import {Button, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Row, FormGroup, Input, Label, Table, Col} from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect} from "remx";
import moment from 'moment-with-locales-es6';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";
import NumberFormat from 'react-number-format';

import broker from "../../../utils/broker"



class DataPassport extends Component {
  constructor(props) {
    super(props);

    this.options = {
     
    }
    this.state = {
      data : this.props.data
    }
  }

  componentWillReceiveProps (newProps) {
    if(newProps.data) {
        this.setState({
          data: newProps.data
        })
    }
  }

  render() {
    if (this.state.data){
      return (
        <div className="animated">
             <Row>
                    <Col xs="12" sm="6">
                        <pre>
                            <h5>No Passport                 : {this.state.data.no_passport}</h5>
                            <h5>Nama Lengkap                : {this.state.data.nama_lengkap}</h5>
                            <h5>Warga Negara                : {this.state.data.warga_negara}</h5>
                            <h5>Tgl. Lahir                  : {this.state.data.tgl_lahir}</h5>
                            <h5>Tempat Lahir                : {this.state.data.tempat_lahir}</h5>
                            <h5>Tgl. Pengeluaran            : {this.state.data.tgl_pengeluaran}</h5>
                            <h5>Tgl. Habis Berlaku          : {this.state.data.tgl_habis_berlaku}</h5>
                            <h5>No. Reg                     : {this.state.data.no_reg}</h5>
                            <h5>Kantor. Yang Mengeluarkan   : {this.state.data.kantor_yang_mengeluarkan}</h5>
                        </pre>
                    </Col>
                    {/* <Col xs="12" sm="6">
                        <pre>
                            <h5>Kecamatan                   : {this.state.data}</h5>
                            <h5>Agama                       : {this.state.data}</h5>
                            <h5>Status Pernikahan           : {this.state.data}</h5>
                            <h5>Pekerjaan                   : {this.state.data}</h5>
                            <h5>Warga Negara                : {this.state.data}</h5>
                            <h5>Berlaku                     : {this.state.data}</h5>
                        </pre>
                    </Col> */}
            </Row>   
        </div>
    );
    } else {
      <div>Sedang Memuat Halaman</div>
    }
    
  }
}
function mapStateToProps(props) {
  return {
      
  }
}
export default connect(mapStateToProps)(DataPassport);
