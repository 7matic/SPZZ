<script>
    let username = '';
    let password = '';

    function login() {
        // Implement your login logic here
        console.log(`Logging in with username: ${username} and password: ${password}`);
    }
</script>

<style>
    .form-input {
        @apply bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500;
    }

    .form-button {
        @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline;
    }
</style>

<div>
    <h1 class="text-4xl mb-4">Login</h1>
    <form on:submit|preventDefault={login} class="flex flex-col">
        <label for="username" class="mb-2">Username:</label>
        <input id="username" bind:value={username} type="text" required class="form-input mb-4">

        <label for="password" class="mb-2">Password:</label>
        <input id="password" bind:value={password} type="password" required class="form-input mb-4">

        <button type="submit" class="form-button">Login</button>
    </form>
</div>