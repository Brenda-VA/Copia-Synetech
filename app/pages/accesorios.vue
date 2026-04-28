<script setup lang="ts">
import ButtonRoundedGradient from '~/components/ui/ButtonRoundedGradient.vue'

const { t } = useI18n()

function getDatasheetUrl() {
    return '#'
}

interface SupportCard {
    id: number
    name: string
    subtitle: string
    description: string
    image: string
    imageAlt: string
    datasheetUrl: string
}

const supportCards = computed<SupportCard[]>(() => [
    {
        id: 1,
        name: t('accesorios.supports.cards.card1.name'),
        subtitle: t('accesorios.supports.cards.card1.subtitle'),
        description: t('accesorios.supports.cards.card1.description'),
        image: '/imagenes/accesorios/soportes/soporte-sy35.webp',
        imageAlt: t('accesorios.supports.cards.card1.imageAlt'),
        datasheetUrl: getDatasheetUrl()
    },
    {
        id: 2,
        name: t('accesorios.supports.cards.card2.name'),
        subtitle: t('accesorios.supports.cards.card2.subtitle'),
        description: t('accesorios.supports.cards.card2.description'),
        image: '/imagenes/accesorios/soportes/soporte-st41b.webp',
        imageAlt: t('accesorios.supports.cards.card2.imageAlt'),
        datasheetUrl: getDatasheetUrl()
    },
    {
        id: 3,
        name: t('accesorios.supports.cards.card3.name'),
        subtitle: t('accesorios.supports.cards.card3.subtitle'),
        description: t('accesorios.supports.cards.card3.description'),
        image: '/imagenes/accesorios/soportes/soporte-st01.webp',
        imageAlt: t('accesorios.supports.cards.card3.imageAlt'),
        datasheetUrl: getDatasheetUrl()
    }
])

interface ModuleCard {
    id: number
    name: string
    subtitle: string
    description: string
    image: string
    imageAlt: string
    datasheetUrl: string
}

const moduleCards = computed<ModuleCard[]>(() => [
    {
        id: 1,
        name: t('accesorios.modules.cards.card1.name'),
        subtitle: t('accesorios.modules.cards.card1.subtitle'),
        description: t('accesorios.modules.cards.card1.description'),
        image: '/imagenes/accesorios/modulos/modulo-win11.webp',
        imageAlt: t('accesorios.modules.cards.card1.imageAlt'),
        datasheetUrl: getDatasheetUrl()
    },
    {
        id: 2,
        name: t('accesorios.modules.cards.card2.name'),
        subtitle: t('accesorios.modules.cards.card2.subtitle'),
        description: t('accesorios.modules.cards.card2.description'),
        image: '/imagenes/accesorios/modulos/modulo-dual.webp',
        imageAlt: t('accesorios.modules.cards.card2.imageAlt'),
        datasheetUrl: getDatasheetUrl()
    }
])

const dongleCard = computed(() => ({
    name: t('accesorios.dongle.card.name'),
    subtitle: t('accesorios.dongle.card.subtitle'),
    description1: t('accesorios.dongle.card.description1'),
    description2: t('accesorios.dongle.card.description2'),
    imageAlt: t('accesorios.dongle.card.imageAlt'),
    datasheetUrl: getDatasheetUrl()
}))

const breakpointsSoportes = {
    576: {
        spaceBetween: 24
    },
    768: {
        spaceBetween: 28
    },
    1024: {
        spaceBetween: 32,
        slidesOffsetBefore: 80,
        slidesOffsetAfter: 80
    },
    1280: {
        spaceBetween: 37,
        slidesOffsetBefore: 80,
        slidesOffsetAfter: 80
    },
    1512: {
        spaceBetween: 30,
        slidesOffsetBefore: 80,
        slidesOffsetAfter: 80
    },
    1920: {
        spaceBetween: 32,
        slidesOffsetBefore: 88,
        slidesOffsetAfter: 88
    }
}

const breakpointsModulos = {
    1024: {
        allowTouchMove: false,
        slidesOffsetBefore: 80,
        slidesOffsetAfter: 80
    }
}

const gruposPrecioTaurus = computed(() => [
    {
        id: 'pantalla',
        opciones: [
            { id: 'taurus-65', nombre: 'Taurus 65”*', precio: 1376.10 },
            { id: 'taurus-75', nombre: 'Taurus 75”*', precio: 1739.04 },
            { id: 'taurus-86', nombre: 'Taurus 86”*', precio: 2270.03 }
        ]
    },
    {
        id: 'soporte',
        titulo: 'Añade un soporte:',
        opciones: [
            { id: 'soporte-sy35', nombre: 'Soporte SY35', precio: 196.19 },
            { id: 'soporte-st01', nombre: 'Soporte ST01', precio: 240.26 }
        ]
    },
    {
        id: 'pc-ops',
        titulo: 'Añade un PC OPS:',
        opciones: [
            { id: 'windows-i5-1240', nombre: 'Windows 11 Pro i5-1240', precio: 732.36 },
            { id: 'windows-i5-14400', nombre: 'Windows 11 Pro i5-14400', precio: 933.85 }
        ]
    },
    {
        id: 'ia',
        titulo: 'Añade Inteligencia Artificial',
        opciones: [
            { id: 'licencia-ia', nombre: 'Licencia Synetech IA', precio: 96.79 }
        ]
    }
])

const grupoSeguroTaurus = computed(() => ({
    id: 'seguro',
    titulo: 'Asegura tu pantalla :',
    opciones: [
        { id: 'care-plus', nombre: 'Synetech Care+', precio: 404.61 }
    ]
}))

const gruposPrecioPiscis = computed(() => [
    {
        id: 'pantalla',
        opciones: [
            { id: 'piscis-65', nombre: 'Piscis 65”*', precio: 1039.22 }
        ]
    },
    /*{
        id: 'soporte',
        titulo: 'Añade un soporte:',
        opciones: [
            { id: 'soporte-sy35', nombre: 'Soporte SY35', precio: 196.19 },
            { id: 'soporte-st01', nombre: 'Soporte ST01', precio: 240.26 },
            { id: 'soporte-st41b', nombre: 'Soporte ST41B', precio: 275.80 }
        ]
    },*/
    {
        id: 'pc-ops',
        titulo: 'Añade un PC OPS:',
        opciones: [
            { id: 'windows-i5-1240', nombre: 'Windows 11 Pro i5-1240', precio: 732.36 },
            { id: 'windows-i5-14400', nombre: 'Windows 11 Pro i5-14400', precio: 933.85 }
        ]
    }
])

const grupoSeguroPiscis = computed(() => ({
    id: 'seguro',
    titulo: 'Asegura tu pantalla :',
    opciones: [
        { id: 'care-plus', nombre: 'Synetech Care+', precio: 404.61 },
        { id: 'care-plus', nombre: 'Synetech Care+', precio: 404.61 },
        { id: 'care-plus', nombre: 'Synetech Care+', precio: 404.61 }
    ]
}))

</script>

<template>
    <main class="flex w-full flex-col bg-[#eeeeee] text-black">
        <!-- banner -->
        <section class="relative mt-10 w-full text-black">
            <picture class="block w-full">
                <source media="(min-width: 1920px)"
                    srcset="/imagenes/accesorios/banner-accesorios/banner-accesorios-1920w.webp">
                <source media="(min-width: 1512px)"
                    srcset="/imagenes/accesorios/banner-accesorios/banner-accesorios-1512w.webp">
                <source media="(min-width: 1280px)"
                    srcset="/imagenes/accesorios/banner-accesorios/banner-accesorios-1280w.webp">
                <source media="(min-width: 1024px)"
                    srcset="/imagenes/accesorios/banner-accesorios/banner-accesorios-1024w.webp">
                <source media="(min-width: 768px)"
                    srcset="/imagenes/accesorios/banner-accesorios/banner-accesorios-768w.webp">
                <source media="(min-width: 576px)"
                    srcset="/imagenes/accesorios/banner-accesorios/banner-accesorios-576w.webp">
                <img src="/imagenes/accesorios/banner-accesorios/banner-accesorios-375w.webp"
                    :alt="t('accesorios.banner.imageAlt')" class="block h-auto w-full">
            </picture>

            <div class="absolute inset-0 z-10">
                <div
                    class="box-border flex h-full w-full items-end px-10 pb-[120px] lg:items-center lg:px-[72px] lg:pb-0">
                    <div
                        class="flex w-[295px] max-w-full flex-col gap-5 lg:w-[334px] xl:w-[515px] min-[1920px]:w-[800px]">
                        <h1
                            class="m-0 text-[3rem] font-black leading-none md:text-[4rem] xl:text-[5rem] min-[1920px]:text-[6.5rem]">
                            {{ t('accesorios.banner.title') }}
                        </h1>

                        <div class="w-[295px] sm:w-[418px] lg:w-[334px] xl:w-[515px] min-[1920px]:w-[800px]">
                            <h2
                                class="m-0 w-full text-[1.35rem] font-bold leading-tight md:text-[2rem] xl:text-[2.55rem] min-[1920px]:text-[4rem]">
                                {{ t('accesorios.banner.subtitle') }}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- section 1 - supports -->
        <UiBaseSeccionTarjetas modo="swiper" :items="supportCards" :space-between="20" :slides-offset-before="40"
            :slides-offset-after="40" :breakpoints="breakpointsSoportes"
            section-class="box-border w-full py-10 min-[1512px]:pb-14 min-[1920px]:pb-[88px]"
            title-class="px-10 sm:px-8 lg:px-20 min-[1512px]:px-[88px]" content-class="mt-10 md:mt-16"
            slide-class="h-auto w-auto pb-3 md:pb-4"
            controls-class="mt-6 mb-9 flex justify-end gap-10 px-8 min-[1512px]:hidden">
            <template #titulo>
                <h2 class="text-[2.2rem] font-bold leading-tight sm:whitespace-nowrap md:text-[3.4rem]">
                    <span class="block text-black sm:inline">
                        {{ t('accesorios.supports.title.text') }}
                    </span>

                    <span
                        class="block bg-gradient-to-r from-[#DD2211] via-[#664090] to-[#0EA3A9] bg-clip-text text-transparent sm:ml-2 sm:inline">
                        {{ t('accesorios.supports.title.gradient') }}
                    </span>
                </h2>
            </template>

            <template #item="{ item }">
                <article
                    class="box-border flex h-[680px] w-[295px] flex-col rounded-[40px] bg-white px-10 pt-[68px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:w-[430px] lg:rounded-[36px] lg:pl-[72px] lg:pr-8 min-[1920px]:w-[560px]">
                    <div class="flex h-[294px] w-[230px]">
                        <img :src="item.image" :alt="item.imageAlt" class="h-full object-contain">
                    </div>

                    <div class="mt-8 flex flex-1 flex-col min-[1512px]:w-[327px]">
                        <h3 class="text-[1.8rem] font-bold leading-tight">
                            {{ item.name }}
                        </h3>

                        <p class="mt-1.5 text-[1.15rem] font-medium leading-tight">
                            {{ item.subtitle }}
                        </p>

                        <p class="mt-0 text-[1rem] font-normal leading-tight text-black/80">
                            {{ item.description }}
                        </p>
                        <!-- item.descripcion font-normal! leading-tight h-full text-black/80 -->
                        <div class="mt-4">
                            <div class="w-fit">
                                <ButtonRoundedGradient outline color="black" fit-size-to-content>
                                    <a :href="item.datasheetUrl"
                                        class="flex h-full w-full items-center justify-center px-5 py-3 text-black min-[1512px]:px-7 min-[1512px]:py-4">
                                        <span class="leading-none">
                                            {{ t('accesorios.supports.cta') }}
                                        </span>
                                    </a>
                                </ButtonRoundedGradient>
                            </div>
                        </div>
                    </div>
                </article>
            </template>
        </UiBaseSeccionTarjetas>

        <!-- section 2 - modules -->
        <UiBaseSeccionTarjetas modo="swiper" :items="moduleCards" :space-between="30" :slides-offset-before="40"
            :slides-offset-after="40" :breakpoints="breakpointsModulos" :ocultar-flechas-desktop="true"
            section-class="box-border w-full py-10 lg:py-20" title-class="px-10 lg:px-20"
            content-class="mt-4 sm:mt-9 lg:mt-12 min-[1512px]:mt-20" slide-class="w-auto pb-3 md:pb-4 lg:pb-1"
            controls-class="mt-6 mb-9 flex justify-end gap-10 px-8">
            <template #titulo>
                <h2
                    class="w-[295px] text-[2.2rem] font-bold leading-tight sm:w-[496px] md:w-[688px] md:text-[3.4rem] lg:w-[943px] xl:w-[1063px]">
                    <span class="block text-black sm:inline">
                        {{ t('accesorios.modules.title.text') }}
                    </span>

                    <span
                        class="block bg-gradient-to-r from-[#DD2211] via-[#664090] to-[#0EA3A9] bg-clip-text text-transparent sm:ml-2 sm:inline">
                        {{ t('accesorios.modules.title.gradient') }}
                    </span>
                </h2>
            </template>

            <template #item="{ item }">
                <article
                    class="box-border h-[680px] w-[286px] rounded-[40px] bg-white px-[40px] py-[80px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:w-[417px] xl:w-[545px] min-[1512px]:w-[661px] min-[1920px]:w-[865px]">
                    <div
                        class="flex h-full flex-col items-start justify-center gap-10 lg:items-start lg:px-9 min-[1920px]:flex-row min-[1920px]:items-center">
                        <div class="flex w-full flex-col gap-4 lg:w-4/5">
                            <div class="mt-4 flex flex-col gap-2.5 sm:mt-0">
                                <h3 class="m-0 text-[1.6rem] font-bold leading-tight">
                                    {{ item.name }}
                                </h3>

                                <h4 class="m-0 text-[1.1rem] font-medium leading-tight" :class="item.id === 2
                                    ? 'w-[393px] whitespace-nowrap'
                                    : 'w-[192px] sm:w-[393px]'">
                                    {{ item.subtitle }}
                                </h4>

                                <p class="m-0 text-[1rem] font-normal leading-tight text-black/80"
                                    :class="item.id === 1
                                        ? 'lg:w-[285px] xl:w-[356px]'
                                        : 'sm:w-[337px] md:w-[353px] lg:w-[270px] xl:w-[356px] min-[1512px]:w-[345px]'">
                                    {{ item.description }}
                                </p>
                            </div>

                            <div class="w-[215px]">
                                <ButtonRoundedGradient outline color="black">
                                    <a :href="item.datasheetUrl"
                                        class="flex h-[45px] w-full items-center justify-center text-black">
                                        <span class="text-[16px] leading-none">
                                            {{ t('accesorios.modules.cta') }}
                                        </span>
                                    </a>
                                </ButtonRoundedGradient>
                            </div>
                        </div>

                        <div class="w-full sm:w-3/4 lg:w-full min-[1512px]:w-[57.14%]">
                            <img :src="item.image" :alt="item.imageAlt" class="h-auto w-full object-contain">
                        </div>
                    </div>
                </article>
            </template>
        </UiBaseSeccionTarjetas>

        <!-- section 3 - Dongle -->
        <UiBaseSeccionTarjetas modo="static" section-class="py-10" title-class="px-10 lg:px-20"
            content-class="mt-8 mb-0 flex justify-center px-10 sm:mb-8 lg:mt-[72px] lg:px-20">
            <template #titulo>
                <h2
                    class="max-w-[45ch] text-[2.2rem] font-bold leading-none sm:max-w-[40ch] md:text-[3.4rem] lg:max-w-none">
                    <span class="text-black">
                        {{ t('accesorios.dongle.title.text') }}
                    </span>

                    <span
                        class="bg-gradient-to-r from-[#DD2211] via-[#664090] to-[#0EA3A9] bg-clip-text text-transparent">
                        {{ t('accesorios.dongle.title.gradient') }}
                    </span>

                    <span class="text-black">
                        {{ t('accesorios.dongle.title.rest') }}
                    </span>
                </h2>
            </template>

            <article
                class="container mx-auto flex min-h-[600px] w-11/12 flex-col rounded-[50px] bg-white px-10 py-10 shadow-[0_4px_4px_rgba(0,0,0,0.27)] sm:justify-between md:min-h-[620px] md:w-full md:flex-row-reverse md:items-center lg:justify-center xl:justify-around xl:px-20 xl:py-2 min-[1512px]:justify-center min-[1920px]:justify-end">
                <div
                    class="w-[141px] shrink-0 self-start md:w-2/5 md:self-center lg:w-2/6 xl:w-[28.57%] min-[1512px]:w-2/5 min-[1920px]:w-[28.57%]">
                    <picture class="block w-full">
                        <source media="(min-width: 1512px)" srcset="/imagenes/accesorios/dongles/dongle-1920w.webp">
                        <source media="(min-width: 768px)" srcset="/imagenes/accesorios/dongles/dongle-1024w.webp">
                        <img src="/imagenes/accesorios/dongles/dongle-576w.webp" :alt="dongleCard.imageAlt"
                            class="h-auto w-full object-contain">
                    </picture>
                </div>

                <div
                    class="mt-6 flex w-full max-w-[215px] flex-col items-start md:w-3/5 md:justify-center sm:max-w-none xl:w-3/6 min-[1512px]:w-[57.14%]">
                    <div class="flex w-full flex-col">
                        <div class="flex w-full flex-col gap-2">
                            <h3 class="m-0 w-full text-[1.8rem] font-bold leading-tight">
                                {{ dongleCard.name }}
                            </h3>

                            <h4 class="m-0 w-full text-[1.15rem] font-medium leading-tight">
                                {{ dongleCard.subtitle }}
                            </h4>
                        </div>

                        <div class="mt-3 flex w-full flex-col gap-3">
                            <p class="m-0 w-full text-[1rem] font-normal leading-tight text-black/80">
                                {{ dongleCard.description1 }}
                            </p>

                            <p class="m-0 w-full text-[1rem] font-normal leading-tight text-black/80">
                                {{ dongleCard.description2 }}
                            </p>
                        </div>
                    </div>

                    <div class="mt-10 w-full max-w-[215px] md:max-w-[250px]">
                        <ButtonRoundedGradient outline color="black">
                            <a :href="dongleCard.datasheetUrl"
                                class="flex h-[45px] w-full items-center justify-center text-black">
                                <span class="leading-none">
                                    {{ t('accesorios.dongle.cta') }}
                                </span>
                            </a>
                        </ButtonRoundedGradient>
                    </div>
                </div>
            </article>
        </UiBaseSeccionTarjetas>

        <!-- section 4 - prices TAURUS -->
        <UiConsultaPrecio titulo="Consulta precio" subtitulo="Taurus" :grupos="gruposPrecioTaurus"
            :grupo-seguro="grupoSeguroTaurus" nota="*Incluye soporte para montaje en pared" />

        <!-- section 5 - prices PISCIS -->
        <UiConsultaPrecio titulo="Puede ser otro titulo" subtitulo="Piscis" :grupos="gruposPrecioPiscis"
            :grupo-seguro="grupoSeguroPiscis" nota="*Incluye soporte para montaje en pared" />

    </main>
</template>