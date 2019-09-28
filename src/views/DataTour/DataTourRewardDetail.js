import React, {Component} from 'react';
import {Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Card, CardBody, CardHeader, Collapse} from 'reactstrap';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";
import { connect} from "remx";
import { ToastContainer, toast } from 'react-toastify';

import broker from '../../utils/broker';
import dataStore from '../../stores/data'
import authStore from '../../stores/auth'
import config from '../../utils/config'

import DataMain from './DetailData/DataMain';
import DataKtp from './DetailData/DataKtp';
import DataPassport from './DetailData/DataPassport';
import DataMainForm from './DetailForm/DataMainForm';
import DataKtpForm from './DetailForm/DataKtpForm';
import DataPassportForm from './DetailForm/DataPassportForm';

class DataTourRewardDetail extends Component {
  constructor(props) {
    super(props);
    this.options = {
      sortIndicator: true,
      hideSizePerPage: true,
      paginationSize: 6,
      hidePageListOnlyOnePage: true,
      clearSearch: true,
      alwaysShowAllBtns: false,
      withFirstAndLast: false,
    }
    this.state = {
      collapse: false,
      accordion: [true, false, false],
      custom: [true, false],
      reload:false,
      loading: false,
      reward_id: this.props.match.params.reward_id,
      data: {},
      ktp: {},
      passport: {},
      edit_main: false,
      edit_ktp : false,
      edit_passport: false
    }
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.editMain = this.editMain.bind(this);
    this.editKtp = this.editKtp.bind(this);
    this.editPassport = this.editPassport.bind(this);
    this.closeMain = this.closeMain.bind(this);
    this.closeKtp = this.closeKtp.bind(this);
    this.closePassport = this.closePassport.bind(this);

  }

  componentDidMount(){
    this.getData();    
  }

  toggleAccordion(tab) {

    const prevState = this.state.accordion;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      accordion: state,
    });
  }

  toggleCustom(tab) {

    const prevState = this.state.custom;
    const state = prevState.map((x, index) => tab === index ? !x : false);

    this.setState({
      custom: state,
    });
  }

  toggleFade() {
    this.setState({ fadeIn: !this.state.fadeIn });
  }
  notify_berhasil = (text) => toast("Data Tour Berhasil " + text);
  getData() {
    broker.fetch.get(`transaction/data_tour/${this.props.match.params.id}`)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
            const data_main = data.data;
            const {data_ktp, data_passport} = data.data;
            this.setState({data: data_main, ktp: data_ktp, passport: data_passport});
        } else {

        }
      }).catch(err => {

      }).then(()=> {
          dataStore.setters.setReloadTable(false);
      });
  }

  closeMain(val){
    dataStore.setters.setDataTourMain({'form' : 'view', 'status': 'view', data : this.state.data});
  }

  closeKtp(val){
    dataStore.setters.setDataTourKtp({'form' : 'view', 'status': 'view', data : this.state.data});
  }

  closePassport(val){
    dataStore.setters.setDataTourPassport({'form' : 'view', 'status': 'view', data : this.state.data});
  }

  editMain(val){
    const prevState = this.state.accordion;
    
    if(prevState[0] == false)
      this.toggleAccordion(0);
    
    if (val === false) {
      dataStore.setters.setDataTourMain({'form' : 'view', 'status': 'save', data: this.state.data});
    } else {
      dataStore.setters.setDataTourMain({'form' : 'view', 'status': 'edit', data : this.state.data});
    }
  }

  editKtp(val){
    const prevState = this.state.accordion;
    
    if(prevState[1] == false)
      this.toggleAccordion(1);

    if (val === false) {
      dataStore.setters.setDataTourKtp({'form' : 'view', 'status': 'save', data: this.state.data});
    } else {
      dataStore.setters.setDataTourKtp({'form' : 'view', 'status': 'edit', data : this.state.data});
    }
  }

  editPassport(val){
    const prevState = this.state.accordion;
    
    if(prevState[2] == false)
      this.toggleAccordion(2);

    if (val === false) {
      dataStore.setters.setDataTourPassport({'form' : 'view', 'status': 'save', data: this.state.data});
    } else {
      dataStore.setters.setDataTourPassport({'form' : 'view', 'status': 'edit', data : this.state.data});
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.data_tour_main !== prevProps.data_tour_main){
        if (this.props.data_tour_main.form === 'view' && this.props.data_tour_main.status === 'view') {
          this.setState({edit_main : false});
        } else if (this.props.data_tour_main.form === 'view' && this.props.data_tour_main.status === 'edit') {
          this.setState({edit_main : true});
        }
    }
    if(this.props.data_tour_ktp !== prevProps.data_tour_ktp){
      if (this.props.data_tour_ktp.form === 'view' && this.props.data_tour_ktp.status === 'view') {
        this.setState({edit_ktp : false});
      } else if (this.props.data_tour_ktp.form === 'view' && this.props.data_tour_ktp.status === 'edit') {
        this.setState({edit_ktp : true});
      }
    }
    if(this.props.data_tour_passport !== prevProps.data_tour_passport){
      if (this.props.data_tour_passport.form === 'view' && this.props.data_tour_passport.status === 'view') {
        this.setState({edit_passport : false});
      } else if (this.props.data_tour_passport.form === 'view' && this.props.data_tour_passport.status === 'edit') {
        this.setState({edit_passport : true});
      }
    }
    if(this.props.reload_table !== prevProps.reload_table){
      if (this.props.reload_table === true) {
          this.getData();
          this.notify_berhasil("Diupdate");   
      }
    }
}

  render() {
    return (
      <div>
        <Card>
          <CardHeader>
              Reward Tour Detail
          </CardHeader>
          <CardBody>
            <div id="accordion">
              <Card>
                <CardHeader id="headingOne">
                  <Button color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(0)} aria-expanded={this.state.accordion[0]} aria-controls="collapseOne">
                    <h5 className="m-0 p-0">Data Utama</h5>
                  </Button>
                  <div className="card-header-actions">
                      {(this.state.edit_main === false) &&
                          <Button className="btn-outline-dark btn-sm icon mr-1 mb-1" onClick={() => this.editMain(true)}>
                              <i className="fa fa-pencil"></i>
                          </Button>
                      }
                      {(this.state.edit_main === true) &&
                          <div>
                             <Button className="btn-outline-dark btn-sm icon mr-1 mb-1" onClick={() => this.closeMain()}>
                                <i className="fa fa-remove"></i>
                            </Button>
                            <Button className="btn-outline-dark btn-sm icon mr-1 mb-1" onClick={() => this.editMain(false)}>
                              <i className="fa fa-save"></i>
                            </Button>
                          </div>
                      }
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                  <CardBody>
                      {(this.state.edit_main === false) &&
                         <DataMain data={this.state.data} id = {this.props.match.params.id}/>
                      }
                      {(this.state.edit_main === true) &&
                          <DataMainForm data={this.state.data} id = {this.props.match.params.id}/>
                      }
                  </CardBody>
                </Collapse>
              </Card>
              <Card>
                <CardHeader id="headingTwo">
                  <Button color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(1)} aria-expanded={this.state.accordion[1]} aria-controls="collapseTwo">
                    <h5 className="m-0 p-0">Data KTP</h5>
                  </Button>
                  <div className="card-header-actions">
                    {(this.state.edit_ktp === false) &&
                      <Button className="btn-outline-dark btn-sm icon mr-1 mb-1" onClick={() => this.editKtp(true)}>
                          <i className="fa fa-pencil"></i>
                      </Button>
                    }
                    {(this.state.edit_ktp === true) &&
                      <div>
                         <Button className="btn-outline-dark btn-sm icon mr-1 mb-1" onClick={() => this.closeKtp()}>
                            <i className="fa fa-remove"></i>
                        </Button>
                          <Button className="btn-outline-dark btn-sm icon mr-1 mb-1" onClick={() => this.editKtp(false)}>
                            <i className="fa fa-save"></i>
                        </Button>
                      </div>
                    }
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
                  <CardBody>
                    {(this.state.edit_ktp === false) &&
                        <DataKtp data={this.state.ktp} id = {this.props.match.params.id}/>
                    }
                    {(this.state.edit_ktp === true) &&
                        <DataKtpForm data={this.state.ktp} id = {this.props.match.params.id}/>
                    }
                  </CardBody>
                </Collapse>
              </Card>
              <Card>
                <CardHeader id="headingThree">
                  <Button color="link" className="text-left m-0 p-0" onClick={() => this.toggleAccordion(2)} aria-expanded={this.state.accordion[2]} aria-controls="collapseThree">
                    <h5 className="m-0 p-0">Data Passport</h5>
                  </Button>
                  <div className="card-header-actions">
                  {(this.state.edit_passport === false) &&
                    <Button className="btn-outline-dark btn-sm icon mr-1 mb-1" onClick={() => this.editPassport(true)}>
                        <i className="fa fa-pencil"></i>
                    </Button>
                  }
                  {(this.state.edit_passport === true) &&
                    <div>
                       <Button className="btn-outline-dark btn-sm icon mr-1 mb-1" onClick={() => this.closePassport()}>
                          <i className="fa fa-close"></i>
                      </Button>
                      <Button className="btn-outline-dark btn-sm icon mr-1 mb-1" onClick={() => this.editPassport(false)}>
                        <i className="fa fa-save"></i>
                      </Button>
                    </div>
                  }
                  </div>       
                </CardHeader>
                <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion" id="collapseThree">
                  <CardBody>
                    {(this.state.edit_passport === false) &&
                        <DataPassport data={this.state.passport} id = {this.props.match.params.id}/>
                    }
                    {(this.state.edit_passport === true) &&
                        <DataPassportForm data={this.state.passport} id = {this.props.match.params.id}/>
                    }
                  </CardBody>
                </Collapse>
              </Card>
            </div>
          </CardBody>
        </Card>
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
      data_tour_main : dataStore.getters.getDataTourMain(),
      data_tour_ktp : dataStore.getters.getDataTourKtp(),
      data_tour_passport : dataStore.getters.getDataTourPassport(),
      reload_table: dataStore.getters.getReloadTable(),  
  }
}
export default connect(mapStateToProps)(DataTourRewardDetail);