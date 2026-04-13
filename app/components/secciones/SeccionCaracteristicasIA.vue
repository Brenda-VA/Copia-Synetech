<script setup lang="ts">//activa TS dentro, sin el, el archivo seguiria funcionando como JS
/* script setup: sección padre.
este archivo coordina la sección completa sin comerse toda la lógica.
Así queda más fácil de leer y también más fácil de escalar si luego añadimos más variantes. */

// imports
/* Import de ejemplo, no sirve pq ya le hice el autoimport en las etiquetas:
El carrusel es un hijo especializado: solo se encarga de móvil y tablet pequeña.
import CarruselCaracteristicasIA from '../ui/CarruselCaracteristicasIA.vue' */

/* Import de ejemplo, no sirve pq ya le hice el autoimport en las etiquetas:
La tarjeta reusable es otra hija.
Esta la uso en tablet grande y desktop para no repetir el HTML de cada tarjeta.
import TarjetaCaracteristicaIA from '../ui/UiTarjetaCaracteristicaIA.vue' */

/* USAR TIPOS E IMPORTARLOS: */
import type { TarjetaIA, TarjetaModalIA } from '~/types/tarjetas';//tmb se importa el modal para usarlo en las tarejtas q lo necesiten

// props
/*NUEVO CAMBIO:
Los hijos de este componente (CarruselCaracteristicasIA y TarjetaCaracteristicasIA ya usaban props, pero el pade( este archivo) no,
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
  titulo: 'La pantalla interactiva con IA que está revolucionando la educación en los colegios',
  tarjetas: () => [],
  rutaFlechas: ''
})

/* datos por defecto
Este array actúa como fallback en caso de que no se pasen tarjetas desde el exterior.
Permite que el componente siga funcionando de forma autónoma (por ejemplo en la home). */
const tarjetasDefault: TarjetaIA[] = [//----------> Tmb se tipan los datos por defecto que se le pasen
  {
    id: 1,
    tipo: 'imagen-fondo',
    titulo: 'Pregúntale',
    subtitulo: 'a la IA',
    imagen: '/imagenes/asistente-ia-1024w.webp',
    alt: 'Profesor usando asistente de IA en pantalla interactiva',
    modal: {// Tarjeta con modal, se le añade la nueva propiedad
      titulo: 'Formaciones para colegios',
      descripcion: 'Ofrecemos formaciones para centros educativos sobre el uso de pantallas interactivas, herramientas digitales e inteligencia artificial en el aula.'
    }
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

/* selección de datos
Se priorizan las tarjetas recibidas por props.
Si no existen o están vacías, se utilizan las tarjetas por defecto.
Esto hace que el componente sea reutilizable sin romper su funcionamiento original. */


const tarjetas = computed<TarjetaIA[]>(() => {//computed ref para recalcular automaticamente que tarjetas usar, ahora se accede con .value
  return props.tarjetas.length ? props.tarjetas : tarjetasDefault//USAR PROPS, antes era const tarjetas = tarjetasProp.length ? tarjetasProp : tarjetasDefault
})

//estos slices dividen mi lista de tarjetas en 2 grupos -----------> COMPUTED
/*usamos computed por si el nuemero de tarjetas cambia, en ese caso las posiciones se actualizarian solas sin tener q recargar la pagina y sin importar cuantas le de
basicamente se ordenan solas sin importar el numero de tarjetas que le pase*/
const tarjetasSuperiores = computed<TarjetaIA[]>(() => tarjetas.value.slice(0, 3))//toma las 3 primeras
const tarjetasInferiores = computed<TarjetaIA[]>(() => tarjetas.value.slice(3))//toma las que sobren a partir de la posicion 3

const tarjetasTabletSuperiores = computed<TarjetaIA[]>(() => tarjetas.value.slice(0, 4))

const tarjetaFallbackAncha = tarjetasDefault.find((tarjeta) => tarjeta.ancha) ?? tarjetasDefault[0]!//aqui primero busca una tarjeta marcada como ancha y si no llega desde props se sa una del fallback por defecto
const tarjetaTabletAncha = computed<TarjetaIA>(() => {
  return tarjetas.value.find((tarjeta) => tarjeta.ancha) ?? tarjetaFallbackAncha
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


</script>
<template>
  <!-- sección padre -->
  <!-- Este contenedor define la estructura general de la sección.
       Su responsabilidad es coordinar qué layout se muestra según el dispositivo. -->
  <section class="bg-[#ececec] py-12 md:py-14 xl:py-16">
    <div class="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-10">

      <!-- cabecera -->
      <!-- El título se recibe por props, lo que permite reutilizar la sección con distintos contenidos.
           Se mantiene una estructura visual consistente independientemente del texto mostrado. -->
      <h2
        class="max-w-[1320px] text-[2.2rem] font-semibold leading-[1.15] tracking-tight text-black md:text-[3.2rem] xl:text-[3.75rem]"
      >
        {{ props.titulo }}
      </h2>

      <!-- móvil + tablet pequeña -->
      <!-- Se delega completamente la responsabilidad del carrusel a un componente hijo.
           El padre únicamente le pasa los datos necesarios mediante props. -->
      <UiCarruselCaracteristicasIA
        class="mt-8 lg:hidden"
        :tarjetas="tarjetas"
        :ruta-flecha="props.rutaFlechas"
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
            v-for="tarjeta in tarjetasTabletSuperiores"
            :key="tarjeta.id"
            :tarjeta="tarjeta"
            vista="tablet"
            :ruta-flecha="props.rutaFlechas"
            @abrir-modal="abrirModal"
          />
        </div>

        <div class="mt-6">
          <UiTarjetaCaracteristicaIA
            :tarjeta="tarjetaTabletAncha"
            vista="tablet"
            formato="ancha"
            :ruta-flecha="props.rutaFlechas"
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
            :ruta-flecha="props.rutaFlechas"
            @abrir-modal="abrirModal"
          />
        </div>

        <div class="mt-6 grid gap-6 xl:grid-cols-[1fr_2fr]">
          <UiTarjetaCaracteristicaIA
            v-for="tarjeta in tarjetasInferiores"
            :key="tarjeta.id"
            :tarjeta="tarjeta"
            vista="desktop"
            :ruta-flecha="props.rutaFlechas"
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
            {{ modalActivo.titulo }}
          </h3>

          <p class="mt-4 text-[1rem] leading-[1.6] text-black/75">
            {{ modalActivo.descripcion }}
          </p>
        </div>

        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
          aria-label="Cerrar modal"
          @click="cerrarModal"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</Teleport>

</template>
