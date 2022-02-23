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
            const authUser = await authService.login(user.email, user.password);
            setUser(authUser);
        }
        else{
            await authService.signUp(user.username,user.password,user.email);
        }
    }


    return (
        <header className="s6-hc">
            <div className="s6-hc__title">
                <span>
                    <h1><img  src={img} className='s6-hc__logo' alt="React logo" />React.JS blog</h1>
                </span>
                <button className="s6-hc__toggle" onClick={isActive ? closeMenu: openMenu}>
                    <span className="hamburger" data-testid="hamburger">
                        <span className="hamburger-inner"></span>
                    </span>
                </button>
            </div>
            <div className="s6-hc__nc">
                <ul>
                    <li>
                        <NavLink exact onClick={closeMenu} activeClassName="s6-hc__link--active" to="/" tabIndex={1}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={closeMenu} activeClassName="s6-hc__link--active" to="/dashboard" tabIndex={2}>
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={closeMenu} activeClassName="s6-hc__link--active" to="/createblog" tabIndex={3}>
                            Create blog
                        </NavLink>
                    </li>
                    <li>
                        <NavLink onClick={closeMenu} activeClassName="s6-hc__link--active" to="/myblogs" tabIndex={4}>
                            My blogs
                        </NavLink>
                    </li>
                    <li>
                        <div className="s6-hc__signin">
                            <h3>{user ? `Signed in as : ${user.username}` : ''}</h3>
                            <button className="main-button" onClick={onSignInClick} tabIndex={5}>
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

export default Header;
