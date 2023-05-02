import { useState } from "react"
import { CreatePost } from "../PostModal/CreatePost/CreatePost"

export const CreateButton = () => {

    const [postModalActive, setPostModalActive] = useState(false)

    return (
        <>
            <button onClick={() => setPostModalActive(true)}>Создать пост</button>
            <CreatePost setPostModalActive={setPostModalActive} postModalActive={postModalActive} />
        </>
    )
}