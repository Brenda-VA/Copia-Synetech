<script setup lang="ts">
type SlideTipo = 'producto' | 'ambiente'

interface BannerSlide {
    id: string
    tipo: SlideTipo
    alt: string
    imagenes: {
        base: string
        intermedia?: string
        lg: string
        xl: string
        dosxl: string
        cuatrok: string
    }
}

const { t } = useI18n()

const bannerSlides: BannerSlide[] = [
    {
        id: 'piscis-rotada',
        tipo: 'producto',
        alt: t('piscisInfinityA1.banner.alt.rotada'),
        imagenes: {
            base: '/imagenes/piscis-infinity-a1/piscis-rotada/piscis-rotada-1024w.webp',
            lg: '/imagenes/piscis-infinity-a1/piscis-rotada/piscis-rotada-1024w.webp',
            xl: '/imagenes/piscis-infinity-a1/piscis-rotada/piscis-rotada-1280w.webp',
            dosxl: '/imagenes/piscis-infinity-a1/piscis-rotada/piscis-rotada-1512w.webp',
            cuatrok: '/imagenes/piscis-infinity-a1/piscis-rotada/piscis-rotada-1920w.webp'
        }
    },
    {
        id: 'piscis-aula',
        tipo: 'ambiente',
        alt: t('piscisInfinityA1.banner.alt.aula'),
        imagenes: {
            base: '/imagenes/piscis-infinity-a1/banner-pizarra-digital-interactiva/banner-pizarra-digital-interactiva-375w.webp',
            intermedia: '/imagenes/piscis-infinity-a1/banner-pizarra-digital-interactiva/banner-pizarra-digital-interactiva.webp',
            lg: '/imagenes/piscis-infinity-a1/banner-pizarra-digital-interactiva/banner-pizarra-digital-interactiva-1024w.webp',
            xl: '/imagenes/piscis-infinity-a1/banner-pizarra-digital-interactiva/banner-pizarra-digital-interactiva-1280w.webp',
            dosxl: '/imagenes/piscis-infinity-a1/banner-pizarra-digital-interactiva/banner-pizarra-digital-interactiva-1512w.webp',
            cuatrok: '/imagenes/piscis-infinity-a1/banner-pizarra-digital-interactiva/banner-pizarra-digital-interactiva-1920w.webp'
        }
    },
    {
        id: 'piscis-frontal',
        tipo: 'producto',
        alt: t('piscisInfinityA1.banner.alt.frontal'),
        imagenes: {
            base: '/imagenes/piscis-infinity-a1/piscis-frontal/piscis-frontal-1024w.webp',
            lg: '/imagenes/piscis-infinity-a1/piscis-frontal/piscis-frontal-1024w.webp',
            xl: '/imagenes/piscis-infinity-a1/piscis-frontal/piscis-frontal-1280w.webp',
            dosxl: '/imagenes/piscis-infinity-a1/piscis-frontal/piscis-frontal-1512w.webp',
            cuatrok: '/imagenes/piscis-infinity-a1/piscis-frontal/piscis-frontal-1920w.webp'
        }
    }
]
</script>

<template>
    <main>
        <UiBannerPiscis :title="t('piscisInfinityA1.banner.title')" :subtitle="t('piscisInfinityA1.banner.subtitle')"
            :cta="t('piscisInfinityA1.banner.cta')" :slides="bannerSlides" />
    </main>
</template>