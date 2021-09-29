import React from 'react';
import img from './react-logo.png';
import { ModalComponent } from './Modal';
import { AuthService } from '../services/AuthService';
import { User, NewUserInput } from '../types/TypeDefs';
import { NavLink } from 'react-router-dom';

interface IHeaderState {
    modalOpen: boolean;
    isActive: boolean;
}

interface IHeaderProps {
    authService: AuthService;
    user?: User;
    setUser: (authUser:User|undefined) => void;
}

export class Header extends React.Component <IHeaderProps,IHeaderState> {
    
    constructor(props:IHeaderProps){
        super(props);
        this.state = {
            modalOpen: false,
            isActive: false
        }

        this.onSignInClick = this.onSignInClick.bind(this)
        this.clearModal = this.clearModal.bind(this)
        this.onSubmission = this.onSubmission.bind(this)
        this.openMenu = this.openMenu.bind(this)
        this.closeMenu = this.closeMenu.bind(this)
    }

    public static defaultProps = {
        user: undefined
    }

    private openMenu():void{
        document.body.classList.add('nav-is-active');
        this.setState({isActive:true});
    }

    private closeMenu():void{
        document.body.classList.remove('nav-is-active');
        this.setState({isActive:false});
    }

    private onSignInClick():void {
        if(this.props.user){
            this.props.setUser(undefined);
        }else{
            this.setState({modalOpen: true});
            document.body.classList.remove('nav-is-active')
        }
    }
    
    private clearModal ():void{
        this.setState({modalOpen: false});
    };
  
    //Is onSubmission called before clearModal, required for if else statement loginMod true
    private async onSubmission (user:NewUserInput): Promise<void> {
        if(!user.username){
            const authUser = await this.props.authService.login(user.email, user.password)
            console.log('Login: ', authUser);
            this.props.setUser(authUser);
        }
        else{
            //change to register Cognito user 
            const authUser = await this.props.authService.login(user.email, user.password)
            console.log('Register: ',user);
            this.props.setUser(authUser);
        }
    }


    render() {

        if(this.props.user) {
            this.props.user.user.getUserAttributes((err,result) => {
                if(err){
                console.log(err);
                } else{
                    if(result) console.log(result[0].Value)
                }
          });
        }

        return(
        <header className="header-container">
            <div className="header-title">
                <span>
                    <h1><img src={img} className='header-logo' alt="React logo" />React.JS blog</h1>
                </span>
                <button className="nav-toggle" onClick={this.state.isActive ? this.closeMenu: this.openMenu}>
                    <span className="hamburger">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>
            </div>
            <div>
                <ul className="nav-container">
                    <li>
                        <NavLink className="nav-links" to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-links" to="/dashboard">
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-links" to="/createblog">
                            Create blog
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-links" to="/myblogs">
                            My blogs
                        </NavLink>
                    </li>
                    <li>
                        <p className="nav-signin">{this.props.user ? `Signed in as : ${this.props.user.username}` : ''}</p>
                        <button className="main-button" onClick={this.onSignInClick}>
                            {this.props.user ? "Sign Out" : "Sign In"}
                        </button>
                    </li>
                </ul>
            </div>
            <ModalComponent
                modalOpen={this.state.modalOpen}
                clearModal={this.clearModal}
                onSubmission={this.onSubmission}
            />
        </header>
        )
    }
}

export default Header;