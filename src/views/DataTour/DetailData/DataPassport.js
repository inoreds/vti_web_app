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

    }

  }

  render() {
    return (
        <div className="animated">
             <Row>
                    <Col xs="12" sm="6">
                        <pre>
                            <h5>No Passport                 : ..................</h5>
                            <h5>Nama Lengkap                : ..................</h5>
                            <h5>Warga Negara                : ..................</h5>
                            <h5>Tgl. Lahir                  : ..................</h5>
                            <h5>Tempat Lahir                : ..................</h5>
                            <h5>Tgl. Pengeluaran            : ..................</h5>
                            <h5>Tgl. Habis Berlaku          : ..................</h5>
                            <h5>No. Reg                     : ..................</h5>
                            <h5>Kantor. Yang Mengeluarkan   : ..................</h5>
                        </pre>
                    </Col>
                    {/* <Col xs="12" sm="6">
                        <pre>
                            <h5>Kecamatan                   : ..................</h5>
                            <h5>Agama                       : ..................</h5>
                            <h5>Status Pernikahan           : ..................</h5>
                            <h5>Pekerjaan                   : ..................</h5>
                            <h5>Warga Negara                : ..................</h5>
                            <h5>Berlaku                     : ..................</h5>
                        </pre>
                    </Col> */}
            </Row>
           
        </div>
    );
  }
}
function mapStateToProps(props) {
  return {
      
  }
}
export default connect(mapStateToProps)(DataPassport);
