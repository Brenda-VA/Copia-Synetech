<script setup lang="ts">//activa TS dentro, sin el, el archivo seguiria funcionando como JS
/* script setup: sección padre.
este archivo coordina la sección completa sin comerse toda la lógica.
Así queda más fácil de leer y también más fácil de escalar si luego añadimos más variantes. */

/* USAR TIPOS E IMPORTARLOS: */
import type { TarjetaIA, TarjetaModalIA } from '~/types/tarjetas'//tmb se importa el modal para usarlo en las tarejtas q lo necesiten
import { crearTarjetasIA } from '~/data/caracteristicasIA'//las tarjetas por defecto ya no salen de un array fijo, ahora se crean aqui usando t

// props
/*Los hijos de este componente (CarruselCaracteristicasIA y TarjetaCaracteristicasIA ya usaban props, pero el pade( este archivo) no,
así que se cambió el código para que este tmb acepte datos dinamicos con props haciendo que la nueva pagina pueda usar la misma estructura 
sin duplicar codigo ------------------> IMPORTANTE*/

interface Props { //----------> props que debe recibir este componente
  titulo?: string
  tarjetas?: TarjetaIA[]//tarjetas esta tipado para solo recibir TarjetaIA[]
  rutaFlechas?: string //opcional
}

/* Se definen propiedades externas para permitir la reutilización de la sección.
Si se reciben datos desde fuera (por ejemplo desde otra página), estos tendrán prioridad.
Los props de arriba serán los ideales pero estan marcados como opcionales por si no se les pasa nada, en ese caso se usan estos props */
const props = withDefaults(defineProps<Props>(), {//---> withDefaults para dejarle valores por defecto por si no se le pasa nada
  titulo: '',
  tarjetas: () => [],
  rutaFlechas: ''
})

/*useI18n =  Composable (una función especial de la librería), se conecta con la configuracion global de i18n y detecta el idoma q se esté seleccionando
  t = funcion de traducción, sirve para buscar palabras en el archivo json*/
const { t } = useI18n()

/* aqui se crean las tarjetas por defecto ya traducidas
el padre resuelve este fallback y luego los hijos solo pintan texto final */
const tarjetasPorDefecto = computed<TarjetaIA[]>(() => crearTarjetasIA(t))

/* selección de datos
Se priorizan las tarjetas recibidas por props.
Si no existen o están vacías, se utilizan las tarjetas por defecto.
Esto hace que el componente sea reutilizable sin romper su funcionamiento original. */
const tarjetas = computed<TarjetaIA[]>(() => {//computed ref para recalcular automaticamente que tarjetas usar, ahora se accede con .value
  return props.tarjetas.length ? props.tarjetas : tarjetasPorDefecto.value //tarjetas por defecto creadas desde /data con i18n
})

/* Determina el titulo de la seción por prioridades:
    1. Usa el titulo personalizado si lo recibe por props
    2. Si no recibe props, usa el titulo por defecto del archivo json*/
const tituloSeccionResuelto = computed(() => {
  return props.titulo || t('caracteristicasIA.heading')
})

//estos slices dividen mi lista de tarjetas en 2 grupos -----------> COMPUTED
/*usamos computed por si el nuemero de tarjetas cambia, en ese caso las posiciones se actualizarian solas sin tener q recargar la pagina y sin importar cuantas le de
basicamente se ordenan solas sin importar el numero de tarjetas que le pase*/
const tarjetasSuperiores = computed<TarjetaIA[]>(() => tarjetas.value.slice(0, 3))//toma las 3 primeras
const tarjetasInferiores = computed<TarjetaIA[]>(() => tarjetas.value.slice(3))//toma las que sobren a partir de la posicion 3

/* en tablet separo la tarjeta ancha del resto
si no hago esto, la misma tarjeta puede salir en el grid normal y otra vez abajo */
const tarjetasTabletNormales = computed<TarjetaIA[]>(() => {
  return tarjetas.value.filter((tarjeta: TarjetaIA) => !tarjeta.ancha).slice(0, 4)
})

const tarjetaFallbackAncha = computed<TarjetaIA>(() => {
  return tarjetasPorDefecto.value.find((tarjeta: TarjetaIA) => tarjeta.ancha) ?? tarjetasPorDefecto.value[0]!
})//aqui primero busca una tarjeta marcada como ancha y si no llega desde props se sa una del fallback por defecto

const tarjetaTabletAncha = computed<TarjetaIA>(() => {
  return tarjetas.value.find((tarjeta: TarjetaIA) => tarjeta.ancha) ?? tarjetaFallbackAncha.value
})

/* el carrusel ya no traduce por dentro
por eso estos labels se resuelven aqui arriba y se le pasan ya listos */
const labelsCarrusel = computed(() => {
  return {
    play: t('caracteristicasIA.carrusel.reproducir'),
    pause: t('caracteristicasIA.carrusel.pausar'),
    indicadores: t('caracteristicasIA.carrusel.indicadores'),
    irATarjeta: (index: number) => t('caracteristicasIA.carrusel.irATarjeta', { numero: index })
  }
})

//MODAL ----------
const modalAbierto = ref(false)
const modalActivo = ref<TarjetaModalIA | null>(null)

function abrirModal(modal: TarjetaModalIA) {
  modalActivo.value = modal
  modalAbierto.value = true
}

function cerrarModal() {
  modalAbierto.value = false
  modalActivo.value = null
}//-------------

//Convertir ruta plana a una versión que detecte el idioma antes de eviarselas a los hijos
const localePath = useLocalePath()
/* esta ruta ya sale adaptada al idioma actual
si estoy en ingles y la ruta base es /prueba, aqui se resuelve a la version en inglés o el idioma del que venga */
const rutaFlechasResuelta = computed(() => {
  return props.rutaFlechas ? localePath(props.rutaFlechas) : ''
})
</script>

<template>
  <!-- sección padre -->
  <!-- Este contenedor define la estructura general de la sección.
       Su responsabilidad es coordinar qué layout se muestra según el dispositivo. -->
  <section class="bg-[#ececec] py-12 md:py-14 xl:py-16">
    <div class="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-10">

      <!-- cabecera -->
      <!-- El título se puede recibir por props o salir del locale por defecto.
           Así no rompemos la reutilización actual del componente. -->
      <h2
        class="max-w-[1320px] text-[2.2rem] font-semibold leading-[1.15] tracking-tight text-black md:text-[3.2rem] xl:text-[3.75rem]"
      >
      <!-- muestra el titulo con mayor prioridad, ya sea prop o la linea de traduccion i18n -->
        {{ tituloSeccionResuelto }}
      </h2>

      <!-- móvil + tablet pequeña -->
      <!-- Se delega completamente la responsabilidad del carrusel a un componente hijo.
           El padre únicamente le pasa los datos necesarios mediante props. -->
      <UiCarruselCaracteristicasIA
        class="mt-8 lg:hidden"
        :tarjetas="tarjetas"
        :ruta-flecha="rutaFlechasResuelta"
        :labels="labelsCarrusel"
        @abrir-modal="abrirModal"
      />

      <!-- tablet grande -->
      <!-- En este breakpoint se abandona el carrusel y se utiliza un layout en grid.
           Se reutiliza la componente de tarjeta para mantener consistencia visual. -->
      <div class="mt-8 hidden lg:block xl:hidden">
        <div class="grid gap-6 lg:grid-cols-2">
          <!-- render dinámico -->
          <!-- Se recorre el array y se renderiza una tarjeta por cada elemento.
               Cada tarjeta recibe únicamente los datos que necesita. -->
          <UiTarjetaCaracteristicaIA
            v-for="tarjeta in tarjetasTabletNormales"
            :key="tarjeta.id"
            :tarjeta="tarjeta"
            vista="tablet"
            :ruta-flecha="rutaFlechasResuelta"
            @abrir-modal="abrirModal"
          />
        </div>

        <div class="mt-6">
          <UiTarjetaCaracteristicaIA
            :tarjeta="tarjetaTabletAncha"
            vista="tablet"
            formato="ancha"
            :ruta-flecha="rutaFlechasResuelta"
            @abrir-modal="abrirModal"
          />
        </div>
      </div>

      <!-- desktop -->
      <!-- Se mantiene la estructura en dos bloques para escritorio,
           reutilizando la misma componente de tarjeta para evitar duplicación de código. -->
      <div class="hidden xl:block">
        <div class="mt-8 grid gap-6 xl:mt-10 xl:grid-cols-3">
          <UiTarjetaCaracteristicaIA
            v-for="tarjeta in tarjetasSuperiores"
            :key="tarjeta.id"
            :tarjeta="tarjeta"
            vista="desktop"
            :ruta-flecha="rutaFlechasResuelta"
            @abrir-modal="abrirModal"
          />
        </div>

        <div class="mt-6 grid gap-6 xl:grid-cols-[1fr_2fr]">
          <UiTarjetaCaracteristicaIA
            v-for="tarjeta in tarjetasInferiores"
            :key="tarjeta.id"
            :tarjeta="tarjeta"
            vista="desktop"
            :ruta-flecha="rutaFlechasResuelta"
            @abrir-modal="abrirModal"
          />
        </div>
      </div>

    </div>
  </section>

  <!-- Teleport to="body": Hace que el modal se pinte directamente dentro del body, no encerrado en la secion -->
  <Teleport to="body">
    <!-- v-if="modalAbierto && modalActivo": Solo se muestra si:  - está abierto
                                                                  - hay contenido real 
          @click="cerrarModal": Si haces click en el fondo oscuro, se cierra.                                                                
          @click.stop: Si haces click dentro de la caja blanca, no se cierra.-->
    <div
      v-if="modalAbierto && modalActivo"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/55 px-4"
      @click="cerrarModal"
    >
      <div
        class="w-full max-w-[560px] rounded-[2rem] bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.22)] md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-modal-ia"
        @click.stop
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3
              id="titulo-modal-ia"
              class="text-[1.4rem] font-semibold leading-tight text-black md:text-[1.7rem]"
            >
            <!-- el texto del modal ya viene traducido desde arriba
             aqui ya no se usa t() para el contenido, solo se pinta -->
              {{ modalActivo.titulo }}
            </h3>

            <p class="mt-4 text-[1rem] leading-[1.6] text-black/75">
              {{ modalActivo.descripcion }}
            </p>
          </div>

          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
            :aria-label="t('caracteristicasIA.modal.cerrar')"
            @click="cerrarModal"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
