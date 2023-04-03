import s from "./Post.module.css"
import { Image } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faHeart, faSliders } from "@fortawesome/free-solid-svg-icons";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";

export const Post = ({ item, image, title, text, created_at, likes, _id, hendleDeletePost, userInfo, hendelChangeLike }) => {
    const [deletePost, setDeletePost] = useState(false)

    const dayjs = require('dayjs')
    const day = dayjs(created_at).format("DD.MM.YYYY");

    const isLiked = item.likes.some((i) => i === userInfo._id)


    const hendelClickLike = () => {
        hendelChangeLike(item)
    }

    const like = (e) => {
        e.preventDefault();
        (e.target.classList.contains("active") === true) ? e.target.classList.remove("active") : e.target.classList.add("active");
    }

    const numLikes = () => {
        if (likes.length > 0) return likes.length
    }


    useEffect(() => {
        api.getIdPosts(_id).then((data) => {
            const authorId = data.author._id
            const myId = userInfo._id;
            if (authorId === myId) {
                return setDeletePost(true);
            } {
                return setDeletePost(false)
            }
        })
    }, [])

    return (
        <div className={`${s.post} post`}>
            <div className={s.post__button}>
                <button className={s.post__trash} ><FontAwesomeIcon icon={faTrashCan} className={!deletePost ? `${s.post__trash_visible}` : ""} id={_id} onClick={(e) => hendleDeletePost(e.target.id)} /></button>
                <span className={s.post__like_num}>
                    {numLikes()}
                </span>
                <button className={s.post__like} onClick={hendelClickLike}><FontAwesomeIcon icon={faHeart} className={`${isLiked ? "active" : ""}`} /></button>
            </div>
            <p className={s.post__time}>{day}</p>
            <Image
                className={s.post__img}
                width={370}
                height={200}
                src={image}
            />
            <a className={s.post__link} href="#">
                <h2 className={s.post__title}>{title}</h2>
                <p className={s.post__text}>{text}</p>
            </a>
        </div >
    )
}