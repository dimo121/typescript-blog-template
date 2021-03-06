import React, { useState } from 'react';
import img from './react-logo.png';
import { ModalComponent } from './Modal';
import { login, signUp } from '../controllers/AuthService/AuthService';
import { User, NewUserInput } from '../types/TypeDefs';
import { NavLink } from 'react-router-dom';


interface IHeaderProps {
    user?: User;
    setUser: (authUser:User|undefined) => void;
}

export const Header:React.FC<IHeaderProps> = (props) => {
    
    const { user, setUser } = props;

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
  
    const onSubmission = async (userSubmit:NewUserInput): Promise<void> => {
        if(!userSubmit.username){
            const authUser = await login(userSubmit.email, userSubmit.password);
            setUser(authUser);
        }
        else{
            await signUp(userSubmit.username,userSubmit.password,userSubmit.email);
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
            <ModalComponent
                modalOpen={modalOpen}
                clearModal={clearModal}
                onSubmission={onSubmission}
            />
        </header>
    )
}

