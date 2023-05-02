import s from './Header.module.css'
import logo from "./logo.svg"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { CreateButton } from '../CreateButton/CreateButton';
import { Avatar } from '../Avatar/Avatar';

export const Header = () => {

    const { setAuthModalActive, authorization } = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <header className={s.header}>
            <div className="container">
                <div className={s.header__body}>
                    <span className={s.header__logo_link} onClick={() => (navigate('/'))}>
                        <img className={s.header__logo_img} src={logo} alt="logo" />
                    </span>
                    <div className={s.header__button_container}>
                        {authorization ? <CreateButton /> : ""}
                        {authorization ? <Avatar /> :
                            <div className={s.signin}>
                                <Link to={'/authorization'} className={s.signin__button} onClick={() => setAuthModalActive(true)}>Войти</Link>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
} 