<script lang="ts">
    let username: string = '';
    let password: string = '';

    function handleLogin() {
        // Handle login logic here
        console.log(`Username: ${username}, Password: ${password}`);
    }
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-200">
    <div class="p-16 bg-white rounded shadow-2xl w-full max-w-md mx-auto">
        <h2 class="mb-10 text-3xl font-bold text-gray-800">Login to your account</h2>
        <div class="space-y-5">
            <div>
                <label class="block mb-1 font-bold text-gray-500">Username</label>
                <input type="text" bind:value={username}
                       class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                       placeholder="Enter Username">
            </div>
            <div>
                <label class="block mb-1 font-bold text-gray-500">Password</label>
                <input type="password" bind:value={password}
                       class="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
                       placeholder="Enter Password">
            </div>
            <button on:click={handleLogin}
                    class="block w-full bg-purple-500 hover:bg-purple-400 p-4 rounded text-white font-bold">Login
            </button>
            <a href="/register" class="block w-full text-center text-purple-500 hover:text-purple-400">Register</a>
        </div>
    </div>
</div>