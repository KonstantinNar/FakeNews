import { useContext } from 'react'
import s from './UserInfo.module.css'
import { UserContext } from '../../../context/UserContext'

export const UserInfo = () => {

    const { userInfo } = useContext(UserContext)

    return (
        <div className={s.userInfo}>
            <p className={s.title}>Информация о пользователе</p>
            <p className={s.user__title}>Фото:</p>
            <div className={s.avatar__body}>
                <img className={s.avatar} src={userInfo.avatar} alt="Avatar" />
            </div>
            <div className={`${s.string} ${s.string__top}`}>
                <label htmlFor="" className={s.user__title}>
                    Имя:<br />
                    <input type="text" className={s.user__input} value={userInfo.name} />
                </label>
                <label htmlFor="" className={s.user__title}>
                    Обо мне:<br />
                    <input type="text" className={s.user__input} value={userInfo.about} />
                </label>
            </div>
            <div className={s.string}>
                <label htmlFor="" className={s.user__title}>
                    E-mail:<br />
                    <input type="text" className={s.user__input} value={userInfo.email} />
                </label>
                <label htmlFor="" className={s.user__title}>
                    Id:<br />
                    <input type="text" className={s.user__input} value={userInfo._id} />
                </label>
            </div>
        </div>
    )
}