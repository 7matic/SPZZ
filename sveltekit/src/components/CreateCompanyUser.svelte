<script lang="ts">
    import Button from "./Button.svelte";
    import {getUser, makeRequest} from "../api/api";


    let name: string = '';
    let logo: string = '';
    let location: string = '';
    let errorMessage: string | null = null;
    let isLoading: boolean = false;
    let showPopup: boolean = false;

    async function handleSubmit() {
        isLoading = true;
        errorMessage = null;

        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user.id;

        try {
            await makeRequest('/company/create', 'POST', {
                name,
                logo,
                location,
                userId
            });
            const user = await getUser();
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            errorMessage = error.message;
        } finally {
            isLoading = false;
            onClose();
        }
    }

    function onClose(){
        showPopup = true;
    }

    async function handlePopupButtonClick() {
        window.location.href = '/logout';
    }

</script>

<form on:submit|preventDefault={handleSubmit} class="flex gap-y-4 flex-col">
    <h2 class="mb-4 text-2xl font-bold text-gray-700">Vpišite podatke o vašem podjetju</h2>
    <label>
        Ime podjetja:
        <input type="text" bind:value={name} required class="bg-gray-200 border-2 border-gray-800 ml-2"/>
    </label>
    <label>
        URL logotipa:
        <input type="url" bind:value={logo} required class="bg-gray-200 border-2 border-gray-800 ml-2"/>
    </label>
    <label>
        Lokacija:
        <input type="text" bind:value={location} required class="bg-gray-200 border-2 border-gray-800 ml-2"/>
    </label>
    <Button type="submit" disabled={isLoading}>Ustvarite podjetje</Button>
    {#if errorMessage}
        <p class="mt-4 text-red-500">{errorMessage}</p>
    {/if}
    {#if showPopup}
    <div class="fixed inset-0 flex items-center justify-center">
      <div class="bg-black bg-opacity-50 w-full h-full absolute"></div>
      <div class="bg-white p-8 rounded shadow-md z-10 relative max-w-lg text-center">
        <p class="text-gray-700">Za shranitev podatkov je potrebna ponovna prijava.</p>
        <Button on:click={handlePopupButtonClick}>
          Ponovna prijava
        </Button>
      </div>
    </div>
  {/if}
</form>