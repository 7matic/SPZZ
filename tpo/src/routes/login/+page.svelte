<script lang="ts">
    import {onMount} from "svelte";
    import auth from "../../auth/authService";
    import {isAuthenticated, user} from "../../auth/store";
    import type {Auth0Client} from "@auth0/auth0-spa-js";
    import {goto} from "$app/navigation";

    let auth0Client: Auth0Client;

    onMount(async () => {
        auth0Client = await auth.createClient();
        const userObj = await auth0Client.getUser();
        if (userObj) {
            user.set(userObj);
            isAuthenticated.set(true);
            goto('/');
        }
    });

    function login() {
        auth.loginWithPopup(auth0Client);
    }

    function logout() {
        auth.logout(auth0Client);
    }
</script>

<main>
</main>