import React, {Component} from 'react';
import { Button, FormGroup, Input, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { connect} from "remx";
import authStore from '../stores/auth'
import dataStore from "../stores/data"
import { withRouter } from "react-router-dom";

import broker from "../utils/broker"  

class ModalUploadPict extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: false,  
        image_upload:null, 
        
    }
        this.submit = this.submit.bind(this);
        this.onChangeFile = this.onChangeFile.bind(this);
    }

    toggleModal() {
        var modal = {modal: false}
        dataStore.setters.setUploadPict(modal)
    }

    onChangeFile(e) {
        let value = e.target.files[0];
        this.setState({
            image_upload: value
        })
    }

    submit(){
        // console.log(this.state.image_upload)
        var data = new FormData();
        data.append('files', this.state.image_upload);

        broker.fetch.post(`${this.props.upload_pict.url}/${this.props.upload_pict.id}/${this.props.upload_pict.sub_url}`, data)
        .then(res => {
            const { data } = res;
            if (data.status === true) {
                this.toggleModal()
                dataStore.setters.setReloadDetail(true)
            } else {

            }
        }).catch(err => {
            
        });
    }

    render() {
        return (
            <div className="animated">
                 <Modal isOpen={this.props.upload_pict.modal}  className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal}>Upload Picture</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Input type="file" placeholder="Pilih gambar..." onChange={this.onChangeFile} accept="image/*" multiple={false}>
                                </Input>
                            </FormGroup>
                        </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.submit()}><i className="fa fa-save"></i> Simpan Hasil</Button>
                        <Button color="secondary" onClick={() => this.toggleModal()}><i className="fa fa-remove"></i> Batal</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(props) {
    return {
        user: authStore.getters.getUser(),
        upload_pict: dataStore.getters.getUploadPict(),
    }
  }
export default withRouter(connect(mapStateToProps)(ModalUploadPict));

