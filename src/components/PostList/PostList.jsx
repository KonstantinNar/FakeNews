import s from "./PostList.module.css"
import React, { useEffect, useState } from "react";
import { Post } from "../Post/Post"
import { Pag } from "../Pag/Pag";

export const PostList = ({ post, hendleDeletePost, userInfo, hendelChangeLike }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const lastPostIndex = currentPage * 13
    const firstPostIndex = lastPostIndex - 13
    const currentPost = post.slice(firstPostIndex, lastPostIndex)

    const componentDidMount = () => {
        return (
            window.scrollTo(0, 0)
        )
    }

    const paginate = (pageNumber) => {
        componentDidMount();
        return (
            setCurrentPage(pageNumber)
        )
    }

    return (
        <div className={s.postList}>
            <div className="container">
                <div className={s.postList__body}>
                    {currentPost.map((item) => {
                        return <Post item={item} {...item} key={item.name} hendleDeletePost={hendleDeletePost} userInfo={userInfo} hendelChangeLike={hendelChangeLike} />
                    })}
                </div>
                <Pag currentPage={currentPage} total={post.length} paginate={paginate} />
            </div>
        </div>
    )
}