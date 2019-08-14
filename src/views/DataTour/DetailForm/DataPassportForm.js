import React, {Component} from 'react';
import {Button, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Row, FormGroup, FormText, Input, Label, Table, Col} from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect} from "remx";
import moment from 'moment-with-locales-es6';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";
import NumberFormat from 'react-number-format';

import broker from "../../../utils/broker"
import dataStore from '../../../stores/data'



class DataPassport extends Component {
  constructor(props) {
    super(props);

    this.options = {
     
    }
    this.state = {
        data : this.props.data
    }
    this.onChangeKantorYangMengeluarkan = this.onChangeKantorYangMengeluarkan.bind(this);
    this.onChangeTglHabisBerlaku = this.onChangeTglHabisBerlaku.bind(this);
    this.onChangeNamaLengkap = this.onChangeNamaLengkap.bind(this);
    this.onChangeNoPassport = this.onChangeNoPassport.bind(this);
    this.onChangeNoReg = this.onChangeNoReg.bind(this);
    this.onChangeTempatLahir = this.onChangeTempatLahir.bind(this);
    this.onChangeTglLahir = this.onChangeTglLahir.bind(this);
    this.onChangeTglPengeluaran = this.onChangeTglPengeluaran.bind(this);
    this.onChangeWargaNegara = this.onChangeWargaNegara.bind(this);
  }

  onChangeWargaNegara(e){
    this.setState({
        warga_negara: e.target.value
    })
  }
  
  onChangeKantorYangMengeluarkan(e){
    this.setState({
        kantor_yang_mengeluarkan: e.target.value
    })
  }

  onChangeTglHabisBerlaku(e){
    this.setState({
        tgl_habis_berlaku: e.target.value
    })
  }

  onChangeNamaLengkap(e){
    this.setState({
        nama_lengkap: e.target.value
    })
  }

  onChangeNoPassport(e){
    this.setState({
        no_passport: e.target.value
    })
  }

  onChangeNoReg(e){
    this.setState({
        no_reg: e.target.value
    })
  }

  onChangeTempatLahir(e){
    this.setState({
        tempat_lahir: e.target.value
    })
  }

  onChangeTglLahir(e){
    this.setState({
        tgl_lahir: e.target.value
    })
  }

  onChangeTglPengeluaran(e){
    this.setState({
        tgl_pengeluaran: e.target.value
    })
  }

    componentDidMount(){
        this.setState({
            nama_lengkap : this.state.data.nama_lengkap,
            no_passport : this.state.data.no_passport,
            warga_negara : this.state.data.warga_negara,
            tgl_lahir : this.state.data.tgl_lahir,
            tempat_lahir : this.state.data.tempat_lahir,
            tgl_pengeluaran : this.state.data.tgl_pengeluaran,
            tgl_habis_berlaku : this.state.data.tgl_habis_berlaku,
            no_reg : this.state.data.no_reg,
            kantor_yang_mengeluarkan : this.state.data.kantor_yang_mengeluarkan,

        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.data_tour_passport !== prevProps.data_tour_passport){
            // console.log(this.props.data_tour_passport)
            if (this.props.data_tour_passport.form === 'view' && this.props.data_tour_passport.status === 'save') {
                this.save();
                dataStore.setters.setDataTourPassport({'form' : 'view', 'status': 'view'});
            }
        }
    }

    save(){
        var data = new FormData();
        data.append('nama_lengkap', this.state.nama_lengkap);
        data.append('no_passport', this.state.no_passport);
        data.append('warga_negara', this.state.warga_negara);
        data.append('tgl_lahir', this.state.tgl_lahir);
        data.append('tempat_lahir', this.state.tempat_lahir);
        data.append('tgl_pengeluaran', this.state.tgl_pengeluaran);
        data.append('tgl_habis_berlaku', this.state.tgl_habis_berlaku);
        data.append('no_reg', this.state.no_reg);
        data.append('kantor_yang_mengeluarkan', this.state.kantor_yang_mengeluarkan);

        broker.fetch.post(`transaction/data_tour_passport/${this.props.id}`, data)
        .then(res => {
            const { data } = res;
            if (data.status === true) {
                dataStore.setters.setReloadTable(true);
            } else {

            }
        }).catch(err => {
            
        });
    }

    componentWillReceiveProps (newProps) {
        if(newProps.data) {
                this.setState({
                data: newProps.data
            })
        }
    }

  render() {
    return (
        <div className="animated">
             <Row>
              <Col xs="12" sm="6">
                  <FormGroup row  className="m-2">
                      <Col md="3">
                          <Label htmlFor="text-input">No Passport</Label>
                      </Col>
                      <Col xs="12" md="9">
                          <Input type="text" id="text-input" name="text-input" onChange={this.onChangeNoPassport} value = {this.state.no_passport} />
                      </Col>
                  </FormGroup>
                  <FormGroup row  className="m-2">
                      <Col md="3">
                          <Label htmlFor="text-input">Nama Lengkap</Label>
                      </Col>
                      <Col xs="12" md="9">
                          <Input type="text" id="text-input" name="text-input" onChange={this.onChangeNamaLengkap} value = {this.state.nama_lengkap} />
                      </Col>
                  </FormGroup>
                  <FormGroup row  className="m-2">
                      <Col md="3">
                          <Label htmlFor="text-input">Warga Negara</Label>
                      </Col>
                      <Col xs="12" md="9">
                          <Input type="text" id="text-input" name="text-input" onChange={this.onChangeWargaNegara} value = {this.state.warga_negara} />
                      </Col>
                  </FormGroup>
                  <FormGroup row  className="m-2">
                      <Col md="3">
                          <Label htmlFor="text-input">Tgl. Lahir</Label>
                      </Col>
                      <Col xs="12" md="9">
                          <Input type="text" id="text-input" name="text-input" onChange={this.onChangeTglLahir} value = {this.state.tgl_lahir} />
                      </Col>
                  </FormGroup>
                  <FormGroup row  className="m-2">
                      <Col md="3">
                          <Label htmlFor="text-input">Tempat Lahir</Label>
                      </Col>
                      <Col xs="12" md="9">
                          <Input type="text" id="text-input" name="text-input" onChange={this.onChangeTempatLahir} value = {this.state.tempat_lahir} />
                      </Col>
                  </FormGroup>
                  <FormGroup row  className="m-2">
                      <Col md="3">
                          <Label htmlFor="text-input">Tgl. Pengeluaran</Label>
                      </Col>
                      <Col xs="12" md="9">
                          <Input type="text" id="text-input" name="text-input" onChange={this.onChangeTglPengeluaran} value = {this.state.tgl_pengeluaran} />
                      </Col>
                  </FormGroup>
                  <FormGroup row  className="m-2">
                      <Col md="3">
                          <Label htmlFor="text-input">Tgl. Habis Berlaku</Label>
                      </Col>
                      <Col xs="12" md="9">
                          <Input type="text" id="text-input" name="text-input" onChange={this.onChangeTglHabisBerlaku} value = {this.state.tgl_habis_berlaku} />
                      </Col>
                  </FormGroup>
                  <FormGroup row  className="m-2">
                      <Col md="3">
                          <Label htmlFor="text-input">No. Reg</Label>
                      </Col>
                      <Col xs="12" md="9">
                          <Input type="text" id="text-input" name="text-input" onChange={this.onChangeNoReg} value = {this.state.no_reg} />
                      </Col>
                  </FormGroup>
                  <FormGroup row  className="m-2">
                      <Col md="3">
                          <Label htmlFor="text-input">Kantor Yang Mengeluarkan</Label>
                      </Col>
                      <Col xs="12" md="9">
                          <Input type="text" id="text-input" name="text-input" onChange={this.onChangeKantorYangMengeluarkan} value = {this.state.kantor_yang_mengeluarkan} />
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
        data_tour_passport: dataStore.getters.getDataTourPassport()
  }
}
export default connect(mapStateToProps)(DataPassport);
