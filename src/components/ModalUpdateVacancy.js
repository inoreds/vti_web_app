import React, {Component} from 'react';
import { Button, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { connect} from "remx";
import authStore from '../stores/auth'
import dataStore from "../stores/data"
import { withRouter } from "react-router-dom";

import broker from "../utils/broker"  

import moment from 'moment';

class ModalUpdateVacancy extends Component {
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
        note: '',
        start_hour: '10.00',
        end_hour: '10.00'
    }
        this.submit = this.submit.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);
        this.onChangeStartHour = this.onChangeStartHour.bind(this); 
        this.onChangeEndHour = this.onChangeEndHour.bind(this);
    }

    toggleModalUpdateVacancy() {
        var update_vacancy = {modal: false}
        dataStore.setters.setUpdateVacancy(update_vacancy)
    }

    submit(){
        console.log(this.props.update_vacancy)
        let shift =0;
        if (moment(this.state.end_hour, "HH:mm:ss.SSS").diff(moment(this.state.start_hour, "HH:mm:ss.SSS"), 'hours') === 9){
            shift = 10
        } else if (moment(this.state.end_hour, "HH:mm:ss.SSS").diff(moment(this.state.start_hour, "HH:mm:ss.SSS"), 'hours') < 9){
            shift = 20
        }else if (moment(this.state.end_hour, "HH:mm:ss.SSS").diff(moment(this.state.start_hour, "HH:mm:ss.SSS"), 'hours') > 9){
            shift = 30
        }
        var body = {
            "working_hours_start": this.state.start_hour,
            "working_hours_end": this.state.end_hour,
            "shift" : shift,
            // "working_dates_start" : null,
            // "working_dates_end" : null,
        }
        broker.fetch.patch(`vacancies/${this.props.update_vacancy.id}`, body)
        .then(res => {
            const { data } = res;
            if (data.status === true) {
                dataStore.setters.setReloadTable(true)
                dataStore.setters.setUpdateVacancy({modal: false})
                    
            } else {

            }
        }).catch(err => {
            
        });
 
        if (this.props.update_vacancy.is_accept === true){
            this.props.history.push(`/monitoring/lowongan/ongoing/${this.props.update_vacancy.id}/rekomendasi`)
        }
    }

    onChangeNote(e){
        this.setState({note: e.target.value}, function(){
        })
      
    }

    onChangeStartHour(e){
        this.setState({start_hour: e.target.value}, function(){
        })
    }

    onChangeEndHour(e){
        this.setState({end_hour: e.target.value}, function(){
        })
    }

    componentDidMount(){
        this.setState({start_hour: this.props.update_vacancy.start_hour, end_hour: this.props.update_vacancy.end_hour})
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.update_vacancy !== prevProps.update_vacancy){
            if (this.props.update_vacancy.modal === true) {
                this.setState({start_hour: this.props.update_vacancy.start_hour, end_hour: this.props.update_vacancy.end_hour})
                console.log(this.state.start_hour)
            }
        }
    }

    render() {
        return (
            <div className="animated">
                 <Modal isOpen={this.props.update_vacancy.modal}  className={this.props.className}>
                    <ModalHeader toggle={this.toggleModalUpdateVacancy}>Review Lowongan Pekerjaan</ModalHeader>
                    <ModalBody>
                        <FormGroup className="mb-0">
                            <Label>Jam Mulai : </Label>
                            <Input type="time" id="date-input" name="date-input" placeholder="date" 
                                value={(this.state.start_hour) ? this.state.start_hour : this.props.update_vacancy.start_hour} onChange={this.onChangeStartHour}/>
                        </FormGroup>
                        <FormGroup className="mb-0">
                            <Label>Jam Berakhir : </Label>
                            <Input type="time" id="date-input" name="date-input" placeholder="date" 
                                value={(this.state.end_hour) ? this.state.end_hour : this.props.update_vacancy.end_hour} onChange={this.onChangeEndHour}/>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.submit()}><i className="fa fa-save"></i> Simpan Hasil</Button>
                        <Button color="secondary" onClick={() => this.toggleModalUpdateVacancy()}><i className="fa fa-remove"></i> Batal</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(props) {
    return {
        user: authStore.getters.getUser(),
        update_vacancy: dataStore.getters.getUpdateVacancy(),
    }
  }
export default withRouter(connect(mapStateToProps)(ModalUpdateVacancy));

