import React, {Component} from 'react';
import { Button, FormGroup,Label, Input, Modal, ModalBody, ModalFooter} from 'reactstrap';
import { connect} from "remx";

import dataStore from "../stores/data"

// import Interview from "../views/Interview/Interview"
import VideoCallPanel from "./VideoCallPanel"

import broker from "../utils/broker"  


class ModalInterview extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: false,   
        remark: '',
        confirm_save_interview: false,   
        room_id: this.props.room_id,
        is_approved: true
    }
        this.closeRoom = this.closeRoom.bind(this);
        this.onApprovedTrue = this.onApprovedTrue.bind(this);
        this.onApprovedFalse = this.onApprovedFalse.bind(this);
        this.onChangeRemark = this.onChangeRemark.bind(this);
    }
    // notify_berhasil = (text) => toast("Data " + this.props.title + " Berhasil " + text);
    
    closeRoom() {
        dataStore.setters.setRoomStatus(false)
        dataStore.setters.setModalInterview(false)
        dataStore.setters.setModalNoteInterview(false)
        this.setState({is_approved: true})
    }

    scheduleInterview(id){
        this.getDataSchedule(id)
        this.setState({modal_jadwal: true})
    }
    
    onApprovedTrue(e){
        this.setState({is_approved: true}, function(){
        })
      
    }
    onApprovedFalse(e){
        this.setState({is_approved: false}, function(){
        })
      
    }
    onChangeRemark(e){
        this.setState({remark: e.target.value}, function(){
        })
      
    }

    updateUser(){
        console.log(this.state.is_approved)
        var body = {
            "notes" : this.state.remark
        }
        var id = dataStore.getters.getUserJadwalId()
        var user = dataStore.getters.getUserJadwal()
        if (user === "employers") {
            if (this.state.is_approved) {
                console.log(true)
                broker.fetch.get(`${user}/${id}/verification/trust`)
                .then(res => {
                    dataStore.setters.setReloadTable(true)
                    dataStore.setters.setConfirmSaveInterview(false)
                }).catch(err => {
                    
                });
            } else {
                console.log(false)
                broker.fetch.post(`${user}/${id}/interview/reject`, body)
                .then(res => {
                    dataStore.setters.setReloadTable(true)
                    dataStore.setters.setConfirmSaveInterview(false)
                }).catch(err => {
                    
                });
            }
            
        } else if (user === "workers") {
            if (this.state.is_approved) {
                broker.fetch.get(`${user}/${id}/interview/approve`)
                .then(res => {
                    dataStore.setters.setReloadTable(true)
                    dataStore.setters.setConfirmSaveInterview(false)
                }).catch(err => {
                    
                });
            } else {
                console.log(false)
                broker.fetch.post(`${user}/${id}/interview/reject`, body)
                .then(res => {
                    dataStore.setters.setReloadTable(true)
                    dataStore.setters.setConfirmSaveInterview(false)
                }).catch(err => {
                    
                });
            }
        }

    }

    interviewResult(){
        var body = {
            "remark": this.state.remark,
            "is_approved": this.state.is_approved,
            "is_finished": true                                                                                                                                 
        }
        broker.fetch.patch(`interview_schedule/${this.props.room_id}`, body)
        .then(res => {
            const { data } = res;
            if (data.status === true) {
                this.updateUser();
                this.closeRoom();
            } else {

            }
        }).catch(err => {
            
        });
    }
    
    componentDidMount(){
        // console.log(this.props.room_id)
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (this.state.room_id !== prevState.room_id) {
    //         interview.setId(this.state.room_id);
    //     }
    // }


    render() {
        return (
            <div className="animated">
                <Modal isOpen={this.props.modal_interview}  className={'modal-lg ' + this.props.className}>
                    <ModalBody className="bg-dark">
                        <div className="btn-main-action" align="right" style={{margin: '-1%'}}>
                        <Button color="ghost-light" size="sm" className="btn-pill" onClick={()=> this.closeRoom()} ><i className="fa fa-remove"></i></Button>
                        </div>
                        <VideoCallPanel room_id={this.props.room_id} room_status={this.props.room_status}/>
                    </ModalBody>
                    {this.props.modal_note_interview &&
                    <ModalFooter className="bg-dark" style={{display: 'block'}}>
                        {(this.props.confirm_save_interview === false) &&
                        <div>
                            <FormGroup>
                            <Label htmlFor="prependedInput">Hasil Interview</Label>
                            <Input type="textarea" id="message" name="body" rows="12" placeholder="Tuliskan Hasil Interview di sini...." rows="5" onChange={this.onChangeRemark}></Input>
                            </FormGroup>
                            <FormGroup>
                                <label className="radio inline"> 
                                    <input type="radio" name="approval" checked={this.state.is_approved} onChange={this.onApprovedTrue}/>
                                    <span> Diterima </span> 
                                </label>
                                <label className="radio inline"> 
                                    <input type="radio" name="approval"  onChange={this.onApprovedFalse}/>
                                    <span>Tidak Diterima </span> 
                                </label>
                            </FormGroup>
                            <FormGroup align="right">
                                <Button className="btn-outline-light icon mr-1 mb-1" outline color="primary" onClick={()=> dataStore.setters.setConfirmSaveInterview(true)} ><i className="fa fa-save"></i> Simpan Hasil Interview</Button>
                            </FormGroup>
                        </div>
                        }
                        {this.props.confirm_save_interview &&
                        <div align="center">
                            <Button  className="btn-outline-light icon mr-1 mb-1" outline color="primary" onClick={() => this.interviewResult()}><i className="fa fa-save"></i> Simpan Hasil</Button>
                            <Button  className="btn-outline-light icon mr-1 mb-1" outline color="primary" onClick={() => dataStore.setters.setConfirmSaveInterview(false)}><i className="fa fa-remove"></i> Batal</Button>
                        </div>
                        }
                    </ModalFooter>
                    }
                </Modal> 
            </div>
        );
    }
}

function mapStateToProps(props) {
    return {
        modal_interview: dataStore.getters.getModalInterview(),
        modal_note_interview: dataStore.getters.getModalNoteInterview(),
        confirm_save_interview: dataStore.getters.getConfirmSaveInterview(),
        room_status: dataStore.getters.getRoomStatus(),
        room_id : dataStore.getters.getRoomId(),
    }
  }
export default connect(mapStateToProps)(ModalInterview);

