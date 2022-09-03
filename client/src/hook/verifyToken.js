import jwtDecode from 'jwt-decode'


export default function getCurrentUser() {
    try {
        const token = window.localStorage.getItem('login');
        return jwtDecode(token)
    }
    catch (err) {
        return null
    }
}