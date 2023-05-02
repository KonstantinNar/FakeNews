import s from "./OpenPost.module.css"
import { Image } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react"
import { api } from "../../utils/api"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../context/UserContext";
import { PostContext } from "../../context/PostContext";
import { Comment } from "../Comment/Comment";
import { useForm } from "react-hook-form";
import { EditPost } from "../PostModal/EditPost/EditPost";



export const OpenPost = ({ post, setPost }) => {

    const { userInfo } = useContext(UserContext)
    const { handleDeletePost, handleChangeLike, dayjs, posts } = useContext(PostContext)
    const [comments, setComments] = useState([])
    const [postModalActive, setPostModalActive] = useState(false)
    const id = useParams()
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const day = dayjs(post.created_at).format("DD.MM.YYYY");

    const isLiked = post.likes?.some((i) => i === userInfo._id)
    const isDelete = (post.author?._id === userInfo._id)

    const handleClickDelete = (id) => {
        handleDeletePost(id)
        navigate('/')
    }

    const handleEditPost = (postData) => {
        api.editPost(id.PostId, postData).then((editPost) => {
            setPost(editPost)
            posts.forEach((item, index) => {
                if (item._id === editPost._id) {
                    posts.splice(index, 1, editPost)
                }
            })
        })
    }

    const handleDeleteComment = (commentId) => {
        api.deleteComment(id.PostId, commentId).then((deleteComment) => {
            setComments([...deleteComment.comments])
        })
    }

    const onSubmit = (text) => {
        api.setComment(id.PostId, text).then((setComment) => {
            setComments([...setComment.comments])
            return
        })
        reset()
    };

    useEffect(() => {
        api.getIdPosts(id.PostId).then((post) => {
            setPost(post)
        })
    }, [navigate])

    useEffect(() => {
        api.getComments(id.PostId).then((commentsData) => {
            setComments(commentsData)
        })
    }, [navigate])

    return (
        <div className={s.openPost}>
            <div className="container">
                <div className={s.body}>
                    <p className={s.back} onClick={() => (navigate("/"))}>Назад</p>
                    <p className={s.title}>{post.title}</p>
                    <p className={s.date}>{day}</p>
                    <div className={s.main}>
                        <div className={s.img}>
                            <Image
                                width={500}
                                src={post.image}
                            />
                        </div>
                        <div className={s.info}>
                            <div className={s.user}>
                                <div className={s.userInfo}>
                                    <img className={s.avatar} src={post.author?.avatar} alt="avatar" />
                                    <span className={s.name}>{post.author?.name}</span>
                                </div>
                                <div className={s.buttonLine}>
                                    <button className={s.button__gear} onClick={() => setPostModalActive(true)}>
                                        <FontAwesomeIcon
                                            icon={faGear}
                                            className={isDelete ? `${s.onButton}` : ""}
                                        />
                                    </button>
                                    <EditPost
                                        postModalActive={postModalActive}
                                        setPostModalActive={setPostModalActive}
                                        {...post}
                                        handleEditPost={handleEditPost}
                                    />
                                    <button className={s.button__trash} >
                                        <FontAwesomeIcon
                                            icon={faTrashCan}
                                            className={isDelete ? `${s.onButton}` : ""}
                                            onClick={() => (handleClickDelete(id.PostId))}
                                        />
                                    </button>
                                    <span className={s.num__heart}>
                                        {post.likes?.length > 0 ? post.likes?.length : ""}
                                    </span>
                                    <button className={s.button__heart} >
                                        <FontAwesomeIcon
                                            icon={faHeart}
                                            className={isLiked ? "active" : ""}
                                            onClick={() => handleChangeLike(post, setPost)}
                                        />
                                    </button>
                                </div>
                            </div>
                            <p className={s.text}>{post.text}</p>
                        </div>
                    </div>
                    <div className={s.comments}>
                        <p className={s.comments__title}>Коментарии</p>
                        <div className={s.comments__body}>
                            {comments.map((item) => {
                                return (
                                    <Comment item={item} key={item._id} handleDeleteComment={handleDeleteComment} />
                                )
                            })}
                        </div>
                        <div className={s.handleComment}>
                            <form className={s.handleComment__form} onSubmit={handleSubmit(onSubmit)}>
                                <p className={s.handleComment__title}>Добавить коментарий</p>
                                <div className={s.handleComment__user}>
                                    <img className={s.handleComment__img} src={userInfo.avatar} alt="" />
                                    <textarea
                                        className={s.handleComment__text}
                                        {...register("text", {
                                            required: "Поле обязательно для заполнения!",
                                        })}
                                        name="text">
                                    </textarea>
                                </div>
                                <div className={s.error}>
                                    {errors?.text && <p className={s.error__text}>{errors?.text?.message || "Error!"}</p>}
                                    <button className={s.handleComment__submit} type="submit">Отправить</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}