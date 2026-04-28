<script setup lang="ts">
interface OpcionPrecio {
    id: string
    nombre: string
    precio: number
}

interface GrupoPrecio {
    id: string
    titulo?: string
    opciones: OpcionPrecio[]
}

interface Props {
    titulo?: string
    subtitulo?: string
    grupos: GrupoPrecio[]
    grupoSeguro?: GrupoPrecio
    textoTotal?: string
    textoBoton?: string
    nota?: string
}

const props = withDefaults(defineProps<Props>(), {
    titulo: 'Consulta precio',
    subtitulo: '',
    grupoSeguro: undefined,
    textoTotal: 'TOTAL',
    textoBoton: '¿cómo comprarlo?',
    nota: ''
})

/* guardo una opción seleccionada por cada grupo.
Ejemplo:
{
  pantalla: 'taurus-65',
  soporte: 'sy35'
}
*/
const seleccion = ref<Record<string, string>>({})

function seleccionarOpcion(grupoId: string, opcionId: string) {
    seleccion.value[grupoId] = opcionId
}

/* junto grupos normales + grupo de seguro si existe.
Así el total puede calcular todo sin duplicar lógica */
const todosLosGrupos = computed(() => {
    return props.grupoSeguro
        ? [...props.grupos, props.grupoSeguro]
        : props.grupos
})

const total = computed(() => {
    return todosLosGrupos.value.reduce((acumulado, grupo) => {
        const opcionSeleccionada = grupo.opciones.find((opcion) => {
            return opcion.id === seleccion.value[grupo.id]
        })

        return acumulado + (opcionSeleccionada?.precio ?? 0)
    }, 0)
})

function formatearPrecio(precio: number) {
    return new Intl.NumberFormat('es-ES', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true
    }).format(precio) + ' €'
}

</script>

<template>
    <!-- contenedor general de la sección -->
    <section class="w-full overflow-hidden px-8 py-12">

        <!-- contenedor interno que limita el ancho general -->
        <div class="mx-auto w-full">

            <!-- cabecera exterior: va fuera de la tarjeta blanca -->
            <header class="mb-10 md:mb-14">
                <h2 class="text-[1.7rem] font-bold leading-tight md:text-[2.1rem]">
                    {{ props.titulo }}
                </h2>
                <p v-if="props.subtitulo" class="mt-4 text-[1rem] font-semibold leading-tight md:text-[1.15rem]">
                    {{ props.subtitulo }}
                </p>
            </header>
            <!-- DIMENSIONES Y CAJAS:
                w-[...] = ancho, define el ancho del bloque de texto, aqui controla como se parte el h2 y por lo tanto saltos de linea
                h-[...]= Altura fija, le da una caja concreta al contenedor.cDentro de esa caja, según uses justify-start, justify-center o justify-end, 
                el bloque se coloca arriba, centro o abajo.
                min-h-[...] = Altura mínima, para q el contenedor no baje de cierto tamaño
              
            -------------------------
              ALINEACIÓN (Flexbox):
                flex           = activa el modo "caja flexible" para ordenar hijos
                flex-col       = ordena los elementos uno debajo de otro (vertical)
                justify-start  = contenido pegado arriba
                justify-center = contenido centrado verticalmente
                justify-end    = contenido pegado abajo
                items-start    = alinea el texto a la IZQUIERDA
                items-center   = centra el texto horizontalmente (como "text-align: center")
                items-end      = alinea el texto a la DERECHA
            
            -------------------------

              CAPAS Y VISIBILIDAD (Z-Index):
                relative = Declara que el elemento es una "ancla". es necesario para que los hijos absolutos no se escapen del contenedor
                absolute = El elemento "flota" y se puede mover con top/left sin afectar a otros
                inset-0  = Atajo para que un fondo absoluto ocupe el 100% de su padre de números bajos o del fondo (z-0)

            -------------------------

              IMÁGENES (Object Fit):
                object-cover = La imagen llena toda la caja sin deformarse (corta los bordes)
                object-top   = Al recortar, prioriza mostrar la parte superior de la foto                     
            -------------------------
            BREAKPOINTS:
                  - sm: = desde un ancho pequeño superior al base
                  - md: = desde tablet
                  - lg: = desde laptop / desktop pequeño
                  - xl: = desde desktop más grande
                  - 2xl: = desde pantallas aún más grandes
                  - 4k: = un breakpoint personalizado del proyecto para pantallas muy grandes
            -------------------------
              ESPACIADO (Paddings):    
                px-* = padding horizontal, mueve el bloque contenido más a la izq o más a la der indirectamente, pq cambia el espacio interior lateral
                Afecta a: - padding-left
                          - padding-right
                
                py-* = padding vertical, mete espacio arriba y abajo dentro del contenedor
                Afecta a: - padding-top
                          - padding-bottom                          
                
                pt-* = padding top, empuja el contenido hacia abajo, deja más aire arriba                          
                pb-* = padding bottom, empuja el contenido hacia arriba si el contenedor usa justify-end, deja más aire abajo     -->
            <!-- wrapper para centrar la tarjeta -->
            <div class="flex justify-center">
                <!-- tarjeta blanca principal 
                 <article class="w-full 
                rounded-[2.5rem] 
                ring-1 ring-inset ring-black/20 bg-white 
                px-7 md:px-40
                py-14"> -->
                <article class="w-full 
                rounded-[2.5rem] 
                ring-1 ring-inset ring-black/20 bg-white 
                px-7 py-14">
                    <!-- div para todo el contenido de la tarjeta -->
                    <div class="mx-auto w-full min-[576px]:w-4/5 xl:w-3/5">
                        <!-- lista de grupos de opciones -->
                        <div class="flex flex-col">
                            <!-- grupo normal: pantalla, soporte, PC OPS, IA, etc. -->
                            <div v-for="grupo in props.grupos" :key="grupo.id" class="py-5 first:pt-0">
                                <!-- título opcional del grupo -->
                                <h3 v-if="grupo.titulo" class="mb-5 text-[0.95rem] font-bold leading-tight">
                                    {{ grupo.titulo }}
                                </h3>

                                <!-- opciones del grupo -->
                                <div class="flex flex-col gap-4">
                                    <label v-for="opcion in grupo.opciones" :key="opcion.id"
                                        class="flex cursor-pointer items-center justify-between gap-4 border-b border-[#eeeeee] pb-3">
                                        <!-- parte izquierda: radio + nombre -->
                                        <span class="flex min-w-0 items-center gap-2">
                                            <input type="radio" class="h-3 w-3 shrink-0 accent-black" :name="grupo.id"
                                                :checked="seleccion[grupo.id] === opcion.id"
                                                @change="seleccionarOpcion(grupo.id, opcion.id)">

                                            <span class="text-[0.95rem] font-bold leading-tight w-6/7">
                                                {{ opcion.nombre }}
                                            </span>
                                        </span>

                                        <!-- precio de la opción -->
                                        <span
                                            class="flex h-[39px] min-w-[79px] shrink-0 items-center justify-center rounded-full border border-[#eeeeee] bg-[#eeeeee]/50 px-[10px] text-[16px] font-bold leading-none text-black">
                                            {{ formatearPrecio(opcion.precio) }}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <!-- bloque opcional de seguro -->
                        <div v-if="props.grupoSeguro" class="mt-5 ">
                            <h3 v-if="props.grupoSeguro.titulo" class="mb-5 text-[0.95rem] font-bold leading-tight">
                                {{ props.grupoSeguro.titulo }}
                            </h3>

                            <div class="flex flex-col gap-4">
                                <label v-for="opcion in props.grupoSeguro.opciones" :key="opcion.id"
                                    class="flex cursor-pointer items-center justify-between gap-4">
                                    <span class="flex min-w-0 items-center gap-2">
                                        <input type="radio" class="h-3 w-3 shrink-0 accent-black"
                                            :name="props.grupoSeguro.id"
                                            :checked="seleccion[props.grupoSeguro.id] === opcion.id"
                                            @change="seleccionarOpcion(props.grupoSeguro.id, opcion.id)">

                                        <span class="text-[0.95rem] font-bold leading-tight">
                                            {{ opcion.nombre }}
                                        </span>
                                    </span>

                                    <span
                                        class="flex h-[39px] min-w-[79px] shrink-0 items-center justify-center rounded-full border border-[#eeeeee] bg-[#eeeeee]/50 px-[10px] text-[16px] font-bold leading-none text-black">
                                        {{ formatearPrecio(opcion.precio) }}
                                    </span>
                                </label>
                            </div>
                        </div>

                        <!-- barra de total -->
                        <div class="mt-5 flex items-center justify-between border-t border-[#bdbdbd] px-1 pt-4 pb-3">
                            <span class="text-[0.95rem] font-bold">
                                {{ props.textoTotal }}
                            </span>

                            <span
                                class="flex h-[38px] w-[26px] items-center justify-center rounded-full bg-black text-[16px] font-medium leading-none text-white">
                                €
                            </span>
                        </div>

                        <!-- zona del botón -->
                        <div class="mt-8">
                            <slot name="cta">
                                <button type="button"
                                    class="rounded-full border-2 border-black px-5 py-2 text-[0.95rem] leading-none text-black">
                                    {{ props.textoBoton }}
                                </button>
                            </slot>
                        </div>

                        <!-- nota inferior opcional -->
                        <p v-if="props.nota" class="mt-10 text-[0.8rem] leading-tight text-black/55">
                            {{ props.nota }}
                        </p>

                    </div>
                </article>
            </div>
        </div>
    </section>
</template>