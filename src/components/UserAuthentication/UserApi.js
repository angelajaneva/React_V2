import {authorizedHeader} from "./AxiosInterceptor";
import axios from "axios";
import auth from "../../Authentication/auth";

const ACCESS_TOKEN = 'accessToken';

function token() {
    let token = auth.getToken(ACCESS_TOKEN);
    console.log(token + "token");
    if (!token) {
        token = auth.getToken(ACCESS_TOKEN);

        return token;
    }
}


export const login = (user) => {
    console.log("Vo axios");
    console.log(user);
    return axios({
        method: 'POST',
        url: 'http://localhost:8080/users/signin',
        data: {
            "username": user.username,
            "password": user.password
        },
        headers: {
            // 'Access-Control-Allow-Origin': '*',
            //     'Accept': 'application/json',
            //     'Authorization': `${token()}`"Access-Control-Allow-Credentials", "true");
        }
    })
};
