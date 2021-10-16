import React from "react";
import Modal from "react-modal";
import { NewUserInput } from "../types/TypeDefs";
import * as EmailValidator from 'email-validator';


interface IModalProps {
  onSubmission: (user:NewUserInput) => void;
  clearModal: () => void;
  modalOpen: boolean;
}

interface IModalState {
  email: string;
  username: string;
  password:string;
  error: string;
  registerMod: boolean;
  verify: boolean;
}

interface CustomEvent {
  target: HTMLInputElement
}


export class ModalComponent extends React.Component<IModalProps,IModalState>{

  constructor(props:IModalProps){
    super(props);
    
    this.state = {
      email: '',
      username: '',
      error: ``,
      password: '',
      registerMod: false,
      verify: false
    }

    this.onChangeUsername = this.onChangeUsername.bind(this)
    this.onChangePassword = this.onChangePassword.bind(this)
    this.onChangeEmail = this.onChangeEmail.bind(this)
    this.onSubmission = this.onSubmission.bind(this)
  }

  private onChangeUsername(e:CustomEvent) {
    this.setState({username:e.target.value});
  };

  private onChangeEmail(e:CustomEvent) {
    this.setState({email: e.target.value})
  }

  private onChangePassword(e:CustomEvent) {
    this.setState({password: e.target.value})
  }

  private onSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,16}$/;

    if((this.state.registerMod && !this.state.username) || !this.state.password || !this.state.email){
      
      this.setState({error:'All fields are required'});

    } else if (!EmailValidator.validate(this.state.email)){
      
      this.setState({error:'Email must be in a valid format'});

    }else if (!passwordRegex.test(this.state.password)) {
      
      this.setState({error:`Password policy requires at least :
      
      8-16 characters
      One number
      One uppercase letter
      One lowercase letter
      One special character`});

    } else {

      this.props.onSubmission({
        username: this.state.username,
        email: this.state.email,
        password: this.state.password 
      });

      this.setState({
        registerMod: false,
        error: '',
        email:'',
        username:'',
        password:'',
        verify: true });

      setTimeout(() => {
        
        this.setState({
          verify: false
        });

        this.props.clearModal();
      },4000);
    }
  };

  render(){

    return (
      <Modal
        isOpen ={!!this.props.modalOpen}
        contentLabel="Login modal"
        onRequestClose={this.props.clearModal}
        closeTimeoutMS={0}
        ariaHideApp={false}
        className="modal" 
      >
        {!this.state.verify && <h3 className="modal-title">{ this.state.registerMod ? 'Registration details' : 'Sign in details' } </h3>}
        {!this.state.verify ? 
        (<form onSubmit={this.onSubmission}>
          {this.state.registerMod && (
            <>
              <br />
              <label htmlFor="userName">Username:</label>
              <br />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  style={{ fontSize: "12px", height: "1.5rem", width: "22rem" }}
                  onChange={this.onChangeUsername}
                ></input>
              <br />
            </>)}
          <br />
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="text"
            id="useremail"
            name="useremail"
            placeholder="email"
            style={{ fontSize: "12px", height: "1.5rem", width: "22rem" }}
            onChange={this.onChangeEmail}
          ></input>
          <br />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="text"
            id="password"
            name="password"
            placeholder="password"
            style={{ fontSize: "12px", height: "1.5rem", width: "22rem" }}
            onChange={this.onChangePassword}
          ></input>
            <br/>
            <br/>
            {this.state.error && (<div className="modal-error"><h5>{this.state.error}</h5></div>)}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            {this.state.registerMod && (
              <div>
                <br/>
                <br/>
                <br/>
              </div>
            )}
          <button className="main-button" onClick={() => {
            this.setState({
              registerMod: false,
              error: '',
              email:'',
              username:'',
              password:''
            });
            this.props.clearModal();
            }}>
            Cancel
          </button>
          <button className="main-button" type="submit">Enter</button>
        </form>) : 
        (
          <div className="modal-verify">
            <h5>Please check your email to verify</h5>
            <h5>your account before login</h5>
          </div>
        )}
        { !this.state.registerMod && !this.state.verify && (<div>
          <h5>If you are not a member please register</h5>
          <button className="main-button" onClick={() => this.setState({
                                                                          registerMod:true, 
                                                                          error:''
                                                                        })}>
            Register
          </button>
        </div>)}
      </Modal>
    );
  }
}
