import React, {Component} from 'react';
import {Button, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Row, FormGroup, FormText, Input, Label, Table, Col} from 'reactstrap';
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

    }

  }

  render() {
    return (
        <div className="animated">
             <Row>
                    <Col xs="12" sm="6">
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">NIK</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
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
                                <Label htmlFor="text-input">Tempat Tgl. Lahir</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Gol Darah</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Alamat</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">RT. RW</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Kelurahan / Desa</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6">
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Kecamatan</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Agama</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Status Pernikahan</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Pekerjaan</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Warga Negara</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" placeholder="Text" />
                                <FormText color="muted">This is a help text</FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-0">
                            <Col md="3">
                                <Label htmlFor="text-input">Berlaku</Label>
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
export default connect(mapStateToProps)(DataKTP);
