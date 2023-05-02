import { useContext } from "react"
import s from "./Sort.module.css"
import { PostContext } from "../../context/PostContext"

export const Sort = () => {

    const { setSort } = useContext(PostContext)

    const sortedItem = [{ id: "Новинки" }, { id: "Популярные" }]

    return (
        <div className={s.nav}>
            <div className="container">
                <div className={s.body}>
                    {sortedItem.map((e) => {
                        return (
                            <span className={s.item} key={e.id} onClick={() => setSort(e.id)}>{e.id}</span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}