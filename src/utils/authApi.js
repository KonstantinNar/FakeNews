

const config = {
    baseUrl: "https://api.react-learning.ru",
    headers: {
        'content-type': 'application/json'
    }
}

const onResponce = (res) => {
    return res.ok ? res.json() : Promise.reject("Error")
}

class Api {
    constructor({ baseUrl, headers, groupId }) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    singup(userData) {
        return fetch(`${this._baseUrl}/signup`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify(userData),
        }).then(onResponce)
    }

    signin(userData) {
        return fetch(`${this._baseUrl}/signin`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify(userData),
        }).then(onResponce)
    }

    resetPassword(email) {
        return fetch(`${this._baseUrl}/forgot-password`, {
            headers: this._headers,
            method: "POST",
            body: JSON.stringify(email),
        }).then(onResponce)
    }

    resetPasswordToken(data) {
        return fetch(`${this._baseUrl}/password-reset/${data.token}`, {
            headers: this._headers,
            method: "PATCH",
            body: JSON.stringify({ password: (data.password) }),
        }).then(onResponce)
    }
}

export const authApi = new Api(config);