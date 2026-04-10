<script setup>
// NUEVOS DATOS (DISTINTOS A HOME)
const tarjetasPrueba = [
  {
    id: 1,
    tipo: 'imagen-fondo',
    titulo: 'Explora nuevas ideas',
    subtitulo: 'con tecnología educativa',
    imagen: '/imagenes/asistente-ia-1024w.webp',
    alt: 'Explorando ideas'
  },
  {
    id: 2,
    tipo: 'blanca',
    titulo: 'Aprende creando',
    subtitulo: 'contenido interactivo',
    imagen: '/imagenes/ia-generativa-1512w.webp',
    alt: 'Creación de contenido'
  },
  {
    id: 3,
    tipo: 'imagen-fondo',
    titulo: 'Automatiza tareas',
    subtitulo: 'y ahorra tiempo',
    imagen: '/imagenes/subtitulos-automaticos-ia-1024w.webp',
    alt: 'Automatización'
  },
  {
    id: 4,
    tipo: 'blanca',
    titulo: 'Comunicación global',
    subtitulo: 'sin barreras',
    imagen: '/imagenes/traduccion-automatica-ia-1280w.webp',
    alt: 'Traducción'
  },
  {
    id: 5,
    tipo: 'blanca',
    titulo: 'Gestiona usuarios',
    subtitulo: 'de forma eficiente',
    imagen: '/imagenes/gestion-perfiles-usuario-1024w.webp',
    alt: 'Usuarios'
  }
]
</script>


<template>
  <!-- NAVBAR REUTILIZADO
   IMPORTAS TU NAVBAR -->

  <LayoutBarraNavegacion />

  <!-- SECCIÓN REUTILIZADA -->
  <SeccionesSeccionCaracteristicasIA
    titulo="Herramientas digitales para el aula moderna"
    :tarjetas="tarjetasPrueba"
  />
</template>