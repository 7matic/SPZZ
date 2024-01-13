<script lang="ts">
    let username: string = '';
    let password: string = '';

    function handleLogin() {
        // Handle login logic here
        console.log(`Username: ${username}, Password: ${password}`);
    }
</script>

<div class="flex flex-grow items-center justify-center min-h-100 bg-gray-200 font-sans">
    <div class="p-16 bg-white rounded shadow-2xl w-full max-w-md mx-auto">
        <h2 class="mb-10 text-3xl font-bold text-gray-800">Prijavite se</h2>
        <div class="space-y-5">
            <div>
                <label class="block mb-1 font-bold text-gray-500">E-poštni naslov</label>
                <input type="text" bind:value={username}
                       class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-primary text-gray-800"
                       placeholder="E-poštni naslov">
            </div>
            <div>
                <label class="block mb-1 font-bold text-gray-500">Geslo</label>
                <input type="password" bind:value={password}
                       class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-primary text-gray-800"
                       placeholder="Geslo">
            </div>
            <button on:click={handleLogin}
                    class="transform transition-background duration-200 block w-full bg-primary hover:bg-light p-4 rounded text-white font-bold">
                Prijava
            </button>
            <a href="/register"
               class="transform transition-background duration-200 block w-full text-center text-primary hover:text-light">Še
                nimate računa?
                Registrirajte se</a>
        </div>
    </div>
</div>