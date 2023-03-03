
import { Pagination } from "antd";
import s from "./Pag.module.css"

export const Pag = ({ currentPage, total, postPerPage, paginate }) => {

    return (
        <Pagination className={s.Pag} defaultPageSize={postPerPage} defaultCurrent={currentPage} total={total} onChange={(e) => paginate(e)} />
    )
}