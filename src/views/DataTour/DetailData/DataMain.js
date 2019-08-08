import React, {Component} from 'react';
import {Button, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Row, FormGroup, FormText, Input, Label, Table, Col} from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect} from "remx";
import moment from 'moment-with-locales-es6';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";
import NumberFormat from 'react-number-format';

import broker from "../../../utils/broker"



class DataMain extends Component {
  constructor(props) {
    super(props);

    this.options = {
     
    }
    this.state = {

    }

  }

  render() {
    return (
        <div className="animated">
             <Row>
                 
                    <Col xs="12" sm="6"> 
                        <pre>
                            <h5>Nama Lengkap                : ..................</h5>
                            <h5>Tgl. Lahir                  : ..................</h5>
                            <h5>Jenis Kelammin              : ..................</h5>
                            <h5>Tgl. Transaksi              : ..................</h5>
                            <h5>Trip                        : ..................</h5>
                            <h5>Status                      : ..................</h5>
                            <h5>Buku Nikah                  : ..................</h5>
                            <h5>Rekening Tabungan           : ..................</h5>
                            <h5>Akta Kelahiran              : ..................</h5>
                            <h5>Foto Terbaru                : ..................</h5>
                            <h5>Input (By)                  : ..................</h5>
                        </pre>
                    </Col>
                    <Col xs="12" sm="6">
                        <pre>
                            <h5>Status Validasi (Admin)     : ..................</h5>
                            <h5>Tgl. Validasi (Admin)       : ..................</h5>
                            <h5>Validasi (Admin)            : ..................</h5>
                            <h5>Status Validasi (Diamond)   : ..................</h5>
                            <h5>Tgl. Validasi (Diamond)     : ..................</h5>
                            <h5>Validasi (Diamond)          : ..................</h5>
                            <h5>Airline                     : ..................</h5>
                            <h5>Batch                       : ..................</h5>
                            <h5>Hotel                       : ..................</h5>
                            <h5>Kaos                        : ..................</h5>
                            <h5>Meals                       : ..................</h5>
                        </pre>
                    </Col>
            </Row>
           
        </div>
    );
  }
}
function mapStateToProps(props) {
  return {
      
  }
}
export default connect(mapStateToProps)(DataMain);
