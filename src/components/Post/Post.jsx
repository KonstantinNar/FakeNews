import s from "./Post.module.css"
import { Image } from 'antd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "../../context/PostContext";
import { UserContext } from "../../context/UserContext";

export const Post = ({ item, image, title, text, likes, created_at }) => {

    const { handleDeletePost, handleChangeLike, dayjs } = useContext(PostContext)
    const { userInfo } = useContext(UserContext)

    const day = dayjs(created_at).format("DD.MM.YYYY");

    const isLiked = item.likes.some((i) => i === userInfo._id)
    const isDelete = (item.author?._id === userInfo._id)

    return (
        <div className={s.post} >
            <div className={s.post__button}>
                <button className={s.post__trash} >
                    <FontAwesomeIcon
                        icon={faTrashCan}
                        className={!isDelete ? `${s.post__trash_visible}` : ""}
                        onClick={() => handleDeletePost(item._id)}
                    />
                </button>
                <span className={s.post__like_num}>
                    {likes.length > 0 ? likes.length : ""}
                </span>
                <button className={s.post__like} onClick={() => handleChangeLike(item)}>
                    <FontAwesomeIcon icon={faHeart}
                        className={isLiked ? "active" : ""}
                    />
                </button>
            </div>
            <p className={s.post__time}>{day}</p>
            <Image
                className={s.post__img}
                width={370}
                height={200}
                src={image}
            />
            <Link to={`/post/${item._id}`} className={s.post__link}>
                <h2 className={s.post__title}>{title}</h2>
                <p className={s.post__text}>{text}</p>
            </Link>
        </div >
    )
}