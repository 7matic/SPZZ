<script lang="ts">
    import {isAuthenticated} from "../../store/authStore";
    import {makeRequest} from "../../api/api";

    let username: string = '';
    let password: string = '';
    let errorMessage: string = '';
    let isDisabled: boolean = true;

    $: isDisabled = !username || !password || !validateEmail(username) || password.length < 8;

    function validateEmail(email: string) {
        return /\S+@\S+\.\S+/.test(email);
    }

    async function getUser() {
        if (typeof window !== 'undefined') {
            try {
                const response = await makeRequest(`/user/withToken`, 'GET');
                const userId = response.id;
                const userResponse = await makeRequest(`/user?id=${userId}`, 'GET');
                return userResponse;
            } catch (e) {
                console.log(e);
            }
        }
    }

    async function handleLogin() {
        try {
            const tokenData = await makeRequest(`/auth/login`, 'POST', {
                    email: username,
                    password: password
                }
            );
            localStorage.setItem('token', tokenData['accessToken']);
            errorMessage = '';
            isAuthenticated.set(true);
            const user = await getUser();
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = '/profile';
        } catch (e) {
            errorMessage = 'Prijava ni uspela. Poskusite ponovno.';
        }
    }

</script>

<div class="flex flex-grow items-center justify-center min-h-100 font-sans">
    <div class="p-16 bg-white rounded shadow-2xl w-full max-w-md mx-auto">
        <h2 class="mb-10 text-3xl font-bold text-gray-800">Prijavite se</h2>
        <div class="space-y-5">
            <div>
                <label class="block mb-1 font-bold text-gray-500">E-poštni naslov</label>
                <input type="email" bind:value={username}
                       class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-primary text-gray-800"
                       placeholder="E-poštni naslov">
            </div>
            <div>
                <label class="block mb-1 font-bold text-gray-500">Geslo (vsaj 8 znakov)</label>
                <input type="password" bind:value={password} minlength="8"
                       class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-primary text-gray-800"
                       placeholder="Geslo">
            </div>
            <button on:click={handleLogin} disabled={isDisabled}
                    class="{isDisabled ? 'bg-gray-500' : 'bg-primary'} transform transition-background duration-200 block w-full hover:bg-light p-4 rounded text-white font-bold">
                Prijava
            </button>
            <a href="/register"
               class="transform transition-background duration-200 block w-full text-center text-primary hover:text-light">Še
                nimate računa? Registrirajte se</a>
            {#if errorMessage}
                <div class="bg-red-500 text-white p-3 rounded">{errorMessage}</div>
            {/if}
        </div>
    </div>
</div>