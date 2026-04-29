<script setup lang="ts">
type ProductoKey = 'taurusV' | 'gemini'
type BloqueFichaId = 'principal' | 'comparacion'

interface FilaTecnica {
    id: string
    label: string
    valor: string
}

interface CategoriaTecnica {
    id: string
    titulo: string
    filas: Record<string, Omit<FilaTecnica, 'id'>>
}

interface ProductoTecnico {
    nombre: string
    imagen: string
    alt: string
    categorias: Record<string, Omit<CategoriaTecnica, 'id'>>
}

interface Props {
    productoInicial: ProductoKey
}

const props = defineProps<Props>()

const { t, tm, rt } = useI18n()

/* PRODUCTO PRINCIPAL:
   Es la pantalla desde la página donde entras.
   Ejemplo:
   - taurus-v.vue manda producto-inicial="taurusV"
   - gemini.vue mandaría producto-inicial="gemini" */
const productoPrincipalKey = ref<ProductoKey>(props.productoInicial)

/* PRODUCTO DE COMPARACIÓN:
   Empieza vacío. Hasta que el usuario no elija una pantalla abajo,
   no se pinta la segunda ficha técnica. */
const productoComparacionKey = ref<ProductoKey | ''>('')

/* ESTADO DE LOS SELECTORES:
   Controlan si el desplegable de selección está abierto o cerrado. */
const selectorPrincipalAbierto = ref(false)
const selectorComparacionAbierto = ref(false)

/* ESTADO DE LOS ACORDEONES:
   Guardo un acordeón abierto por cada bloque.
   Así la ficha principal y la ficha comparada no se pisan entre ellas. */
const acordeonAbierto = ref<Record<BloqueFichaId, string | null>>({
    principal: null,
    comparacion: null
})

/* DATOS DESDE JSON:
   Aquí está la gracia reutilizable:
   el componente no tiene escritos los datos de Taurus ni Gemini dentro del template.
   Los lee del JSON según el producto seleccionado. */
const productos = computed<Record<ProductoKey, ProductoTecnico>>(() => {
    return tm('fichaTecnica.productos') as Record<ProductoKey, ProductoTecnico>
})

/* Cuando se usa tm(), algunos textos vienen como objeto interno de i18n.
   rt() los convierte a texto normal para que no aparezca el JSON raro en pantalla. */
function texto(valor: unknown) {
    if (valor === null || valor === undefined) {
        return ''
    }
    return rt(valor as string)
}

const productoPrincipal = computed(() => {
    return productos.value[productoPrincipalKey.value]
})

const productoComparacion = computed(() => {
    if (!productoComparacionKey.value) {
        return null
    }

    return productos.value[productoComparacionKey.value]
})

/* SELECTOR SUPERIOR:
   Si estoy viendo Taurus-V, solo ofrezco Gemini.
   Si estoy viendo Gemini, solo ofrezco Taurus-V. */
const opcionesSelectorPrincipal = computed<ProductoKey[]>(() => {
    return productoPrincipalKey.value === 'taurusV'
        ? ['gemini']
        : ['taurusV']
})

/* SELECTOR INFERIOR:
   Este sirve para comparar, por eso tiene todas las opciones. */
const opcionesSelectorComparacion = computed<ProductoKey[]>(() => {
    return ['taurusV', 'gemini']
})

/* BLOQUES VISIBLES:
   Este computed evita duplicar toda la ficha técnica dos veces en el template.
   Siempre pinta el bloque principal.
   Si el usuario elige una comparación, añade un segundo bloque debajo. */
const bloquesFicha = computed(() => {
    const bloques = []

    // Always the principal
    if (productoPrincipal.value) {
        bloques.push({
            id: 'principal' as BloqueFichaId,
            productoKey: productoPrincipalKey.value,
            producto: productoPrincipal.value
        })
    }

    // The second block ONLY if there is a comparison key selected
    if (productoComparacionKey.value && productos.value[productoComparacionKey.value]) {
        bloques.push({
            id: 'comparacion' as BloqueFichaId,
            productoKey: productoComparacionKey.value as ProductoKey,
            producto: productos.value[productoComparacionKey.value]
        })
    }

    return bloques
})

const productosComparativa = computed(() => {
    const productosParaComparar = [
        {
            id: 'principal' as BloqueFichaId,
            productoKey: productoPrincipalKey.value,
            producto: productoPrincipal.value
        }
    ]
    if (productoComparacion.value && productoComparacionKey.value) {
        productosParaComparar.push({
            id: 'comparacion' as BloqueFichaId,
            productoKey: productoComparacionKey.value as ProductoKey,
            producto: productoComparacion.value
        })
    }
    return productosParaComparar
})

const categoriasComparativa = computed(() => {
    if (!productoPrincipal.value) {
        return []
    }
    return categoriasProducto(productoPrincipal.value)
})

function valorComparativo(producto: ProductoTecnico, categoriaId: string, filaId: string) {
    const categoria = producto.categorias[categoriaId]
    const fila = categoria?.filas[filaId]

    return fila ? texto(fila.valor) : ''
}


function seleccionarProductoPrincipal(producto: ProductoKey) {
    productoPrincipalKey.value = producto
    selectorPrincipalAbierto.value = false
    selectorComparacionAbierto.value = false
}

function seleccionarProductoComparacion(producto: ProductoKey) {
    productoComparacionKey.value = producto
    selectorComparacionAbierto.value = false
    selectorPrincipalAbierto.value = false
}

function alternarSelectorPrincipal() {
    selectorPrincipalAbierto.value = !selectorPrincipalAbierto.value
    selectorComparacionAbierto.value = false
}

function alternarSelectorComparacion() {
    selectorComparacionAbierto.value = !selectorComparacionAbierto.value
    selectorPrincipalAbierto.value = false
}

function alternarAcordeon(bloqueId: BloqueFichaId, categoriaId: string) {
    acordeonAbierto.value[bloqueId] =
        acordeonAbierto.value[bloqueId] === categoriaId ? null : categoriaId
}

function categoriasProducto(producto: ProductoTecnico): CategoriaTecnica[] {
    return Object.entries(producto.categorias).map(([id, categoria]) => {
        return {
            id,
            ...categoria
        }
    })
}

function filasCategoria(categoria: CategoriaTecnica): FilaTecnica[] {
    return Object.entries(categoria.filas).map(([id, fila]) => {
        return {
            id,
            ...fila
        }
    })
}
</script>

<template>
    <!-- SECCIÓN GENERAL:
    Aquí vive toda la ficha comparativa completa. -->
    <section class="w-full bg-[#eeeeee] px-6 py-14 text-black md:px-10 lg:px-[7%]">
        <!-- CONTENEDOR INTERNO:
        Controla el ancho máximo de toda la sección. -->
        <div class="mx-auto w-full max-w-[1280px]">

            <!-- CABECERA:
            Título principal de la sección. -->
            <header class="max-w-[330px] md:max-w-[520px] lg:mx-auto lg:max-w-none lg:text-center">
                <h2 class="text-[2rem] font-bold leading-tight md:text-[3rem] lg:text-[2rem] xl:text-[2.4rem]">
                    {{ t('fichaTecnica.heading.line1') }}<br>
                    {{ t('fichaTecnica.heading.line2') }}
                    <span
                        class="bg-gradient-to-r from-[#DD2211] via-[#664090] to-[#0EA3A9] bg-clip-text text-transparent">
                        {{ t('fichaTecnica.heading.highlight') }}
                    </span>
                </h2>
            </header>

            <!-- SELECTOR PRINCIPAL:
            Muestra la pantalla actual y permite cambiarla. -->
            <div class="relative mt-16 w-full max-w-[340px] lg:mx-auto lg:mt-14 min-[1920px]:hidden">
                <button type="button"
                    class="flex h-12 w-full items-center justify-between rounded-full border-2 border-black px-8 text-[1rem] leading-none lg:max-w-[300px]"
                    @click="alternarSelectorPrincipal">
                    <span>
                        {{ texto(productoPrincipal.nombre) }}
                    </span>

                    <span class="text-[1.6rem] leading-none transition-transform duration-200"
                        :class="selectorPrincipalAbierto ? 'rotate-180' : ''">
                        ⌄
                    </span>
                </button>

                <!-- MENÚ DEL SELECTOR PRINCIPAL -->
                <div v-if="selectorPrincipalAbierto"
                    class="absolute left-0 top-[calc(100%+10px)] z-20 w-full rounded-[1.2rem] border border-black bg-[#eeeeee] py-4 text-center">
                    <button v-for="productoKey in opcionesSelectorPrincipal" :key="productoKey" type="button"
                        class="block w-full py-2 text-[1rem]" @click="seleccionarProductoPrincipal(productoKey)">
                        {{ texto(productos[productoKey].nombre) }}
                    </button>
                </div>
            </div>

            <!-- LAYOUT 1920:
dos pantallas arriba, una al lado de la otra -->
            <div
                class="mt-20 hidden min-[1920px]:grid min-[1920px]:grid-cols-2 min-[1920px]:items-start min-[1920px]:gap-[6%]">
                <!-- COLUMNA PRINCIPAL -->
                <div class="flex flex-col items-center">
                    <div class="relative w-[260px]">
                        <button type="button"
                            class="flex h-10 w-full items-center justify-between rounded-full border-2 border-black px-8 text-[0.95rem]"
                            @click="alternarSelectorPrincipal">
                            <span>{{ texto(productoPrincipal.nombre) }}</span>
                            <span class="text-[1.4rem]" :class="selectorPrincipalAbierto ? 'rotate-180' : ''">⌄</span>
                        </button>

                        <div v-if="selectorPrincipalAbierto"
                            class="absolute left-0 top-[calc(100%+10px)] z-20 w-full rounded-[1.2rem] border border-black bg-[#eeeeee] py-4 text-center">
                            <button v-for="productoKey in opcionesSelectorPrincipal" :key="productoKey" type="button"
                                class="block w-full py-2 text-[1rem]"
                                @click="seleccionarProductoPrincipal(productoKey)">
                                {{ texto(productos[productoKey].nombre) }}
                            </button>
                        </div>
                    </div>

                    <img :src="texto(productoPrincipal.imagen)" :alt="texto(productoPrincipal.alt)"
                        class="mt-8 w-[58%] max-w-[520px] object-contain">

                    <div class="mt-8 flex w-[180px] flex-col gap-5">
                        <button type="button" class="h-10 rounded-full border-2 border-black text-[0.9rem]">
                            {{ t('fichaTecnica.acciones.descubreMas') }}
                        </button>

                        <button type="button" class="h-10 rounded-full border-2 border-black text-[0.9rem]">
                            {{ t('fichaTecnica.acciones.fichaTecnica', { producto: texto(productoPrincipal.nombre) }) }}
                        </button>
                    </div>
                </div>

                <!-- COLUMNA COMPARACIÓN -->
                <div class="flex flex-col items-center">
                    <div class="relative w-[260px]">
                        <button type="button"
                            class="flex h-10 w-full items-center justify-between rounded-full border-2 border-black px-8 text-[0.95rem]"
                            @click="alternarSelectorComparacion">
                            <span>
                                {{
                                    productoComparacion
                                        ? texto(productoComparacion.nombre)
                                        : t('fichaTecnica.acciones.seleccionaPantalla')
                                }}
                            </span>
                            <span class="text-[1.4rem]" :class="selectorComparacionAbierto ? 'rotate-180' : ''">⌄</span>
                        </button>

                        <div v-if="selectorComparacionAbierto"
                            class="absolute left-0 top-[calc(100%+10px)] z-20 w-full rounded-[1.2rem] border border-black bg-[#eeeeee] py-4 text-center">
                            <button v-for="productoKey in opcionesSelectorComparacion" :key="productoKey" type="button"
                                class="block w-full py-2 text-[1rem]"
                                @click="seleccionarProductoComparacion(productoKey)">
                                {{ texto(productos[productoKey].nombre) }}
                            </button>
                        </div>
                    </div>

                    <template v-if="productoComparacion">
                        <img :src="texto(productoComparacion.imagen)" :alt="texto(productoComparacion.alt)"
                            class="mt-8 w-[58%] max-w-[520px] object-contain">

                        <div class="mt-8 flex w-[180px] flex-col gap-5">
                            <button type="button" class="h-10 rounded-full border-2 border-black text-[0.9rem]">
                                {{ t('fichaTecnica.acciones.descubreMas') }}
                            </button>

                            <button type="button" class="h-10 rounded-full border-2 border-black text-[0.9rem]">
                                {{ t('fichaTecnica.acciones.fichaTecnica', {
                                    producto: texto(productoComparacion.nombre)
                                }) }}
                            </button>
                        </div>
                    </template>
                </div>
            </div>

            <!-- BLOQUES DE FICHA:
            Este v-for pinta:
            1. La ficha principal.
            2. La ficha comparada, solo si el usuario seleccionó una pantalla abajo. -->
            <template v-for="bloque in bloquesFicha" :key="`${bloque.id}-${bloque.productoKey}`">
                <!-- FICHA TÉCNICA:
                Misma estructura para Taurus-V, Gemini o cualquier producto futuro. -->

                <article class="mt-16 flex flex-col items-center lg:mt-14 min-[1920px]:hidden">
                    <!-- IMAGEN DESKTOP:
    desde 1024px se muestra centrada, como en la referencia -->
                    <div class="hidden w-full justify-center lg:flex min-[1920px]:hidden">
                        <div class="w-[36%] max-w-[360px]">
                            <img :key="`${bloque.id}-${bloque.productoKey}-imagen`" :src="texto(bloque.producto.imagen)"
                                :alt="texto(bloque.producto.alt)" class="w-full object-contain">
                        </div>
                    </div>

                    <!-- BOTONES DESKTOP:
    en desktop van debajo de la imagen y antes de los acordeones -->
                    <div class="mt-14 hidden w-[28%] max-w-[260px] flex-col gap-4 lg:flex min-[1920px]:hidden">
                        <slot name="acciones" :producto="bloque.producto">
                            <button type="button"
                                class="h-12 rounded-full border-2 border-black px-8 text-[1rem] leading-none">
                                {{ t('fichaTecnica.acciones.descubreMas') }}
                            </button>

                            <button type="button"
                                class="h-12 rounded-full border-2 border-black px-8 text-[1rem] leading-none">
                                {{ t('fichaTecnica.acciones.fichaTecnica', {
                                    producto: texto(bloque.producto.nombre)
                                }) }}
                            </button>
                        </slot>
                    </div>

                    <!-- ACORDEONES TÉCNICOS:
    en desktop bajan debajo de imagen + botones, no van a la derecha -->
                    <div class="mt-14 w-full lg:w-[70%] min-[1920px]:w-full">
                        <div class="flex flex-col">
                            <div v-for="categoria in categoriasProducto(bloque.producto)"
                                :key="`${bloque.id}-${bloque.productoKey}-${categoria.id}`"
                                class="border-b-2 border-black">

                                <button type="button"
                                    class="flex w-full items-center justify-between py-3 text-left text-[1.2rem] font-bold leading-tight xl:text-[1.35rem]"
                                    @click="alternarAcordeon(bloque.id, categoria.id)">
                                    <span>
                                        {{ texto(categoria.titulo) }}
                                    </span>

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
                                                {{ texto(fila.label) }}
                                            </span>

                                            <span class="max-w-[170px] text-right text-[0.9rem] leading-tight">
                                                {{ texto(fila.valor) }}
                                            </span>
                                        </div>
                                    </div>
                                </Transition>
                            </div>
                        </div>

                        <!-- BOTONES MÓVIL/TABLET:
        en desktop se ocultan porque ya están debajo de la imagen -->
                        <div class="mt-12 flex flex-col gap-4 lg:hidden">
                            <slot name="acciones" :producto="bloque.producto">
                                <button type="button"
                                    class="h-12 rounded-full border-2 border-black px-8 text-[1rem] leading-none">
                                    {{ t('fichaTecnica.acciones.descubreMas') }}
                                </button>

                                <button type="button"
                                    class="h-12 rounded-full border-2 border-black px-8 text-[1rem] leading-none">
                                    {{ t('fichaTecnica.acciones.fichaTecnica', {
                                        producto: texto(bloque.producto.nombre)
                                    }) }}
                                </button>
                            </slot>
                        </div>
                    </div>
                </article>

                <!-- SELECTOR DE COMPARACIÓN:
                Solo se coloca después de la ficha principal.
                Si el usuario elige una pantalla, bloquesFicha añade la segunda ficha debajo. -->
                <div v-if="bloque.id === 'principal'"
                    class="relative mt-20 w-full max-w-[340px] lg:mx-auto lg:mt-20 min-[1920px]:hidden">
                    <button type="button"
                        class="flex h-12 w-full items-center justify-between rounded-full border-2 border-black px-8 text-[1rem] leading-none lg:max-w-[340px]"
                        @click="alternarSelectorComparacion">
                        <span>
                            {{
                                productoComparacion
                                    ? texto(productoComparacion.nombre)
                                    : t('fichaTecnica.acciones.seleccionaPantalla')
                            }}
                        </span>

                        <span class="text-[1.6rem] leading-none transition-transform duration-200"
                            :class="selectorComparacionAbierto ? 'rotate-180' : ''">
                            ⌄
                        </span>
                    </button>

                    <!-- MENÚ DEL SELECTOR DE COMPARACIÓN -->
                    <div v-if="selectorComparacionAbierto"
                        class="absolute left-0 top-[calc(100%+10px)] z-20 w-full rounded-[1.2rem] border border-black bg-[#eeeeee] py-4 text-center lg:left-1/2 lg:max-w-[300px] lg:-translate-x-1/2">
                        <button v-for="productoKey in opcionesSelectorComparacion" :key="productoKey" type="button"
                            class="block w-full py-2 text-[1rem]" @click="seleccionarProductoComparacion(productoKey)">
                            {{ texto(productos[productoKey].nombre) }}
                        </button>
                    </div>
                </div>
            </template>
            <!-- ACORDEONES COMPARATIVOS 1920:
un solo grupo de desplegables.
Dentro de cada fila se muestra el dato de cada pantalla en columnas. -->
            <div class="mt-16 hidden min-[1920px]:block">
                <div class="flex flex-col">
                    <div v-for="categoria in categoriasComparativa" :key="`comparativa-${categoria.id}`"
                        class="border-b-2 border-black">

                        <!-- cabecera del acordeón comparativo -->
                        <button type="button"
                            class="flex w-full items-center justify-between py-4 text-left text-[1.35rem] font-bold leading-tight"
                            @click="alternarAcordeon('principal', categoria.id)">
                            <span>
                                {{ texto(categoria.titulo) }}
                            </span>

                            <span class="text-[1.7rem] leading-none transition-transform duration-200"
                                :class="acordeonAbierto.principal === categoria.id ? 'rotate-180' : ''">
                                ⌄
                            </span>
                        </button>

                        <!-- contenido comparativo -->
                        <Transition name="acordeon">
                            <div v-if="acordeonAbierto.principal === categoria.id" class="pb-4">
                                <div v-for="fila in filasCategoria(categoria)" :key="fila.id"
                                    class="grid grid-cols-[35%_1fr_1fr] gap-[6%] px-1 py-2 odd:bg-black/10">

                                    <!-- nombre de la característica -->
                                    <span class="text-[0.95rem] font-bold leading-tight">
                                        {{ texto(fila.label) }}
                                    </span>

                                    <!-- valor de la pantalla principal -->
                                    <span class="text-[0.95rem] leading-tight">
                                        {{ valorComparativo(productoPrincipal, categoria.id, fila.id) }}
                                    </span>

                                    <!-- valor de la pantalla comparada -->
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
    </section>
</template>

<style scoped>
.acordeon-enter-active,
.acordeon-leave-active {
    overflow: hidden;
    transition: all 0.25s ease;
}

.acordeon-enter-from,
.acordeon-leave-to {
    max-height: 0;
    opacity: 0;
}

.acordeon-enter-to,
.acordeon-leave-from {
    max-height: 800px;
    opacity: 1;
}
</style>