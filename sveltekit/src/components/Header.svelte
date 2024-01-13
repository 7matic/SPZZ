<script>
    import Logo from "./Logo.svelte";
    import Button from "./Button.svelte";

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
    <Logo size="64"/>
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
        <Button text="Objavi oglas"
                variation="primary"
        />
    </div>
</header>