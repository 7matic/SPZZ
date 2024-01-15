<script lang="ts">
    import Button from "./Button.svelte";

    export let talkingToCompany;
    export let data;
    export let id;
    console.log(id);
</script>

<header class="flex items-center bg-primary text-black p-8 mb-4 justify-between">
    {#if talkingToCompany && data}
        <div class="flex items-center w-full">
            <img src={data?.logo} alt={data?.name} class="w-16 mr-4"/>
            <div>
                <h1 class="text-xl font-bold">{data?.name}</h1>
                <p>{data?.location}</p>
            </div>
        </div>
    {:else if !talkingToCompany && data}
        <div class="w-full">
            <div class="flex items-center justify-between w-full">
                <h1 class="text-xl font-bold">{`${data?.firstName} ${data?.lastName}`}</h1>
                <p>{data?.email} | {data?.phoneNumber} | {data?.location}</p>
            </div>
            <div class="flex justify-between">
                <div>
                    <p>Fakultete: {data?.colleges}</p>
                    <p>Diplome: {data?.degrees}</p>
                    <p>Sposobnosti: {data?.skills}</p>
                </div>
                {#if id}
                    <div>
                        <a href={`/user?id=${id}`}>
                            <Button className="border-2 p-4">
                                Ogled profila
                            </Button>
                        </a>
                    </div>
                {/if}
            </div>
        </div>
    {/if}

</header>