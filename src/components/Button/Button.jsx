import s from "./Button.module.css"
import { Popup } from "../Popup/Popup"
import { useEffect, useState } from "react"

export const Button = ({ hendleSetPost }) => {

    const [active, setActive] = useState(false)

    return (
        <>
            <button className={s.button} onClick={() => setActive(!active)}>Создать пост</button>
            <Popup active={active} setActive={setActive} hendleSetPost={hendleSetPost} />
        </>
    )
}