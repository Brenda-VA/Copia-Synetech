<script setup lang="ts">
/*script setup
En Vue, <script setup> es una forma corta y muy cómoda de escribir componentes.
Todo lo que se declare aquí queda disponible directamente en el template,
sin tener que devolverlo manualmente*/

/*imports
Este import trae la componente hija.
Pieza reutilizable: pinta UNA tarjeta,
pero no sabe cuántas hay ni de dónde salen los datos.*/
import TarjetaSuite from '../ui/TarjetaSuite.vue'

/*Estos imports son de Swiper.
Swiper es la librería externa que usamos para construir el carrusel.
Aquí Vue no “inventa” el slider: simplemente integra estos componentes de Swiper.*/
import { Swiper, SwiperSlide } from 'swiper/vue'

/*modules
Navigation es un módulo extra de Swiper.
Swiper funciona por piezas: tú activas solo lo que necesitas.
Aquí lo necesitamos para que los botones de anterior/siguiente controlen el carrusel.*/
import { Navigation } from 'swiper/modules'
import type { TarjetaSuiteData } from '~/types/tarjetas'

/* estilos externos
Estos imports no son lógica de Vue, sino estilos CSS que Swiper necesita
para que el carrusel y sus controles se vean y funcionen correctamente. */
import 'swiper/css'
import 'swiper/css/navigation'

/* configuración de swiper
Aquí le decimos a Swiper qué módulos están activos en esta sección.
Si no metes Navigation aquí, luego aunque pongas botones, Swiper no sabrá usarlos. */
const modulosSwiper = [Navigation]

/*datos
Este array es una parte clave para entender el flujo.
Aquí viven los datos reales que luego acabas viendo en pantalla.
Cada objeto representa una tarjeta completa: título, descripción e imagen.
Tener los datos aquí separados del HTML hace que el código sea más limpio,
más fácil de ampliar y mucho más reutilizable.*/
const tarjetasSuite: TarjetaSuiteData[] = [
  {
    id: 1,
    titulo: 'Synetech Class',
    descripcion: 'Crea actividades interactivas por asignatura',
    imagen: '/imagenes/synetech-class.webp',
    alt: 'Synetech Class'
  },
  {
    id: 2,
    titulo: 'Synetech OS',
    descripcion: 'Personaliza tu cuenta y asegura tu privacidad',
    imagen: '/imagenes/synetech-os.webp',
    alt: 'Synetech OS'
  },
  {
    id: 3,
    titulo: 'Synetech Share',
    descripcion: 'Comparte pantalla de forma inalámbrica y bidireccional',
    imagen: '/imagenes/synetech-share.webp',
    alt: 'Synetech Share'
  },
  {
    id: 4,
    titulo: 'Synetech DMS',
    descripcion: 'Gestiona múltiples pantallas interactivas con solo un click',
    imagen: '/imagenes/synetech-dms.webp',
    alt: 'Synetech DMS'
  }
]
</script>

<template>
 <!--  estructura general
  Esta es la sección padre.
       Decimos “padre” porque desde aquí se organiza todo:
       el título, el carrusel y también las componentes hijas. -->
  <section class="overflow-hidden bg-[#2f2f31] text-white">
    <!-- cabecera visual -->
    <!-- Este bloque es presentación pura:
         imagen de fondo, capa de oscurecido y textos principales.
         Aquí Tailwind se encarga sobre todo del aspecto visual. -->
    <div class="relative overflow-hidden">
      <img
        src="/imagenes/software-educativo-1280w.webp"
        alt="Suite educativa Synetech"
        class="absolute inset-0 h-full w-full object-cover"
      >

      <!-- apoyo visual -->
      <!-- Esta capa no tiene lógica de Vue.
           Solo existe para que el texto se lea mejor encima de la imagen. -->
      <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(38,38,40,0.96)_0%,rgba(38,38,40,0.88)_34%,rgba(38,38,40,0.55)_58%,rgba(38,38,40,0.2)_100%)]"></div>

      <!-- contenido principal -->
      <!-- Aquí se pinta la parte de cabecera de la sección.
           Sigue siendo template de Vue, pero sin lógica dinámica compleja:
           es más estructura + presentación. -->
      <div class="relative z-10 mx-auto max-w-[1440px] px-4 py-14 md:px-8 md:py-16 xl:px-10 xl:py-20">
        <div class="max-w-[640px]">
          <h2 class="text-[4.3rem] font-light leading-none tracking-[-0.04em] text-white md:text-[6rem] xl:text-[8rem]">
            ed suite<span class="align-top text-[0.36em]">®</span>
          </h2>

          <h3 class="mt-8 max-w-[560px] text-[2.15rem] font-semibold leading-[1.12] text-white md:text-[3rem] xl:text-[3.7rem]">
            Descubre la
            <br>
            Suite Educativa que
            <br>
            te acompaña en cada clase
          </h3>

          <p class="mt-8 max-w-[720px] text-[1rem] leading-relaxed text-white/82 md:text-[1.15rem]">
            Facilita la gestión, personaliza el aprendizaje y potencia la experiencia
            educativa con herramientas innovadoras y fáciles de usar.
          </p>
        </div>
      </div>
    </div>

      <!-- bloque del carrusel -->
      <!-- Esta parte ya mezcla varias cosas:
           Vue para renderizar
           Swiper para el comportamiento del slider
           Tailwind para el aspecto y el responsive -->
      <div class="mx-auto max-w-[1440px] px-4 pb-12 md:px-8 md:pb-14 xl:px-10 xl:pb-16">
      <!-- componente de swiper -->
      <!-- <Swiper> es el contenedor principal del slider.
           Todo lo que pongas dentro se convierte en slides si lo envuelves en <SwiperSlide>. -->
      <Swiper
        :modules="modulosSwiper"
        :slides-per-view="1.08"
        :space-between="18"
        :navigation="{
          prevEl: '.suite-prev',
          nextEl: '.suite-next'
        }"
        :breakpoints="{
          768: {
            slidesPerView: 2.05,
            spaceBetween: 22
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 24
          }
        }"
        class="suite-swiper"
      >
        <!-- render dinámico -->
        <!-- Aquí aparece una idea importantísima de Vue:
             renderizar cosas en pantalla a partir de datos.
             v-for recorre el array tarjetasSuite.
             Por cada objeto del array, Vue crea un SwiperSlide.
             O sea: no escribimos 4 tarjetas a mano.
             Dejamos que Vue las genere dinámicamente desde los datos. -->
        <SwiperSlide
          v-for="tarjeta in tarjetasSuite"
          :key="tarjeta.id"
        >
          <!-- componente hija -->
          <!-- Dentro de cada slide montamos TarjetaSuite.
               Eso significa que el padre usa a la hija como una pieza reutilizable. -->

          <!-- props -->
          <!-- Aquí ocurre el paso más importante del flujo de datos:
               1. Los datos viven arriba, en tarjetasSuite
               2. v-for recorre ese array
               3. cada objeto actual se llama tarjeta
               4. ahora el padre manda el objeto completo
               5. la hija recibe una sola prop y pinta sus datos sin fragmentarlos -->
          <TarjetaSuite
            :tarjeta="tarjeta"
          />
        </SwiperSlide>
      </Swiper>

      <!-- navegación externa -->
      <!-- Estos botones son HTML normal, pero Swiper los usa como controles
           porque en la configuración de arriba los conectamos con prevEl y nextEl.
           Es una buena muestra de cómo Vue, Swiper y el marcado trabajan juntos. -->
      <div class="mt-8 flex justify-end gap-4">
        <button
          type="button"
          class="suite-prev flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/85 text-white transition hover:border-white hover:bg-white/10"
          aria-label="Anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>

        <button
          type="button"
          class="suite-next flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/85 text-white transition hover:border-white hover:bg-white/10"
          aria-label="Siguiente"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.4"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* estilos */
/* capa de presentación.
   Esta zona no define datos ni lógica de Vue.
   Solo ajusta cómo se ve el resultado final. */

/* swiper */
/* :deep se usa porque algunas clases internas las genera Swiper,
   no tú directamente en el template.
   Con esto podemos estilizar elementos que vienen de la librería. */
:deep(.suite-swiper) {
  overflow: visible;
}

/* comportamiento visual de los slides */
/* Esto hace que la altura de cada slide dependa de su contenido,
   en vez de quedar forzada a una altura rara. */
:deep(.suite-swiper .swiper-slide) {
  height: auto;
}

/* estados de swiper */
/* Esto solo cambia cómo se ven
   los botones cuando Swiper los marca como deshabilitados. */
:deep(.suite-swiper .swiper-button-disabled) {
  opacity: 0.45;
  cursor: default;
}
</style>
