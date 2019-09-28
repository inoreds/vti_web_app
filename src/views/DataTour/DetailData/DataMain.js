import React, {Component} from 'react';
import {Button, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Row, FormGroup, FormText, Input, Label, Table, Col} from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect} from "remx";
import moment from 'moment-with-locales-es6';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";
import NumberFormat from 'react-number-format';
import dataStore from '../../../stores/data'

import config from '../../../utils/config'
import broker from "../../../utils/broker"

class DataMain extends Component {
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
  componentDidUpdate(prevProps, prevState) {
    if(this.props.data_tour_main !== prevProps.data_tour_main){
      if (this.props.data_tour_main.form === 'view' && this.props.data_tour_main.status === 'view') {
        // console.log("view bos")
        this.setState({data : this.props.data})
      }
    }
}

  render() {
    // console.log(this.state.data)
    if (this.state.data) {
      return (
        <div className="animated">
             <Row>              
                    <Col xs="12" sm="6"> 
                        <pre>
                            <h5>Nama Lengkap                : {this.state.data.nama_lengkap}</h5>
                            <h5>Tgl. Lahir                  : {this.state.data.tgl_lahir}</h5>
                            <h5>Jenis Kelammin              : {this.state.data.jenis_kelamin}</h5>
                            <h5>Tgl. Transaksi              : {this.state.data.tgl_transaksi}</h5>
                            <h5>Trip                        : {this.state.data.trip}</h5>
                            <h5>Status                      : {this.state.data.status}</h5>
                            <h5>KTP                         : {(this.state.data.ktp) ? <a target="_blank" href={config.api_endpoint + this.state.data.ktp}>Lihat Data</a> : ''}</h5>
                            <h5>Passport                    : {(this.state.data.passport) ? <a target="_blank" href={config.api_endpoint + this.state.data.passport}>Lihat Data</a> : ''}</h5>
                            <h5>Buku Nikah                  : {(this.state.data.buku_nikah) ? <a target="_blank" href={config.api_endpoint + this.state.data.buku_nikah}>Lihat Data</a> : ''}</h5>
                            <h5>Rekening Tabungan           : {(this.state.data.rekening_tabungan) ? <a target="_blank" href={config.api_endpoint + this.state.data.rekening_tabungan}>Lihat Data</a> : ''}</h5>
                            <h5>Akta Kelahiran              : {(this.state.data.akta_kelahiran) ? <a target="_blank" href={config.api_endpoint + this.state.data.akta_kelahiran}>Lihat Data</a> : ''}</h5>
                            <h5>Foto Terbaru                : {(this.state.data.foto_terbaru) ? <a target="_blank" href={config.api_endpoint + this.state.data.foto_terbaru}>Lihat Data</a> : ''}</h5>
                        </pre>
                    </Col>
                    <Col xs="12" sm="6">
                        <pre>
                            <h5>Hubungan Keluarga           : {(this.state.data.hubungan_keluarga) ? this.state.data.hubungan_keluarga: null}</h5>
                            <h5>Input (By)                  : {(this.state.data.input_by) ? this.state.data.input_by.nama_lengkap : null}</h5>
                            <h5>Status Validasi (Admin)     : {(this.state.data.status_validasi_admin === 0) ? 'BELUM DIVERIFIKASI' : 'SUDAH DIVERIFIKASI' }</h5>
                            <h5>Tgl. Validasi (Admin)       : {this.state.data.tgl_validasi_admin}</h5>
                            <h5>Validasi (Admin)            : {this.state.data.validasi_admin}</h5>
                            <h5>Status Validasi (Diamond)   : {(this.state.data.status_validasi_diamond === 0) ? 'BELUM DIVERIFIKASI' : 'SUDAH DIVERIFIKASI' }</h5>
                            <h5>Tgl. Validasi (Diamond)     : {this.state.data.tgl_validasi_diamond}</h5>
                            <h5>Validasi (Diamond)          : {this.state.data.validasi_diamond}</h5>
                            <h5>Airline                     : {(this.state.data.airline_id) ? this.state.data.airline_id.nama_airline : null}</h5>
                            <h5>Batch                       : {(this.state.data.batch_id) ? this.state.data.batch_id.nama_batch : null}</h5>
                            <h5>Hotel                       : {(this.state.data.hotel_id) ? this.state.data.hotel_id.nama_hotel : null}</h5>
                            <h5>Kaos                        : {(this.state.data.uk_kaos_id) ? this.state.data.uk_kaos_id.nama_kaos : null}</h5>
                            <h5>Meals                       : {(this.state.data.meals_id) ? this.state.data.meals_id.nama_meal : null}</h5>
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
    data_tour_main: dataStore.getters.getDataTourMain()
  }
}
export default connect(mapStateToProps)(DataMain);
