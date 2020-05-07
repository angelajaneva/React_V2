// import {ACCESS_TOKEN} from "../../constraints";
import auth from "../../Authentication/auth";

const ACCESS_TOKEN = 'accessToken';

export default function authorizedHeader () {
    let token = auth.getToken(ACCESS_TOKEN);
    console.log(token);
    if (!token) {
        token = auth.getToken(ACCESS_TOKEN);
    }
    return {
        headers: {
            'Accept': 'application/json',
            'Authorization': `${token}`
        }
    };
}