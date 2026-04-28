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
    mostrarLineaFinal?: boolean
}

interface Props {
    titulo?: string
    subtitulo?: string
    grupos: GrupoPrecio[]
    textoTotal?: string
    textoBoton?: string
    nota?: string
}

const props = withDefaults(defineProps<Props>(), {
    titulo: 'Consulta precio',
    subtitulo: '',
    textoTotal: 'TOTAL',
    textoBoton: '¿cómo comprarlo?',
    nota: ''
})

const seleccion = ref<Record<string, string>>({})

function seleccionarOpcion(grupoId: string, opcionId: string) {
    if (seleccion.value[grupoId] === opcionId) {
        delete seleccion.value[grupoId]
        return
    }
    seleccion.value[grupoId] = opcionId
}

const todosLosGrupos = computed(() => props.grupos)

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
                            <div v-for="(grupo, grupoIndex) in props.grupos" :key="grupo.id" class="pt-5 first:pt-0"
                                :class="grupoIndex === props.grupos.length - 1 ? 'pb-0' : 'pb-5'">
                                <!-- título opcional del grupo -->
                                <h3 v-if="grupo.titulo" class="mb-5 text-[0.95rem] font-bold leading-tight">
                                    {{ grupo.titulo }}
                                </h3>

                                <!-- opciones del grupo -->
                                <div class="flex flex-col gap-4">
                                    <label v-for="(opcion, index) in grupo.opciones" :key="opcion.id"
                                        class="flex cursor-pointer items-center justify-between gap-4 pb-3" :class="(grupo.mostrarLineaFinal ?? true) || index < grupo.opciones.length - 1
                                            ? 'border-b border-[#eeeeee]'
                                            : ''">
                                        <!-- parte izquierda: radio + nombre -->
                                        <span class="flex min-w-0 items-center gap-2">
                                            <input type="radio" class="h-3 w-3 shrink-0 accent-black" :name="grupo.id"
                                                :checked="seleccion[grupo.id] === opcion.id"
                                                @click="seleccionarOpcion(grupo.id, opcion.id)">

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

                        <!-- barra de total -->
                        <div class="flex items-center justify-between border-t border-[#bdbdbd] px-1 pt-4 pb-3">
                            <span class="text-[0.95rem] font-bold">
                                {{ props.textoTotal }}
                            </span>

                            <span
                                class="flex min-h-[38px] min-w-[26px] items-center justify-center rounded-full bg-black px-3 text-[16px] font-medium leading-none text-white">
                                {{ total > 0 ? formatearPrecio(total) : '€' }}
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