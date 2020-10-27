import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {signin} from './../../service/loginService';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TextInput from './generic/TextInput';

class LoginModule extends Component{
  constructor(props){
    super(props);
    //const {loggedIn, user, pending, error, signInUser} = this.props;
    this.state = {email: '', password: '', loggedIn: false, user: null, pending: false};
    this.onUserInput = this.onUserInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
    const {signInUser} = this.props;
    //signInUser({'email': 'aribhatt@adobe.com', 'password': 'ari'});
  }
  onUserInput(tag, value){
    this.setState({
      [tag]: value
    });
    //console.log('state -> ', this.state);
  }
  handleSubmit(event){
    event.preventDefault();
    console.log(this.props);
    const {signInUser} = this.props;
    signInUser({'email': 'aribhatt@adobe.com', 'password': 'ari'});
  }
  render(){
    const {loggedIn, user, pending, error} = this.props;

    return(
      <div>
        {this.props.loggedIn && <div>Hi {this.props.user.userName}, You are now logged in</div>}
        {!this.props.loggedIn && <Form onSubmit={this.handleSubmit}>
          <div className="col-md-10 col-lg-8 clearfix">
            <TextInput
              name="email"
              label="Email"
              type="email"
              error={error ? error.email : null}
              handler={this.onUserInput}
            />
          </div>
          <div className="col-md-10 col-lg-8 clearfix">
            <TextInput
              name="password"
              label="Password"
              type="password"
              error={error ? error.password : null}
              handler={this.onUserInput}
            />
          </div>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Stay signed in" />
          </Form.Group>
          <Button className="themed_btn" variant="primary" type="submit">
            Login
          </Button>
        </Form>}
        
      </div>
    );
  }
}
// function onUserInput(event){
//   this.setState({
//     [event.target.name]: event.target.value
//   });
// }
// function handleSubmit(event, fun){
//   event.preventDefault();
//   console.log(this.props);
//   const {signInUser} = fun;
//   signInUser({'email': 'aribhatt@adobe.com', 'password': 'ari'});
// }
// function LoginModule({loggedIn, pending, user, error, signInUser}){

// }

const mapStateToProps = state => {
  console.log('mapStateToProps called', state);
  return {
    loggedIn: state.loginReducer.loggedIn,
    pending: state.loginReducer.pending,
    user: state.loginReducer.user,
    error: state.loginReducer.error
  }
}
//Anything returned from this function will end up as props to BookList container
const mapDispatchToProps = (dispatch) => bindActionCreators({signInUser: signin}, dispatch)
//Promote BookList from a component to a container
//It needs to know about this dispatch method selectBook -- Make it available as prop
export default connect(mapStateToProps, mapDispatchToProps)(LoginModule);
