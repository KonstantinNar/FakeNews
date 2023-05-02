import s from "./PostList.module.css"
import React, { useState } from "react";
import { Post } from "../Post/Post"
import { Pag } from "../Pag/Pag";
import { Sort } from "../Sort/Sort";

export const PostList = ({ posts }) => {

    const [currentPage, setCurrentPage] = useState(1);

    const lastPostIndex = currentPage * 13
    const firstPostIndex = lastPostIndex - 13
    const currentPost = posts.slice(firstPostIndex, lastPostIndex)

    const paginate = (pageNumber) => {
        window.scrollTo(0, 0)
        setCurrentPage(pageNumber)
    }

    return (
        <div className={s.postList}>
            <div className="container">
                <Sort />
                <div className={s.postList__body}>
                    {currentPost.map((item) => {
                        return <Post item={item} {...item} key={item.name} currentPage={currentPage} />
                    })}
                </div>
                <Pag currentPage={currentPage} total={posts.length} paginate={paginate} />
            </div>
        </div>
    )
}