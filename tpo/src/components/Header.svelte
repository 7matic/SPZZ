<script lang="ts">
    import auth from "../auth/authService.js";
    import type {Auth0Client} from "@auth0/auth0-spa-js";
    import {isAuthenticated} from "../auth/store";
    import {onMount} from "svelte";
    import logo from "../assets/logo-no-background.svg?raw";

    let auth0Client: Auth0Client;
    onMount(async () => {
        auth0Client = await auth.createClient();
    });
    export let y;

    export let tabs = [
        {name: "Projects ", link: "#projects"},
        {name: "About us", link: "#about"},
        {name: "Blog", link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
    ];
</script>

<header
        class={"sticky z-[10] top-0 duration-200 px-6 flex items-center justify-between border-b border-solid " +
        (y > 0
            ? " py-4 bg-slate-950 border-violet-950"
            : " py-6 bg-transparent border-transparent")}
>
    <h1 class="font-medium">
        <div class="w-[80px]">
            {@html logo}
        </div>
    </h1>
    <div class="sm:flex items-center gap-4 hidden">
        {#each tabs as tab, index}
            <a
                    href={tab.link}
                    class="duration-200 hover:text-violet-400"
                    target={index === 2 ? "_blank" : ""}
            >
                <p>{tab.name}</p>
            </a>
        {/each}
        {#if !$isAuthenticated}
            <button
                    class="blueShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-slate-950"
                    on:click={() => auth.loginWithPopup(auth0Client)}
            >
                <div
                        class="absolute top-0 right-full w-full h-full bg-primary opacity-20 group-hover:translate-x-full z-0 duration-200"
                />
                <h4 class="relative z-9">Prijava</h4>
            </button>
        {/if}
        {#if $isAuthenticated}
            <button
                    class="blueShadow relative overflow-hidden px-5 py-2 group rounded-full bg-white text-slate-950"
                    on:click={() => auth.loginWithPopup(auth0Client)}
            >
                <div
                        class="absolute top-0 right-full w-full h-full bg-primary opacity-20 group-hover:translate-x-full z-0 duration-200"
                />
                <h4 class="relative z-9">Odjava</h4>
            </button>
        {/if}
    </div>
</header>