import React, { Component } from 'react';
import { connect} from "remx";
import { Redirect,} from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import broker from "../../utils/broker";
import authStore from "../../stores/auth";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login_message: '',
      password:'',
      username:'',
      message: ''
    }
    this.onChangeusername = this.onChangeusername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  onChangeusername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e) {
      this.setState({ password: e.target.value });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.onSubmitLogin();
    }

  }

  onSubmitLogin() {
    this.setState({ 
      loading: true,
      message: '',
   });

  broker.fetch.post('/administrator/auth', {
      username: this.state.username,
      password: this.state.password
  }).then(res => {
      const { data } = res;
      if (data.status === true) {
          const { user, token } = data.data;
          broker.setToken(token);
          authStore.setters.setUser(user);
      } else {
          const { message } = data;
          this.setState({
              loading: false,
              message: message
          });
      }
  }).catch(err => {
      this.setState({
          loading: false,
          message: 'username Dan Password Tidak Sesuai'
      })
  });

}

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/Dashboard' } };
    if (this.props.user !== null) {
      return <Redirect to={(from == '/' ? '/dashboard' : from)} />
    }
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="username" placeholder="username" value={this.state.username}  onChange={this.onChangeusername} onKeyPress={this.handleKeyPress} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} onKeyPress={this.handleKeyPress} />
                    </InputGroup>
                    <p className="text-danger">{this.state.message}</p>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4" onClick={() => this.onSubmitLogin()}>Login</Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white py-5 d-md-down-none" style={{ width: 44 + '%', backgroundColor:'#cd1b34' }}>
                  <CardBody className="text-center">
                    <div>
                     
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
function mapStateToProps(props) {
  return {
      user: authStore.getters.getUser(),
  }
}
export default connect(mapStateToProps)(Login);
