<script setup>
// Datos nuevos para demostrar reutilización
const tarjetasPrueba = [
  {
    id: 3,
    tipo: 'imagen-fondo',
    titulo: 'Descubre recursos',
    subtitulo: 'para cada clase',
    imagen: '/imagenes/subtitulos-automaticos-ia-1024w.webp',
    alt: 'Recursos para clase'
  },
  {
    id: 1,
    tipo: 'imagen-fondo',
    titulo: 'Explora ideas nuevas',
    subtitulo: 'con apoyo visual',
    imagen: '/imagenes/asistente-ia-1024w.webp',
    alt: 'Explorar ideas nuevas'
  },
  {
    id: 5,
    tipo: 'blanca',
    titulo: 'Organiza accesos',
    subtitulo: 'de forma clara y segura',
    imagen: '/imagenes/gestion-perfiles-usuario-1024w.webp',
    alt: 'Organización de accesos',
    ancha: true
  },
  {
    id: 2,
    tipo: 'blanca',
    titulo: 'Crea actividades',
    subtitulo: 'más creativas e interactivas',
    imagen: '/imagenes/ia-generativa-1512w.webp',
    alt: 'Actividades creativas'
  },
  {
    id: 4,
    tipo: 'blanca',
    titulo: 'Conecta a todos',
    subtitulo: 'sin barreras de idioma',
    imagen: '/imagenes/traduccion-automatica-ia-1280w.webp',
    alt: 'Conexión sin barreras'
  }
]
</script>

<template>
  <main class="min-h-screen bg-[#ececec]">
    <SeccionesSeccionCaracteristicasIA
      titulo="Recursos digitales para una clase más dinámica"
      :tarjetas="tarjetasPrueba"
    />
  </main>
</template>