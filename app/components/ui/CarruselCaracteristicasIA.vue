<script setup>
// script setup
// Esta componente hija se queda con todo lo que pertenece al carrusel.
// Así no mezclo la lógica de Swiper con el layout general de la sección padre.

/*IMPORTANTE SOBRE IMPORTS: ------------------
En nuxt las utilidades de Vue no necesitan importarse pq ya se hacen automaticamente, como con:
ref, computed, watch, nextTick, onMounted, onBeforeUnmount, defineProps -----------------------*/ 


// Esta es la tarjeta reusable.
// El carrusel no pinta la tarjeta directamente: la delega a otra hija.
//ESTE IMPORT SI ES NECESARIO PQ ES UN COMPONENTE
import TarjetaCaracteristicaIA from './TarjetaCaracteristicaIA.vue'

// Estos vienen de Swiper. TMB ES NECESARIO IMPORTARLOS PQ NO SON DE VUE
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
      class="w-full overflow-hidden"
      @swiper="guardarSwiper"
      @slideChange="cambiarIndice"
      @touchStart="alArrastrarSwiper"
    >
      <SwiperSlide
        v-for="tarjeta in tarjetas"
        :key="tarjeta.id"
        class="pb-2"
      >
        <TarjetaCaracteristicaIA
          :tarjeta="tarjeta"
          vista="movil"
          :ruta-flecha="rutaFlecha"
        />
      </SwiperSlide>
    </Swiper>

    <div class="mt-6 flex items-center justify-center gap-3 md:mt-7">
      <button
        type="button"
        class="inline-flex h-[2.6rem] w-[2.6rem] items-center justify-center rounded-full bg-[#f6f6f6] text-black/35 transition duration-200 hover:scale-[1.03] md:h-[2.8rem] md:w-[2.8rem]"
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
        class="inline-flex items-center gap-2 rounded-full bg-[#f6f6f6] px-[0.92rem] py-[0.72rem] md:gap-[0.55rem] md:px-[1.05rem] md:py-[0.8rem]"
        role="tablist"
        aria-label="Indicadores de tarjetas de características IA"
      >
        <button
          v-for="indice in totalTarjetas"
          :key="indice"
          type="button"
          class="h-[0.64rem] w-[0.64rem] rounded-full bg-black/35 transition-all duration-300 md:h-[0.68rem] md:w-[0.68rem]"
          :class="indiceActivo === indice - 1
            ? 'w-[1.8rem] bg-black/70 md:w-[2.1rem]'
            : ''"
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
   así el padre no se llena de CSS que no necesita conocer.
Este css si es importante de dejar pq afecta a clases de swiper  */
:deep(.swiper-wrapper) {
  align-items: stretch;
}

:deep(.swiper-slide) {
  height: auto;
  min-width: 0;
}
</style>
