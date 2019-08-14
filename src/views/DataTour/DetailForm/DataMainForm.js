import React, {Component} from 'react';
import {Button, Card, CardHeader, CardBody, Modal, ModalHeader, ModalBody, ModalFooter, Row, FormGroup, FormText, Input, Label, Table, Col} from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect} from "remx";
import moment from 'moment-with-locales-es6';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";
import NumberFormat from 'react-number-format';
import dataStore from '../../../stores/data'

import broker from "../../../utils/broker"

class DataMain extends Component {
  constructor(props) {
    super(props);

    this.options = {
     
    }
    this.state = {
        data : this.props.data,
        airlines: [],
        batches : [],
        meals : [],
        uk_kaoses: [],
        hotels: [],
        nama_lengkap : '',
        jenis_kelamin : '',
        tgl_lahir : null,
        meals_id : null,
        hotel_id : null,
        batch_id : null,
        airline_id : null,
        uk_kaos_id : null,
        file_ktp: null,
        file_buku_nikah : null,
        file_foto_terbaru : null,
        file_rekening : null,
        file_akta : null,
    }
    this.onChangeNamalengkap = this.onChangeNamalengkap.bind(this)
    this.onChangeTglLahir = this.onChangeTglLahir.bind(this)
    this.onChangeJenisKelamin = this.onChangeJenisKelamin.bind(this)
    this.onChangeAirline = this.onChangeAirline.bind(this)
    this.onChangeBatch = this.onChangeBatch.bind(this)
    this.onChangeMeals = this.onChangeMeals.bind(this)
    this.onChangeHotels = this.onChangeHotels.bind(this)
    this.onChangeUkKaos = this.onChangeUkKaos.bind(this)
    this.onChangeAkta = this.onChangeAkta.bind(this)
    this.onChangeFotoTerbaru = this.onChangeFotoTerbaru.bind(this)
    this.onChangeRekening = this.onChangeRekening.bind(this)
    this.onChangeBukuNikah = this.onChangeBukuNikah.bind(this)
  }
  
  getDataAirline(){
    broker.fetch.get(`master/airline`)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
            const list = data.data
            this.setState({airlines: list.data}, function(){
                if (!this.state.data.airline_id){
                    this.setState({
                        airline_id : list.data[0].id
                    });
                } else {
                    this.setState({
                        airline_id : this.state.data.airline_id.id
                    });
                }
            });
        } else {

        }
    }).catch(err => {
        
    });
  }

  getDataBatch(){
    broker.fetch.get(`master/batch`)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
            const list = data.data
            this.setState({batches: list.data}, function(){
                if (!this.state.data.batch_id){
                    this.setState({
                        batch_id : list.data[0].id
                    });
                } else {
                    this.setState({
                        batch_id : this.state.data.batch_id.id
                    });
                }
            });
        } else {

        }
    }).catch(err => {
        
    });
  }

  getDataHotel(){
    broker.fetch.get(`master/hotel`)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
            const list = data.data
            this.setState({hotels: list.data}, function(){
                if (!this.state.data.hotel_id){
                    this.setState({
                        hotel_id : list.data[0].id
                    });
                } else {
                    this.setState({
                        hotel_id : this.state.data.hotel_id.id
                    });
                }
            });
        } else {

        }
    }).catch(err => {
        
    });
  }

  getDataMeals(){
    broker.fetch.get(`master/meal`)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
            const list = data.data
            this.setState({meals: list.data}, function(){
                if (!this.state.data.meals_id){
                    this.setState({
                        meals_id : list.data[0].id
                    });
                } else {
                    this.setState({
                        meals_id : this.state.data.meals_id.id
                    });
                }
            });
        } else {

        }
    }).catch(err => {
        
    });
  }

  getDataUkKaos(){
    broker.fetch.get(`master/kaos`)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
            const list = data.data
            this.setState({uk_kaoses: list.data}, function(){
                if (!this.state.data.uk_kaos_id){
                    this.setState({
                        uk_kaos_id : list.data[0].id
                    });
                } else {
                    this.setState({
                        uk_kaos_id : this.state.data.uk_kaos_id.id
                    });
                }
            });
        } else {
            
        }
    }).catch(err => {
        
    });
  }

    componentDidMount(){
        this.getDataAirline();
        this.getDataBatch();
        this.getDataHotel();
        this.getDataMeals();
        this.getDataUkKaos();
        this.setState({
            nama_lengkap : this.state.data.nama_lengkap,
            tgl_lahir: (this.state.data.tgl_lahir) ? this.state.data.tgl_lahir : moment().format('YYYY-MM-DD'),
            jenis_kelamin : (this.state.data.jenis_kelamin) ? this.state.data.jenis_kelamin : 'LAKI-LAKI'
        })
        // dataStore.setters.setDataTourMain(this.state.data)
    }

    componentWillReceiveProps (newProps) {
        if(newProps.data) {
                this.setState({
                data: newProps.data
            })
        }
    }

  onChangeNamalengkap(e) {
    this.setState({
        nama_lengkap: e.target.value
    })
    // dataStore.setters.setDataTourMain(this.state.data);
  }

  onChangeTglLahir(e){
    this.setState({
        tgl_lahir: e.target.value
    })
  }

  onChangeJenisKelamin(e){
    this.setState({
        jenis_kelamin: e.target.value
    })
  }

  onChangeAirline(e){
    this.setState({
        airline_id: e.target.value
    })
  }

  onChangeHotels(e){
    this.setState({
        hotel_id: e.target.value
    })
  }

    onChangeBatch(e){
        this.setState({
            batch_id: e.target.value
        })
    }

    onChangeMeals(e){
        this.setState({
            meals_id: e.target.value
        })
    }

    onChangeUkKaos(e){
        this.setState({
            uk_kaos_id: e.target.value
        })
    }

    onChangeBukuNikah(e) {
        let value = e.target.files[0];
        this.setState({
            file_buku_nikah: value
        })
    }
    
    onChangeAkta(e) {
        let value = e.target.files[0];
        this.setState({
            file_akta: value
        })
    }

    onChangeFotoTerbaru(e) {
        let value = e.target.files[0];
        this.setState({
            file_foto_terbaru: value
        })
    }

    onChangeRekening(e) {
        let value = e.target.files[0];
        this.setState({
            file_rekening: value
        })  
    }

    save(){
        var data = new FormData();
        data.append('nama_lengkap', this.state.nama_lengkap);
        data.append('jenis_kelamin', this.state.jenis_kelamin);
        data.append('tgl_lahir', this.state.tgl_lahir);
        data.append('uk_kaos_id', this.state.uk_kaos_id);
        data.append('hotel_id', this.state.hotel_id);
        data.append('batch_id', this.state.batch_id);
        data.append('airline_id', this.state.airline_id);
        data.append('meals_id', this.state.meals_id);
        data.append('foto_terbaru', this.state.file_foto_terbaru);
        data.append('akta_kelahiran', this.state.file_akta);
        data.append('buku_nikah', this.state.file_buku_nikah);
        data.append('rekening_tabungan', this.state.file_rekening);

        broker.fetch.post(`transaction/data_tour_main/${this.props.id}`, data)
        .then(res => {
            const { data } = res;
            if (data.status === true) {
                dataStore.setters.setReloadTable(true);
            } else {

            }
        }).catch(err => {
            
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.data_tour_main !== prevProps.data_tour_main){
            // console.log(this.props.data_tour_main)
            if (this.props.data_tour_main.form === 'view' && this.props.data_tour_main.status === 'save') {
                this.save();
                dataStore.setters.setDataTourMain({'form' : 'view', 'status': 'view'});
            }
        }
    }

  render() {
    // console.log(this.state.tgl_lahir)
    return (
        <div className="animated">
             <Row>
                    <Col xs="12" sm="6">
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Nama Lengkap</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="text" id="text-input" name="text-input" onChange={this.onChangeNamalengkap} value = {this.state.nama_lengkap} />
                                {/* <FormText color="muted">This is a help text</FormText> */}
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Tgl. Lahir</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="date" id="text-input" name="text-input"  onChange={this.onChangeTglLahir} value = {(this.state.tgl_lahir) ? this.state.tgl_lahir : moment().format("mm-dd-YYYY")}/>
                                {/* <FormText color="muted">This is a help text</FormText> */}
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Jenis Kelamin</Label>
                            </Col>
                            <Col md="9">
                                <div onChange = {this.onChangeJenisKelamin}>
                                    <FormGroup check inline>
                                        <Input className="form-check-input" value = "LAKI-LAKI" checked={(this.state.jenis_kelamin === 'LAKI-LAKI') ? true : false} type="radio" id="inline-radio1" name="inline-radios" />
                                        <Label className="form-check-label" check htmlFor="inline-radio1">LAKI-LAKI</Label>
                                    </FormGroup>
                                    <FormGroup check inline>
                                        <Input className="form-check-input" value = "PEREMPUAN" checked={(this.state.jenis_kelamin === 'PEREMPUAN') ? true : false} type="radio" id="inline-radio2" name="inline-radios" />
                                        <Label className="form-check-label" check htmlFor="inline-radio2">PEREMPUAN</Label>
                                    </FormGroup>
                                </div>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Buku Nikah</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="file" id="file-input" placeholder = "Pilih File.. " onChange={this.onChangeBukuNikah} accept="image/*" multiple={false}></Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Rekening Tabungan</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="file" id="file-input" placeholder = "Pilih File.. " onChange={this.onChangeRekening} accept="image/*" multiple={false}></Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Akta Kelahiran</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="file" id="file-input" placeholder = "Pilih File.. " onChange={this.onChangeAkta} accept="image/*" multiple={false}></Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Foto Terbaru</Label>
                            </Col>
                            <Col xs="12" md="9">
                              <Input type="file" id="file-input" placeholder = "Pilih File.. " onChange={this.onChangeFotoTerbaru} accept="image/*" multiple={false}></Input>
                            </Col>
                        </FormGroup>
                    </Col>
                    <Col xs="12" sm="6">
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Airline</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="select" name="select" id="select" onChange={this.onChangeAirline}>
                                    <option disabled>Pilih Data</option>
                                    { 
                                        this.state.airlines.length > 0 ?
                                        this.state.airlines.map((data, i) => {   
                                        return  <option selected = {
                                                    (this.state.airline_id === data.id) ? true : false} 
                                                    value={data.id} key={i}>{data.nama_airline}
                                                </option>
                                        
                                        }) : null
                                    }
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Batch</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="select" name="select" id="select" onChange={this.onChangeBatch}>
                                    <option disabled>Pilih Data</option>
                                    { 
                                        this.state.batches.length > 0 ?
                                        this.state.batches.map((data, i) => {   
                                            return  <option selected = { 
                                                        (this.state.batch_id === data.id) ? true : false} 
                                                        value={data.id} key={i}>{data.nama_batch}
                                                    </option>
                                        
                                        }) : null
                                    }
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Hotel</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="select" name="select" id="select" onChange={this.onChangeHotels}>
                                    <option disabled>Pilih Data</option>
                                    { 
                                        this.state.hotels.length > 0 ?
                                        this.state.hotels.map((data, i) => {   
                                            return  <option selected = {
                                                        (this.state.hotel_id === data.id) ? true : false} 
                                                        value={data.id} key={i}>{data.nama_hotel}
                                                    </option>
                                        
                                        }) : null
                                    }
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Kaos</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="select" name="select" id="select" onChange={this.onChangeUkKaos}>
                                    <option disabled>Pilih Data</option>
                                    { 
                                        this.state.uk_kaoses.length > 0 ?
                                        this.state.uk_kaoses.map((data, i) => {   
                                            return  <option selected = {
                                                        (this.state.uk_kaos_id === data.id) ? true : false} 
                                                        value={data.id} key={i}>{data.nama_kaos}
                                                    </option>
                                        
                                        }) : null
                                    }
                                </Input>
                            </Col>
                        </FormGroup>
                        <FormGroup row  className="m-2">
                            <Col md="3">
                                <Label htmlFor="text-input">Meals</Label>
                            </Col>
                            <Col xs="12" md="9">
                                <Input type="select" name="select" id="select" onChange={this.onChangeMeals}>
                                    <option disabled>Pilih Data</option>
                                    { 
                                        this.state.meals.length > 0 ?
                                        this.state.meals.map((data, i) => {   
                                            return  <option selected = {
                                                        (this.state.meals_id === data.id) ? true : false} 
                                                        value={data.id} key={i}>{data.nama_meal}
                                                    </option>
                                        
                                        }) : null
                                    }
                                </Input>
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
      data_tour_main: dataStore.getters.getDataTourMain()
  }
}
export default connect(mapStateToProps)(DataMain);
