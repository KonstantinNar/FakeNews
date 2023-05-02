import { Link, Outlet } from "react-router-dom"
import s from "./NotAuth.module.css"

export const NotAuth = ({ setAuthModalActive }) => {

    return (
        <div className={s.notAuth}>
            <div className="container">
                <div className={s.body}>
                    <p className={s.text}>Пожалуйста авторизуйтесь</p>
                    <Link to={'/authorization'} className={s.auth} onClick={() => setAuthModalActive(true)}>Авторизоваться</Link>
                </div>
                <Outlet />
            </div>
        </div>
    )
}