import React, {Component} from 'react';
import { Button, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { connect} from "remx";
import authStore from '../stores/auth'
import dataStore from "../stores/data"
import { withRouter } from "react-router-dom";

import broker from "../utils/broker"  

class ModalReviewVacancy extends Component {
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
        from : this.props.from,
    }
        this.submit = this.submit.bind(this);
        this.onChangeNote = this.onChangeNote.bind(this);
    }

    toggleModalReviewVacancy() {
        var review_vacancy = {modal: false}
        dataStore.setters.setReviewVacancy(review_vacancy)
    }

    submit(){
        var body = {
            "notes": this.state.note,
            "is_accept": this.props.review_vacancy.is_accept
        }
        broker.fetch.patch(`vacancies/${this.props.review_vacancy.id}/review`, body)
        .then(res => {
            const { data } = res;
            if (data.status === true) {
                dataStore.setters.setReviewVacancy({modal: false})
                dataStore.setters.setReloadTable(true)
            } else {

            }
        }).catch(err => {
            
        });
 
        if (this.props.review_vacancy.is_accept === true){
            console.log(this.props.from)
            if (this.state.from) {
                this.props.history.push(`/head_hunt/lowongan/ongoing/${this.props.review_vacancy.id}/rekomendasi`)
            } else {
                this.props.history.push(`/monitoring/lowongan/ongoing/${this.props.review_vacancy.id}/rekomendasi`)
            }
            
        }
    }

    onChangeNote(e){
        this.setState({note: e.target.value}, function(){
        })
      
    }

    render() {
        return (
            <div className="animated">
                 <Modal isOpen={this.props.review_vacancy.modal}  className={this.props.className}>
                    <ModalHeader toggle={this.toggleModalReviewVacancy}>Review Lowongan Pekerjaan</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Input type="textarea" id="message" name="body" rows="12" 
                                placeholder={`Tuliskan alasan mengapa lowongan ${(this.props.review_vacancy.is_accept) ? "diterima" : "ditolak"}` } 
                                rows="5" onChange={this.onChangeNote}>
                            </Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.submit()}><i className="fa fa-save"></i> Simpan Hasil</Button>
                        <Button color="secondary" onClick={() => this.toggleModalReviewVacancy()}><i className="fa fa-remove"></i> Batal</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(props) {
    return {
        user: authStore.getters.getUser(),
        review_vacancy: dataStore.getters.getReviewVacancy(),
    }
  }
export default withRouter(connect(mapStateToProps)(ModalReviewVacancy));

