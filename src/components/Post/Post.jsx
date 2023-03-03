import s from "./Post.module.css"
import { Image } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const Post = ({ img, title, text }) => {
    const like = (e) => {
        e.preventDefault();
        (e.target.classList.contains("active") === true) ? e.target.classList.remove("active") : e.target.classList.add("active");
    }

    const dayjs = require('dayjs')
    let a = dayjs().format("DD MM YYYY");
    return (
        <div className={`${s.post} post`}>
            <button className={s.post__like} onClick={like}><FontAwesomeIcon icon={faHeart} /></button>
            <button className={s.post__trash}><FontAwesomeIcon icon={faTrashCan} /></button>
            <p className={s.post__time}>{a}</p>
            <Image
                className={s.post__img}
                width={370}
                height={200}
                src={img}
            />
            <a className={s.post__link} href="#">
                <h2 className={s.post__title}>{title}</h2>
                <p className={s.post__text}>{text}</p>
            </a>
        </div>
    )
}