import React, {Component} from 'react';
import {Button, Card, CardHeader, CardBody, Tooltip, FormGroup, Col, Row, Label, Input} from 'reactstrap';

class FormNew extends React.Component {
    constructor(props) {
      super(props);
       this.state = {
      };
    }
  
    render() {
        return (
            <div>      
                <h5>{this.props.field.label}</h5>
                <hr className="my-2" />                  
                {this.props.field.child.map((field, i) => {  
                    return <FormGroup row>
                                <Col md="2">
                                    {field.hidden === 'no' &&
                                         <Label>{field.label}</Label>
                                    }        
                                </Col>
                                <Col xs="12" md="9">
                                    {field.type === 'text' && field.hidden === 'no' &&
                                        <Input type="text" id={field.id} />
                                    }
                                    {field.type === 'combobox' &&
                                        <div>
                                        {field.property.map((radio, j) => {  
                                            return <FormGroup check inline>
                                                        <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                                                        <Label className="form-check-label" check htmlFor="inline-radio1">{field.property[j]}</Label>
                                                    </FormGroup>
                                        })}
                                        </div>
                                    }
                                   
                                </Col>
                            </FormGroup>
                })}
            </div>
      );
    }
}
export default FormNew