<script setup lang="ts">
import type { TarjetaIA } from '@/types/tarjetas'//nombre del tipo: TarjetaIA

const tarjetasPrueba: TarjetaIA[] = [//tarjetasPrueba es un array de objetos del tipo TarjetaIA
//cuando ya está tipado TS verifi a que cada objeto tenga los elementos del tipo, por ejemplo, id siembre será number
/*Antes se veia asi: 'const tarjetasPrueba = ['*/
  {
    id: 3,
    tipo: 'imagen-fondo', //marca error si ponemos un valor que no sea del tipo que especifiquemos
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
      ruta-flechas="/"
    />
  </main>
</template>
