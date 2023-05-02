import { useContext, useEffect } from 'react'
import s from './UserAbout.module.css'
import { UserContext } from '../../../context/UserContext'
import { useForm } from 'react-hook-form'
import { api } from '../../../utils/api'


export const UserAbout = () => {

    const { userInfo, setUserInfo } = useContext(UserContext)
    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm({
        mode: "onBlur",
    });

    const onSubmit = (data) => {
        api.editUserInfo(data).then((data) => {
            setUserInfo(data)
        })
        reset()
    };

    useEffect(() => {
        setValue("name", userInfo.name)
        setValue("about", userInfo.about)
    }, [userInfo])

    return (
        <div className={s.userAbout}>
            <p className={s.title}>Обновление личных данных</p>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
                <label className={s.item__title}>
                    Имя <br />
                    <input
                        className={s.item__text}
                        {...register("name", {
                            required: "Поле обязательно для заполнения"
                        })}
                    />
                </label>
                <div className={s.error}>
                    {errors?.name && <p className={s.error__text}>{errors?.name?.message || "Error!"}</p>}
                </div>
                <label className={s.item__title}>
                    Обо мне <br />
                    <input
                        className={s.item__text}
                        {...register("about", {
                            required: "Поле обязательно для заполнения"
                        })}
                    />
                </label>
                <div className={s.error}>
                    {errors?.about && <p className={s.error__text}>{errors?.about?.message || "Error!"}</p>}
                </div>
                <button className={s.item__button} type='submit'>Изменить</button>
            </form>
        </div>
    )
}