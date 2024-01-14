<script lang="ts">
    import UploadCV from "../../components/UploadCV.svelte";

    let step: number = 1;
    let userType: 'user' | 'company' = 'user';

    let BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL_FROM_SERVER;
    let errorMessage: string | null = null;
    let isLoading: boolean = false;

    function setUserType(type: 'user' | 'company') {
        userType = type;
        step++;
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
            <UploadCV/>
        </div>
    {/if}
</div>