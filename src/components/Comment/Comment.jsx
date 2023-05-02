import s from "./Comment.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export const Comment = ({ item, handleDeleteComment }) => {

    const { userInfo } = useContext(UserContext)

    const isDelete = (item.author?._id === userInfo._id)

    return (
        <div className={s.comment}>
            <div className="container">
                <div className={s.body}>
                    <button
                        className={`${s.xmark} ${isDelete ? "" : `${s.noXmark}`}`}
                        onClick={() => handleDeleteComment(item._id)}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <img src={item.author?.avatar} alt="avatar" className={s.avatar} />
                    <span className={s.name}>{item.author?.name}</span>
                </div>
                <span className={s.text}>{item.text}</span>
            </div>
        </div>
    )
}