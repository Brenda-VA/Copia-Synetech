<script setup>
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
import BotonCircular from '../ui/BotonCircular.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, A11y } from 'swiper/modules'
import 'swiper/css'

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
const tarjetasTabletSuperiores = tarjetas.slice(0, 4)
const tarjetaTabletAncha = tarjetas[4]

const swiperCaracteristicas = ref(null)
const indiceActivo = ref(0)
const autoplayActivo = ref(true)

const modulosSwiper = [Autoplay, A11y]

function guardarSwiper(swiper) {
  swiperCaracteristicas.value = swiper
  indiceActivo.value = swiper.realIndex ?? 0
  nextTick(() => {
    swiper.update()
  })
}

function cambiarIndice(swiper) {
  indiceActivo.value = swiper.realIndex ?? 0
}

function activarAutoplay() {
  if (!swiperCaracteristicas.value) {
    return
  }

  swiperCaracteristicas.value.autoplay.start()
  autoplayActivo.value = true
}

function pausarAutoplay() {
  if (!swiperCaracteristicas.value) {
    return
  }

  swiperCaracteristicas.value.autoplay.stop()
  autoplayActivo.value = false
}

function alternarAutoplay() {
  if (!swiperCaracteristicas.value) {
    return
  }

  if (autoplayActivo.value) {
    pausarAutoplay()
  } else {
    activarAutoplay()
  }
}

function irATarjeta(indice) {
  if (!swiperCaracteristicas.value) {
    return
  }

  swiperCaracteristicas.value.slideToLoop(indice)
}

function alArrastrarSwiper() {
  if (!autoplayActivo.value) {
    activarAutoplay()
  }
}

function actualizarSwiper() {
  if (!swiperCaracteristicas.value) {
    return
  }

  nextTick(() => {
    swiperCaracteristicas.value?.update()
    swiperCaracteristicas.value?.updateSlides()
    swiperCaracteristicas.value?.updateProgress()
  })
}

const totalTarjetas = computed(() => tarjetas.length)

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', actualizarSwiper, { passive: true })
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', actualizarSwiper)
  }
})
</script>

<template>
  <section class="bg-[#ececec] py-12 md:py-14 xl:py-16">
    <div class="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-10">
      <h2
        class="max-w-[1320px] text-[2.2rem] font-semibold leading-[1.15] tracking-tight text-black md:text-[3.2rem] xl:text-[3.75rem]"
      >
        La pantalla interactiva con IA que está
        <span class="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
          revolucionando
        </span>
        la educación en los colegios
      </h2>

      <!-- MOVIL / TABLET -->
      <div class="mt-8 overflow-hidden lg:hidden">
        <Swiper
          :modules="modulosSwiper"
          :slides-per-view="1.06"
          :space-between="14"
          :centered-slides="false"
          :loop="true"
          :speed="650"
          :observer="true"
          :observe-parents="true"
          :update-on-window-resize="true"
          :watch-overflow="true"
          :autoplay="{
            delay: 4200,
            disableOnInteraction: false,
            pauseOnMouseEnter: false
          }"
          :breakpoints="{
            420: {
              slidesPerView: 1.08,
              spaceBetween: 14
            },
            640: {
              slidesPerView: 1.1,
              spaceBetween: 16
            },
            768: {
              slidesPerView: 1.14,
              spaceBetween: 18
            },
            1024: {
              slidesPerView: 1.18,
              spaceBetween: 20
            }
          }"
          class="ia-swiper"
          @swiper="guardarSwiper"
          @slideChange="cambiarIndice"
          @touchStart="alArrastrarSwiper"
        >
          <SwiperSlide
            v-for="tarjeta in tarjetas"
            :key="tarjeta.id"
            class="pb-2"
          >
            <article class="tarjeta-ia-movil">
              <div class="tarjeta-ia-movil__texto">
                <h3 class="tarjeta-ia-movil__titulo">
                  {{ tarjeta.titulo }}
                </h3>

                <p class="tarjeta-ia-movil__subtitulo">
                  {{ tarjeta.subtitulo }}
                </p>
              </div>

              <div
                class="tarjeta-ia-movil__media"
                :class="tarjeta.tipo === 'imagen-fondo'
                  ? 'tarjeta-ia-movil__media--cover'
                  : 'tarjeta-ia-movil__media--soft'"
              >
                <img
                  :src="tarjeta.imagen"
                  :alt="tarjeta.alt"
                  class="tarjeta-ia-movil__imagen"
                  :class="tarjeta.tipo === 'imagen-fondo'
                    ? 'tarjeta-ia-movil__imagen--cover'
                    : 'tarjeta-ia-movil__imagen--contain'"
                >
              </div>
            </article>
          </SwiperSlide>
        </Swiper>

        <div class="mt-6 flex items-center justify-center gap-3 md:mt-7">
          <button
            type="button"
            class="control-autoplay"
            :aria-label="autoplayActivo ? 'Pausar carrusel' : 'Reproducir carrusel'"
            @click="alternarAutoplay"
          >
            <svg
              v-if="autoplayActivo"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-[18px] w-[18px]"
            >
              <rect x="6" y="5" width="4" height="14" rx="1.4"></rect>
              <rect x="14" y="5" width="4" height="14" rx="1.4"></rect>
            </svg>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="h-[18px] w-[18px]"
            >
              <path d="M8.2 6.6c0-1.1 1.2-1.8 2.1-1.2l8 4.9c.9.6.9 1.9 0 2.5l-8 4.9c-.9.6-2.1-.1-2.1-1.2V6.6Z"></path>
            </svg>
          </button>

          <div
            class="indicadores-ia"
            role="tablist"
            aria-label="Indicadores de tarjetas de características IA"
          >
            <button
              v-for="indice in totalTarjetas"
              :key="indice"
              type="button"
              class="indicador-ia"
              :class="{ 'indicador-ia--activo': indiceActivo === indice - 1 }"
              :aria-label="`Ir a la tarjeta ${indice}`"
              :aria-pressed="indiceActivo === indice - 1 ? 'true' : 'false'"
              @click="irATarjeta(indice - 1)"
            />
          </div>
        </div>
      </div>

      <!-- TABLET GRANDE -->
      <div class="mt-8 hidden lg:block xl:hidden">
        <div class="grid gap-6 lg:grid-cols-2">
          <article
            v-for="tarjeta in tarjetasTabletSuperiores"
            :key="tarjeta.id"
            class="relative overflow-hidden rounded-[2rem] shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
            :class="tarjeta.tipo === 'imagen-fondo'
              ? 'min-h-[340px] bg-white'
              : 'flex min-h-[340px] flex-col bg-white p-5'"
          >
            <template v-if="tarjeta.tipo === 'imagen-fondo'">
              <img
                :src="tarjeta.imagen"
                :alt="tarjeta.alt"
                class="absolute inset-0 h-full w-full object-cover"
              >

              <div class="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"></div>

              <div class="absolute left-5 top-5 z-10">
                <h3 class="text-[1.05rem] font-bold leading-tight text-black">
                  {{ tarjeta.titulo }}
                </h3>

                <p class="mt-0.5 text-[1.05rem] leading-tight text-black">
                  {{ tarjeta.subtitulo }}
                </p>
              </div>

              <div class="absolute bottom-5 right-5 z-10">
                <BotonCircular :aria-label="`Abrir ${tarjeta.titulo}`" />
              </div>
            </template>

            <template v-else>
              <div>
                <h3 class="text-[1.05rem] font-bold leading-tight text-black">
                  {{ tarjeta.titulo }}
                </h3>

                <p class="mt-0.5 text-[1.05rem] leading-tight text-black">
                  {{ tarjeta.subtitulo }}
                </p>
              </div>

              <div class="mt-4 flex-1">
                <div class="h-full overflow-hidden rounded-[1.65rem] bg-white">
                  <img
                    :src="tarjeta.imagen"
                    :alt="tarjeta.alt"
                    class="h-full w-full object-cover"
                  >
                </div>
              </div>

              <div class="absolute bottom-5 right-5">
                <BotonCircular :aria-label="`Abrir ${tarjeta.titulo}`" />
              </div>
            </template>
          </article>
        </div>

        <article
          class="relative mt-6 overflow-hidden rounded-[2rem] bg-white p-5 shadow-[0_10px_25px_rgba(0,0,0,0.08)]"
        >
          <div class="grid min-h-[320px] gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)]">
            <div class="pr-10">
              <h3 class="text-[1.05rem] font-bold leading-tight text-black">
                {{ tarjetaTabletAncha.titulo }}
              </h3>

              <p class="mt-0.5 text-[1.05rem] leading-tight text-black">
                {{ tarjetaTabletAncha.subtitulo }}
              </p>
            </div>

            <div class="overflow-hidden rounded-[1.65rem] bg-white">
              <img
                :src="tarjetaTabletAncha.imagen"
                :alt="tarjetaTabletAncha.alt"
                class="h-full w-full object-cover"
              >
            </div>
          </div>

          <div class="absolute bottom-5 right-5">
            <BotonCircular :aria-label="`Abrir ${tarjetaTabletAncha.titulo}`" />
          </div>
        </article>
      </div>

      <!-- DESKTOP -->
      <div class="hidden xl:block">
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
    </div>
  </section>
</template>

<style scoped>
:deep(.ia-swiper) {
  width: 100%;
  overflow: hidden;
}

:deep(.ia-swiper .swiper-wrapper) {
  align-items: stretch;
}

:deep(.ia-swiper .swiper-slide) {
  height: auto;
  min-width: 0;
}

.tarjeta-ia-movil {
  display: flex;
  min-height: 560px;
  width: 100%;
  max-width: 100%;
  flex-direction: column;
  border-radius: 2.2rem;
  background: #f4f4f6;
  padding: 1.35rem;
  box-sizing: border-box;
}

.tarjeta-ia-movil__texto {
  flex: 0 0 auto;
}

.tarjeta-ia-movil__titulo {
  font-size: 1.02rem;
  font-weight: 700;
  line-height: 1.15;
  color: #000;
}

.tarjeta-ia-movil__subtitulo {
  margin-top: 0.12rem;
  font-size: 1.02rem;
  line-height: 1.15;
  color: #000;
}

.tarjeta-ia-movil__media {
  margin-top: 1rem;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  border-radius: 1.9rem;
  background: #efeff1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tarjeta-ia-movil__media--cover {
  background: #f2f2f3;
}

.tarjeta-ia-movil__media--soft {
  background: #f6f6f7;
}

.tarjeta-ia-movil__imagen {
  width: 100%;
  height: 100%;
  display: block;
}

.tarjeta-ia-movil__imagen--cover {
  object-fit: cover;
}

.tarjeta-ia-movil__imagen--contain {
  object-fit: contain;
  background: #f6f6f7;
}

.control-autoplay {
  display: inline-flex;
  height: 2.6rem;
  width: 2.6rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  background: #f6f6f6;
  color: rgba(0, 0, 0, 0.34);
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.control-autoplay:hover {
  transform: scale(1.03);
}

.indicadores-ia {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  background: #f6f6f6;
  padding: 0.72rem 0.92rem;
}

.indicador-ia {
  height: 0.64rem;
  width: 0.64rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.34);
  transition:
    width 0.32s ease,
    transform 0.32s ease,
    background-color 0.32s ease,
    opacity 0.32s ease;
}

.indicador-ia--activo {
  width: 1.8rem;
  background: rgba(0, 0, 0, 0.72);
}

@media (min-width: 640px) {
  .tarjeta-ia-movil {
    min-height: 590px;
    padding: 1.5rem;
  }

  .tarjeta-ia-movil__titulo,
  .tarjeta-ia-movil__subtitulo {
    font-size: 1.12rem;
  }

  .tarjeta-ia-movil__media {
    margin-top: 1.1rem;
  }
}

@media (min-width: 768px) {
  .tarjeta-ia-movil {
    min-height: 640px;
    border-radius: 2.3rem;
    padding: 1.7rem;
  }

  .tarjeta-ia-movil__titulo,
  .tarjeta-ia-movil__subtitulo {
    font-size: 1.16rem;
  }

  .tarjeta-ia-movil__media {
    border-radius: 1.95rem;
    margin-top: 1.2rem;
  }

  .control-autoplay {
    height: 2.8rem;
    width: 2.8rem;
  }

  .indicadores-ia {
    gap: 0.55rem;
    padding: 0.8rem 1.05rem;
  }

  .indicador-ia {
    height: 0.68rem;
    width: 0.68rem;
  }


  .indicador-ia--activo {
    width: 2.1rem;
  }
}
</style>
