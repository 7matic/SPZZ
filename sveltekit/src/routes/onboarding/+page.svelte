<script lang="ts">
    import {page} from '$app/stores';


    let step: number = 1;
    let userType: 'user' | 'company' = 'user';
    let file: File | null = null;
    let fileInput: HTMLInputElement;
    let BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL_FROM_SERVER;
    let errorMessage: string | null = null;
    let isLoading: boolean = false;

    function setUserType(type: 'user' | 'company') {
        userType = type;
        step++;
    }

    function handleFileChange(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target?.files[0]) {
            file = target?.files[0];
        }
    }

    async function handleSubmit(event: Event) {
        event.preventDefault();

        if (file) {
            isLoading = true;
            const data = new FormData();
            data.append('file', file);

            const token = localStorage.getItem('token');

            try {
                const response = await fetch(`${BACKEND_URL}/upload`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `${token}`
                    },
                    body: data
                });

                if (!response.ok) {
                    throw new Error('Failed to upload file');
                }
                window.location.href = '/profile';
                errorMessage = null;
            } catch (error) {
                errorMessage = error.message;
            } finally {
                isLoading = false;
            }
        }
    }

</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-200 text-gray-800 text-2xl">
    {#if step === 1}
        <div class="p-16 min-w-[60%] bg-white rounded shadow-lg w-64">
            <h2 class="mb-4 font-bold text-gray-800 text-2xl">Kako boste uporabljali platformo SPZZ?</h2>
            <button on:click={() => setUserType('company')}
                    class="w-full py-2 mb-4 bg-primary text-gray-200 rounded hover:bg-light transform transition-background duration-200 font-sans text-lg">
                <i class="fas fa-building mr-2"></i> Sem podjetje (delodajalec)
            </button>
            <button on:click={() => setUserType('user')}
                    class="w-full py-2 mb-4 bg-primary text-gray-200 rounded hover:bg-light transform transition-background duration-200 font-sans text-lg">
                <i class="fas fa-user mr-2"></i> Sem iskalec zaposlitve (delojemalec)
            </button>
        </div>
    {:else if step === 2 && userType === 'user'}
        <div class="p-16 min-w-[60%] bg-white rounded shadow-lg w-64">
            <h2 class="mb-4 text-2xl font-bold text-gray-700">Naložite svoj CV</h2>
            <form
                    on:submit={handleSubmit}
            >
                <input type="file" name="file" bind:this={fileInput} on:change={handleFileChange} required/>
                <button type="submit"
                        class="w-full py-2 mt-4 bg-primary text-gray-200 rounded hover:bg-light transform transition-background duration-200 font-sans text-lg">
                    Naložite
                </button>
            </form>
            {#if errorMessage}
                <p class="mt-4 text-red-500">{errorMessage}</p>
            {/if}
            {#if isLoading}
                <p class="mt-4 text-primary text-sm font-sans">Nalaganje...</p>
            {/if}
        </div>
    {/if}
</div>