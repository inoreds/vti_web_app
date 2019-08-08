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
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Nama Lengkap</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Tgl. Lahir</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Jenis Kelamin</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Tgl. Transaksi</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Buku Nikah</Label>
                            </Col>
                            <Col xs="12" md="9">
                             <Input type="file" id="file-input" name="file-input" />
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Rekening Tabungan</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="file" id="file-input" name="file-input" />
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Akta Kelahiran</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="file" id="file-input" name="file-input" />
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Foto Terbaru</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="file" id="file-input" name="file-input" />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6">
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Airline</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Batch</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Hotel</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Kaos</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Meals</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
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
