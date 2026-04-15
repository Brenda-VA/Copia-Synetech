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
    imagenes: {/*como prueba tiene sus propias tarjetas y no agarra las por defecto del padre, 
      aqui se deben de arreglar tmb los links rotos y actualizar las tarjetas al nuevo tipado*/
      movil: '/imagenes/caracteristicas-ia/subtitulos-automaticos-ia/subtitulos-automaticos-ia-576w.webp',
      tablet: '/imagenes/caracteristicas-ia/subtitulos-automaticos-ia/subtitulos-automaticos-ia-1024w.webp',
      desktop: '/imagenes/caracteristicas-ia/subtitulos-automaticos-ia/subtitulos-automaticos-ia-1280w.webp'
    },
    alt: t('prueba.caracteristicasIA.tarjetas.recursos.alt')
  },
  {
    id: 1,
    tipo: 'imagen-fondo',
    titulo: t('prueba.caracteristicasIA.tarjetas.ideas.titulo'),
    subtitulo: t('prueba.caracteristicasIA.tarjetas.ideas.subtitulo'),
    imagenes: {
      movil: '/imagenes/caracteristicas-ia/asistente-ia/asistente-ia-576w.webp',
      tablet: '/imagenes/caracteristicas-ia/asistente-ia/asistente-ia-1024w.webp',
      desktop: '/imagenes/caracteristicas-ia/asistente-ia/asistente-ia-1280w.webp'
    },
    alt: t('prueba.caracteristicasIA.tarjetas.ideas.alt')
  },
  {
    id: 5,
    tipo: 'blanca',
    titulo: t('prueba.caracteristicasIA.tarjetas.accesos.titulo'),
    subtitulo: t('prueba.caracteristicasIA.tarjetas.accesos.subtitulo'),
    imagenes: {
      movil: '/imagenes/caracteristicas-ia/gestion-perfiles-usuario/gestion-perfiles-usuario-576w.webp',
      tablet: '/imagenes/caracteristicas-ia/gestion-perfiles-usuario/gestion-perfiles-usuario-1024w.webp',
      desktop: '/imagenes/caracteristicas-ia/gestion-perfiles-usuario/gestion-perfiles-usuario-1280w.webp'
    },
    alt: t('prueba.caracteristicasIA.tarjetas.accesos.alt'),
    ancha: true
  },
  {
    id: 2,
    tipo: 'blanca',
    titulo: t('prueba.caracteristicasIA.tarjetas.actividades.titulo'),
    subtitulo: t('prueba.caracteristicasIA.tarjetas.actividades.subtitulo'),
    imagenes: {
      movil: '/imagenes/caracteristicas-ia/ia-generativa/ia-generativa-576w.webp',
      tablet: '/imagenes/caracteristicas-ia/ia-generativa/ia-generativa-1024w.webp',
      desktop: '/imagenes/caracteristicas-ia/ia-generativa/ia-generativa-1280w.webp'
    },
    alt: t('prueba.caracteristicasIA.tarjetas.actividades.alt')
  },
  {
    id: 4,
    tipo: 'blanca',
    titulo: t('prueba.caracteristicasIA.tarjetas.conexion.titulo'),
    subtitulo: t('prueba.caracteristicasIA.tarjetas.conexion.subtitulo'),
    imagenes: {
      movil: '/imagenes/caracteristicas-ia/traduccion-automatica-ia/traduccion-automatica-ia-768w.webp',
      tablet: '/imagenes/caracteristicas-ia/traduccion-automatica-ia/traduccion-automatica-ia-1280w.webp',
      desktop: '/imagenes/caracteristicas-ia/traduccion-automatica-ia/traduccion-automatica-ia-1512w.webp'
    },
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
