import React, { useState } from 'react';
import img from './react-logo.png';
import Modal from './Modal';
import { AuthService } from '../controllers/AuthService/AuthService';
import { User, NewUserInput } from '../types/TypeDefs';
import { NavLink } from 'react-router-dom';


interface IHeaderProps {
    authService: AuthService;
    user?: User;
    setUser: (authUser:User|undefined) => void;
}

const Header:React.FC<IHeaderProps> = (props) => {
    
    const { authService, user, setUser } = props;

    const [modalOpen,setModal] = useState<boolean>(false);
    const [isActive, setActive] =  useState<boolean>(false);


    const openMenu = ():void => {
        document.body.classList.add('nav-is-active');
        setActive(true);
    }

    const closeMenu = ():void => {
        document.body.classList.remove('nav-is-active');
        setActive(false);
    }

    const onSignInClick = ():void => {
        if(user){
            setUser(undefined);
        }else{
            setModal(true);
            document.body.classList.remove('nav-is-active')
        }
    }
    
    const clearModal = ():void => {
        setModal(false);
    };
  
    const onSubmission = async (user:NewUserInput): Promise<void> => {
        if(!user.username){
            const authUser = await authService.login(user.email, user.password)
            console.log('Login: ', authUser);
            setUser(authUser);
        }
        else{
            const authUser = await authService.signUp(user.username,user.password,user.email)
            console.log('Registered: ', authUser);
        }
    }


    return (
        <header className="header-container">
            <div className="header-title">
                <span>
                    <h1><img  src={img} className='header-logo' alt="React logo" />React.JS blog</h1>
                </span>
                <button className="nav-toggle" onClick={isActive ? closeMenu: openMenu}>
                    <span className="hamburger" data-testid="hamburger">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>
            </div>
            <div className="nav-container">
                <ul>
                    <li>
                        <NavLink exact onClick={closeMenu} className="nav-links" activeClassName="nav-link-active" to="/">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={closeMenu} className="nav-links" activeClassName="nav-link-active" to="/dashboard">
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={closeMenu} className="nav-links" activeClassName="nav-link-active" to="/createblog">
                            Create blog
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={closeMenu} className="nav-links" activeClassName="nav-link-active" to="/myblogs">
                            My blogs
                        </NavLink>
                    </li>
                    <li>
                        <div className="nav-signin">
                            <h3>{user ? `Signed in as : ${user.username}` : ''}</h3>
                            <button className="main-button" onClick={onSignInClick}>
                                {user ? "Sign Out" : "Sign In"}
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
            <Modal
                modalOpen={modalOpen}
                clearModal={clearModal}
                onSubmission={onSubmission}
                authService={authService}
            />
        </header>
    )
}

Header.defaultProps = {
    user: undefined
}

export default Header;
