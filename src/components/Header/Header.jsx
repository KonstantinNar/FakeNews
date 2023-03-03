import s from './Header.module.css'
import { Button } from '../Button/Button';
import { Signup } from '../Signup/Signup';
import logo from "./logo.svg"


export const Header = () => {
    return (
        <header className={s.header}>
            <div className="container">
                <div className={s.header__body}>
                    <a className={s.header__logo_link} href="#">
                        <img className={s.header__logo_img} src={logo} alt="logo" />
                    </a>
                    <div className={s.header__button_container}>
                        <Button />
                        <Signup />
                    </div>
                </div>
            </div>
        </header>
    )
} 