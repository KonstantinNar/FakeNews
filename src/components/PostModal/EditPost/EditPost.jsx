import s from "../PostModal.module.css"
import { useEffect, useState } from "react"
import img from "../popup__img.jpg"
import { useForm } from "react-hook-form";
import isURL from "validator/lib/isURL";
import { PostForm } from "../../PostForm/PostForm";


export const EditPost = ({ setPostModalActive, postModalActive, image, title, text, handleEditPost }) => {

    const [url, setUrl] = useState("")
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        mode: "onBlur",
    });

    const onSubmit = (postData) => {
        handleEditPost(postData);
        setPostModalActive(false)
        reset()
    };

    useEffect(() => {
        setValue("image", image)
        setValue("title", title)
        setValue("text", text)
        setUrl(image)
    }, [postModalActive])



    return (
        <div className={s.modalPost}>
            <PostForm title={"Редактирование поста"} handleSubmit={handleSubmit} onSubmit={onSubmit} setPostModalActive={setPostModalActive} postModalActive={postModalActive}>
                <div className={s.body}>
                    <label> URL картинки<br />
                        <input
                            className={s.form__input}
                            type="text"
                            {...register("image", {
                                required: "Поле обязательно для заполнения",
                                validate: (e) => isURL(e) || "Поле должно быть url-адресом",
                                onChange: (e) => setUrl(e.target.value)
                            })}
                            placeholder="Рекомендованный размер фото 370px на 200px"
                        />
                        <div className={s.error}>
                            {errors?.image && <p>{errors?.image?.message || "Error!"}</p>}
                        </div>
                    </label>
                    <img
                        className={s.form__img}
                        src={url || img}
                        alt="img"
                    />
                    <label> Заголовок поста<br />
                        <input
                            className={s.form__input}
                            type="text"
                            {...register("title", {
                                required: "Поле обязательно для заполнения",
                            })}
                        />
                        <div className={s.error}>
                            {errors?.title && <p>{errors?.title?.message || "Error!"}</p>}
                        </div>
                    </label>
                    <label> Текст поста <br />
                        <textarea
                            className={s.form__input_text}
                            type="text"
                            {...register("text", {
                                required: "Поле обязательно для заполнения",
                            })}
                        />
                        <div className={s.error}>
                            {errors?.text && <p>{errors?.text?.message || "Error!"}</p>}
                        </div>
                    </label>
                    <button className={s.form__button} type="submit">Создать</button>
                </div>
            </PostForm>
        </div>
    )
}