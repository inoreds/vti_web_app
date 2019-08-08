import React, {Component} from 'react';
import {Badge, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Card, CardBody, CardHeader, Collapse} from 'reactstrap';
import 'react-bootstrap-table/dist//react-bootstrap-table-all.min.css';
import "react-table/react-table.css";
import { connect} from "remx";
import authStore from '../../stores/auth'

import MasterViewer from "../../components/MasterViewer"

import data_field from './_field';
import TableBasic from '../../reuse_components/Tables/TableBasic';
import broker from '../../utils/broker';
import dataStore from '../../stores/data'
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
      data: [],
      edit_main: false,
      edit_ktp : false,
      edit_passport: false
    }
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.toggleCustom = this.toggleCustom.bind(this);
    this.editMain = this.editMain.bind(this);
    this.editKtp = this.editKtp.bind(this);
    this.editPassport = this.editPassport.bind(this);

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

  getData() {
    broker.fetch.get(`vti/tur_reward/${this.state.reward_id}?page=1`)
    .then(res => {
        const { data } = res;
        if (data.status === true) {
            const {data_tour} = data.data
            this.setState({data: data_tour})
        } else {

        }
    }).catch(err => {
        
    });
  }

  editMain(){
    this.setState({
      edit_main: !this.state.edit_main,
    });
  }

  editKtp(){
    this.setState({
      edit_ktp: !this.state.edit_ktp,
    });
  }

  editPassport(){
    this.setState({
      edit_passport: !this.state.edit_passport,
    });
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
                          <Button className="btn-outline-dark btn-sm icon mr-1 mb-1" onClick={() => this.editMain()}>
                              <i className="fa fa-pencil"></i>
                          </Button>
                      }
                      {(this.state.edit_main === true) &&
                          <Button className="btn-outline-dark btn-sm icon mr-1 mb-1" onClick={() => this.editMain()}>
                              <i className="fa fa-save"></i>
                          </Button>
                      }
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[0]} data-parent="#accordion" id="collapseOne" aria-labelledby="headingOne">
                  <CardBody>
                      {(this.state.edit_main === false) &&
                         <DataMain />
                      }
                      {(this.state.edit_main === true) &&
                          <DataMainForm />
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
                      <Button className="btn-outline-dark btn-sm icon mr-1 mb-1" onClick={() => this.editKtp()}>
                          <i className="fa fa-pencil"></i>
                      </Button>
                    }
                    {(this.state.edit_ktp === true) &&
                      <Button className="btn-outline-dark btn-sm icon mr-1 mb-1" onClick={() => this.editKtp()}>
                          <i className="fa fa-save"></i>
                      </Button>
                    }
                  </div>
                </CardHeader>
                <Collapse isOpen={this.state.accordion[1]} data-parent="#accordion" id="collapseTwo">
                  <CardBody>
                    {(this.state.edit_ktp === false) &&
                        <DataKtp />
                    }
                    {(this.state.edit_ktp === true) &&
                        <DataKtpForm />
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
                    <Button className="btn-outline-dark btn-sm icon mr-1 mb-1" onClick={() => this.editPassport()}>
                        <i className="fa fa-pencil"></i>
                    </Button>
                  }
                  {(this.state.edit_passport === true) &&
                    <Button className="btn-outline-dark btn-sm icon mr-1 mb-1" onClick={() => this.editPassport()}>
                        <i className="fa fa-save"></i>
                    </Button>
                  }
                  </div>       
                </CardHeader>
                <Collapse isOpen={this.state.accordion[2]} data-parent="#accordion" id="collapseThree">
                  <CardBody>
                    {(this.state.edit_passport === false) &&
                        <DataPassport />
                    }
                    {(this.state.edit_passport === true) &&
                        <DataPassportForm />
                    }
                  </CardBody>
                </Collapse>
              </Card>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(props) {
  return {
      user: authStore.getters.getUser(),
  }
}
export default connect(mapStateToProps)(DataTourRewardDetail);

