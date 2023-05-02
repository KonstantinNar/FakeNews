import s from "./PostForm.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export const PostForm = ({ children, title, handleSubmit, onSubmit, setPostModalActive, postModalActive }) => {


    return (
        <div className={`${s.postForm} ${postModalActive ? `${s.postForm__active}` : ""}`} onClick={() => setPostModalActive(false)}>
            <div className={`${s.body} ${postModalActive ? `${s.body__active}` : ""}`} onClick={(e) => (e.stopPropagation())}>
                <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={s.form__header}>
                        <p className={s.form__title}>{title}</p>
                        <button className={s.form__xmark} onClick={() => setPostModalActive(false)}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                    {children}
                </form>
            </div>
        </div>
    )
}