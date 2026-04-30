<script setup lang="ts">
import {
    fichasTecnicas,
    type CategoriaTecnica,
    type FilaTecnica,
    type ProductoKey,
    type ProductoTecnico
} from '~/data/fichasTecnicas'

type BloqueFichaId = 'principal' | 'comparacion'

interface BloqueFicha {
    id: BloqueFichaId
    productoKey: ProductoKey
    producto: ProductoTecnico
}

interface Props {
    productoInicial: ProductoKey
}

const props = defineProps<Props>()

const { t } = useI18n()

/* PRODUCTO PRINCIPAL:
   Es la pantalla base según la página desde la que entra el usuario. */
const productoPrincipalKey = ref<ProductoKey>(props.productoInicial)

/* PRODUCTO DE COMPARACIÓN:
   Empieza vacío para no pintar una segunda ficha hasta que el usuario elija una pantalla. */
const productoComparacionKey = ref<ProductoKey | ''>('')

/* SELECTORES:
   Se controlan desde el padre para que vertical y horizontal compartan estado. */
const selectorPrincipalAbierto = ref(false)
const selectorComparacionAbierto = ref(false)

/* ACORDEONES:
   - principal y comparacion sirven para la vista vertical.
   - comparativa sirve para la tabla única de 1920. */
const acordeonAbierto = ref<Record<BloqueFichaId | 'comparativa', string | null>>({
    principal: null,
    comparacion: null,
    comparativa: null
})

/* DATOS TÉCNICOS:
   Ya no vienen de i18n. Ahora vienen del fichero app/data/fichasTecnicas.ts. */
const productos = fichasTecnicas

const productoPrincipal = computed(() => {
    return productos[productoPrincipalKey.value]
})

const productoComparacion = computed(() => {
    if (!productoComparacionKey.value) {
        return null
    }

    return productos[productoComparacionKey.value]
})

const opcionesSelectorPrincipal = computed<ProductoKey[]>(() => {
    return productoPrincipalKey.value === 'taurusV'
        ? ['gemini']
        : ['taurusV']
})

const opcionesSelectorComparacion = computed<ProductoKey[]>(() => {
    return ['taurusV', 'gemini']
})

const bloquesFicha = computed<BloqueFicha[]>(() => {
    const bloques: BloqueFicha[] = [
        {
            id: 'principal',
            productoKey: productoPrincipalKey.value,
            producto: productoPrincipal.value
        }
    ]

    if (productoComparacionKey.value && productos[productoComparacionKey.value]) {
        bloques.push({
            id: 'comparacion',
            productoKey: productoComparacionKey.value,
            producto: productos[productoComparacionKey.value]
        })
    }

    return bloques
})

const categoriasComparativa = computed(() => {
    return categoriasProducto(productoPrincipal.value)
})

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

function alternarAcordeon(bloqueId: BloqueFichaId | 'comparativa', categoriaId: string) {
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

function valorComparativo(producto: ProductoTecnico, categoriaId: string, filaId: string) {
    const categoria = producto.categorias[categoriaId]
    const fila = categoria?.filas[filaId]

    return fila ? fila.valor : ''
}
</script>

<template>
    <section class="w-full bg-[#eeeeee] px-6 py-14 text-black md:px-10 lg:px-[7%]">
        <div class="mx-auto w-full max-w-[1280px] min-[1920px]:max-w-[1600px]">

            <!-- CABECERA GENERAL -->
            <header class="max-w-[330px] md:max-w-[520px] lg:mx-auto lg:max-w-none lg:text-center">
                <h2
                    class="text-[2rem] font-bold leading-tight md:text-[3rem] lg:text-[2rem] xl:text-[2.4rem] min-[1920px]:text-[3rem]">
                    {{ t('fichaTecnica.heading.line1') }}<br>
                    {{ t('fichaTecnica.heading.line2') }}
                    <span
                        class="bg-gradient-to-r from-[#DD2211] via-[#664090] to-[#0EA3A9] bg-clip-text text-transparent">
                        {{ t('fichaTecnica.heading.highlight') }}
                    </span>
                </h2>
            </header>

            <!-- DISEÑO 375 - 1512 -->
            <UiFichaTecnicaComparativaVertical class="min-[1920px]:hidden" :t="t" :productos="productos"
                :bloques-ficha="bloquesFicha" :producto-principal="productoPrincipal"
                :producto-comparacion="productoComparacion" :opciones-selector-principal="opcionesSelectorPrincipal"
                :opciones-selector-comparacion="opcionesSelectorComparacion"
                :selector-principal-abierto="selectorPrincipalAbierto"
                :selector-comparacion-abierto="selectorComparacionAbierto" :acordeon-abierto="acordeonAbierto"
                :categorias-producto="categoriasProducto" :filas-categoria="filasCategoria"
                @alternar-selector-principal="alternarSelectorPrincipal"
                @alternar-selector-comparacion="alternarSelectorComparacion"
                @seleccionar-producto-principal="seleccionarProductoPrincipal"
                @seleccionar-producto-comparacion="seleccionarProductoComparacion"
                @alternar-acordeon="alternarAcordeon" />

            <!-- DISEÑO 1920 -->
            <UiFichaTecnicaComparativaHorizontal class="hidden min-[1920px]:block" :t="t" :productos="productos"
                :producto-principal="productoPrincipal" :producto-comparacion="productoComparacion"
                :opciones-selector-principal="opcionesSelectorPrincipal"
                :opciones-selector-comparacion="opcionesSelectorComparacion"
                :selector-principal-abierto="selectorPrincipalAbierto"
                :selector-comparacion-abierto="selectorComparacionAbierto" :acordeon-abierto="acordeonAbierto"
                :categorias-comparativa="categoriasComparativa" :filas-categoria="filasCategoria"
                :valor-comparativo="valorComparativo" @alternar-selector-principal="alternarSelectorPrincipal"
                @alternar-selector-comparacion="alternarSelectorComparacion"
                @seleccionar-producto-principal="seleccionarProductoPrincipal"
                @seleccionar-producto-comparacion="seleccionarProductoComparacion"
                @alternar-acordeon="alternarAcordeon" />
        </div>
    </section>
</template>

<style>
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