<script setup>
// script setup
// Aquí dejo la sección padre.
// La idea es que este archivo coordine la sección completa, pero no se coma toda la lógica.
// Así queda más fácil de leer y también más fácil de escalar si luego añadimos más variantes.

// imports
// El carrusel es un hijo especializado: solo se encarga de móvil y tablet pequeña.
import CarruselCaracteristicasIA from '../ui/CarruselCaracteristicasIA.vue'

// La tarjeta reusable es otra hija.
// Esta la uso en tablet grande y desktop para no repetir el HTML de cada tarjeta.
import TarjetaCaracteristicaIA from '../ui/TarjetaCaracteristicaIA.vue'

// datos
// Los datos siguen viviendo aquí porque este es el padre.
// Eso deja muy claro el flujo: aquí nacen los datos, y desde aquí los mando a los hijos por props.
const tarjetas = [
  {
    id: 1,
    tipo: 'imagen-fondo',
    titulo: 'Pregúntale',
    subtitulo: 'a la IA',
    imagen: '/imagenes/asistente-ia-1024w.webp',
    alt: 'Profesor usando asistente de IA en pantalla interactiva'
  },
  {
    id: 2,
    tipo: 'blanca',
    titulo: 'Conviértete en un artista',
    subtitulo: 'con IA generativa',
    imagen: '/imagenes/ia-generativa-1512w.webp',
    alt: 'Pantalla interactiva con dibujo generado por IA'
  },
  {
    id: 3,
    tipo: 'imagen-fondo',
    titulo: 'Subtitula tus vídeos',
    subtitulo: 'automáticamente',
    imagen: '/imagenes/subtitulos-automaticos-ia-1024w.webp',
    alt: 'Clase viendo subtítulos automáticos en pantalla'
  },
  {
    id: 4,
    tipo: 'blanca',
    titulo: 'Traduce audio en tiempo real:',
    subtitulo: 'rompe barreras de idioma al instante',
    imagen: '/imagenes/traduccion-automatica-ia-1280w.webp',
    alt: 'Pantalla mostrando traducción automática en tiempo real',
    ancha: false
  },
  {
    id: 5,
    tipo: 'blanca',
    titulo: 'Invitado, Usuario, Administrador.',
    subtitulo: 'Gestiona los perfiles de forma sencilla y segura',
    imagen: '/imagenes/gestion-perfiles-usuario-1024w.webp',
    alt: 'Pantalla con gestión de perfiles de usuario',
    ancha: true
  }
]

// slices
// Estos recortes me ayudan a montar layouts distintos sin reescribir ni duplicar datos.
// Sigo usando el mismo array base, pero según la vista enseño un grupo u otro.
const tarjetasSuperiores = tarjetas.slice(0, 3)
const tarjetasInferiores = tarjetas.slice(3)
const tarjetasTabletSuperiores = tarjetas.slice(0, 4)
const tarjetaTabletAncha = tarjetas[4]
</script>

<template>
  <!-- sección padre -->
  <!-- Este bloque monta el título y decide qué hijo usar según el breakpoint.
       O sea: aquí no vive la lógica del swiper, aquí vive la coordinación general. -->
  <section class="bg-[#ececec] py-12 md:py-14 xl:py-16">
    <div class="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-10">
      <!-- cabecera -->
      <!-- Esta parte es estructura + presentación.
           Vue aquí solo pinta el contenido; el look lo da sobre todo Tailwind. -->
      <h2
        class="max-w-[1320px] text-[2.2rem] font-semibold leading-[1.15] tracking-tight text-black md:text-[3.2rem] xl:text-[3.75rem]"
      >
        La pantalla interactiva con IA que está
        <span class="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
          revolucionando
        </span>
        la educación en los colegios
      </h2>

      <!-- móvil + tablet pequeña -->
      <!-- Aquí no me llevo el swiper al padre.
           Lo separo porque la lógica del carrusel ya es una responsabilidad propia. -->
      <CarruselCaracteristicasIA
        class="mt-8 lg:hidden"
        :tarjetas="tarjetas"
      />

      <!-- tablet grande -->
      <!-- En este rango no quiero swiper.
           Aquí el padre decide usar un grid específico y reutiliza la misma tarjeta hija. -->
      <div class="mt-8 hidden lg:block xl:hidden">
        <div class="grid gap-6 lg:grid-cols-2">
          <!-- render dinámico -->
          <!-- v-for recorre los datos del padre.
               Por cada objeto se crea una tarjeta.
               La tarjeta no sabe nada del array completo: solo recibe una tarjeta concreta. -->
          <TarjetaCaracteristicaIA
            v-for="tarjeta in tarjetasTabletSuperiores"
            :key="tarjeta.id"
            :tarjeta="tarjeta"
            vista="tablet"
          />
        </div>

        <div class="mt-6">
          <TarjetaCaracteristicaIA
            :tarjeta="tarjetaTabletAncha"
            vista="tablet"
            formato="ancha"
          />
        </div>
      </div>

      <!-- desktop -->
      <!-- El desktop mantiene su estructura actual,
           pero ahora usa la componente reusable para no repetir tanto marcado. -->
      <div class="hidden xl:block">
        <div class="mt-8 grid gap-6 xl:mt-10 xl:grid-cols-3">
          <TarjetaCaracteristicaIA
            v-for="tarjeta in tarjetasSuperiores"
            :key="tarjeta.id"
            :tarjeta="tarjeta"
            vista="desktop"
          />
        </div>

        <div class="mt-6 grid gap-6 xl:grid-cols-[1fr_2fr]">
          <TarjetaCaracteristicaIA
            v-for="tarjeta in tarjetasInferiores"
            :key="tarjeta.id"
            :tarjeta="tarjeta"
            vista="desktop"
          />
        </div>
      </div>
    </div>
  </section>
</template>
