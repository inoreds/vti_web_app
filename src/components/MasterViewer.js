import React, {Component} from 'react';
import ReactTable from 'react-table';
import serialize from 'form-serialize';
import { Card, CardHeader, CardBody, Button, FormGroup, Col, Row, Label, Input, InputGroup, InputGroupAddon   } from 'reactstrap';
import { withRouter } from "react-router-dom";
import {connect} from 'remx'
import { ToastContainer, toast } from 'react-toastify';
import moment from 'moment-with-locales-es6';

import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";
import broker from "../utils/broker"
import authStore from "../stores/auth"
import dataStore from "../stores/data"
import SweetAlert from 'sweetalert-react';

class MasterViewer extends Component {
  constructor(props) {
    super(props);

    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 3,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false
    }
    this.state = {
        loading: false,
        save_update: 'save',
        show_view: { table: true, form: false },
        total_page: 0,
        page_index:1,
        page_size_option:15 ,
        page_size: 0,
        body_data_table : {search: '', start:0, length: 0},
        data_table: [],
        data_meta: {},
        numbers:{},
        data_per:null,
        url: this.props.url,
        fields: this.props.fields,
        id_pk: this.props.id_pk,
        id_delete_edit:'',
        id_saved: '',
        phone:'',
        on_change:'',
        add_form: this.props.add_form,
        columns_number: [{ Header: 'No', id: 'no', accessor: 'no', maxWidth: 50, 
            Cell: row => {
                return <div className="text-center">
                        {row.index+((this.state.page_index -1) * this.state.page_size + 1)}
                    </div>}
            }],
        columns_hidden_id:
            {   Header: 'Option', id : 'option_id', accessor: this.props.id_pk_column, show: false},
        columns_option:
            {   Header: 'Option', id : 'option', accessor: (this.props.id_custom) ? this.props.id_custom : this.props.id_pk_column,
                Cell: row => {
                return <div className="text-center">
                            <Button size="sm" className="btn-outline-dark icon mr-1 mb-1" outline color="primary" onClick={() => this.getDataPer(row.value)}><i className="fa fa-pencil-square-o"></i></Button>
                            <Button size="sm" className="btn-outline-dark icon mr-1 mb-1" outline color="primary" onClick={() => this.setState({modal_delete:true, id_delete_edit: row.row.option_id})}><i className="fa fa-trash"></i></Button>
                       </div>
            }
        },
        errors: {},
        columns: this.props.columns,
    }
        this.getDataTable = this.getDataTable.bind(this);
        this.saveData = this.saveData.bind(this);
        this.getDataPer = this.getDataPer.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.showTableForm = this.showTableForm.bind(this)
        this.showDataTable = this.showDataTable.bind(this);
        this.cancelCourse = this.cancelCourse.bind(this);
        this.onChangeEvent = this.onChangeEvent.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
    }
    notify_berhasil = (text) => toast("Data " + this.props.title + " Berhasil " + text);
    getDataTable() {
        this.setState({ loading: true });
        var custom_query = (this.props.custom_query) ? this.props.custom_query + '&' : '';
        broker.fetch.get(`${this.state.url.url_get_data}?${custom_query}&page=${this.state.page_index}`).then(res => {
            const { data } = res;
            if (data) {
                this.setState({loading: false, 
                               data_table: data.data, 
                               total_page: data.data.last_page, 
                               page_size: data.data.per_page})
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

    validateData(body){
        let return_value = true;
        let errors = {}
        this.state.fields.map((field, i) => {   
            field.child.map((child, i) => {   
                if (child.hidden === 'no'){
                    if ((body[child.id] === "" || body[child.id] === null)){
                        errors[child.id] = child.label + " Tolong Diisi";
                        return_value = false;
                    }
                }
            });
        });

        this.setState({errors : errors})

        return return_value;
    }

    saveData() {
        const form = document.querySelector('#master-viewer-form');
        
        var body = serialize(form, { hash: true, empty: true });
        
        let validate = this.validateData(body)

        if (validate === true){
            this.setState({ loading: true });
            let url = this.props.url.url_save_data
            let notify_status = "Disimpan"
            let type = 'post';

            if (this.state.save_update === 'update') {
                url = this.props.url.url_update_data + `/${this.state.id_delete_edit}`
                notify_status = "Diupdate"
                type = 'patch';
            }
                
            
            broker.fetch[type](url, body)
            .then(res => {
                const { data } = res;
                if (data.status === true) {
                    this.notify_berhasil(notify_status);            
                    this.getDataTable();
                    this.showTableForm('Table');
                    this.setState({data_per: null, save_update: 'save', loading: false})
                    this.cancelCourse()
                } else {
                    this.setState({ loading: false });
                }
            }).catch(err => {
                this.setState({ loading: false });
            });
        }
    };

    getDataPer(id) {
        this.setState({id_delete_edit: id});
        broker.fetch.get(`${this.props.url.url_get_data_per}/${id}`)
        .then(res => {
            const { data } = res;
            if (data.status === true) {
                this.setState({data_per: data.data, save_update: 'update'})
                this.showTableForm('Form');
            } else {

            }
        }).catch(err => {
            
        });
    }

    deleteData() {
        broker.fetch.delete(`${this.props.url.url_delete_data}/${this.state.id_delete_edit}`)
        .then(res => {
            const { data } = res;
            if (data.status === true) {
                this.notify_berhasil("Dihapus");
                this.getDataTable();
                this.showTableForm('Table');
                this.setState({modal_delete: false});
            } else {

            }
        }).catch(err => {
            
        });
    }

    showTableForm(view) {
        if (view === "Form") {
            this.setState({show_view: {form: true, table: false} })
        } else if (view === "Table") {
            this.setState({show_view: {form: false, table: true} })
            this.setState({data_per: null, save_update: 'save'})
        }
    }

    showDataTable() {

    }

    componentDidMount() {
        this.setState({body_data_table : {search: '', start:0, length: this.state.page_size}}, function(){
            this.getDataTable();
        })
        if (this.props.column_option !== false) {
            this.setState({columns: this.state.columns_number.concat(this.state.columns.concat(this.state.columns_hidden_id)).concat(this.state.columns_option) })
        } else {
            this.setState({columns: this.state.columns_number.concat(this.state.columns) })
        }
       
    }

    getDataPaging(index){
        this.setState({page_index: index+1}, function(){
            this.getDataTable();
        })
        
    }

    cancelCourse(){ 
        document.getElementById("master-viewer-form").reset();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.reload_table !== prevProps.reload_table){
            if (this.props.reload_table === true) {
                this.getDataTable();
                this.notify_berhasil("Diupdate");
                
            }
        }
    }

    onChangeEvent(event){
        var value = event.target.value.replace(/-/g,"");
        this.setState({on_change: value})
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
        
        if (this.state.numbers[component] === undefined){
            this.setState({numbers:{
                [component]:''
            } })
        }
        const re = /^[0-9 ()+]+$/;
        var value = e.target.value;
        if (value === '' || re.test(value)) {
            this.setState({numbers:{
                [component]:value
            } })
        }
    }


    render() {
        console.log(this.state.data_per)
        return (
        <div className="animated">
            {this.state.show_view.table === true &&
                <Card>
                    <CardHeader>
                    Data {this.props.title}
                    <div className="card-header-actions">
                        {(this.state.import_excel === true) &&
                            <Button className="btn-outline-dark icon mr-1 mb-1" onClick={() => this.props.history.push(`${this.state.url.url_import}`)}>
                                <i className="fa fa-file-excel-o"></i>
                            </Button>
                        }
                        {(this.state.add_form === true) &&
                            <Button className="btn-outline-dark icon mr-1 mb-1" onClick={() => this.showTableForm('Form')}>
                                <i className="fa fa-plus"></i>
                            </Button>
                        }
                    </div>
                    </CardHeader>
                    <CardBody>
                    <ReactTable
                        columns={this.state.columns}
                        data={this.state.data_table.data}
                        loading={this.state.loading}
                        filterable={false}
                        sortable={false}
                        pages={this.state.total_page}
                        pageSize={this.state.page_size}
                        pageSizeOptions={[15]}
                        manual
                        onPageChange={(pageIndex) => {
                            this.getDataPaging(pageIndex)
                        }} 
                        className="table table-striped table-hover table-bordered -striped -highlight" />
                    </CardBody>
                </Card>
            }
            
            {this.state.show_view.form === true &&
                <Card>
                    <CardHeader>
                    <i className="icon-menu"></i>Data {this.props.title}
                    <div className="card-header-actions">
                        <Button size="sm" className="btn-outline-dark icon mr-1 mb-1" onClick={() => this.showTableForm('Table')}>
                            Kembali
                        </Button>
                    </div>
                    </CardHeader>
                    <CardBody>
                    <div> 
                    {(this.state.add_form === true) &&
                        <form id="master-viewer-form">
                            <Row>
                                {this.state.fields.map((field, i) => {    
                                    return <Col xs="12" md="6" key={i}>
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
                                                                                value={this.state.phone}
                                                                                readOnly={(child.disabled) ? 'readOnly' : null}
                                                                            />
                                                                        }
                                                                        {child.type === 'text' && child.content_text === 'number' && child.hidden === 'no' &&
                                                                            <Input type='text' id={child.id} name={child.id} 
                                                                                onChange={this.onChangeNumber(child.id) } 
                                                                                value={(this.state.numbers[child.id])}
                                                                                readOnly={(child.disabled) ? 'readOnly' : null}
                                                                            />
                                                                        }
                                                                        {child.type === 'password' && child.hidden === 'no'  && child.on_change === true &&
                                                                            <Input type="password" id={child.id} name={child.id} 
                                                                                    value={this.state.on_change}
                                                                                readOnly={(child.disabled) ? 'readOnly' : null} />
                                                                        }
                                                                        {child.type === 'password' && child.hidden === 'no' && child.on_change === false &&
                                                                             <Input type="password" id={child.id} name={child.id} 
                                                                                defaultValue={(this.state.data_per !== null) ? this.state.data_per[child.id] : null}
                                                                                onChange={(child.on_change) ? this.onChangeEvent : null}
                                                                                readOnly={(child.disabled) ? 'readOnly' : null}
                                                                            /> 
                                                                        }
                                                                        {child.type === 'combobox' &&
                                                                            <div>
                                                                            {child.property.map((radio, k) => {  
                                                                                return <FormGroup check inline key={k}>
                                                                                            <Input className="form-check-input" type="radio" id={'inline-radio'+k} name={child.id} value={child.value[k]} 
                                                                                                        defaultChecked={(this.state.data_per !== null && this.state.data_per[child.id] === child.value[k]) ? true : false}/>
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
                                                                    <Input type="hidden" id={child.id} name={child.id}  defaultValue={(this.state.id_pk !== null) ? this.state.id_pk : null}/>
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
                                <Button type="button" className="btn-outline-dark icon mr-1 mb-1" onClick={() => this.saveData() }>{(this.state.loading) ? "Sedang Menyimpan..." : "Simpan Data"}</Button>
                        </form>
                    }
                    </div>
                    </CardBody>
                </Card>
            }
            <SweetAlert
                show={this.state.modal_delete}
                title="Konfirmasi"
                text="Apakah anda ingin menghapus data ini?"
                showCancelButton= {true}
                confirmButtonColor= "#0e5ab3"  
                confirmButtonText= "Ya, proses saja!" 
                cancelButtonText= "Tidak, tolong batalkan!"
                onConfirm={() => { this.deleteData()}}
                onCancel={() => this.setState({ modal_delete: false })}
            />
            <ToastContainer 
                position='bottom-right'
            />
        </div>
        );
    }
}

function mapStateToProps(props) {
    return {
        user: authStore.getters.getUser(),
        reload_table: dataStore.getters.getReloadTable(),        
    }
}

export default withRouter(connect(mapStateToProps)(MasterViewer));
