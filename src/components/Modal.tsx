import React, { useReducer } from "react";
import Modal from "react-modal";
import { NewUserInput } from "../types/TypeDefs";
import * as EmailValidator from 'email-validator';
import { confirmSignUp } from "../controllers/AuthService/AuthService";


interface IModalProps {
  onSubmission: (user:NewUserInput) => void;
  clearModal: () => void;
  modalOpen: boolean;
}

interface CustomEvent {
  target: HTMLInputElement
}

interface IModalState {
  code: string
  email: string
  username: string
  password: string
  error: string
  registerMod: boolean
  verify: boolean
}

type modalActionGuard = 'REGISTER'|'SIGNIN'|'VERIFY'|'CHANGE_USER'|'CHANGE_EMAIL'|'CHANGE_PASSWORD'|'CHANGE_CODE'|'SET_ERROR'|'RESET'|'REGISTER_CLICK';

interface IAction {
  type: modalActionGuard;
  newState: Partial<IModalState>
}


const modalReducer = (state:IModalState,action:IAction):IModalState => {

  const {type,newState} = action;

  switch(type){
    case 'REGISTER': case 'VERIFY': case 'SIGNIN': case 'RESET': case 'REGISTER_CLICK': case 'SET_ERROR': case 'CHANGE_CODE': case 'CHANGE_EMAIL': case 'CHANGE_PASSWORD': case 'CHANGE_USER':
    {
      return {
        ...state,
        ...newState
      };
    }
    default: {
      throw new Error(`Unhandled action type ${type}`);
    }
  }
}

export const ModalComponent:React.FC<IModalProps> = (props) => {

  const [state,dispatch] = useReducer(modalReducer, {
    code : '',
    email: '',
    username: '',
    password: '',
    error: '',
    registerMod: false,
    verify: false
  })

  const postRegister = () => dispatch({type: 'REGISTER', newState: {
            registerMod: false,
            error: '',
            email: '',
            password: '',
            username: '',
            verify: true
          }});


  const postSignin = () => dispatch({type: 'SIGNIN', newState: {
        error: '',
        email: '',
        password: '',
        verify: false
  }});

  const postVerify = () => dispatch({type: 'VERIFY', newState: {
      verify: false
  }});
  
  const onChangeUsername = (e:CustomEvent) => dispatch({type: 'CHANGE_USER', newState: {
      username: e.target.value
  }});

  const onChangeEmail = (e:CustomEvent) => dispatch({type: 'CHANGE_EMAIL', newState: {
      email: e.target.value
  }});


  const onChangePassword = (e:CustomEvent) => dispatch({type: 'CHANGE_PASSWORD', newState: {
      password: e.target.value
    }});

  const onChangeCode = (e:CustomEvent) => dispatch({type: 'CHANGE_CODE', newState: {
      code: e.target.value
  }});

  const setError = (error:string) => dispatch({type: "SET_ERROR",newState: {
      error
  }});


  const onReset = () => dispatch({type:'RESET',newState: {
    email: '',
    username: '',
    password: '',
    error: '',
    registerMod: false,
  }});

  const onRegisterClick = () => dispatch({type:'REGISTER_CLICK',newState: {
    email: '',
    username: '',
    password: '',
    error: '',
    registerMod: true,
  }});

  const { code, email, username, password, error, registerMod, verify } = state;

  const verifySignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let answer:boolean = false;

    answer = await confirmSignUp(username,code);

    if (answer === true) {
      
      postVerify();
      props.clearModal();

    } else {
      console.log('Please re-enter code')
    }

  }

  const onSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_])[a-zA-Z0-9!@#$%^&*_]{8,16}$/;

    if((registerMod && !username) || !password || !email){
      
      setError('All fields are required');

    } else if (!EmailValidator.validate(email)){
      
      setError('Email must be in a valid format');

    }else if (registerMod && !passwordRegex.test(password)) {
      
      setError(`Password policy requires at least :
      
      8-16 characters
      One number
      One uppercase letter
      One lowercase letter
      One special character`);

    } else {

      props.onSubmission({
        username: username,
        email: email,
        password: password 
      });

      if(registerMod){
        postRegister();
      } else {
        postSignin()

        props.clearModal();
      }
    }
  };

  return (
      <Modal
        isOpen ={!!props.modalOpen}
        contentLabel="Login modal"
        onRequestClose={props.clearModal}
        closeTimeoutMS={0}
        ariaHideApp={false}
        className="s7-modal" 
      >
        {verify ? (
          <div className="s7-modal__verify">
            <h5>Please check your email and</h5>
            <h5>enter the 6-digit verification code</h5>
            <h5>to confirm your account</h5>
            <form onSubmit={verifySignUp} className="s7-modal__form">
              <input type="text"
                  data-testid="code"
                  name="code"
                  placeholder="*   *   *   *   *   *"
                  style={{ fontSize: "14px", height: "3rem", width: "9em", textAlign:"center" }}
                  onChange={onChangeCode}>
              </input>
              <br/>
              <br/>
              <button className="main-button" type="submit">Enter</button>
            </form>
          </div>
        ) : (
        <>
        <h3 className="s7-modal__title">{ registerMod ? 'Registration details' : 'Sign in details' } </h3>
        <form onSubmit={onSubmission}>
          {registerMod && (
            <>
              <br />
              <label htmlFor="userName">Username:</label>
              <br />
                <input
                  type="text"
                  data-testid="username"
                  name="username"
                  placeholder="username"
                  style={{ fontSize: "12px", height: "1.5rem", width: "22rem" }}
                  onChange={onChangeUsername}
                ></input>
              <br />
            </>
          )}
          <br />
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="text"
            data-testid="useremail"
            name="useremail"
            placeholder="email"
            style={{ fontSize: "12px", height: "1.5rem", width: "22rem" }}
            onChange={onChangeEmail}
          ></input>
          <br />
          <br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="text"
            data-testid="password"
            name="password"
            placeholder="password"
            style={{ fontSize: "12px", height: "1.5rem", width: "22rem" }}
            onChange={onChangePassword}
          ></input>
          {error && (<div className="s7-modal__error" data-testid="modal-error"><h5>{error}</h5></div>)}
          <div className="s7-modal__spacer">
            <button className="main-button" onClick={() => {
              onReset();
              props.clearModal();
              }}>
              Cancel
            </button>
            <button className="main-button" type="submit">Enter</button>
          </div>  
        </form>
        {!registerMod && (<div>
          <h5>If you are not a member please register</h5>
          <button className="main-button" onClick={onRegisterClick}>
            Register
          </button>
        </div>)}
      </>
      )}
    </Modal>
  )
}

