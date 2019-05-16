import React, {Component} from 'react';
import { Button,Row,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { connect} from "remx";
import authStore from '../stores/auth'
import dataStore from "../stores/data"

import broker from "../utils/broker"  

import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';

class ModalJadwal extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: false,   
        remark: '',
        room_id: this.props.room_id,
        date_jadwal: new Date(),
        add_jadwal: true,
    }

        this.scheduling = this.scheduling.bind(this);
        this.toggleJadwal = this.toggleJadwal.bind(this);
    }

    onChangeDateJadwal = date_jadwal => this.setState({ date_jadwal })

    toggleInterview() {
        this.setState({
          modal_interview: !this.state.modal_interview,
        });
    }
    
    toggleJadwal() {
        dataStore.setters.setModalJadwal(false)
        this.setState({add_jadwal: true, create_jadwal: false})
    }
    
    
    componentWillReceiveProps (newProps) {
        if(newProps.modal_jadwal === true) {
            var user = dataStore.getters.getUserJadwal();
            var id = dataStore.getters.getUserJadwalId();
            this.getDataSchedule(user, id)
        }
    }

    scheduling(){
        var body = {
          "description": "Jadwal untuk interview Anda adalah sebagai berikut, mohon untuk segera mengkonfirmasi.",
          "scheduled_at": moment(this.state.date_jadwal).format("YYYY-MM-DD HH:mm:ss"),
          "user_id": dataStore.getters.getUserJadwalId(),
          "admin_id": this.props.user.id
        }
        broker.fetch.post('interview_schedule', body)
        .then(res => {
            const { data } = res;
            if (data.status === true) {
                var user = dataStore.getters.getUserJadwal();
                var id = dataStore.getters.getUserJadwalId();
                this.getDataSchedule(user, id)
            } else {
    
            }
        }).catch(err => {
            
        });
      }
    
    
      getDataSchedule(user, id) {
        broker.fetch.get(`${user}/${id}/interview_schedules`)
        .then(res => {
            const { data } = res;
            this.setState({schedule_interview: data.data.length, schedule_data: data.data, worker_id: id})
        }).catch(err => {
            
        });
      }

      interviewing(room_id){
        dataStore.setters.setRoomId(room_id)
        dataStore.setters.setModalJadwal(false)
        dataStore.setters.setRoomStatus(true)
        dataStore.setters.setModalInterview(true)
    
      }
    render() {
        console.log
        var count_schedule = 0;
        var count_reject = 0;
        var count_approved =0;
        var count_finished =0;
        return (
            <div className="animated">
                <Modal isOpen={this.props.modal_jadwal} toggle={()=> this.toggleJadwal()} className={this.props.className}>
                    <ModalHeader toggle={()=> this.toggleJadwal()}>Jadwal Interview</ModalHeader>
                    <ModalBody>
                        {this.state.schedule_interview === 0 &&
                            <div className="align-items-center">
                            {this.state.add_jadwal === true &&
                                <Row className="justify-content-center">
                                <Button color="ghost-dark" onClick={()=> this.setState({add_jadwal: false, create_jadwal: true})}><i className="fa fa-plus"></i> Buat Jadwal Interview</Button>
                                </Row>
                            } 
                            {this.state.create_jadwal === true &&
                                <Row className="justify-content-center">
                                <DateTimePicker  
                                    onChange={this.onChangeDateJadwal}      
                                    value={this.state.date_jadwal}
                                />
                                &nbsp;
                                <Button outline color="dark" onClick={()=> this.scheduling()}><i className="fa fa-plus"></i> Jadwalkan</Button>
                        
                                </Row>
                            } 
                            </div>
                        }
                        {this.state.schedule_interview !== 0 && this.state.schedule_data &&
                        <Row className="justify-content-center">
                        {this.state.schedule_data.map((item, j) => {  
                            let _disabled
                            (item.is_accepted === true) ? _disabled = false : _disabled = true
                                if (item.is_finished === false && item.is_accepted !== false){
                                    count_schedule++
                                    return  <div key={j}>
                                                <Button key={j} color="ghost-dark" onClick={()=> this.interviewing(item.id)} disabled={_disabled}><i className="fa fa-video-camera"></i>  {moment(item.scheduled_at).format("YYYY-MM-DD HH:mm:ss")} </Button>
                                            </div>
                                }
                                if (item.is_finished === true) {
                                    count_finished++
                                    if (item.interview_result.is_approved === false){
                                        count_reject++
                                    }
                                    if (item.interview_result.is_approved === true){
                                        count_approved++
                                    }
                                }
                            })
                        }
                         {count_schedule === 0 && count_reject === 0 && count_approved === 0 &&
                            <Row className="justify-content-center">
                            <DateTimePicker  
                                onChange={this.onChangeDateJadwal}      
                                value={this.state.date_jadwal}
                            />
                            &nbsp;
                            <Button outline color="dark" onClick={()=> this.scheduling()}><i className="fa fa-plus"></i> Jadwalkan</Button>      
                            </Row>
                        }
                        {count_reject > 0 && count_approved === 0 && count_schedule === 0 &&
                            <Row className="justify-content-center">
                            <DateTimePicker  
                                onChange={this.onChangeDateJadwal}      
                                value={this.state.date_jadwal}
                            />
                            &nbsp;
                            <Button outline color="dark" onClick={()=> this.scheduling()}><i className="fa fa-plus"></i> Jadwalkan</Button>      
                            </Row>
                        }
                        {count_approved > 0 &&
                            <Row className="justify-content-center">
                                <h5>Telah Lolos Proses Interview</h5>    
                            </Row>
                        }
                        </Row>
                        }
                    </ModalBody>
                    <ModalFooter></ModalFooter>
                </Modal>  
            </div>
        );
    }
}

function mapStateToProps(props) {
    return {
        user: authStore.getters.getUser(),
        modal_jadwal: dataStore.getters.getModalJadwal(),

    }
  }
export default connect(mapStateToProps)(ModalJadwal);

