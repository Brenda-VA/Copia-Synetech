<script setup>
import BotonCircular from '../ui/BotonCircular.vue'

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

const tarjetasSuperiores = tarjetas.slice(0, 3)
const tarjetasInferiores = tarjetas.slice(3)
</script>

<template>
  <section class="bg-[#ececec] py-12 md:py-14 xl:py-16">
    <div class="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-10">
      <h2 class="max-w-[1320px] text-[2.2rem] font-semibold leading-[1.15] tracking-tight text-black md:text-[3.2rem] xl:text-[3.75rem]">
        La pantalla interactiva con IA que está
        <span class="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
          revolucionando
        </span>
        la educación en los colegios
      </h2>

      <div class="mt-8 grid gap-6 xl:mt-10 xl:grid-cols-3">
        <article
          v-for="tarjeta in tarjetasSuperiores"
          :key="tarjeta.id"
          class="relative overflow-hidden rounded-[2rem] shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
          :class="tarjeta.tipo === 'imagen-fondo'
            ? 'min-h-[430px] bg-white md:min-h-[460px]'
            : 'min-h-[430px] bg-white p-5 md:min-h-[460px] md:p-6'"
        >
          <template v-if="tarjeta.tipo === 'imagen-fondo'">
            <img
              :src="tarjeta.imagen"
              :alt="tarjeta.alt"
              class="absolute inset-0 h-full w-full object-cover"
            >

            <div class="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"></div>

            <div class="absolute left-5 top-5 z-10 md:left-6 md:top-6">
              <h3 class="text-[1.05rem] font-bold leading-tight text-black md:text-[1.2rem]">
                {{ tarjeta.titulo }}
              </h3>

              <p class="mt-0.5 text-[1.05rem] leading-tight text-black md:text-[1.2rem]">
                {{ tarjeta.subtitulo }}
              </p>
            </div>

            <div class="absolute bottom-5 right-5 z-10 md:bottom-6 md:right-6">
              <BotonCircular :aria-label="`Abrir ${tarjeta.titulo}`" />
            </div>
          </template>

          <template v-else>
            <div>
              <h3 class="text-[1.05rem] font-bold leading-tight text-black md:text-[1.2rem]">
                {{ tarjeta.titulo }}
              </h3>

              <p class="mt-0.5 text-[1.05rem] leading-tight text-black md:text-[1.2rem]">
                {{ tarjeta.subtitulo }}
              </p>
            </div>

            <div class="mt-4">
              <div class="overflow-hidden rounded-[1.65rem] bg-white">
                <img
                  :src="tarjeta.imagen"
                  :alt="tarjeta.alt"
                  class="w-full object-cover"
                >
              </div>
            </div>

            <div class="absolute bottom-5 right-5 md:bottom-6 md:right-6">
              <BotonCircular :aria-label="`Abrir ${tarjeta.titulo}`" />
            </div>
          </template>
        </article>
      </div>

      <div class="mt-6 grid gap-6 xl:grid-cols-[1fr_2fr]">
        <article
          v-for="tarjeta in tarjetasInferiores"
          :key="tarjeta.id"
          class="relative overflow-hidden rounded-[2rem] bg-white p-5 shadow-[0_10px_25px_rgba(0,0,0,0.08)] md:p-6"
          :class="tarjeta.ancha ? 'min-h-[360px] md:min-h-[390px]' : 'min-h-[360px] md:min-h-[390px]'"
        >
          <div>
            <h3 class="text-[1.05rem] font-bold leading-tight text-black md:text-[1.2rem]">
              {{ tarjeta.titulo }}
            </h3>

            <p class="mt-0.5 text-[1.05rem] leading-tight text-black md:text-[1.2rem]">
              {{ tarjeta.subtitulo }}
            </p>
          </div>

          <div class="mt-4">
            <div class="overflow-hidden rounded-[1.65rem] bg-white">
              <img
                :src="tarjeta.imagen"
                :alt="tarjeta.alt"
                class="w-full object-cover"
              >
            </div>
          </div>

          <div class="absolute bottom-5 right-5 md:bottom-6 md:right-6">
            <BotonCircular :aria-label="`Abrir ${tarjeta.titulo}`" />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>