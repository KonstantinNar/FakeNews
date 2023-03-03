import s from "./PostList.module.css"
import React, { useEffect, useState } from "react";
import { Post } from "../Post/Post"
import { Pag } from "../Pag/Pag";

export const PostList = ({ post }) => {
    const [card, setCard] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage] = useState(13);

    useEffect(() => {
        const getCard = () => {
            setCard(post)
        }
        getCard()
    })

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPost = card.slice(firstPostIndex, lastPostIndex)

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
                        return <Post {...item} key={item.name} />
                    })}
                </div>
                <Pag currentPage={currentPage} total={card.length} postPerPage={postPerPage} paginate={paginate} />
            </div>
        </div>
    )
}