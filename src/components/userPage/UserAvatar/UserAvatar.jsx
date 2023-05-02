import { useContext, useEffect, useState } from 'react'
import s from './UserAvatar.module.css'
import { UserContext } from '../../../context/UserContext'
import { useForm } from 'react-hook-form'
import isURL from 'validator/lib/isURL'
import { api } from '../../../utils/api'

export const UserAvatar = () => {

    const [url, setUrl] = useState("")
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        mode: "onBlur",
    });
    const { userInfo, setUserInfo } = useContext(UserContext)

    const onSubmit = (image) => {
        api.editUserAvatar(image.image).then((newUserAvatar) => {
            setUserInfo(newUserAvatar)
        })
        reset()
    };

    useEffect(() => {
        setValue("image", userInfo.avatar)
    }, [userInfo])

    return (
        <div className={s.userAvatar}>
            <p className={s.title}>Смена фото</p>
            <div className={s.avatar}>
                <img className={s.avatar__small} src={url || userInfo.avatar} alt="avatar" />
                <img className={s.avatar__default} src={url || userInfo.avatar} alt="avatar" />
                <img className={s.avatar__big} src={url || userInfo.avatar} alt="avatar" />
            </div>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <lable className={s.avatar__title}>
                    URL фото <br />
                    <input
                        className={s.avatar__url}
                        {...register("image", {
                            required: "Поле обязательно для заполнения",
                            validate: (e) => isURL(e) || "Поле должно быть url-адресом",
                            onChange: (e) => setUrl(e.target.value),
                        })}
                    />
                </lable>
                <div className={s.error}>
                    {errors?.image && <p className={s.error__text}>{errors?.image?.message || "Error!"}</p>}
                    <button className={s.avatar__button} type='submit'>Изменить</button>
                </div>
            </form>
        </div>

    )
}