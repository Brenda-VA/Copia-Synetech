<script setup lang="ts">
import type { TarjetaIA } from '@/types/tarjetas'//nombre del tipo: TarjetaIA

const { t } = useI18n()

/* esta pagina traduce sus propias tarjetas porque aqui el contenido es personalizado
asi el padre reutiliza la misma estructura, pero recibe texto final y no keys */
const tarjetasPrueba = computed<TarjetaIA[]>(() => [//tarjetasPrueba es un array de objetos del tipo TarjetaIA
//cuando ya está tipado TS verifica que cada objeto tenga los elementos del tipo, por ejemplo, id siembre será number
/*Antes se veia asi: 'const tarjetasPrueba = ['*/
  {
    id: 3,
    tipo: 'imagen-fondo', //marca error si ponemos un valor que no sea del tipo que especifiquemos
    titulo: t('prueba.caracteristicasIA.tarjetas.recursos.titulo'),
    subtitulo: t('prueba.caracteristicasIA.tarjetas.recursos.subtitulo'),
    imagen: '/imagenes/subtitulos-automaticos-ia-1024w.webp',
    alt: t('prueba.caracteristicasIA.tarjetas.recursos.alt')
  },
  {
    id: 1,
    tipo: 'imagen-fondo',
    titulo: t('prueba.caracteristicasIA.tarjetas.ideas.titulo'),
    subtitulo: t('prueba.caracteristicasIA.tarjetas.ideas.subtitulo'),
    imagen: '/imagenes/asistente-ia-1024w.webp',
    alt: t('prueba.caracteristicasIA.tarjetas.ideas.alt')
  },
  {
    id: 5,
    tipo: 'blanca',
    titulo: t('prueba.caracteristicasIA.tarjetas.accesos.titulo'),
    subtitulo: t('prueba.caracteristicasIA.tarjetas.accesos.subtitulo'),
    imagen: '/imagenes/gestion-perfiles-usuario-1024w.webp',
    alt: t('prueba.caracteristicasIA.tarjetas.accesos.alt'),
    ancha: true
  },
  {
    id: 2,
    tipo: 'blanca',
    titulo: t('prueba.caracteristicasIA.tarjetas.actividades.titulo'),
    subtitulo: t('prueba.caracteristicasIA.tarjetas.actividades.subtitulo'),
    imagen: '/imagenes/ia-generativa-1512w.webp',
    alt: t('prueba.caracteristicasIA.tarjetas.actividades.alt')
  },
  {
    id: 4,
    tipo: 'blanca',
    titulo: t('prueba.caracteristicasIA.tarjetas.conexion.titulo'),
    subtitulo: t('prueba.caracteristicasIA.tarjetas.conexion.subtitulo'),
    imagen: '/imagenes/traduccion-automatica-ia-1280w.webp',
    alt: t('prueba.caracteristicasIA.tarjetas.conexion.alt')
  }
])
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
