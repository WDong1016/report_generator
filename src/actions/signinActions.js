import axios from 'axios'

export const userSigninRequest = (userData) =>{
    return dispatch =>{
        return axios.post("/api/users",userData)
    }
}