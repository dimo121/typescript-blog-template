import React from 'react';
import img from './react-logo.png';
import { ModalComponent } from './ModalComponent';
import { AuthService } from '../services/AuthService';
import { User, NewUserInput } from '../types/TypeDefs';
import { NavLink } from 'react-router-dom';

interface IHeaderState {
    modalOpen: boolean;
}

interface IHeaderProps {
    authService: AuthService;
    user: User | undefined;
    setUser: (authUser:User|undefined) => void;
}

export class Header extends React.Component <IHeaderProps,IHeaderState> {
    
    constructor(props:IHeaderProps){
        super(props);
        this.state = {
            modalOpen: false,
        }

        this.onClick = this.onClick.bind(this)
        this.clearModal = this.clearModal.bind(this)
        this.onSubmission = this.onSubmission.bind(this)
    }

    private onClick ():void {
        if(this.props.user){
            this.props.setUser(undefined);
            //this.setState({loggedIn: false})
        }else{
            this.setState({modalOpen: true});
        }
    }
    
    private clearModal ():void{
        this.setState({modalOpen: false});
    };
  
    //Is onSubmission called before clearModal, required for if else statement loginMod true
    private async onSubmission (user:NewUserInput): Promise<void> {
        if(!user.username){
            //login user with Cognito through authService
            const authUser = await this.props.authService.login(user.email, user.password)
            console.log('Login: ', authUser);
            //this.setState({loggedIn:true})
            this.props.setUser(authUser);
        }
        else{
            //change to register Cognito user 
            const authUser = await this.props.authService.login(user.email, user.password)
            console.log('Register: ',user);
            //this.setState({loggedIn:true})
            this.props.setUser(authUser);
        }
    }


    render() {
        return(
        <header className="header-container">
            <div className="header-title">
                <span><p><img src={img} className='header-logo' alt="React logo" /></p></span>
                <span><h1>ReactJS blog !</h1></span>
            </div>
            <div>
                <ul className="nav-container">
                    <li>
                        <div>
                            <NavLink className="nav-links" to="/">
                                Home
                            </NavLink>
                        </div>
                    </li>
                    <li>
                        <div>
                            <NavLink className="nav-links" to="/dashboard">
                                Dashboard
                            </NavLink>
                        </div>
                    </li>
                    <li>
                        <div>
                            <NavLink className="nav-links" to="/createblog">
                                Create blog
                            </NavLink>
                        </div>
                    </li>
                    <li>
                        <div>
                            <NavLink className="nav-links" to="/myblogs">
                                My blogs
                            </NavLink>
                        </div>
                    </li>
                    <li>
                        <p className="nav-signin">{this.props.user ? `Signed in as : ${this.props.user.username}` : '_'}</p>
                        <div>
                            <button className="main-button" onClick={this.onClick}>
                                {this.props.user ? "Sign Out" : "Sign In"}
                            </button>
                        </div>
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

/*{ <li>
    {this.state.loggedIn && <SignInDisplay />}
</li> 


<ul className="nav-container">
                    <li>
                        <NavLink className="nav-links" to="/" exact={true}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-links" to="/createblog">
                            Create blog
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="nav-links" to={`/myblogs`}>
                            My blogs
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={this.onClick}>
                            {this.state.loggedIn ? "Sign Out" : "Sign In"}
                        </button>
                    </li>
                </ul>
}*/

// newUser({
//     variables: { 
//         createUserInput : {
//             "username": this.state.name,
//             email: this.state.email,
//             password: this.state.password 
//         }
//     }
// }).then(response => {
//     localStorage.setItem("jwtoken",response.data.createUser.tokens);
//     this.setState({
//         error: '',
//         loggedIn: true
//     });
    
//     this.clearModal();
// }).catch((err:string) => {
//     console.log(err)
//     this.setState({
//         error:"Email already has a registered account";
//     });
// });
// } else if(this.state.loginMod){
// loginUser({
//     variables: { 
//         loginInput : {
//             email: this.state.email,
//             password: this.state.password 
//         }
//     }
// }).then(response => {
//     // localStorage.setItem("jwtoken",response.data.login.tokens);
//     //Use cognito and amplify for jwtoken from AuthService  in other folder
//     this.setState({
//         error: '',
//         loggedIn: true
//     });
//     this.clearModal();
// }).catch((err:string) => {
//     console.log(err)
//     this.setState({
//         error:"Wrong email and password combination";
//     });
// });
// }