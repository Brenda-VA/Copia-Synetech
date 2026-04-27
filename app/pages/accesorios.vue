<script setup lang="ts">
import BotonPrimario from '~/components/ui/BotonPrimario.vue'

const { t } = useI18n()

interface SupportCard {
    id: number
    name: string
    subtitle: string
    description: string
    image: string
    imageAlt: string
}

/* Estas cards son datos de la página.
La sección base no debería saber qué es un soporte ni qué textos lleva.
Por eso los datos se quedan aquí y se pasan al componente base con :items */
const supportCards = computed<SupportCard[]>(() => [
    {
        id: 1,
        name: t('accesorios.supports.cards.card1.name'),
        subtitle: t('accesorios.supports.cards.card1.subtitle'),
        description: t('accesorios.supports.cards.card1.description'),
        image: '/imagenes/synetech-class.webp',
        imageAlt: t('accesorios.supports.cards.card1.imageAlt')
    },
    {
        id: 2,
        name: t('accesorios.supports.cards.card2.name'),
        subtitle: t('accesorios.supports.cards.card2.subtitle'),
        description: t('accesorios.supports.cards.card2.description'),
        image: '/imagenes/synetech-dms.webp',
        imageAlt: t('accesorios.supports.cards.card2.imageAlt')
    },
    {
        id: 3,
        name: t('accesorios.supports.cards.card3.name'),
        subtitle: t('accesorios.supports.cards.card3.subtitle'),
        description: t('accesorios.supports.cards.card3.description'),
        image: '/imagenes/synetech-os.webp',
        imageAlt: t('accesorios.supports.cards.card3.imageAlt')
    }
])

interface ModuleCard {
    id: number
    name: string
    subtitle: string
    description: string
    image: string
    imageAlt: string
}

/* Mismo patrón que soportes, aunque soporte y módulo se parezcan, el layout interno no es igual */
const moduleCards = computed<ModuleCard[]>(() => [
    {
        id: 1,
        name: t('accesorios.modules.cards.card1.name'),
        subtitle: t('accesorios.modules.cards.card1.subtitle'),
        description: t('accesorios.modules.cards.card1.description'),
        image: '/imagenes/caracteristicas-ia/gestion-perfiles-usuario/gestion-perfiles-usuario-1280w.webp',
        imageAlt: t('accesorios.modules.cards.card1.imageAlt')
    },
    {
        id: 2,
        name: t('accesorios.modules.cards.card2.name'),
        subtitle: t('accesorios.modules.cards.card2.subtitle'),
        description: t('accesorios.modules.cards.card2.description'),
        image: '/imagenes/caracteristicas-ia/gestion-perfiles-usuario/gestion-perfiles-usuario-1280w.webp',
        imageAlt: t('accesorios.modules.cards.card2.imageAlt')
    }
])

/* como no son varias y solo es 1 tarjeta, se usa modo="static"*/
const dongleCard = computed(() => ({
    name: t('accesorios.dongle.card.name'),
    subtitle: t('accesorios.dongle.card.subtitle'),
    description1: t('accesorios.dongle.card.description1'),
    description2: t('accesorios.dongle.card.description2'),
    imageAlt: t('accesorios.dongle.card.imageAlt')
}))

/* Config específica del Swiper de soportes, la puse aquí porque cada sección puede necesitar breakpoints distintos y 
BaseSeccionTarjetas solo recibe esta config y la aplica*/
const breakpointsSoportes = {
    768: {
        spaceBetween: 28,
        slidesOffsetBefore: 40,
        slidesOffsetAfter: 40
    },
    1024: {
        spaceBetween: 32,
        slidesOffsetBefore: 80,
        slidesOffsetAfter: 80
    }
}

/*Config específica del Swiper de módulos, en desktop se bloquea el touch porque esta sección tiene otro comportamiento.*/
const breakpointsModulos = {
    768: {
        slidesOffsetBefore: 40,
        slidesOffsetAfter: 40
    },
    1024: {
        allowTouchMove: false,
        slidesOffsetBefore: 80,
        slidesOffsetAfter: 80
    }
}
</script>

<template>
    <main class="flex min-h-screen w-full flex-col bg-[#eeeeee] text-black">
        <!-- banner -->
        <section class="relative w-full overflow-hidden bg-black text-white">
            <picture class="block w-full">
                <source media="(min-width: 1024px)" srcset="/imagenes/banner_demo_1024w.webp">
                <img src="/imagenes/banner_demo.webp" :alt="t('accesorios.banner.imageAlt')"
                    class="h-[520px] w-full object-cover opacity-70 md:h-[620px]">
            </picture>

            <div class="absolute inset-0 z-10 flex items-end px-6 pb-20 md:items-center md:px-12 md:pb-0 lg:px-20">
                <div class="max-w-[620px]">
                    <h1 class="text-[3rem] font-black leading-none md:text-[5rem]">
                        {{ t('accesorios.banner.title') }}
                    </h1>

                    <h2 class="mt-5 text-[1.35rem] font-bold leading-tight md:text-[2.2rem]">
                        {{ t('accesorios.banner.subtitle') }}
                    </h2>
                </div>
            </div>
        </section>

        <!-- soportes -->
        <!-- Aquí uso el componente base en modo swiper:
                - accesorios.vue manda supportCards
                - BaseSeccionTarjetas las recorre
                - y por cada item nos deja pintar una tarjeta con el slot #item -->
        <UiBaseSeccionTarjetas modo="swiper" :items="supportCards" :space-between="24" :slides-offset-before="24"
            :slides-offset-after="24" :breakpoints="breakpointsSoportes">
            <!-- #titulo es un named slot.
            Sirve para que la sección base no tenga que saber cómo es el h2, permite usar spans, gradiente y traducciones -->
            <template #titulo>
                <h2 class="text-[2.2rem] font-bold leading-tight md:text-[3.4rem]">
                    <span class="block text-black sm:inline">
                        {{ t('accesorios.supports.title.text') }}
                    </span>

                    <span
                        class="block bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent sm:ml-2 sm:inline">
                        {{ t('accesorios.supports.title.gradient') }}
                    </span>
                </h2>
            </template>

            <!-- #item -> scoped slot: BaseSeccionTarjetas le entrega item, y él decido cómo pintar la tarjeta de soporte -->
            <template #item="{ item }">
                <article
                    class="flex h-[620px] w-[295px] flex-col rounded-[2.5rem] bg-white px-8 py-10 shadow-[0_10px_25px_rgba(0,0,0,0.12)] sm:w-[430px]">
                    <div class="flex h-[270px] items-center justify-center">
                        <img :src="item.image" :alt="item.imageAlt" class="max-h-full max-w-full object-contain">
                    </div>

                    <div class="mt-8 flex flex-1 flex-col">
                        <h3 class="text-[1.8rem] font-bold leading-tight">
                            {{ item.name }}
                        </h3>

                        <p class="mt-2 text-[1.15rem] font-medium leading-tight">
                            {{ item.subtitle }}
                        </p>

                        <p class="mt-3 text-[1rem] leading-relaxed text-black/70">
                            {{ item.description }}
                        </p>

                        <div class="mt-auto pt-6">
                            <BotonPrimario>
                                {{ t('accesorios.supports.cta') }}
                            </BotonPrimario>
                        </div>
                    </div>
                </article>
            </template>
        </UiBaseSeccionTarjetas>

        <!-- módulos -->
        <!-- Misma sección base, pero con otros items, otros breakpoints y otro layout interno para la tarjeta
        el slot sirve para reutilizar el carrusel sin forzar la misma tarjeta -->
        <UiBaseSeccionTarjetas modo="swiper" :items="moduleCards" :space-between="30" :slides-offset-before="24"
            :slides-offset-after="24" :breakpoints="breakpointsModulos" :ocultar-flechas-desktop="true">
            <template #titulo>
                <h2 class="max-w-[1060px] text-[2.2rem] font-bold leading-tight md:text-[3.4rem]">
                    <span class="text-black">
                        {{ t('accesorios.modules.title.text') }}
                    </span>

                    <span
                        class="ml-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                        {{ t('accesorios.modules.title.gradient') }}
                    </span>
                </h2>
            </template>

            <!-- 
    #subtitulo es otro named slot.
    Lo bueno es que aquí puedo personalizarlo como quiera:
    color, ancho, saltos de línea, responsive, etc.
    Si no paso este slot, BaseSeccionTarjetas no pinta nada.
    -->
            <template #subtitulo>
                <p class="max-w-[720px] text-[1.05rem] leading-relaxed text-black/65 md:text-[1.25rem]">
                    Integra más potencia en tu pantalla interactiva
                    <br class="hidden md:block">
                    sin cambiar la estructura de tu aula.
                </p>
            </template>

            <template #item="{ item }">
                <article
                    class="flex h-[620px] w-[295px] flex-col rounded-[2.5rem] bg-white px-8 py-10 shadow-[0_10px_25px_rgba(0,0,0,0.12)] sm:w-[430px] lg:w-[560px]">
                    <div class="flex flex-1 flex-col justify-between">
                        <div>
                            <h3 class="text-[1.6rem] font-bold leading-tight">
                                {{ item.name }}
                            </h3>

                            <h4 class="mt-2 text-[1.1rem] font-medium leading-tight">
                                {{ item.subtitle }}
                            </h4>

                            <p class="mt-3 text-[1rem] leading-relaxed text-black/70">
                                {{ item.description }}
                            </p>
                        </div>

                        <div class="mt-6">
                            <BotonPrimario>
                                {{ t('accesorios.modules.cta') }}
                            </BotonPrimario>
                        </div>
                    </div>

                    <div class="mt-8 flex h-[230px] items-center justify-center">
                        <img :src="item.image" :alt="item.imageAlt" class="max-h-full max-w-full object-contain">
                    </div>
                </article>
            </template>
        </UiBaseSeccionTarjetas>

        <!-- dongle
        Aquí uso el mismo componente base, pero en modo static donde no hay items ni Swiper
        BaseSeccionTarjetas solo pinta la estructura de sección y el contenido viene por el default slot -->
        <UiBaseSeccionTarjetas modo="static">
            <template #titulo>
                <h2 class="max-w-[1100px] text-[2.2rem] font-bold leading-tight md:text-[3.4rem]">
                    <span class="text-black">
                        {{ t('accesorios.dongle.title.text') }}
                    </span>

                    <span
                        class="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                        {{ t('accesorios.dongle.title.gradient') }}
                    </span>

                    <span class="text-black">
                        {{ t('accesorios.dongle.title.rest') }}
                    </span>
                </h2>
            </template>

            <!-- default slot: como esta sección no tiene carrusel, meto directamente la card grande dentro del componente base -->
            <div class="flex justify-center px-6 md:px-10 lg:px-20">
                <article
                    class="flex w-full max-w-[1180px] flex-col rounded-[3rem] bg-white px-8 py-10 shadow-[0_10px_25px_rgba(0,0,0,0.12)] md:flex-row-reverse md:items-center md:justify-between md:px-12 lg:px-20">
                    <div class="flex justify-center md:w-[38%]">
                        <picture class="block w-[180px] md:w-full">
                            <source media="(min-width: 1024px)" srcset="/imagenes/synetech-share.webp">
                            <img src="/imagenes/synetech-share.webp" :alt="dongleCard.imageAlt"
                                class="h-auto w-full object-contain">
                        </picture>
                    </div>

                    <div class="mt-8 md:mt-0 md:w-[55%]">
                        <h3 class="text-[1.8rem] font-bold leading-tight">
                            {{ dongleCard.name }}
                        </h3>

                        <h4 class="mt-2 text-[1.15rem] font-medium leading-tight">
                            {{ dongleCard.subtitle }}
                        </h4>

                        <div class="mt-5 space-y-3 text-[1rem] leading-relaxed text-black/70">
                            <p>
                                {{ dongleCard.description1 }}
                            </p>

                            <p>
                                {{ dongleCard.description2 }}
                            </p>
                        </div>

                        <div class="mt-8">
                            <BotonPrimario>
                                {{ t('accesorios.dongle.cta') }}
                            </BotonPrimario>
                        </div>
                    </div>
                </article>
            </div>
        </UiBaseSeccionTarjetas>
    </main>
</template>