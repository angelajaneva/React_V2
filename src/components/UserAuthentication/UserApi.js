import axios from "axios";


export const login = (user) => {
    console.log("Vo axios");
    console.log(user);
    return axios({
        method: 'POST',
        url: 'http://localhost:8080/users/signin',
        data: {
            "username": user.username,
            "password": user.password
        }
    })
};
