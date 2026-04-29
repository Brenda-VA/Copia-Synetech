<script setup lang="ts">
const { t } = useI18n()

const gruposPrecioGemini = computed(() => [
    {
        id: 'pantalla',
        opciones: [
            { id: 'gemini-65', nombre: t('precios.gemini.opciones.pantalla.gemini65'), precio: 1199.90 },
            { id: 'gemini-75', nombre: t('precios.gemini.opciones.pantalla.gemini75'), precio: 1549.50 },
            { id: 'gemini-86', nombre: t('precios.gemini.opciones.pantalla.gemini86'), precio: 1999.99 }
        ]
    },
    {
        id: 'soporte',
        titulo: t('precios.grupos.soporte'),
        opciones: [
            { id: 'soporte-sy35', nombre: t('precios.opciones.soportes.sy35'), precio: 196.19 },
            { id: 'soporte-st01', nombre: t('precios.opciones.soportes.st01'), precio: 240.26 },
            { id: 'soporte-st41b', nombre: t('precios.opciones.soportes.st41b'), precio: 275.80 }
        ]
    },
    {
        id: 'pc-ops',
        titulo: t('precios.grupos.pcOps'),
        opciones: [
            { id: 'windows-i5-1240', nombre: t('precios.opciones.pcOps.i51240'), precio: 732.36 }
        ]
    },
    {
        id: 'seguro',
        titulo: t('precios.grupos.seguro'),
        mostrarLineaFinal: false,
        opciones: [
            { id: 'care-plus', nombre: t('precios.opciones.seguros.carePlus'), precio: 404.61 },
            { id: 'care-premium', nombre: t('precios.opciones.seguros.carePremium'), precio: 604.61 }
        ]
    }
])
</script>

<template>
    <main class="flex w-full flex-col bg-[#eeeeee] text-black">
        <UiConsultaPrecio :titulo="t('precios.comun.titulo')" :subtitulo="t('precios.gemini.subtitulo')"
            :grupos="gruposPrecioGemini" :nota="t('precios.comun.nota')" :texto-total="t('precios.comun.total')"
            :texto-boton="t('precios.comun.boton')" />

        <UiFichaTecnicaComparativa producto-inicial="gemini" />

    </main>
</template>