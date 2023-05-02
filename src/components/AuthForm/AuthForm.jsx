import s from "./AuthForm.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const AuthForm = ({ children, title, handleSubmit, onSubmit }) => {

    const { authModalActive, setAuthModalActive } = useContext(UserContext)

    return (
        <div className={`${s.authForm} ${authModalActive ? `${s.authForm__active}` : ""}`} onClick={() => setAuthModalActive(false)}>
            <div className={`${s.body} ${authModalActive ? `${s.body__active}` : ""}`} onClick={(e) => e.stopPropagation()}>
                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.form__header}>
                        <p className={s.form__title}>{title}</p>
                        <button className={s.form__xmark} onClick={() => setAuthModalActive(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    {children}
                </form>
            </div>
        </div>
    )
}