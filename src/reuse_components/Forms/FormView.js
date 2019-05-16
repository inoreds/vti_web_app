import React from 'react';
import { withRouter } from "react-router-dom";
import { FormGroup, Col, Label} from 'reactstrap';
import moment from 'moment-with-locales-es6';

class FormView extends React.Component {
    constructor(props) {
      super(props);
       this.state = {
      };
    }
   
    render() {
        const statusField = (value, status_value, status_text) => {
            var return_value;
            for (var i=0;i<status_value.length;i++){
                if (value === status_value[i])
                    return_value = status_text[i]
            }
            return return_value
        };
       if (this.props.data){
            return (
                <div>      
                    <h5>{this.props.field.label}</h5>
                    <hr className="my-2" />                  
                    {this.props.field.child.map((field, i) => {  
                        return <FormGroup key={i} row>
                                    {field.hidden === 'no' && 
                                        <Col md="5">
                                            <Label>{field.label}</Label>
                                        </Col>
                                    }
                                    <Col xs="12" md="7">
                                        {field.content_text === 'text' && field.hidden === 'no' && 
                                            <div>
                                                {field.type === 'text' &&
                                                    <p className="form-control-static">: {this.props.data[field.id]} {field.last_text}</p>
                                                }
                                                {field.type === 'boolean' &&
                                                    <p className="form-control-static">: {(this.props.data[field.id] === true ? field.property[1] : field.property[0] )}</p>
                                                }
                                                {field.type === 'enum' &&
                                                    <p className="form-control-static">: {field.property[this.props.data[field.id] - 1]}</p>
                                                }
                                                {field.type === 'status' &&
                                                    <p className="form-control-static">: {statusField(this.props.data[field.id], field.status_value, field.status_text)}</p>
                                                }
                                                {field.type === 'number:optional' &&
                                                    <p className="form-control-static">: {field.property[this.props.data[field.id]]}</p>
                                                }
                                                {field.type === 'date' && field.format === 'fulldate' &&
                                                    <p className="form-control-static">: {(this.props.data[field.id]) ? moment(this.props.data[field.id]).locale('id').format('DD MMMM YYYY') : ''}</p>
                                                }
                                                {field.type === 'date' && field.format === 'age' &&
                                                    <p className="form-control-static">: {(this.props.data[field.id]) ? moment().diff(this.props.data[field.id], 'years',false) : ''}</p>
                                                }
                                            </div>
                                        }
                                        {field.content_text === 'array' && this.props.data[field.id] !== null &&
                                            <div>
                                                {JSON.parse(this.props.data[field.id]).map((list, j) => {  
                                                    return <FormGroup key={j}>
                                                                <p className="form-control-static">{j === 0 ? ':' : '\u00A0'} {list}</p>
                                                            </FormGroup>
                                                })}
                                            </div>                  
                                        }
                                        {field.content_text === 'obj' && this.props.data[field.id] !== null &&
                                            <div>
                                                {field.property.map((list, j) => {  
                                                    return <FormGroup key={j}>
                                                                <p className="form-control-static">{j === 0 ? ':' : '\u00A0'} {list.toUpperCase() + ' :'} {JSON.parse(this.props.data[this.props.field.id][field.id])[list]}</p>
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
}
export default withRouter(FormView)