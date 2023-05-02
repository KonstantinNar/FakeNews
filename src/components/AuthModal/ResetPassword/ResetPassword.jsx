import { useForm } from "react-hook-form";
import s from "../AuthModal.module.css"
import isEmail from "validator/lib/isEmail";
import { authApi } from "../../../utils/authApi";
import { AuthForm } from "../../AuthForm/AuthForm";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";


export const ResetPassword = () => {

    const navigate = useNavigate()
    const { setAuthModalActive } = useContext(UserContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: "onBlur"
    });

    const onSubmit = async (email) => {
        try {
            const result = await authApi.resetPassword(email);
            navigate('/reset-password-token')
            reset()
        } catch (error) {
            console.log();
        }
    };

    useEffect(() => {
        setAuthModalActive(true)
    }, [setAuthModalActive])

    return (
        <div className={s.AuthModalResetPassword}>
            <AuthForm title={"Восстановление пароля"} onSubmit={onSubmit} handleSubmit={handleSubmit}>
                <div className={s.body}>
                    <p className={s.form__text_top}>Для получения временного пароля необходимо <br /> ввести email, указанный при регистрации.</p>
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
                        <p className={s.form__text}>Срок действия временного пароля 24 ч.</p>
                        <button className={s.form__button} type="submit" >Отправить</button>
                    </label>
                </div>
            </AuthForm>
        </div>
    )
}