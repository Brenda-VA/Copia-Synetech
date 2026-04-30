<script setup lang="ts">
import type {
    CategoriaTecnica,
    FilaTecnica,
    ProductoKey,
    ProductoTecnico
} from '~/data/fichasTecnicas'

type BloqueFichaId = 'principal' | 'comparacion'

interface BloqueFicha {
    id: BloqueFichaId
    productoKey: ProductoKey
    producto: ProductoTecnico
}

interface Props {
    t: Function
    productos: Record<ProductoKey, ProductoTecnico>
    bloquesFicha: BloqueFicha[]
    productoPrincipal: ProductoTecnico
    productoComparacion: ProductoTecnico | null
    opcionesSelectorPrincipal: ProductoKey[]
    opcionesSelectorComparacion: ProductoKey[]
    selectorPrincipalAbierto: boolean
    selectorComparacionAbierto: boolean
    acordeonAbierto: Record<BloqueFichaId | 'comparativa', string | null>
    categoriasProducto: (producto: ProductoTecnico) => CategoriaTecnica[]
    filasCategoria: (categoria: CategoriaTecnica) => FilaTecnica[]
}

defineProps<Props>()

const emit = defineEmits<{
    alternarSelectorPrincipal: []
    alternarSelectorComparacion: []
    seleccionarProductoPrincipal: [producto: ProductoKey]
    seleccionarProductoComparacion: [producto: ProductoKey]
    alternarAcordeon: [bloqueId: BloqueFichaId, categoriaId: string]
}>()
</script>

<template>
    <div>
        <!-- SELECTOR PRINCIPAL -->
        <div class="relative mt-16 w-full max-w-[340px] lg:mx-auto lg:mt-14">
            <button type="button"
                class="flex h-12 w-full items-center justify-between rounded-full border-2 border-black px-8 text-[1rem] leading-none lg:max-w-[300px]"
                @click="emit('alternarSelectorPrincipal')">
                <span>{{ productoPrincipal.nombre }}</span>

                <span class="text-[1.6rem] leading-none transition-transform duration-200"
                    :class="selectorPrincipalAbierto ? 'rotate-180' : ''">
                    ⌄
                </span>
            </button>

            <div v-if="selectorPrincipalAbierto"
                class="absolute left-0 top-[calc(100%+10px)] z-20 w-full rounded-[1.2rem] border border-black bg-[#eeeeee] py-4 text-center">
                <button v-for="productoKey in opcionesSelectorPrincipal" :key="productoKey" type="button"
                    class="block w-full py-2 text-[1rem]" @click="emit('seleccionarProductoPrincipal', productoKey)">
                    {{ productos[productoKey].nombre }}
                </button>
            </div>
        </div>

        <!-- FICHAS VERTICALES -->
        <template v-for="bloque in bloquesFicha" :key="`${bloque.id}-${bloque.productoKey}`">
            <article class="mt-16 flex flex-col items-center lg:mt-14">

                <!-- IMAGEN DESKTOP/TABLET GRANDE -->
                <div class="hidden w-full justify-center lg:flex">
                    <div class="w-[36%] max-w-[360px]">
                        <img :key="`${bloque.id}-${bloque.productoKey}-imagen`" :src="bloque.producto.imagen"
                            :alt="bloque.producto.alt" class="w-full object-contain">
                    </div>
                </div>

                <!-- BOTONES DESKTOP -->
                <div class="mt-14 hidden w-[28%] max-w-[260px] flex-col gap-4 lg:flex">
                    <button type="button" class="h-12 rounded-full border-2 border-black px-8 text-[1rem] leading-none">
                        {{ t('fichaTecnica.acciones.descubreMas') }}
                    </button>

                    <button type="button" class="h-12 rounded-full border-2 border-black px-8 text-[1rem] leading-none">
                        {{ t('fichaTecnica.acciones.fichaTecnica', { producto: bloque.producto.nombre }) }}
                    </button>
                </div>

                <!-- ACORDEONES -->
                <div class="mt-14 w-full lg:w-[70%]">
                    <div class="flex flex-col">
                        <div v-for="categoria in categoriasProducto(bloque.producto)"
                            :key="`${bloque.id}-${bloque.productoKey}-${categoria.id}`" class="border-b-2 border-black">
                            <button type="button"
                                class="flex w-full items-center justify-between py-3 text-left text-[1.2rem] font-bold leading-tight xl:text-[1.35rem]"
                                @click="emit('alternarAcordeon', bloque.id, categoria.id)">
                                <span>{{ categoria.titulo }}</span>

                                <span class="text-[1.5rem] leading-none transition-transform duration-200"
                                    :class="acordeonAbierto[bloque.id] === categoria.id ? 'rotate-180' : ''">
                                    ⌄
                                </span>
                            </button>

                            <Transition name="acordeon">
                                <div v-if="acordeonAbierto[bloque.id] === categoria.id" class="pb-4">
                                    <div v-for="fila in filasCategoria(categoria)" :key="fila.id"
                                        class="grid grid-cols-[1fr_auto] gap-4 px-1 py-2 odd:bg-black/10">
                                        <span class="text-[0.9rem] font-medium leading-tight">
                                            {{ fila.label }}
                                        </span>

                                        <span class="max-w-[170px] text-right text-[0.9rem] leading-tight">
                                            {{ fila.valor }}
                                        </span>
                                    </div>
                                </div>
                            </Transition>
                        </div>
                    </div>

                    <!-- BOTONES MÓVIL/TABLET -->
                    <div class="mt-12 flex flex-col gap-4 lg:hidden">
                        <button type="button"
                            class="h-12 rounded-full border-2 border-black px-8 text-[1rem] leading-none">
                            {{ t('fichaTecnica.acciones.descubreMas') }}
                        </button>

                        <button type="button"
                            class="h-12 rounded-full border-2 border-black px-8 text-[1rem] leading-none">
                            {{ t('fichaTecnica.acciones.fichaTecnica', { producto: bloque.producto.nombre }) }}
                        </button>
                    </div>
                </div>
            </article>

            <!-- SELECTOR DE COMPARACIÓN -->
            <div v-if="bloque.id === 'principal'" class="relative mt-20 w-full max-w-[340px] lg:mx-auto lg:mt-20">
                <button type="button"
                    class="flex h-12 w-full items-center justify-between rounded-full border-2 border-black px-8 text-[1rem] leading-none lg:max-w-[340px]"
                    @click="emit('alternarSelectorComparacion')">
                    <span>
                        {{
                            productoComparacion
                                ? productoComparacion.nombre
                                : t('fichaTecnica.acciones.seleccionaPantalla')
                        }}
                    </span>

                    <span class="text-[1.6rem] leading-none transition-transform duration-200"
                        :class="selectorComparacionAbierto ? 'rotate-180' : ''">
                        ⌄
                    </span>
                </button>

                <div v-if="selectorComparacionAbierto"
                    class="absolute left-0 top-[calc(100%+10px)] z-20 w-full rounded-[1.2rem] border border-black bg-[#eeeeee] py-4 text-center lg:left-1/2 lg:max-w-[300px] lg:-translate-x-1/2">
                    <button v-for="productoKey in opcionesSelectorComparacion" :key="productoKey" type="button"
                        class="block w-full py-2 text-[1rem]"
                        @click="emit('seleccionarProductoComparacion', productoKey)">
                        {{ productos[productoKey].nombre }}
                    </button>
                </div>
            </div>
        </template>
    </div>
</template>