<script setup lang="ts">
import type { TarjetaIA } from '@/types/tarjetas'//nombre del tipo: TarjetaIA

const { t } = useI18n()

const tarjetasPrueba: TarjetaIA[] = [//tarjetasPrueba es un array de objetos del tipo TarjetaIA
//cuando ya está tipado TS verifi a que cada objeto tenga los elementos del tipo, por ejemplo, id siembre será number
/*Antes se veia asi: 'const tarjetasPrueba = ['*/
  {
    id: 3,
    tipo: 'imagen-fondo', //marca error si ponemos un valor que no sea del tipo que especifiquemos
    tituloKey: 'prueba.caracteristicasIA.tarjetas.recursos.titulo',
    subtituloKey: 'prueba.caracteristicasIA.tarjetas.recursos.subtitulo',
    imagen: '/imagenes/subtitulos-automaticos-ia-1024w.webp',
    altKey: 'prueba.caracteristicasIA.tarjetas.recursos.alt'
  },
  {
    id: 1,
    tipo: 'imagen-fondo',
    tituloKey: 'prueba.caracteristicasIA.tarjetas.ideas.titulo',
    subtituloKey: 'prueba.caracteristicasIA.tarjetas.ideas.subtitulo',
    imagen: '/imagenes/asistente-ia-1024w.webp',
    altKey: 'prueba.caracteristicasIA.tarjetas.ideas.alt'
  },
  {
    id: 5,
    tipo: 'blanca',
    tituloKey: 'prueba.caracteristicasIA.tarjetas.accesos.titulo',
    subtituloKey: 'prueba.caracteristicasIA.tarjetas.accesos.subtitulo',
    imagen: '/imagenes/gestion-perfiles-usuario-1024w.webp',
    altKey: 'prueba.caracteristicasIA.tarjetas.accesos.alt',
    ancha: true
  },
  {
    id: 2,
    tipo: 'blanca',
    tituloKey: 'prueba.caracteristicasIA.tarjetas.actividades.titulo',
    subtituloKey: 'prueba.caracteristicasIA.tarjetas.actividades.subtitulo',
    imagen: '/imagenes/ia-generativa-1512w.webp',
    altKey: 'prueba.caracteristicasIA.tarjetas.actividades.alt'
  },
  {
    id: 4,
    tipo: 'blanca',
    tituloKey: 'prueba.caracteristicasIA.tarjetas.conexion.titulo',
    subtituloKey: 'prueba.caracteristicasIA.tarjetas.conexion.subtitulo',
    imagen: '/imagenes/traduccion-automatica-ia-1280w.webp',
    altKey: 'prueba.caracteristicasIA.tarjetas.conexion.alt'
  }
]
</script>

<template>
  <main class="min-h-screen bg-[#ececec]">
    <SeccionesSeccionCaracteristicasIA
      :titulo="t('prueba.caracteristicasIA.heading')"
      :tarjetas="tarjetasPrueba"
      ruta-flechas="/"
    />
  </main>
</template>
