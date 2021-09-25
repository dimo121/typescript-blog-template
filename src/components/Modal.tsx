import React from "react";
import Modal from "react-modal";
import { NewUserInput } from "../types/TypeDefs";


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
      error: '',
      password: '',
      registerMod: false
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
    if((this.state.registerMod && !this.state.username) || !this.state.password || !this.state.email){
      this.setState({error:'All fields are required'})
    } else{

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
        password:''});

      this.props.clearModal();
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
        <h3 className="modal-title">{ this.state.registerMod ? 'Registration details' : 'Sign in details' } </h3>
        {this.state.error && (<div className="modal-error"><h5>{this.state.error}</h5></div>)}
        <form onSubmit={this.onSubmission}>
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
          {!this.state.registerMod && (
            <div>
              <br/>
              <br/>
            </div>
          )}
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
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
        </form>
        { !this.state.registerMod && (<div>
          <h5>If you are not a member please register</h5>
          <button className="main-button" onClick={() => this.setState({registerMod:true})}>
            Register
          </button>
        </div>)}
      </Modal>
    );
  }
}
