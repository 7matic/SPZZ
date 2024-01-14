<script lang="ts">
    import {isAuthenticated} from "../../store/authStore";
    import {onMount} from "svelte";

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        isAuthenticated.set(false);
        window.location.href = '/';
    }

    onMount(handleLogout);
</script>