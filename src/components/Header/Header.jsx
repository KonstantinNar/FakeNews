import s from './Header.module.css'
import { Button } from '../Button/Button';
import { Signup } from '../Signup/Signup';
import logo from "./logo.svg"


export const Header = ({ userInfo, hendleSetPost }) => {
    return (
        <header className={s.header}>
            <div className="container">
                <div className={s.header__body}>
                    <a className={s.header__logo_link} href="#">
                        <img className={s.header__logo_img} src={logo} alt="logo" />
                    </a>
                    <div className={s.header__button_container}>
                        <Button hendleSetPost={hendleSetPost} />
                        <Signup userInfo={userInfo} />
                    </div>
                </div>
            </div>
        </header>
    )
} 