import {createAuth0Client, Auth0Client, type PopupLoginOptions} from "@auth0/auth0-spa-js";
import {user, isAuthenticated, popupOpen} from "./store";
import config from "./authConfig";

/**
 * @returns {Promise<Auth0Client>}
 * @description
 * Creates and returns a new Auth0Client instance.
 */
async function createClient() {
    let auth0Client: Auth0Client = await createAuth0Client({
        domain: config.domain,
        clientId: config.clientId
    });

    return auth0Client;
}

/**
 * @param {Auth0Client} client
 * @param {PopupLoginOptions} options
 * @description
 * Logs in the user using a popup window.
 */
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

/**
 * @description
 * Logs the user out and removes their session on the authorization server.
 * @param client
 */
function logout(client: Auth0Client) {
    return client.logout();
}

const auth = {
    createClient,
    loginWithPopup,
    logout
};

export default auth;