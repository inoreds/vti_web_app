import React, {Component} from 'react';
import { Button, FormGroup, Col, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { connect} from "remx";
import authStore from '../stores/auth'
import dataStore from "../stores/data"

import broker from "../utils/broker"  

import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';

class ModalDistrict extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: false,   
        remark: '',
        room_id: this.props.room_id,
        date_jadwal: new Date(),
        add_jadwal: true,
        provinces: [],
        province_id:'',
        cities: [],
        city_id:'',
        districts: [],
        district_id:'',
        district_name: '',
    }
        this.handleProvinces = this.handleProvinces.bind(this);
        this.handleCities = this.handleCities.bind(this);
        this.handleDistricts = this.handleDistricts.bind(this);
        this.setData = this.setData.bind(this);
    }

    onChangeDateJadwal = date_jadwal => this.setState({ date_jadwal })

    toggleModalDistrict(){
        dataStore.setters.setModalDistrict(false)
    }
    
    handleProvinces(event) {
        this.setState({province_id: event.target.value}, function(){
            this.getDataCities();
        });
    }

    handleCities(event) {
        this.setState({city_id: event.target.value}, function(){
            this.getDataDistricts();
        });

    }

    handleDistricts(event) {
        var index = event.nativeEvent.target.selectedIndex;
        this.setState({
            district_id: event.target.value,
            district_name: event.nativeEvent.target[index].text
        })
    }
    
    componentWillReceiveProps (newProps) {
        if(newProps.modal_jadwal === true) {
            var user = dataStore.getters.getUserJadwal();
            var id = dataStore.getters.getUserJadwalId();
            this.getDataSchedule(user, id)
        }
    }

    setData(){
        // console.log(this.state.district_id)
        dataStore.setters.setDataDisrictId(this.state.district_id);
        dataStore.setters.setDataDisrictName(this.state.district_name);
        this.toggleModalDistrict();
    }

    getDataProvinsi() {
        this.setState({ loading: true });
        broker.fetch.get(`provinces`).then(res => {
            const { data } = res;
            const { meta } = data;
            if (data) {
                this.setState({loading: false, provinces: data.data})
            } else {
                
            }
        }).catch(err => {
            this.setState({
                loading: false,
                message: ''
            })
        }).then(()=> {
            dataStore.setters.setReloadTable(false);
        });
    }

    getDataCities() {
        this.setState({ loading: true });
        broker.fetch.get(`provinces/${this.state.province_id}/cities`).then(res => {
            const { data } = res;
            const { meta } = data;
            if (data) {
                this.setState({loading: false, cities: data.data})
            } else {
                
            }
        }).catch(err => {
            this.setState({
                loading: false,
                message: ''
            })
        }).then(()=> {
            dataStore.setters.setReloadTable(false);
        });
    }

    getDataDistricts() {
        this.setState({ loading: true });
        broker.fetch.get(`cities/${this.state.city_id}/districts`).then(res => {
            const { data } = res;
            const { meta } = data;
            if (data) {
                this.setState({loading: false, districts: data.data})
            } else {
                
            }
        }).catch(err => {
            this.setState({
                loading: false,
                message: ''
            })
        }).then(()=> {
            dataStore.setters.setReloadTable(false);
        });
    }

    componentDidMount(){
        this.getDataProvinsi();
    }

    render() {
        return (
            <div className="animated">
                <Modal isOpen={this.props.modal_district} toggle={this.toggleModalDistrict}
                       className={'modal-primary ' + this.props.className}>
                  <ModalHeader toggle={this.toggleModalDistrict}>Silahkan Pilih Wilayah</ModalHeader>
                  <ModalBody>
                    <FormGroup row>
                        <Col md="3">
                        <Label htmlFor="select">Provinsi</Label>
                        </Col>
                        <Col xs="12" md="9">
                        <Input type="select" name="select" id="select" onChange={this.handleProvinces}>
                            <option value="0">Pilih Provinsi</option>
                            { this.state.provinces.map((data, i) => {   
                               return <option value={data.id} key={i}>{data.name}</option>
                                
                                })
                            }
                            
                        </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                        <Label htmlFor="select">Kabupaten / Kota</Label>
                        </Col>
                        <Col xs="12" md="9">
                        <Input type="select" name="select" id="select" onChange={this.handleCities}>
                            <option value="0">Pilih Kabupaten / Kota</option>
                            { 
                                this.state.cities.length > 0 ?
                                this.state.cities.map((data, i) => {   
                               return <option value={data.id} key={i}>{data.name}</option>
                                
                                }) : null
                            }
                        </Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Col md="3">
                        <Label htmlFor="select">Kecamatan</Label>
                        </Col>
                        <Col xs="12" md="9">
                        <Input type="select" name="select" id="select" onChange={this.handleDistricts}>
                            <option value="0">Pilih Kecamatan</option>
                            { 
                                this.state.districts.length > 0 ?
                                this.state.districts.map((data, i) => {   
                               return <option value={data.id} key={i}>{data.name}</option>
                                
                                }) : null
                            }
                        </Input>
                        </Col>
                    </FormGroup>
                  </ModalBody>
                  <ModalFooter>
                     <Button color="secondary" onClick={this.toggleModalDistrict}>Cancel</Button>
                     <Button color="primary" onClick={this.setData}>Set Data..</Button>{' '}
                  </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(props) {
    return {
        user: authStore.getters.getUser(),
        modal_district: dataStore.getters.getModalDistrict(),

    }
  }
export default connect(mapStateToProps)(ModalDistrict);

