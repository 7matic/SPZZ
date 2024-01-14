<script>
    import Logo from "./Logo.svelte";
    import Button from "./Button.svelte";
    import {isAuthenticated} from "../store/authStore";

    export let y;

    export let unauthTabs = [
        {name: "Prijava", link: "/login"},
    ];
    export let employeeTabs = [
        {name: "Dodaj oglas", link: "/add"},
        {name: "Moj profil", link: "/profile"},
        {name: "Odjava", link: "/logout"},
    ];

    let tabs;
    $: tabs = $isAuthenticated ? employeeTabs : unauthTabs;
</script>

<header
        class={"sticky z-[10] top-0 duration-200 px-6 flex flex-col gap-2 items-center justify-between border-b border-solid py-4 bg-dark border-gray-800 "}
>
    <a href="/">
        <Logo size="64"/>
    </a>
    <div class="sm:flex items-center gap-4 hidden font-sans">
        {#each tabs as tab, index}
            <a
                    href={tab.link}
                    class="duration-200 hover:text-primary"
                    target={tab.name === "Odjava" ? "_self" : ""}
            >
                <p>{tab.name}</p>
            </a>
        {/each}
        <Button text="Pregled oglasov"
                variation="primary"
        />
    </div>
</header>