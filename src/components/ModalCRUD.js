import React, {Component} from 'react';
import { Button, FormGroup, Col, Row, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon} from 'reactstrap';
import { connect} from "remx";
import moment from 'moment';
import serialize from 'form-serialize';

import authStore from '../stores/auth'
import dataStore from "../stores/data"
import broker from "../utils/broker"  


class ModalCRUD extends Component {
  constructor(props) {
    super(props);

    this.state = {
        loading: false,   
        errors: {},
        numbers:{},
        data_combo_box:[],
        phone:'',
        save_update: 'save',
        ext_url : '',
        data_per:{},

    }
        this.submit = this.submit.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
    }

    toggle() {
        var data = {modal: false}
        dataStore.setters.setModalCRUD(data)
    }

    getDataPer(id) {
        this.setState({id_delete_edit: id});
        broker.fetch.get(`${this.props.modal_crud.url}/${id}`)
        .then(res => {
            const { data } = res;
            if (data) {
                this.setState({data_per: data.data, save_update: 'update', ext_url: `/${data.data.id}`})
            }
        }).catch(err => {
            
        });
    }

    submit(){
        this.setState({ loading: true });
        //e.preventDefault(); 
        
        //const body = serialize(e.target, { hash: true });

        const form = document.querySelector('#master-viewer-form');
        
        var body = serialize(form, { hash: true, empty: true });
        
        console.log(body);
        // let validate = this.validateData(body)
        let validate = true;
        if (validate === true){
            let url = this.props.modal_crud.url + this.state.ext_url
            // let notify_status = "Disimpan"
            // let type = 'post';

            // if (this.state.save_update === 'update') {
            //     url = this.props.url.url_update_data + `/${this.state.id_delete_edit}`
            //     notify_status = "Diupdate"
            //     type = 'patch';
            // }
                
            var type_submit = 'post';
            if (this.state.save_update === 'update')
                type_submit = 'patch';

            broker.fetch[type_submit](url, body)
            .then(res => {
                const { data } = res;
                if (data.status === true) {
                    this.toggle()
                    dataStore.setters.setReloadDetail(true)
                    dataStore.setters.setReloadTable(true)
                } else {
                    this.setState({ loading: false });
                }
            }).catch(err => {
                this.setState({ loading: false });
            });
        }
    }

    getDataComboBox(url, field){
        broker.fetch.get(`${url}`)
        .then(res => {
            const { data } = res;
            if (data.status === true) {
                this.setState({data_combo_box:{
                    [field]:data.data
                } })
            } else {

            }
        }).catch(err => {
            
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.modal_crud.get_data != prevProps.modal_crud.get_data){
            let data_url = this.props.modal_crud.get_data;
            let field_data = this.props.modal_crud.field_data
            
            if(data_url){
                for(var i=0;i<data_url.length;i++){
                    this.getDataComboBox(data_url[i], field_data[i])
                }
            }
        }

        if(this.props.modal_crud.id_get != prevProps.modal_crud.id_get){     
            let id_get = this.props.modal_crud.id_get;    
            console.log(id_get)

            if(id_get) {
                this.getDataPer(id_get)
            } else {
                this.setState({data_per: {}})
            }
               

        }
    }

    onChangePhone(e) {
        const re = /^[0-9 ()+]+$/;
        var value = e.target.value;
        if (value === '' || re.test(value)) {
            if (value.substr(0, 1) === '0') {
                value = `+62${value.substr(1, value.length)}`;
            }
            this.setState({phone: value})
        }
    }

    onChangeNumber = (component) => (e) => {
        if (this.state.data_per[component] === undefined){
            this.setState({data_per:{
                [component]:''
            } })
        }

        const re = /^[0-9 ()+]+$/;
        var value = e.target.value;
        if (value === '' || re.test(value)) {
            this.setState({data_per:{
                [component]:value
            } })
            // console.log(value)
        }

        // console.log(this.state.numbers[component])
    }

    render() {
        console.log(this.state.data_per)
            return (
                <div className="animated">
                     <Modal isOpen={this.props.modal_crud.modal}  className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Input Data {this.props.modal_crud.header_text}</ModalHeader>
                        <ModalBody>
                            {(this.props.modal_crud.fields !== null && this.props.modal_crud.modal === true) &&
                                 <form id="master-viewer-form">
                                    <Row>
                                        {this.props.modal_crud.fields.map((field, i) => {    
                                            return <Col xs="12" md="12" key={i}>
                                                        <h5>{field.label}</h5>
                                                        <hr className="my-2" />  
                                                        {field.child.map((child, j) => {  
                                                            return  <div key={"div"+j}>
                                                                    {child.hidden === 'no' &&
                                                                        <FormGroup row key={j}>
                                                                            <Col md="3">
                                                                                {child.hidden === 'no' &&
                                                                                    <Label>{child.label}</Label>
                                                                                }        
                                                                            </Col>
                                                                            <Col xs="12" md="6">
                                                                                {child.type === 'text' && child.content_text === 'text' && child.hidden === 'no' && 
                                                                                
                                                                                    <Input type="text" id={child.id} name={child.id} 
                                                                                        defaultValue={(this.state.data_per !== null) ? this.state.data_per[child.id] : null}
                                                                                        onChange={(child.on_change) ? this.onChangeEvent : null}
                                                                                        readOnly={(child.disabled) ? 'readOnly' : null}
                                                                                    /> 
                                                                                }
                                                                                {child.type === 'combo_box' && child.content_text === 'text' && child.hidden === 'no' &&                                                                             
                                                                                    <Input type="select" id={child.id} name={child.id} >
                                                                                        <option value="0">--Pilih Data--</option>
                                                                                        {(this.state.data_combo_box[child.id]) &&
                                                                                            this.state.data_combo_box[child.id].map((data, i) => {   
                                                                                                return <option value={data.id} key={i}>{data.name}</option>
                                                                                            })
                                                                                        }                                                                                      
                                                                                    </Input>
                                                                                }
                                                                                {child.type === 'text_props' && child.content_text === 'text' && child.hidden === 'no' && 
                                                                                    <Input type="text" id={child.id} name={child.id} 
                                                                                        value={this.props[child.id]}
                                                                                        onChange={(child.on_change) ? this.onChangeEvent : null}
                                                                                        readOnly={(child.disabled) ? 'readOnly' : null}
                                                                                    /> 
                                                                                }
                                                                                {child.type === 'group_text_modal' && child.content_text === 'text' && child.hidden === 'no' && 
                                                                                    <InputGroup>
                                                                                        <Input type="email" id={child.id} name={child.id}  readOnly={(child.disabled) ? 'readOnly' : null} 
                                                                                                value={this.props[child.id]} />
                                                                                        <InputGroupAddon addonType="append">
                                                                                            <Button type="button" color="primary" onClick={()=> dataStore.setters[child.modal_function](true)}>
                                                                                                <i className="fa fa-bars"></i>
                                                                                            </Button>
                                                                                        </InputGroupAddon>
                                                                                    </InputGroup>
                                                                                }
                                                                                {child.type === 'date' && child.content_text === 'text' && child.hidden === 'no' &&
                                                                                    <Input type="date" id={child.id} name={child.id} 
                                                                                        defaultValue={(this.state.data_per !== null) ? this.state.data_per[child.id] : moment().format("dd-mm-YY")}
                                                                                        onChange={(child.on_change) ? this.onChangeEvent : null}
                                                                                        readOnly={(child.disabled) ? 'readOnly' : null}
                                                                                    />
                                                                                }
                                                                                {child.type === 'text' && child.content_text === 'phone' && child.hidden === 'no' &&
                                                                                    <Input type='text' id={child.id} name={child.id} 
                                                                                        onChange={this.onChangePhone  } 
                                                                                        value={this.props.modal_crud.phone}
                                                                                        readOnly={(child.disabled) ? 'readOnly' : null}
                                                                                    />
                                                                                }
                                                                                {child.type === 'text' && child.content_text === 'number' && child.hidden === 'no' &&
                                                                                    <Input type='text' id={child.id} name={child.id} 
                                                                                        onChange={this.onChangeNumber(child.id) } 
                                                                                        value={(this.state.data_per !== null) ? this.state.data_per[child.id] : null}
                                                                                        // value={(this.state.numbers[child.id])}
                                                                                        readOnly={(child.disabled) ? 'readOnly' : null}
                                                                                    />
                                                                                }
                                                                                {child.type === 'password' && child.hidden === 'no' &&
                                                                                    <Input type="password" id={child.id} name={child.id} 
                                                                                            value={this.props.modal_crud.on_change}
                                                                                        readOnly={(child.disabled) ? 'readOnly' : null} />
                                                                                }
                                                                                {child.type === 'combobox' &&
                                                                                    <div>
                                                                                    {child.property.map((radio, k) => {  
                                                                                        return <FormGroup check inline key={k}>
                                                                                                    <Input className="form-check-input" type="radio" id={'inline-radio'+k} name={child.id} value={child.value[k]} />
                                                                                                    <Label className="form-check-label" check htmlFor={'inline-radio'+k}>{child.property[k]}</Label>
                                                                                                </FormGroup>
                                                                                    })}
                                                                                    </div>
                                                                                }
                                                                                <div className="text-danger">{this.state.errors[child.id]}</div>
                                                                            </Col>
                                                                        </FormGroup>
                                                                    }
                                                                    {child.hidden === 'yes' &&
                                                                        <div>
                                                                        {child.type === 'text_props' && child.content_text === 'text' && 
                                                                                    <Input type={child.hidden === 'yes' ? 'hidden' : 'text'} id={child.id} name={child.id} 
                                                                                        value={this.props[child.id]}
                                                                                        onChange={(child.on_change) ? this.onChangeEvent : null}
                                                                                        readOnly={(child.disabled) ? 'readOnly' : null}
                                                                                    /> 
                                                                        }
                                                                        {child.type === 'text_id' &&
                                                                            <Input type="hidden" id={child.id} name={child.id}  defaultValue={(this.props.modal_crud.id_pk !== null) ? this.props.modal_crud.id_pk : null}/>
                                                                        }
                                                                        {child.type === 'text' &&
                                                                            <Input type="hidden" id={child.id} name={child.id}  defaultValue={(this.state.data_per !== null) ? this.state.data_per[child.id] : null}/>
                                                                        }
                                                                        </div>
                                                                    }
                                                                    </div>
    
                                                                    
                                                        })}
                                                    </Col>  
                                            })      
                                        }
                                    </Row>
                                        {/* <Button type="button" className="btn-outline-dark icon mr-1 mb-1" onClick={() => this.saveData() }>{(this.props.modal_crud.loading) ? "Sedang Menyimpan..." : "Simpan Data"}</Button> */}
                                </form> 
                            }
                            
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => this.submit()}><i className="fa fa-save"></i> Simpan Hasil</Button>
                            <Button color="secondary" onClick={() => this.toggle()}><i className="fa fa-remove"></i> Batal</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            );
    }
}

function mapStateToProps(props) {
    return {
        user: authStore.getters.getUser(),
        modal_crud: dataStore.getters.getModalCRUD(),
    }
  }
  export default connect(mapStateToProps)(ModalCRUD);

