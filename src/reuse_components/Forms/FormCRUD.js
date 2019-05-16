import React from 'react';
import serialize from 'form-serialize';
import {Button, FormGroup, Col, Row, Label, Input} from 'reactstrap';
import broker from "../../utils/broker";
import { withRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

class FormCRUD extends React.Component {
    constructor(props) {
      super(props);
       this.state = {
      };
    }
    notify_berhasil = () => toast("Data " + this.props.title + " Berhasil Disimpan");
    onSubmit = (e) => {
        e.preventDefault(); 
        const body = serialize(e.target, { hash: true });
        broker.fetch.post(`${this.props.url}`, body)
        .then(res => {
            const { data } = res;
            console.log(data)
            if (data.status === true) {
                this.props.history.push(`${this.props.url_parent}`)
            } else {

            }
        }).catch(err => {
            
        });
        //this.notify_berhasil();
    };

    render() {
        console.log(this.props.fields)
        return (
            <div> 
                <form onSubmit={this.onSubmit}>
                <Row>
                {this.props.fields.map((field, i) => {    
                    return <Col xs="12" md="6">
                                <h5>{field.label}</h5>
                                <hr className="my-2" />  
                                {field.child.map((child, j) => {  
                                    return <FormGroup row>
                                                <Col md="3">
                                                    {child.hidden === 'no' &&
                                                        <Label>{child.label}</Label>
                                                    }        
                                                </Col>
                                                <Col xs="12" md="8">
                                                    {child.type === 'text' && child.hidden === 'no' &&
                                                        <Input type="text" id={child.id} name={child.id} />
                                                    }
                                                    {child.type === 'text' && child.hidden === 'yes' &&
                                                        <Input type="hidden" id={child.id} name={child.id} />
                                                    }
                                                    {child.type === 'combobox' &&
                                                        <div>
                                                        {child.property.map((radio, k) => {  
                                                            return <FormGroup check inline>
                                                                        <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                                                                        <Label className="form-check-label" check htmlFor="inline-radio1">{child.property[k]}</Label>
                                                                    </FormGroup>
                                                        })}
                                                        </div>
                                                    }
                                                </Col>
                                            </FormGroup>
                                })}
                            </Col>  
                    })      
                }
                  </Row>
                  <Button type="submit" className="btn-outline-dark icon mr-1 mb-1">Simpan Data</Button>
                </form>
                <ToastContainer 
                    position='bottom-right'
                />
            </div>
      );
    }
}

export default withRouter(FormCRUD)