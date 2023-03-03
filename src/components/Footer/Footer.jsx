import s from "./Footer.module.css"
import logo from "./logo.svg"

export const Footer = () => {
    return (
        <footer className={s.footer}>
            <div className="container">
                <div className={s.footer__body}>
                    <a className={s.footer__logo_link} href="#">
                        <img className={s.footer__logo_img} src={logo} alt="logo" />
                    </a>
                    <div className={s.footer__text_container}>
                        <p className={s.footer__text}> Автор проекта: Я</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}