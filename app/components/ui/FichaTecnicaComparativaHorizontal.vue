<script setup lang="ts">
import type {
    CategoriaTecnica,
    FilaTecnica,
    ProductoKey,
    ProductoTecnico
} from '~/data/fichasTecnicas'

type BloqueFichaId = 'principal' | 'comparacion'

interface Props {
    t: Function
    productos: Record<ProductoKey, ProductoTecnico>
    productoPrincipal: ProductoTecnico
    productoComparacion: ProductoTecnico | null
    opcionesSelectorPrincipal: ProductoKey[]
    opcionesSelectorComparacion: ProductoKey[]
    selectorPrincipalAbierto: boolean
    selectorComparacionAbierto: boolean
    acordeonAbierto: Record<BloqueFichaId | 'comparativa', string | null>
    categoriasComparativa: CategoriaTecnica[]
    filasCategoria: (categoria: CategoriaTecnica) => FilaTecnica[]
    valorComparativo: (producto: ProductoTecnico, categoriaId: string, filaId: string) => string
}

defineProps<Props>()

const emit = defineEmits<{
    alternarSelectorPrincipal: []
    alternarSelectorComparacion: []
    seleccionarProductoPrincipal: [producto: ProductoKey]
    seleccionarProductoComparacion: [producto: ProductoKey]
    alternarAcordeon: [bloqueId: 'comparativa', categoriaId: string]
}>()
</script>

<template>
    <div>
        <!-- BLOQUE SUPERIOR 1920:
        Dos pantallas lado a lado, pero sin duplicar los acordeones. -->
        <div class="mt-20 grid grid-cols-2 items-start gap-[6%]">

            <!-- COLUMNA PRINCIPAL -->
            <div class="flex flex-col items-center">
                <div class="relative w-[260px]">
                    <button type="button"
                        class="flex h-10 w-full items-center justify-between rounded-full border-2 border-black px-8 text-[0.95rem]"
                        @click="emit('alternarSelectorPrincipal')">
                        <span>{{ productoPrincipal.nombre }}</span>

                        <span class="text-[1.4rem] leading-none transition-transform duration-200"
                            :class="selectorPrincipalAbierto ? 'rotate-180' : ''">
                            ⌄
                        </span>
                    </button>

                    <div v-if="selectorPrincipalAbierto"
                        class="absolute left-0 top-[calc(100%+10px)] z-20 w-full rounded-[1.2rem] border border-black bg-[#eeeeee] py-4 text-center">
                        <button v-for="productoKey in opcionesSelectorPrincipal" :key="productoKey" type="button"
                            class="block w-full py-2 text-[1rem]"
                            @click="emit('seleccionarProductoPrincipal', productoKey)">
                            {{ productos[productoKey].nombre }}
                        </button>
                    </div>
                </div>

                <img :key="`principal-${productoPrincipal.nombre}-imagen`" :src="productoPrincipal.imagen"
                    :alt="productoPrincipal.alt" class="mt-8 w-[58%] max-w-[520px] object-contain">

                <div class="mt-8 flex w-[180px] flex-col gap-5">
                    <button type="button" class="h-10 rounded-full border-2 border-black text-[0.9rem]">
                        {{ t('fichaTecnica.acciones.descubreMas') }}
                    </button>

                    <button type="button" class="h-10 rounded-full border-2 border-black text-[0.9rem]">
                        {{ t('fichaTecnica.acciones.fichaTecnica', { producto: productoPrincipal.nombre }) }}
                    </button>
                </div>
            </div>

            <!-- COLUMNA COMPARACIÓN -->
            <div class="flex flex-col items-center">
                <div class="relative w-[260px]">
                    <button type="button"
                        class="flex h-10 w-full items-center justify-between rounded-full border-2 border-black px-8 text-[0.95rem]"
                        @click="emit('alternarSelectorComparacion')">
                        <span>
                            {{
                                productoComparacion
                                    ? productoComparacion.nombre
                                    : t('fichaTecnica.acciones.seleccionaPantalla')
                            }}
                        </span>

                        <span class="text-[1.4rem] leading-none transition-transform duration-200"
                            :class="selectorComparacionAbierto ? 'rotate-180' : ''">
                            ⌄
                        </span>
                    </button>

                    <div v-if="selectorComparacionAbierto"
                        class="absolute left-0 top-[calc(100%+10px)] z-20 w-full rounded-[1.2rem] border border-black bg-[#eeeeee] py-4 text-center">
                        <button v-for="productoKey in opcionesSelectorComparacion" :key="productoKey" type="button"
                            class="block w-full py-2 text-[1rem]"
                            @click="emit('seleccionarProductoComparacion', productoKey)">
                            {{ productos[productoKey].nombre }}
                        </button>
                    </div>
                </div>

                <template v-if="productoComparacion">
                    <img :key="`comparacion-${productoComparacion.nombre}-imagen`" :src="productoComparacion.imagen"
                        :alt="productoComparacion.alt" class="mt-8 w-[58%] max-w-[520px] object-contain">

                    <div class="mt-8 flex w-[180px] flex-col gap-5">
                        <button type="button" class="h-10 rounded-full border-2 border-black text-[0.9rem]">
                            {{ t('fichaTecnica.acciones.descubreMas') }}
                        </button>

                        <button type="button" class="h-10 rounded-full border-2 border-black text-[0.9rem]">
                            {{ t('fichaTecnica.acciones.fichaTecnica', { producto: productoComparacion.nombre }) }}
                        </button>
                    </div>
                </template>
            </div>
        </div>

        <!-- ACORDEONES COMPARATIVOS 1920:
        Un solo grupo, con valores en columnas. -->
        <div class="mt-16">
            <div class="flex flex-col">
                <div v-for="categoria in categoriasComparativa" :key="`comparativa-${categoria.id}`"
                    class="border-b-2 border-black">
                    <button type="button"
                        class="flex w-full items-center justify-between py-4 text-left text-[1.35rem] font-bold leading-tight"
                        @click="emit('alternarAcordeon', 'comparativa', categoria.id)">
                        <span>{{ categoria.titulo }}</span>

                        <span class="text-[1.7rem] leading-none transition-transform duration-200"
                            :class="acordeonAbierto.comparativa === categoria.id ? 'rotate-180' : ''">
                            ⌄
                        </span>
                    </button>

                    <Transition name="acordeon">
                        <div v-if="acordeonAbierto.comparativa === categoria.id" class="pb-4">
                            <div v-for="fila in filasCategoria(categoria)" :key="fila.id"
                                class="grid grid-cols-[35%_1fr_1fr] gap-[6%] px-1 py-2 odd:bg-black/10">
                                <span class="text-[0.95rem] font-bold leading-tight">
                                    {{ fila.label }}
                                </span>

                                <span class="text-[0.95rem] leading-tight">
                                    {{ valorComparativo(productoPrincipal, categoria.id, fila.id) }}
                                </span>

                                <span class="text-[0.95rem] leading-tight">
                                    <template v-if="productoComparacion">
                                        {{ valorComparativo(productoComparacion, categoria.id, fila.id) }}
                                    </template>
                                </span>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </div>
    </div>
</template>