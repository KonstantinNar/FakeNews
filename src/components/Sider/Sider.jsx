import { useContext } from "react"
import s from "./Sider.module.css"
import { UserContext } from "../../context/UserContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { NavLink, Outlet } from "react-router-dom";

export const Sider = () => {

    const { userInfo } = useContext(UserContext)

    return (
        <div className={s.sider}>
            <div className="container">
                <div className={s.content}>
                    <div className={s.body}>
                        <div className={s.author}>
                            <img className={s.avatar} src={userInfo.avatar} alt="avatar" />
                            <p className={s.name}>{userInfo.name}</p>
                        </div>
                        <nav className={s.nav} id="nav">
                            <NavLink to="user-info" className={s.item}>
                                <FontAwesomeIcon className={s.icon} icon={faUser} />
                                <span className={s.text}>Профиль</span>
                            </NavLink>
                            <NavLink to='avatar' className={s.item}>
                                <FontAwesomeIcon className={s.icon} icon={faImage} />
                                <span className={s.text}>Смена фото</span>
                            </NavLink>
                            <NavLink to='about' className={s.item}>
                                <FontAwesomeIcon className={s.icon} icon={faAddressCard} />
                                <span className={s.text}>Смена информации</span>
                            </NavLink>
                        </nav>
                    </div>
                    <Outlet />
                </div>
            </div>
        </div >
    )
}