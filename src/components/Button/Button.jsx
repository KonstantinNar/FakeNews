import s from "./Button.module.css"

export const Button = () => {
    const Yes = () => {
        console.log("Есть Контакт");
    }
    return (
        <button className={s.button} onClick={Yes}>Создать пост</button>
    )
}