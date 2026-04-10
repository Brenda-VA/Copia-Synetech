<script setup>
// script setup
// Esta componente hija se queda con todo lo que pertenece al carrusel.
// Así no mezclo la lógica de Swiper con el layout general de la sección padre.

// imports
// Vue me da el estado y los ciclos de vida.
// Los necesito porque el carrusel tiene autoplay, índice activo y actualización en resize.
import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'

// Esta es la tarjeta reusable.
// El carrusel no pinta la tarjeta directamente: la delega a otra hija.
import TarjetaCaracteristicaIA from './TarjetaCaracteristicaIA.vue'

// Estos vienen de Swiper.
// Vue pinta la estructura, pero Swiper pone el comportamiento real de slider.
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, A11y } from 'swiper/modules'
import 'swiper/css'

// props
// El array viene desde el padre.
// Aquí no hardcodeo tarjetas: esta componente trabaja con lo que recibe.
const props = defineProps({
  tarjetas: {
    type: Array,
    required: true
  },
  rutaFlecha: {
    type: String,
    default: ''
  }
})

// estado del swiper
// Guardo la instancia para poder controlarla luego.
// También guardo el índice activo y el estado del autoplay para los controles inferiores.
const swiperCaracteristicas = ref(null)
const indiceActivo = ref(0)
const autoplayActivo = ref(true)
/* 
módulos de swiper
Swiper funciona por módulos.
Aquí activo solo lo que necesito en este carrusel. */
const modulosSwiper = [Autoplay, A11y]

// total de tarjetas
// Lo saco con computed para que quede claro que depende de las props.
const totalTarjetas = computed(() => props.tarjetas.length)

// ciclo de vida del swiper
// Cuando Swiper se monta, guardo su instancia para poder controlarla más tarde.
function guardarSwiper(swiper) {
  swiperCaracteristicas.value = swiper
  indiceActivo.value = swiper.realIndex ?? 0

  nextTick(() => {
    swiper.update()
  })
}

// índice activo
// Cada vez que cambia de slide, actualizo el índice del indicador inferior.
function cambiarIndice(swiper) {
  indiceActivo.value = swiper.realIndex ?? 0
}

// autoplay
// Estas funciones solo hacen una cosa cada una.
// Las separo para que luego el flujo sea más legible que meterlo todo en un único bloque.
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

// navegación manual
// Esto lo usa la fila de indicadores para saltar a una tarjeta concreta.
function irATarjeta(indice) {
  if (!swiperCaracteristicas.value) {
    return
  }

  swiperCaracteristicas.value.slideToLoop(indice)
}

// drag y autoplay
// Si el usuario arrastra, vuelvo a activar autoplay si estaba parado.
// Así mantengo el comportamiento que ya tenías en la sección original.
function alArrastrarSwiper() {
  if (!autoplayActivo.value) {
    activarAutoplay()
  }
}

// resize
// Aquí fuerzo una actualización cuando cambia el viewport.
// Esto ayuda a que Swiper recalcule bien el tamaño y no se quede con medidas viejas.
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

// ciclo de vida
// El listener vive aquí porque pertenece a la lógica del carrusel, no al padre.
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
  <!-- carrusel -->
  <!-- Esta componente hija solo se encarga de la versión con swiper.
       El padre decide cuándo usarla; aquí dentro ya solo pienso en el slider. -->
  <div class="overflow-hidden">
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
      <!-- flujo de datos -->
      <!-- Aquí se ve el recorrido completo:
           el padre manda el array tarjetas
           v-for lo recorre aquí
           por cada objeto se crea un SwiperSlide
           y dentro del slide se monta la tarjeta reusable -->
      <SwiperSlide
        v-for="tarjeta in tarjetas"
        :key="tarjeta.id"
        class="pb-2"
      >
        <TarjetaCaracteristicaIA
          :tarjeta="tarjeta"
          vista="movil"
        />
      </SwiperSlide>
    </Swiper>

    <!-- controles -->
    <!-- Esta parte sigue perteneciendo al carrusel porque depende del estado del swiper. -->
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
</template>

<style scoped>
/* estilos del carrusel */
/* Todo lo que depende visualmente del swiper móvil se queda aquí,
   así el padre no se llena de CSS que no necesita conocer. */

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

@media (min-width: 768px) {
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
