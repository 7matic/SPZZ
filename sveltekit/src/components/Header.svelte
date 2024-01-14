<script lang="ts">
    import Logo from "./Logo.svelte";
    import Button from "./Button.svelte";
    import {isAuthenticated} from "../store/authStore";

    export let y;

    export let unauthTabs = [
        {name: "Prijava", link: "/login", icon: "fas fa-sign-in-alt"},
    ];
    export let employeeTabs = [
        {name: "Uredi profil", link: "/profile", icon: "fas fa-user-edit"},
        {name: "Moje prijave", link: "/applications", icon: "fas fa-file-alt"},
        {name: "Odjava", link: "/logout", icon: "fas fa-sign-out-alt"},
        {name: "Pregled oglasov", link: "/jobs", icon: "fas fa-bullhorn", variation: "primary"},
    ];

    export let employerTabs = [
        {name: "Uredi profil", link: "/profile", icon: "fas fa-user-edit"},
        {name: "Razpisani oglasi", link: "/applications", icon: "fas fa-file-alt"},
        {name: "Odjava", link: "/logout", icon: "fas fa-sign-out-alt"},
    ];

    let user = null;
    let companyExists = false;
    if (typeof window !== 'undefined') {
        let userJson: string = localStorage.getItem("user");
        user = userJson ? JSON.parse(userJson) : null;
        companyExists = user?.company ? true : false;
        console.log(user);
    }
    let tabs;
    $: tabs = $isAuthenticated ? (companyExists ? employerTabs : employeeTabs) : unauthTabs;


</script>

<header
        class={"sticky z-[10] top-0 duration-200 px-6 flex flex-col gap-2 items-center justify-between border-b border-solid py-4 bg-dark border-gray-800 "}
>
    <a href="/">
        <Logo size="64"/>
    </a>
    <div class="sm:flex items-center gap-4 hidden font-sans">
        {#each tabs as tab, index}
            {#if tab.variation === 'primary'}
                <a href={tab.link}
                   target={"_self"}
                   rel="prefetch"
                >
                    <Button text={tab.name}
                            variation="primary"
                            href={tab.link}
                            icon={tab.icon}
                    />
                </a>
            {:else}
                <a
                        rel="prefetch"
                        href={tab.link}
                        class={`duration-200 hover:text-primary flex items-center`}
                        target={tab.name === "Odjava" ? "_self" : ""}
                >
                    <i class={`${tab.icon} mr-2`}></i>
                    <p>{tab.name}</p>
                </a>
            {/if}

        {/each}

    </div>
</header>