import {createAuth0Client, Auth0Client, type PopupLoginOptions} from "@auth0/auth0-spa-js";
import {user, isAuthenticated, popupOpen} from "./store";
import config from "./authConfig";

async function createClient() {
    let auth0Client: Auth0Client = await createAuth0Client({
        domain: config.domain,
        clientId: config.clientId
    });

    return auth0Client;
}

async function loginWithPopup(client: Auth0Client, options: PopupLoginOptions = {}) {
    popupOpen.set(true);
    try {
        await client.loginWithPopup(options);
        const userObj = await client.getUser();
        if (userObj) {
            user.set(userObj);
            isAuthenticated.set(true);
        }
    } catch (e) {
        console.error(e);
    } finally {
        popupOpen.set(false);
    }
}

function logout(client: Auth0Client) {
    return client.logout();
}

const auth = {
    createClient,
    loginWithPopup,
    logout
};

export default auth;