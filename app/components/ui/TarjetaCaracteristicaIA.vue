<script setup lang="ts">
// script setup
/* Esta componente hija solo se dedica a pintar una tarjeta.
No guarda el array completo, no sabe nada del swiper y no decide breakpoints globales.
Solo recibe datos y los muestra según la variante que le indique el padre. */

// imports
//reutilizamos botón
import BotonCircular from './BotonCircular.vue'
import type { TarjetaIA, TarjetaVista, TarjetaFormato, TarjetaModalIA } from '~/types/tarjetas'

// props - Aquí recibo:
/*  - tarjeta: el objeto con los datos reales
    - vista: me dice en qué contexto se está usando la tarjeta
    - formato: me sirve para alguna variante concreta, como la tarjeta ancha de tablet */
interface Props {
  tarjeta: TarjetaIA
  vista?: TarjetaVista
  formato?: TarjetaFormato
  rutaFlecha?: string
  abrirTarjetaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {//withDefaults ya se sabe que dentro del componete siempre habrá un valor usable
  vista: 'desktop',
  formato: 'estandar',
  rutaFlecha: '',
  abrirTarjetaLabel: ''
})

// MODAL
const emit = defineEmits<{//esto indica que el componente puede emitir un evento llamado abrir-modal y que cuando lo haga, se enviará un objeto del tipo TarjetaModalIA
  (e: 'abrir-modal', modal: TarjetaModalIA): void
}>()

function manejarAccionBoton() { //Si la tarjeta tiene el modal, se dispara el evento
  if (props.tarjeta.modal) {
    emit('abrir-modal', props.tarjeta.modal)
  }
}

/* ayudas de lectura
Estas constantes hacen el template más fácil de seguir.
Así evito meter comparaciones largas una y otra vez en cada clase. */
//COMPUTED para que se actualice solo si es que la vista cambia, q se recalcule automaticamente
const esMovil = computed(() => props.vista === 'movil')
const esTablet = computed(() => props.vista === 'tablet')
const esImagenFondo = computed(() => props.tarjeta.tipo === 'imagen-fondo')
const esAncha = computed(() => props.formato === 'ancha')

/* esta hija ya no traduce nada
el padre o la pagina traducen arriba y aqui solo se renderiza el texto ya listo */
/* el texto base del aria-label baja desde el padre
asi aqui solo se completa con el titulo y no metemos i18n dentro del hijo */
const ariaLabelBoton = computed(() => `${props.abrirTarjetaLabel} ${props.tarjeta.titulo}`.trim())

const rutaBoton = computed(() => {
  return props.tarjeta.modal ? '' : props.rutaFlecha
})
</script>

<template>
  <!-- vista móvil -->
  <!-- En móvil la tarjeta sigue el estilo del carrusel:
       primero texto y debajo media, todo dentro de un bloque alto y redondeado. -->
  <article v-if="esMovil" class="tarjeta-ia-movil">
    <div class="tarjeta-ia-movil__texto">
      <h3 class="tarjeta-ia-movil__titulo">
        {{ props.tarjeta.titulo }}
      </h3>

      <p class="tarjeta-ia-movil__subtitulo">
        {{ props.tarjeta.subtitulo }}
      </p>
    </div>

    <div class="tarjeta-ia-movil__media" :class="esImagenFondo
      ? 'tarjeta-ia-movil__media--cover'
      : 'tarjeta-ia-movil__media--soft'">
      <!-- este componente es el q pinta la imagen y
       por eso picture/srcset entra aqui y no en el padre -->
      <picture class="tarjeta-ia-movil__imagen">
        <source media="(min-width: 1280px)" :srcset="props.tarjeta.imagenes.desktop">
        <source media="(min-width: 768px)" :srcset="props.tarjeta.imagenes.tablet">
        <!-- el img final se queda como fallback movil -->
        <img :src="props.tarjeta.imagenes.movil" :alt="props.tarjeta.alt" class="tarjeta-ia-movil__imagen" :class="esImagenFondo
          ? 'tarjeta-ia-movil__imagen--cover'
          : 'tarjeta-ia-movil__imagen--contain'">
      </picture>
    </div>
  </article>

  <!-- tablet grande: tarjeta ancha -->
  <!-- Esta variante existe porque en tablet grande la última tarjeta ocupa toda la fila.
       Aun así sigo reutilizando la misma componente hija. -->
  <article v-else-if="esTablet && esAncha"
    class="relative overflow-hidden rounded-[2rem] bg-white p-5 shadow-[0_10px_25px_rgba(0,0,0,0.08)]">
    <div class="grid min-h-[320px] gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.45fr)]">
      <div class="pr-10">
        <h3 class="text-[1.05rem] font-bold leading-tight text-black">
          {{ props.tarjeta.titulo }}
        </h3>

        <p class="mt-0.5 text-[1.05rem] leading-tight text-black">
          {{ props.tarjeta.subtitulo }}
        </p>
      </div>

      <div class="overflow-hidden rounded-[1.65rem] bg-white">
        <picture class="block h-full w-full">
          <source media="(min-width: 1280px)" :srcset="props.tarjeta.imagenes.desktop">
          <source media="(min-width: 768px)" :srcset="props.tarjeta.imagenes.tablet">
          <img :src="props.tarjeta.imagenes.movil" :alt="props.tarjeta.alt" class="h-full w-full object-cover">
        </picture>
      </div>
    </div>

    <div class="absolute bottom-5 right-5">
      <!-- AÑADIR EL EVENTO A LOS BOTONES CIRCULARES EN TODAS LAS VISTAS
      si la tiene modal, no navega y al hacerle click emite el evento
           si no tiene modal, entonces usa la ruta normal y redirige a la otra pagina-->

    <!-- este slot personaliza la acción de tablet y desktop.
     En móvil esta tarjeta no muestra botón circular todavía. -->
      <slot name="accion" :tarjeta="props.tarjeta" :ariaLabel="ariaLabelBoton" :to="rutaBoton"
        :abrirModal="manejarAccionBoton">
        <!-- uso de slots en el botón de las tarjetas:
                name="accion" -> nombre del slot
                :tarjeta -> permite al padre saber qué tarjeta está renderizando
                :ariaLabel -> permite conservar accesibilidad al personalizar el botón
                :to -> permite conservar la navegación original si la tarjeta no tiene modal
                :abrirModal -> permite abrir el modal original desde el slot personalizado  -->
        <BotonCircular :aria-label="ariaLabelBoton" :to="rutaBoton"
          @click="props.tarjeta.modal ? manejarAccionBoton() : null" />
      </slot>
    </div>
  </article>

  <!-- tablet grande y desktop: tarjeta con imagen de fondo -->
  <!-- Aquí se ve otra ventaja de separar la tarjeta:
       el padre no necesita saber cómo se pinta internamente cada tipo. -->
  <article v-else-if="esImagenFondo"
    class="relative overflow-hidden rounded-[2rem] shadow-[0_10px_25px_rgba(0,0,0,0.08)]" :class="esTablet
      ? 'min-h-[340px] bg-white'
      : 'min-h-[430px] bg-white md:min-h-[460px]'">
    <!-- las rutas cambian porque los assets se movieron a subcarpetas
    y aqui ya aprovechamos 3 tamaños sin meter una solucion mas compleja -->
    <picture>
      <source media="(min-width: 1280px)" :srcset="props.tarjeta.imagenes.desktop">
      <source media="(min-width: 768px)" :srcset="props.tarjeta.imagenes.tablet">
      <img :src="props.tarjeta.imagenes.movil" :alt="props.tarjeta.alt"
        class="absolute inset-0 h-full w-full object-cover">
    </picture>

    <div class="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent"></div>

    <div class="absolute z-10" :class="esTablet ? 'left-5 top-5' : 'left-5 top-5 md:left-6 md:top-6'">
      <h3 class="font-bold leading-tight text-black"
        :class="esTablet ? 'text-[1.05rem]' : 'text-[1.05rem] md:text-[1.2rem]'">
        {{ props.tarjeta.titulo }}
      </h3>

      <p class="mt-0.5 leading-tight text-black"
        :class="esTablet ? 'text-[1.05rem]' : 'text-[1.05rem] md:text-[1.2rem]'">
        {{ props.tarjeta.subtitulo }}
      </p>
    </div>

    <div class="absolute z-10" :class="esTablet ? 'bottom-5 right-5' : 'bottom-5 right-5 md:bottom-6 md:right-6'">
      <!-- HACER POSIBLE EL EVENTO DEL MODAL -->
      <slot name="accion" :tarjeta="props.tarjeta" :ariaLabel="ariaLabelBoton" :to="rutaBoton"
        :abrirModal="manejarAccionBoton">
        <BotonCircular :aria-label="ariaLabelBoton" :to="rutaBoton"
          @click="props.tarjeta.modal ? manejarAccionBoton() : null" />
      </slot>
    </div>
  </article>

  <!-- tablet grande y desktop: tarjeta blanca -->
  <!-- Esta variante pinta las tarjetas que llevan texto arriba e imagen dentro del bloque blanco. -->
  <article v-else class="relative overflow-hidden rounded-[2rem] bg-white shadow-[0_10px_25px_rgba(0,0,0,0.08)]" :class="esTablet
    ? 'flex min-h-[340px] flex-col p-5'
    : 'min-h-[430px] p-5 md:min-h-[460px] md:p-6'">
    <div>
      <h3 class="font-bold leading-tight text-black"
        :class="esTablet ? 'text-[1.05rem]' : 'text-[1.05rem] md:text-[1.2rem]'">
        {{ props.tarjeta.titulo }}
      </h3>

      <p class="mt-0.5 leading-tight text-black"
        :class="esTablet ? 'text-[1.05rem]' : 'text-[1.05rem] md:text-[1.2rem]'">
        {{ props.tarjeta.subtitulo }}
      </p>
    </div>

    <div :class="esTablet ? 'mt-4 flex-1' : 'mt-4'">
      <div
        :class="esTablet ? 'h-full overflow-hidden rounded-[1.65rem] bg-white' : 'overflow-hidden rounded-[1.65rem] bg-white'">
        <!-- esta fase solo se aplica a la seccion IA
        asi arreglamos las rutas nuevas y el responsive sin mezclar otras secciones ahora -->
        <picture class="block h-full w-full">
          <source media="(min-width: 1280px)" :srcset="props.tarjeta.imagenes.desktop">
          <source media="(min-width: 768px)" :srcset="props.tarjeta.imagenes.tablet">
          <img :src="props.tarjeta.imagenes.movil" :alt="props.tarjeta.alt"
            :class="esTablet ? 'h-full w-full object-cover' : 'w-full object-cover'">
        </picture>
      </div>
    </div>

    <div class="absolute" :class="esTablet ? 'bottom-5 right-5' : 'bottom-5 right-5 md:bottom-6 md:right-6'">
      <slot name="accion" :tarjeta="props.tarjeta" :ariaLabel="ariaLabelBoton" :to="rutaBoton"
        :abrirModal="manejarAccionBoton">
        <BotonCircular :aria-label="ariaLabelBoton" :to="rutaBoton"
          @click="props.tarjeta.modal ? manejarAccionBoton() : null" />
      </slot>
    </div>
  </article>
</template>

<style scoped>
/* estilos de la tarjeta */
/* Aquí dejo solo los estilos que realmente pertenecen a la tarjeta,
   sobre todo la variante móvil que era la más específica. */

.tarjeta-ia-movil {
  display: flex;
  min-height: 560px;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  flex-direction: column;
  border-radius: 2.2rem;
  background: #f4f4f6;
  padding: 1.35rem;
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
  display: flex;
  min-height: 0;
  flex: 1;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 1.9rem;
  background: #efeff1;
}

.tarjeta-ia-movil__media--cover {
  background: #f2f2f3;
}

.tarjeta-ia-movil__media--soft {
  background: #f6f6f7;
}

.tarjeta-ia-movil__imagen {
  display: block;
  height: 100%;
  width: 100%;
}

.tarjeta-ia-movil__imagen--cover {
  object-fit: cover;
}

.tarjeta-ia-movil__imagen--contain {
  object-fit: contain;
  background: #f6f6f7;
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
    margin-top: 1.2rem;
    border-radius: 1.95rem;
  }
}
</style>
