

const config = {
    baseUrl: "https://api.react-learning.ru/v2/group-10",
    headers: {
        'content-type': 'application/json',
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDFhY2Y5YWFhMzk3MTIxODM5NzYwOGYiLCJncm91cCI6Imdyb3VwLTEwIiwiaWF0IjoxNjc5NDc4NzI1LCJleHAiOjE3MTEwMTQ3MjV9.ULpum-jOEXWbP9-ANDhbxgbv34yPhf9r9LBofBDQ9F8'
    }
}

const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject("Error")
}

class Api {
    constructor({ baseUrl, headers }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getPosts() {
        return fetch(`${this._baseUrl}/posts`, {
            headers: this._headers,
        }).then(onResponce)
    }

    getIdPosts(id) {
        return fetch(`${this._baseUrl}/posts/${id}`, {
            headers: this._headers,
        }).then(onResponce)
    }

    setPost(image, title, text,) {
        return fetch(`${this._baseUrl}/posts`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify({
                image,
                title,
                text
            }),
        }).then(onResponce)
    }

    deletePost(id) {
        return fetch(`${this._baseUrl}/posts/${id}`, {
            headers: this._headers,
            method: "DELETE"
        }).then(onResponce)
    }

    changeLike(postId, like) {
        return fetch(`${this._baseUrl}/posts/likes/${postId}`, {
            headers: this._headers,
            method: like ? "PUT" : "DELETE"
        }).then(onResponce)
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        }).then(onResponce)
    }


}

export const api = new Api(config);