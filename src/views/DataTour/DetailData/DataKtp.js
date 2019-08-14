import React, {Component} from 'react';
import {Button, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Row, FormGroup, Input, Label, Table, Col} from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect} from "remx";
import moment from 'moment-with-locales-es6';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";
import NumberFormat from 'react-number-format';

import broker from "../../../utils/broker"



class DataKTP extends Component {
  constructor(props) {
    super(props);

    this.options = {
     
    }
    this.state = {
      data: this.props.data
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
    if (this.state.data) {
      return (
        <div className="animated">
            <Row>
                    <Col xs="12" sm="6">
                        <pre>
                            <h5>NIK                         : {this.state.data.nik}</h5>
                            <h5>Nama Lengkap                : {this.state.data.nama_lengkap}</h5>
                            <h5>Tempat Tgl. Lahir           : {this.state.data.tempat_tgl_lahir}</h5>
                            <h5>Jenis Kelamin               : {this.state.data.jenis_kelamin}</h5>
                            <h5>Gol Darah                   : {this.state.data.gol_darah}</h5>
                            <h5>Alamat                      : {this.state.data.alamat}</h5>
                            <h5>RT. RW                      : {this.state.data.rt_rw}</h5>
                            <h5>Kelurahan / Desa            : {this.state.data.kel_desa}</h5>
                        </pre>
                    </Col>
                    <Col xs="12" sm="6">
                        <pre>
                            <h5>Kecamatan                   : {this.state.data.kecamatan}</h5>
                            <h5>Agama                       : {this.state.data.agama}</h5>
                            <h5>Status Pernikahan           : {this.state.data.status_pernikahan}</h5>
                            <h5>Pekerjaan                   : {this.state.data.pekerjaan}</h5>
                            <h5>Warga Negara                : {this.state.data.warga_negara}</h5>
                            <h5>Berlaku                     : {this.state.data.berlaku}</h5>
                        </pre>
                    </Col>
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
export default connect(mapStateToProps)(DataKTP);
