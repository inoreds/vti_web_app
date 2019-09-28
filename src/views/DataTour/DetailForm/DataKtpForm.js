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

class DataKTP extends Component {
  constructor(props) {
    super(props);

    this.options = {
     
    }
    this.state = {
        data : this.props.data
    }

    this.onChangeAgama = this.onChangeAgama.bind(this);
    this.onChangeAlamat = this.onChangeAlamat.bind(this);
    this.onChangeBerlaku = this.onChangeBerlaku.bind(this);
    this.onChangeNIK = this.onChangeNIK.bind(this);
    this.onChangeGolDarah = this.onChangeGolDarah.bind(this);
    this.onChangeKecamatan = this.onChangeKecamatan.bind(this);
    this.onChangeNamalengkap = this.onChangeNamalengkap.bind(this);
    this.onChangeKelDesa = this.onChangeKelDesa.bind(this);
    this.onChangeRtRw = this.onChangeRtRw.bind(this);
    this.onChangePekerjaan = this.onChangePekerjaan.bind(this);
    this.onChangeStatusPernikahan = this.onChangeStatusPernikahan.bind(this);
    this.onChangeTempatLahir = this.onChangeTempatLahir.bind(this);
    this.onChangeTglLahir = this.onChangeTglLahir.bind(this);
    this.onChangeWargaNegara = this.onChangeWargaNegara.bind(this);

  }

  onChangeAgama(e){
    this.setState({
        agama: e.target.value
    })
  }

  onChangeAlamat(e){
    this.setState({
        alamat: e.target.value
    })
  }

  onChangeBerlaku(e){
    this.setState({
        berlaku: e.target.value
    })
  }

  onChangeNIK(e){
    this.setState({
        nik: e.target.value
    })
  }

  onChangeGolDarah(e){
    this.setState({
        gol_darah: e.target.value
    })
  }

  onChangeKecamatan(e){
    this.setState({
        kecamatan: e.target.value
    })
  }
  
  onChangeNamalengkap(e){
    this.setState({
        nama_lengkap: e.target.value
    })
  }

  onChangeKelDesa(e){
    this.setState({
        kel_desa: e.target.value
    })
  }

  onChangeRtRw(e){
    this.setState({
        rt_rw: e.target.value
    })
  }

  onChangePekerjaan(e){
    this.setState({
        pekerjaan: e.target.value
    })
  }

  onChangeStatusPernikahan(e){
    this.setState({
        status_pernikahan: e.target.value
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

  onChangeWargaNegara(e){
    this.setState({
        warga_negara: e.target.value
    })
  }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.data_tour_ktp !== prevProps.data_tour_ktp){
            // console.log(this.props.data_tour_ktp)
            if (this.props.data_tour_ktp.form === 'view' && this.props.data_tour_ktp.status === 'save') {
                this.save();
                dataStore.setters.setDataTourKtp({'form' : 'view', 'status': 'view'});
            }
        }
    }

    save(){
        var data = new FormData();
        data.append('nama_lengkap', this.state.nama_lengkap);
        data.append('tempat_lahir', this.state.tempat_lahir);
        data.append('tgl_lahir', this.state.tgl_lahir);
        data.append('gol_darah', this.state.gol_darah);
        data.append('nik', this.state.nik);
        data.append('alamat', this.state.alamat);
        data.append('rt_rw', this.state.rt_rw);
        data.append('kel_desa', this.state.kel_desa);
        data.append('kecamatan', this.state.kecamatan);
        data.append('agama', this.state.agama);
        data.append('status_perniakahan', this.state.status_perniakahan);
        data.append('warga_negara', this.state.warga_negara);
        data.append('pekerjaan', this.state.pekerjaan);
        data.append('berlaku', this.state.berlaku);

        broker.fetch.post(`transaction/data_tour_ktp/${this.props.id}`, data)
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

  componentDidMount(){
      this.setState({
          nama_lengkap : this.state.data.nama_lengkap,
          tempat_lahir : this.state.data.tempat_lahir,
          tgl_lahir : this.state.data.tgl_lahir,
          gol_darah : this.state.data.gol_darah,
          nik : this.state.data.nik,
          alamat : this.state.data.alamat,
          rt_rw : this.state.data.rt_rw,
          kel_desa : this.state.data.kel_desa,
          kecamatan : this.state.data.kecamatan,
          agama : this.state.data.agama,
          status_pernikahan : this.state.data.status_pernikahan,
          warga_negara : this.state.data.warga_negara,
          pekerjaan : this.state.data.pekerjaan,
          berlaku : this.state.data.berlaku,

      })
  }

  render() {
    return (
        <div className="animated">
             <Row>
                    <Col xs="12" sm="6">
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">NIK</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" onChange={this.onChangeNIK} value = {this.state.nik} />
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Nama Lengkap</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" onChange={this.onChangeNamalengkap} value = {this.state.nama_lengkap} />
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
                                <Label htmlFor="text-input">Tgl Lahir</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" onChange={this.onChangeTglLahir} value = {this.state.tgl_lahir} />
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Gol Darah</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" onChange={this.onChangeGolDarah} value = {this.state.gol_darah} />
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Alamat</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" onChange={this.onChangeAlamat} value = {this.state.alamat} />
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">RT. RW</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" onChange={this.onChangeRtRw} value = {this.state.rt_rw} />
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6">
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Kelurahan / Desa</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" onChange={this.onChangeKelDesa} value = {this.state.kel_desa} />
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Kecamatan</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" onChange={this.onChangeKecamatan} value = {this.state.kecamatan} />
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Agama</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" onChange={this.onChangeAgama} value = {this.state.agama} />
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Status Pernikahan</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" onChange={this.onChangeStatusPernikahan} value = {this.state.status_pernikahan} />
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Pekerjaan</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" onChange={this.onChangePekerjaan} value = {this.state.pekerjaan} />
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
                                <Label htmlFor="text-input">Berlaku</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" onChange={this.onChangeBerlaku} value = {this.state.berlaku} />
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
    data_tour_ktp: dataStore.getters.getDataTourKtp()
  }
}
export default connect(mapStateToProps)(DataKTP);
