<script>
    import Step from "./Step.svelte";
    import Button from "./Button.svelte";
    import {isAuthenticated} from "../store/authStore";

    let steps = [
        {
            name: "Moč umetne inteligence",
            icon: "fas fa-brain",
            description:
                "Z uporabo umetne inteligence lahko izberemo najboljše delodajalce za razvoj vaše kariere in najboljše kandidate za vaše podjetje.",
        },
        {
            name: "Fleksibilnost",
            icon: "fas fa-comments",
            description:
                "Ker se zavedamo, da je danes trg dela zelo dinamičen, vam omogočamo, da najdete najbolj primeren kader takrat, ko ga potrebujete.",
        },
        {
            name: "Transparentnost",
            icon: "fas fa-lightbulb",
            description:
                "Omogočamo enostaven pregled nad vsemi kandidati in delodajalci, ki so vam na voljo. Povezuje ju komunikacijski kanal za enostavno izmenjevanje sporočil.",
        },
    ];

    let registerLink = '/register';
    $: if ($isAuthenticated) {
        registerLink = '/ads';
    } else {
        registerLink = '/register';
    }
</script>

<main class="flex flex-col flex-1 p-4">
    <section
            id="introPage"
            class="grid grid-cols-1 lg:grid-cols-2 gap-10 py-32"
    >
        <div
                class="lg:justify-center text-center lg:text-left gap-6 md:gap-8 lg:gap-10 pl-8"
        >
            <h2 class="font-semibold text-4xl sm:text-5xl md:text-6xl mt-32">
                Naredite <span class="text-primary">nov korak</span> v vaši karieri.
                <br/>
            </h2>
            <a href={registerLink}>
                <Button
                        text="Pridružite se SPZZ"
                        variation="primary"
                        className="mt-12 text-xl"
                        icon="fas fa-chevron-right"
                />
            </a>
        </div>
        <div class="relative shadow-2xl grid place-items-center">
            <img
                    src={"images/landing.webp"}
                    alt="UL FRI"
                    class="object-cover z-[2] max-h-[70vh]"
            />
        </div>
    </section>
    <section class="py-20 lg:py-32 flex flex-col gap-24" id="projects">
        <div class="flex flex-col gap-2 text-center">
            <h6 class="text-large sm:text-xl md:text-2xl">
                Še niste prepričani?
            </h6>
            <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
                Vas zanimajo <span class="poppins text-primary">prednosti</span> naše platforme?
            </h3>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10">
            <Step step={steps[0]}/>
            <Step step={steps[1]}/>
            <Step step={steps[2]}/>
        </div>
    </section>
    <section
            id="about"
            class="py-20 pt-10 lg:pt-16 lg:py-32 flex flex-col gap-16 sm:gap-20 md:gap-24 relative"
    >
        <div
                class="flex flex-col gap-2 text-center relative before:absolute before:top-0 before:left-0 before:w-2/3 before:h-1.5 before:bg-primary after:absolute after:bottom-0 after:right-0 after:w-2/3 after:h-1.5 after:bg-primary py-4"
        >
            <h6 class="text-large sm:text-xl md:text-2xl">
                Spletna platforma za zaposlovanje
            </h6>
            <h3 class="font-semibold text-3xl sm:text-4xl md:text-5xl">
                Z vami do <span class="poppins text-primary">sanjske</span> kariere.
            </h3>
        </div>
    </section>
</main>