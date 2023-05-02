
const headers = () => {
    return {
        headers: {
            'content-type': 'application/json',
            Authorization: localStorage.getItem('token')
        }
    }
}

const config = {
    baseUrl: "https://api.react-learning.ru",
    groupId: '/v2/group-10',
    headers: headers,
}

const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject("Error")
}

class Api {
    constructor(data) {
        this._baseUrl = data.baseUrl;
        this._headers = data.headers;
        this._groupId = data.groupId;
    }

    getPosts() {
        return fetch(`${this._baseUrl}${this._groupId}/posts`, {
            ...this._headers(),
        }).then(onResponce)
    }

    getIdPosts(id) {
        return fetch(`${this._baseUrl}${this._groupId}/posts/${id}`, {
            ...this._headers(),
        }).then(onResponce)
    }

    setPost(postData) {
        return fetch(`${this._baseUrl}${this._groupId}/posts`, {
            ...this._headers(),
            method: "POST",
            body: JSON.stringify(postData),
        }).then(onResponce)
    }

    editPost(id, postData) {
        return fetch(`${this._baseUrl}${this._groupId}/posts/${id}`, {
            ...this._headers(),
            method: "PATCH",
            body: JSON.stringify(postData),
        }).then(onResponce)
    }

    deletePost(id) {
        return fetch(`${this._baseUrl}${this._groupId}/posts/${id}`, {
            ...this._headers(),
            method: "DELETE"
        }).then(onResponce)
    }

    changeLike(postId, like) {
        return fetch(`${this._baseUrl}${this._groupId}/posts/likes/${postId}`, {
            ...this._headers(),
            method: like ? "PUT" : "DELETE"
        }).then(onResponce)
    }

    getComments(id) {
        return fetch(`${this._baseUrl}${this._groupId}/posts/comments/${id}`, {
            ...this._headers(),
        }).then(onResponce)
    }

    setComment(id, text) {
        return fetch(`${this._baseUrl}${this._groupId}/posts/comments/${id}`, {
            ...this._headers(),
            method: "POST",
            body: JSON.stringify(text),
        }).then(onResponce)
    }

    deleteComment(postId, commentId) {
        return fetch(`${this._baseUrl}${this._groupId}/posts/comments/${postId}/${commentId}`, {
            ...this._headers(),
            method: "DELETE"
        }).then(onResponce)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}${this._groupId}/users/me`, {
            ...this._headers(),
        }).then(onResponce)
    }

    editUserAvatar(image) {
        return fetch(`${this._baseUrl}${this._groupId}/users/me/avatar`, {
            ...this._headers(),
            method: "PATCH",
            body: JSON.stringify({ avatar: image })
        }).then(onResponce)
    }

    editUserInfo(data) {
        return fetch(`${this._baseUrl}${this._groupId}/users/me`, {
            ...this._headers(),
            method: "PATCH",
            body: JSON.stringify(data)
        }).then(onResponce)
    }

}

export const api = new Api(config);