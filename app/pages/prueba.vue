<script setup lang="ts">
import type { TarjetaIA } from '@/types/tarjetas'//nombre del tipo: TarjetaIA
import BotonPrimario from '~/components/ui/BotonPrimario.vue';//importamos el boton pa probar los slots
import BotonCircular from '~/components/ui/BotonCircular.vue'
const { t } = useI18n()

/* esta pagina traduce sus propias tarjetas porque aqui el contenido es personalizado
asi el padre reutiliza la misma estructura, pero recibe texto final y no keys */
const tarjetasPrueba = computed<TarjetaIA[]>(() => [//tarjetasPrueba es un array de objetos del tipo TarjetaIA
  //cuando ya está tipado TS verifica que cada objeto tenga los elementos del tipo, por ejemplo, id siembre será number
  /*Antes se veia asi: 'const tarjetasPrueba = ['*/
  {
    id: 3,
    tipo: 'imagen-fondo', //marca error si ponemos un valor que no sea del tipo que especifiquemos
    titulo: t('prueba.caracteristicasIA.tarjetas.recursos.titulo'),
    subtitulo: t('prueba.caracteristicasIA.tarjetas.recursos.subtitulo'),
    imagenes: {/*como prueba tiene sus propias tarjetas y no agarra las por defecto del padre, 
      aqui se deben de arreglar tmb los links rotos y actualizar las tarjetas al nuevo tipado*/
      movil: '/imagenes/caracteristicas-ia/subtitulos-automaticos-ia/subtitulos-automaticos-ia-576w.webp',
      tablet: '/imagenes/caracteristicas-ia/subtitulos-automaticos-ia/subtitulos-automaticos-ia-1024w.webp',
      desktop: '/imagenes/caracteristicas-ia/subtitulos-automaticos-ia/subtitulos-automaticos-ia-1280w.webp'
    },
    alt: t('prueba.caracteristicasIA.tarjetas.recursos.alt')
  },
  {
    id: 1,
    tipo: 'imagen-fondo',
    titulo: t('prueba.caracteristicasIA.tarjetas.ideas.titulo'),
    subtitulo: t('prueba.caracteristicasIA.tarjetas.ideas.subtitulo'),
    imagenes: {
      movil: '/imagenes/caracteristicas-ia/asistente-ia/asistente-ia-576w.webp',
      tablet: '/imagenes/caracteristicas-ia/asistente-ia/asistente-ia-1024w.webp',
      desktop: '/imagenes/caracteristicas-ia/asistente-ia/asistente-ia-1280w.webp'
    },
    alt: t('prueba.caracteristicasIA.tarjetas.ideas.alt')
  },
  {
    id: 5,
    tipo: 'blanca',
    titulo: t('prueba.caracteristicasIA.tarjetas.accesos.titulo'),
    subtitulo: t('prueba.caracteristicasIA.tarjetas.accesos.subtitulo'),
    imagenes: {
      movil: '/imagenes/caracteristicas-ia/gestion-perfiles-usuario/gestion-perfiles-usuario-576w.webp',
      tablet: '/imagenes/caracteristicas-ia/gestion-perfiles-usuario/gestion-perfiles-usuario-1024w.webp',
      desktop: '/imagenes/caracteristicas-ia/gestion-perfiles-usuario/gestion-perfiles-usuario-1280w.webp'
    },
    alt: t('prueba.caracteristicasIA.tarjetas.accesos.alt'),
    ancha: true
  },
  {
    id: 2,
    tipo: 'blanca',
    titulo: t('prueba.caracteristicasIA.tarjetas.actividades.titulo'),
    subtitulo: t('prueba.caracteristicasIA.tarjetas.actividades.subtitulo'),
    imagenes: {
      movil: '/imagenes/caracteristicas-ia/ia-generativa/ia-generativa-576w.webp',
      tablet: '/imagenes/caracteristicas-ia/ia-generativa/ia-generativa-1024w.webp',
      desktop: '/imagenes/caracteristicas-ia/ia-generativa/ia-generativa-1280w.webp'
    },
    alt: t('prueba.caracteristicasIA.tarjetas.actividades.alt')
  },
  {
    id: 4,
    tipo: 'blanca',
    titulo: t('prueba.caracteristicasIA.tarjetas.conexion.titulo'),
    subtitulo: t('prueba.caracteristicasIA.tarjetas.conexion.subtitulo'),
    imagenes: {
      movil: '/imagenes/caracteristicas-ia/traduccion-automatica-ia/traduccion-automatica-ia-768w.webp',
      tablet: '/imagenes/caracteristicas-ia/traduccion-automatica-ia/traduccion-automatica-ia-1280w.webp',
      desktop: '/imagenes/caracteristicas-ia/traduccion-automatica-ia/traduccion-automatica-ia-1512w.webp'
    },
    alt: t('prueba.caracteristicasIA.tarjetas.conexion.alt')
  }
])
</script>

<template>
  <main class="min-h-screen bg-[#ececec]">

    <!-- SCOPED SLOT -->
    <SeccionesHeroCarrusel>
      <!-- dese aqui con <template> personalizamos el slot de HeroCarrusel, modificamos el textopara los botones de ambos slides -->
      <template #boton="{ slide }">
        <BotonPrimario>
          <span class="inline-flex items-center gap-2">
            {{ slide.variante === 'demo'
              ? t('prueba.hero.botones.demo')
              : t('prueba.hero.botones.ia')
            }}
            <span aria-hidden="true">→</span>
          </span>
        </BotonPrimario>
      </template>
    </SeccionesHeroCarrusel>


    <!-- DEFAULT SLOT
    personalizando con el slot que está en BotonPrimario.vue -->
    <section class="bg-black px-6 py-10 text-center">
      <!-- traemos el componente -->
      <BotonPrimario>
        <!-- escribimos el nuevo contenido, si no le pasamos nd a partir de aqui entonces agarra el
         texto por defecto-->
        <span class="inline-flex items-center gap-2">
          Probar a personalizar botón desde slot que viene directamente de BotonPrimario
          <span aria-hidden="true">→</span>
        </span>
      </BotonPrimario>
    </section>

    <SeccionesSeccionCaracteristicasIA :tarjetas="tarjetasPrueba" ruta-flechas="/">
      <!-- Personalizacion con slot y titulo hardcoreado
      <template #titulo>
        Recursos digitales<br>
        <span class="text-black/45">
          para una clase más dinámica
        </span>
      </template> -->

      <!-- personalizacioin del titulo con slot y traducido con clave i18n -->
      <template #titulo>
        {{ t('prueba.caracteristicasIA.heading') }}
        <span class="text-black/45"> IA</span>
      </template>

      <!-- este slot viene de un componente q está muchos niveles abajo: 
      1. prueba.vue: usa SeccionCaracteristicasIA y es el componente final que pinta el botón
Su default slot permite cambiar el icono de adentro
      2. SeccionCaracteristicasIA.vue: contiene TarjetaCaracteristicaIA y se encarga del reenvío del slot hacia sus hijos
      3. TarjetaCaracteristicaIA.vue: contiene BotonCircular y tiene un named scoped slot llamado 'accion'
      4. BotonCircular.vue: nace aqui, este es el que queremos personalizar, tiene default slot para icono -->
      <template #accion="{ tarjeta, ariaLabel, to, abrirModal }">
        <BotonCircular :aria-label="ariaLabel" :to="to" @click="tarjeta.modal ? abrirModal() : null">
          <!-- simbolo del boton personalizado con slot, antes era '>' y ahora '+' -->
          <span aria-hidden="true" class="text-[1rem] font-bold leading-none">
            +
          </span>
        </BotonCircular>
      </template>


    </SeccionesSeccionCaracteristicasIA>
  </main>
</template>
