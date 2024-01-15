<script lang="ts">
    export let talkingToCompany;
    export let data;
    console.log(data);
</script>

<header class="flex items-center bg-primary text-black p-8 mb-4">
    {#if talkingToCompany && data}
        {#if data?.companyName && data?.location && data?.logo}
            <img src={data?.logo} alt={data?.companyName} class="w-16 mr-4"/>
            <div>
                <h1 class="text-xl font-bold">{data?.companyName}</h1>
                <p>{data?.location}</p>
            </div>
        {/if}
    {:else if !talkingToCompany && data}
        <div class="w-full">
            <div class="flex items-center justify-between w-full">
                <h1 class="text-xl font-bold">{`${data?.firstName} ${data?.lastName}`}</h1>
                <p>{data?.email} | {data?.phoneNumber} | {data?.location}</p>
            </div>
            <p>Fakultete: {data?.colleges}</p>
            <p>Diplome: {data?.degrees}</p>
            <p>Sposobnosti: {data?.skills}</p>
        </div>
    {/if}
</header>