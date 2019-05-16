import React from 'react';
import {Button,Tooltip} from 'reactstrap';
import { withRouter } from "react-router-dom";
import broker from "../../utils/broker";

class ButtonList extends React.Component {
    constructor(props) {
      super(props);
  
      this.toggle = this.toggle.bind(this);
      this.onButtonProccess = this.onButtonProccess.bind(this);
      this.state = {
        tooltipOpen: false,
      };
    }
  
    toggle() {
      this.setState({
        tooltipOpen: !this.state.tooltipOpen,
      });
    }

    deleteData(id, url) {
      broker.fetch.get(url+id)
      .then(res => {
          const { data } = res;
          console.log(data)
          if (data.status === true) {
           
          } else {

          }
      }).catch(err => {
          
      });
    }

    onButtonProccess(id, type, url){
      if (type === 'Delete') {
        this.deleteData(id, url)
      } else if (type === 'View') {

      } else if (type === 'Edit') {

      }
    }
  
    render() {
      return (
        <span>
          <Button size="sm" className="btn-outline-dark icon mr-1 mb-1" id={this.props.item.id + '_' + this.props.id}   onClick={() => this.onButtonProccess(this.props.id, this.props.item.type, this.props.item.url)}>
            <i className={this.props.item.icon}></i>
          </Button>
          <Tooltip placement="bottom"isOpen={this.state.tooltipOpen} target={this.props.item.id + '_' + this.props.id} toggle={this.toggle}>
           {this.props.item.text}
          </Tooltip>
        </span>
      );
    }
  }

  export default withRouter(ButtonList)