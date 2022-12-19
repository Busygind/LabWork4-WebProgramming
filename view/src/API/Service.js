import axios from "axios";

export default class Service {

    static path = 'http://192.168.0.108:17300/api'

    static async getDotsByUser() {

    }

    static async signUpReq(username, password) {
        const response = await axios.post(this.path + '/register', {
            username: username,
            password: password,
        })
        return true;
    }

    static async signInReq(username, password) {
        const basicAuth = 'Basic ' + btoa(username + ':' + password)
        const response = await axios.post(this.path + '/token', {}, {
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "Authorization": basicAuth
            }
        }).then(res => res.data)

        return response
    }

    static async removeHitsByUser(token) {
        const response = await axios.delete(this.path + '/hits/', {
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data)
    }

    static async sendHit(hit, token) {
        const response = axios.post(this.path + '/hits/', {
            x: Number(hit.x),
            y: Number(hit.y),
            r: Number(hit.r),
            timezoneOffset: hit.timezoneOffset,
        }, {
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(res => res.data)
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data)
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    return null;
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
            })

        return response
    }

    static async getHitsForUser(token) {
        const response = await axios.get(this.path + '/hits/', {
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "Authorization": "Bearer " + token
            }
        }).then(res => res.data).catch(function (error) {
            console.log("Cant get data for this user")
        })
        return response
    }
}