
import { Pagination } from "antd";
import s from "./Pag.module.css"

export const Pag = ({ currentPage, total, paginate }) => {

    return (
        <Pagination className={s.pag} showSizeChanger={false} defaultPageSize={13} defaultCurrent={currentPage} total={total} onChange={(e) => paginate(e)} />
    )
}