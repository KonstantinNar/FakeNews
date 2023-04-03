import { useState } from "react"
import { useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import s from "./Popup.module.css"
import img from "./popup__img.jpg"


export const Popup = ({ active, setActive, hendleSetPost }) => {
    const [url, setUrl] = useState("")
    const [titleValue, setTitleValue] = useState("")
    const [text, setText] = useState("")

    const hendleClickButton = (e) => {
        e.preventDefault()
        hendleSetPost({ image: url, title: titleValue, text: text })
        setActive(!active)
    }

    const close = (e) => {
        if (e.target.className === "Popup_popup__DDMD3 Popup_active__dAhJa") {
            setActive(!active)
        }
    }


    return (
        <div className={`${s.popup} ${active ? `${s.active}` : ""}`} onClick={(e) => close(e)}>
            <div className={s.popup__body}>
                <div className={s.popup__header}>
                    <p className={s.popup__add}>Создание поста</p>
                    <button className={s.popup__xmark} onClick={() => setActive(!active)}><FontAwesomeIcon icon={faXmark} /></button>
                </div>
                <form className={s.popup__form} action="">
                    <label> URL картинки<br />
                        <input type="text" name="image" placeholder="Рекомендованный размер фото 370px на 200px" className={s.popup__image} onChange={(e) => setUrl(e.target.value)} />
                    </label>
                    <img src={url || img} alt="img" className={s.popup__img} />
                    <label> Заголовок поста<br />
                        <input type="text" className={s.popup__title} onChange={(e) => setTitleValue(e.target.value)} />
                    </label>
                    <label> Текст поста <br />
                        <textarea type="text" className={s.popup__text} onChange={(e) => setText(e.target.value)} />
                    </label>
                    <button className={s.popup__button} onClick={hendleClickButton}>Создать</button>
                </form>
            </div>
        </div >
    )
}