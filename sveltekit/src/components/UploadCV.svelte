<script lang="ts">
    import Button from "./Button.svelte";

    let file: File | null = null;
    let fileInput: HTMLInputElement;
    let BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL_FROM_SERVER;
    let errorMessage: string | null = null;
    let isLoading: boolean = false;

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

<div>
    <h2 class="mb-4 text-2xl font-bold text-gray-700">Naložite svoj CV</h2>
    <form
            on:submit={handleSubmit} class="color-primary"
    >
        <input type="file" name="file" bind:this={fileInput} on:change={handleFileChange} required class="text-primary"
        />
        <Button type="submit"
        >
            Naložite
        </Button>
    </form>
    {#if errorMessage}
        <p class="mt-4 text-red-500">{errorMessage}</p>
    {/if}
    {#if isLoading}
        <p class="mt-4 text-primary text-sm font-sans">Nalaganje...</p>
    {/if}
</div>