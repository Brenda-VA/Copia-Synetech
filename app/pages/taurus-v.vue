<script setup lang="ts">
const { t } = useI18n()

const gruposPrecioTaurus = computed(() => [
    {
        id: 'pantalla',
        opciones: [
            { id: 'taurus-65', nombre: t('precios.taurus.opciones.pantalla.taurus65'), precio: 1376.10 },
            { id: 'taurus-75', nombre: t('precios.taurus.opciones.pantalla.taurus75'), precio: 1739.04 },
            { id: 'taurus-86', nombre: t('precios.taurus.opciones.pantalla.taurus86'), precio: 2270.03 }
        ]
    },
    {
        id: 'soporte',
        titulo: t('precios.grupos.soporte'),
        opciones: [
            { id: 'soporte-sy35', nombre: t('precios.opciones.soportes.sy35'), precio: 196.19 },
            { id: 'soporte-st01', nombre: t('precios.opciones.soportes.st01'), precio: 240.26 }
        ]
    },
    {
        id: 'pc-ops',
        titulo: t('precios.grupos.pcOps'),
        opciones: [
            { id: 'windows-i5-1240', nombre: t('precios.opciones.pcOps.i51240'), precio: 732.36 },
            { id: 'windows-i5-14400', nombre: t('precios.opciones.pcOps.i514400'), precio: 933.85 }
        ]
    },
    {
        id: 'ia',
        titulo: t('precios.grupos.ia'),
        opciones: [
            { id: 'licencia-ia', nombre: t('precios.opciones.ia.licencia'), precio: 96.79 }
        ]
    },
    {
        id: 'seguro',
        titulo: t('precios.grupos.seguro'),
        mostrarLineaFinal: false,
        opciones: [
            { id: 'care-plus', nombre: t('precios.opciones.seguros.carePlus'), precio: 404.61 }
        ]
    }
])
</script>

<template>
    <main class="flex w-full flex-col bg-[#eeeeee] text-black">
        <UiConsultaPrecio :titulo="t('precios.comun.titulo')" :subtitulo="t('precios.taurus.subtitulo')"
            :grupos="gruposPrecioTaurus" :nota="t('precios.comun.nota')" :texto-total="t('precios.comun.total')"
            :texto-boton="t('precios.comun.boton')" />
    </main>
</template>