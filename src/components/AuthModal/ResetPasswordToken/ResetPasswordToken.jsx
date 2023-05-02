import { useForm } from "react-hook-form";
import s from "../AuthModal.module.css"
import { authApi } from "../../../utils/authApi";
import { AuthForm } from "../../AuthForm/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";


export const ResetPasswordToken = () => {

    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    const { setAuthModalActive } = useContext(UserContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const result = await authApi.resetPasswordToken(data);
            navigate('/authorization')
            reset()
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setAuthModalActive(true)
    }, [setAuthModalActive])

    return (
        <div className={s.AuthModalResetPassword}>
            <AuthForm title={"Смена пароля"} onSubmit={onSubmit} handleSubmit={handleSubmit}>
                <div className={s.body}>
                    <p className={s.form__text_top}>Для смены пароля необходимо <br /> ввести токен, полученный на почту.</p>
                    <label className={s.form__lable}>
                        Токен <br />
                        <input
                            className={s.form__input}
                            placeholder="Токен"
                            {...register("token", {
                                required: "Поле обязательно для заполнения",
                            })}
                        />
                        <div className={s.error}>
                            {errors?.token && <p>{errors?.token?.message || "Error!"}</p>}
                        </div>
                    </label>
                    <p className={s.form__text_top}>Укажите новый пароль</p>
                    <label className={s.form__lable}>
                        Пароль <br />
                        <input
                            className={s.form__input}
                            type={visible ? "text" : "password"}
                            placeholder="Пароль"
                            {...register("password", {
                                required: "Поле обязательно для заполнения",
                            })}
                        />
                        <div className={s.error}>
                            {errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
                        </div>
                    </label>
                    <button className={s.form__button} type="submit" >Отправить</button>
                    <span className={`${s.form__eye_reset} ${s.form__eye}`} onClick={() => setVisible(!visible)}>
                        {visible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                    </span>
                </div>
            </AuthForm>
        </div>
    )
}