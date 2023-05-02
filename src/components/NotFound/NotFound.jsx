import s from "./NotFound.module.css"
import { useNavigate } from "react-router-dom"

export const NotFound = () => {

    const navigate = useNavigate()

    return (
        <div className={s.notFound}>
            <div className="container">
                <div className={s.body}>
                    <span className={s.num}>404</span>
                    <p className={s.text}>
                        К сожалению, здесь ничего нет.<br />
                        Попробуйте найти на&nbsp;
                        <span className={s.text__main} onClick={() => (navigate("/"))}>главной странице</span>
                    </p>
                </div>
            </div>
        </div>
    )
}