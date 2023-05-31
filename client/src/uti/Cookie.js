import Cookies from 'js-cookie';

class Cookie {
    async saveUser(user) {
        try {
            Cookies.set("user", JSON.stringify(user));
        } catch (error) {
            // ignore write error
        }
    }
    saveEmail(email) {
        try {
            Cookies.set("email", JSON.stringify(email), { expires: 1 });
        } catch (error) {
            // ignore write error
        }
    }
    getEmail() {
        try {
            let email = Cookies.get("email");
            if (email === null) return undefined;
            return JSON.parse(email);
        } catch (error) {

        }
    }
    getUser() {
        try {
            let user = Cookies.get("user");
            if (user === null) return undefined;
            return JSON.parse(user);
        } catch (error) {

        }
    }
    getTokens() {
        try {
            let user = Cookies.get("user");
            if (user === null) return undefined;

            user = JSON.parse(user);

            return user?.accessToken;
        } catch (error) {

        }
        return null;
    }
    getLocalRefreshToken() {
        try {
            let user = Cookies.get("user");
            if (user === null) {
                return undefined
            }
            user = JSON.parse(user);
            return user?.refreshToken;
        } catch (error) {

        }

        return null;

    }
    updateLocalAccessToken(token) {
        try {
            let user = Cookies.get("user");
            if (user === null) {
                return undefined
            }
            user = JSON.parse(user);
            user.accessToken = token
            Cookies.set("user", JSON.stringify(user));
         
        } catch (error) {

        }
        return null;
    }
    removeUser() {
        Cookies.remove("user")
    }
    removeEmail(){
        try {
            Cookies.remove("email")
        } catch (error) {
            
        }
       
    }

}

export default new Cookie();
