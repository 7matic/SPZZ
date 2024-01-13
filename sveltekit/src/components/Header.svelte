<script>
    import Logo from "./Logo.svelte";
    import Button from "./Button.svelte";

    export let y;

    export let tabs = [
        {name: "Prijava", link: "#projects"},
    ];
</script>

<header
        class={"sticky z-[10] top-0 duration-200 px-6 flex flex-col gap-2 items-center justify-between border-b border-solid py-4 bg-dark border-gray-800 shadow-outline-primary"}
>
    <Logo size="64"/>
    <div class="sm:flex items-center gap-4 hidden font-sans">
        {#each tabs as tab, index}
            <a
                    href={tab.link}
                    class="duration-200 hover:text-primary"
                    target={index === 2 ? "_blank" : ""}
            >
                <p>{tab.name}</p>
            </a>
        {/each}
        <Button text="Pregled oglasov"
                variation="primary"
        />
    </div>
</header>