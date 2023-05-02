import isEmail from "validator/lib/isEmail"
import { AuthForm } from "../../AuthForm/AuthForm"
import s from "../AuthModal.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authApi } from "../../../utils/authApi";

export const Signin = ({ setAuthModalActive }) => {

    const [visible, setVisible] = useState(false)
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const onSubmit = async (userData) => {
        try {
            const result = await authApi.signin(userData);
            localStorage.setItem("token", result.token)
            navigate('/')
            reset()
        } catch (error) {
        }
    };

    useEffect(() => {
        setAuthModalActive(true)
    }, [setAuthModalActive])

    return (
        <div className={s.authModalSingin}>
            <AuthForm title={"Вход"} onSubmit={onSubmit} handleSubmit={handleSubmit}>
                <div className={s.body}>
                    <label className={s.form__lable}>
                        Email <br />
                        <input
                            className={s.form__input}
                            type="email"
                            placeholder="Email"
                            {...register("email", {
                                required: "Поле обязательно для заполнения",
                                validate: (e) => isEmail(e) || "Поле должно быть email-адресом",
                            })}
                        />
                        <div className={s.error}>
                            {errors?.email && <p>{errors?.email?.message || "Error!"}</p>}
                        </div>
                    </label>
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
                        <p className={s.form__reset} onClick={() => (navigate('/reset-password'))}>Восстановить пароль</p>
                        <div className={s.form__button_line}>
                            <button className={s.form__button} type="submit" >Войти</button>
                            <button className={s.form__button_reg} onClick={() => (navigate('/register'))}>Регистрация</button>
                        </div>
                    </label>
                    <span className={`${s.form__eye_signin} ${s.form__eye}`} onClick={() => setVisible(!visible)}>
                        {visible ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                    </span>
                </div>
            </AuthForm>
        </div>
    )
}