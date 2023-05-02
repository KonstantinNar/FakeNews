import { useNavigate } from "react-router-dom"
import s from "./Footer.module.css"
import logo from "./logo.svg"

export const Footer = () => {

    const navigate = useNavigate()

    const handleClickLogo = () => {
        navigate('/')
        window.scrollTo(0, 0)
    }

    return (
        <footer className={s.footer}>
            <div className="container">
                <div className={s.footer__body}>
                    <span className={s.footer__logo_link}>
                        <img className={s.footer__logo_img} src={logo} alt="logo" onClick={handleClickLogo} />
                    </span>
                    <div className={s.footer__text_container}>
                        <p className={s.footer__text}> Автор проекта: Я</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}