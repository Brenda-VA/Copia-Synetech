<script setup lang="ts">
import { ref, watch, onBeforeUnmount, computed } from 'vue'
import type {
  NavbarItem,
  NavbarDropdownItem,
  NavbarIdiomaItem
} from '~/types/navbar'

// estado
// aquí guardamos qué cosas están abiertas o cerradas
// en esta fase solo ordenamos el shape y los estados, i18n vendra despues
const menuAbierto = ref<boolean>(false)
const menuActivo = ref<string | null>(null)
const submenuMovilActivo = ref<string | null>(null)

// datos del navbar
/* en vez de escribir los links uno por uno en el template, se guardan aquí como datos en arrays y luego se pintan con v-for 
además ahora hay una sola fuente para escritorio y móvil.
cada item decide si es link, dropdown o idioma y si tiene desplegable, también guarda aquí sus bloques internos
en esta fase sigue dentro del SFC para no mezclar tipado e i18n con mover datos fuera */
const enlacesNavbar: NavbarItem[] = [
  {
    id: 1,
    texto: 'Pantallas Interactivas',
    href: '#',
    tipo: 'dropdown',
    clave: 'pantallas',
    maxWidth: 'max-w-[860px]',
    bloques: [
      {
        titulo: 'Pantallas Interactivas',
        estilo: 'destacado',
        links: ['Piscis', 'Taurus', 'Gemini']
      },
      {
        titulo: 'Software Educativo',
        estilo: 'destacado',
        links: ['Synetech Class', 'Synetech OS', 'Synetech DMS', 'Synetech Share']
      },
      {
        titulo: 'Inteligencia Artificial',
        estilo: 'destacado',
        links: ['Synetech IA']
      }
    ]
  },
  {
    id: 2,
    texto: 'Pantallas LED',
    href: '#',
    tipo: 'link'
  },
  {
    id: 3,
    texto: 'Soporte',
    href: '#',
    tipo: 'dropdown',
    clave: 'soporte',
    maxWidth: 'max-w-[860px]',
    bloques: [
      {
        titulo: 'Descargas',
        estilo: 'normal',
        links: ['Pantallas Interactivas']
      },
      {
        titulo: 'Te ayudamos',
        estilo: 'normal',
        links: ['Contacta con soporte', 'Reparación de pantallas LED']
      },
      {
        titulo: 'Información adicional',
        estilo: 'normal',
        links: ['Garantía', 'Comprueba la cobertura']
      }
    ]
  },
  {
    id: 4,
    texto: 'EdBlog',
    href: '#',
    tipo: 'link'
  },
  {
    id: 5,
    texto: 'Solicita una Demo',
    href: '#',
    tipo: 'link'
  },
  {
    id: 6,
    texto: 'Idioma',
    tipo: 'idioma',
    clave: 'idioma',
    maxWidth: 'max-w-[280px]',
    bloques: [
      {
        titulo: 'Elige tu idioma',
        estilo: 'normal',
        links: ['Español', 'English', 'Deutsch']
      }
    ]
  }
]

// helpers de tipo
// link, dropdown e idioma no tienen el mismo shape
// por eso tipo manda que propiedades puedo usar en cada caso
function tieneDesplegable(enlace: NavbarItem): enlace is NavbarDropdownItem | NavbarIdiomaItem {
  return enlace.tipo !== 'link'
}

function obtenerLinksIdioma(enlace: NavbarItem): string[] {
  return enlace.tipo === 'idioma' ? enlace.bloques[0]?.links ?? [] : []
}

// computed
/* aquí saco el dropdown activo de escritorio a partir del mismo array.
así ya no necesito otro objeto separado solo para escritorio. */
const dropdownActivoEscritorio = computed<NavbarDropdownItem | NavbarIdiomaItem | null>(() => {
  if (!menuActivo.value) {
    return null
  }

  return enlacesNavbar.find((enlace): enlace is NavbarDropdownItem | NavbarIdiomaItem => {
    return tieneDesplegable(enlace) && enlace.clave === menuActivo.value
  }) ?? null
})

// funciones de control
function alternarMenu() {
  menuAbierto.value = !menuAbierto.value

  if (!menuAbierto.value) {
    submenuMovilActivo.value = null
  }
}

function cerrarMenu() {
  menuAbierto.value = false
  submenuMovilActivo.value = null
}

function abrirDropdown(nombre: string) {
  menuActivo.value = nombre
}

function cerrarDropdown() {
  menuActivo.value = null
}

function alternarSubmenuMovil(nombre: string) {
  submenuMovilActivo.value = submenuMovilActivo.value === nombre ? null : nombre
}

function manejarMouseEnter(enlace: NavbarItem) {
  if (tieneDesplegable(enlace)) {
    abrirDropdown(enlace.clave)
  }
}

// bloqueo del scroll del body cuando el menú móvil está abierto
// esto evita que el fondo de la página siga moviéndose detrás
watch(menuAbierto, (abierto) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = abierto ? 'hidden' : ''
  }
})

// limpieza
// si el componente se desmonta, devolvemos el scroll a la normalidad
onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})

</script>

<template>
  <header
    class="sticky top-0 z-50 bg-[#2D2D2D]"
    @mouseleave="cerrarDropdown"
  >
    <nav
      class="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-6 lg:px-8"
      aria-label="Navegación principal"
    >
      <!-- logo -->
      <a href="#" class="flex shrink-0 items-center">
        <img
          src="/imagenes/logo-synetech-blanco.png"
          alt="Logo Synetech"
          class="h-[12px] w-auto sm:h-[13px] lg:h-[14px]"
        >
      </a>

      <!-- escritorio / tablet grande -->
      <!-- aquí todo sale del mismo array -->
      <ul class="hidden items-center gap-7 text-sm font-medium text-white/90 lg:flex xl:gap-8">
        <li
          v-for="enlace in enlacesNavbar"
          :key="enlace.id"
          class="relative"
          @mouseenter="manejarMouseEnter(enlace)"
        >
          <!-- link normal -->
          <a
            v-if="enlace.tipo === 'link'"
            :href="enlace.href"
            class="border-b border-transparent pb-1 transition duration-200 hover:border-white hover:text-white"
          >
            {{ enlace.texto }}
          </a>

          <!-- link con dropdown -->
          <a
            v-else-if="enlace.tipo === 'dropdown'"
            :href="enlace.href"
            class="border-b border-transparent pb-1 transition duration-200 hover:border-white hover:text-white"
          >
            {{ enlace.texto }}
          </a>

          <!-- botón idioma con icono -->
          <button
            v-else
            type="button"
            class="flex items-center justify-center border-b border-transparent pb-1 text-white transition duration-200 hover:border-white hover:text-white"
            aria-label="Cambiar idioma"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="h-[22px] w-[22px]"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3a15 15 0 0 1 0 18" />
              <path d="M12 3a15 15 0 0 0 0 18" />
            </svg>
          </button>
        </li>
      </ul>

      <!-- botón móvil / tablet pequeña -->
      <button
        type="button"
        class="relative inline-flex h-[38px] w-[38px] items-center justify-center text-white lg:hidden"
        :aria-expanded="menuAbierto ? 'true' : 'false'"
        aria-controls="menu-movil"
        aria-label="Abrir o cerrar menú"
        @click="alternarMenu"
      >
        <span class="sr-only">{{ menuAbierto ? 'Cerrar menú' : 'Abrir menú' }}</span>

        <span class="relative block h-[14px] w-[20px]">
          <span class="absolute left-0 top-0 block h-[1.4px] w-full bg-white"></span>
          <span class="absolute left-0 bottom-0 block h-[1.4px] w-full bg-white"></span>
        </span>
      </button>
    </nav>

    <!-- dropdown escritorio genérico -->
    <div
      v-if="dropdownActivoEscritorio"
      class="hidden bg-[#2D2D2D] lg:block"
      @mouseenter="abrirDropdown(dropdownActivoEscritorio.clave)"
    >
      <div class="mx-auto max-w-[1400px] px-5 py-12 md:px-6 lg:px-8 xl:py-14">
        <div
          :class="[
            dropdownActivoEscritorio.maxWidth,
            dropdownActivoEscritorio.bloques.length > 1
              ? 'grid grid-cols-3 gap-x-14 xl:gap-x-16'
              : ''
          ]"
        >
          <div
            v-for="bloque in dropdownActivoEscritorio.bloques"
            :key="bloque.titulo || bloque.links[0]"
          >
            <p
              v-if="bloque.titulo"
              class="text-[1rem] font-normal text-white/55"
            >
              {{ bloque.titulo }}
            </p>

            <ul class="mt-9 space-y-4 text-[1rem] font-normal text-white">
              <li
                v-for="link in bloque.links"
                :key="link"
              >
                <a
                  href="#"
                  class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
                >
                  {{ link }}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- desplegable móvil / tablet pequeña -->
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      leave-active-class="transition-all duration-250 ease-in"
      enter-from-class="-translate-x-16 opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="-translate-x-16 opacity-0"
    >
      <div
        v-if="menuAbierto"
        class="fixed inset-x-0 bottom-0 top-[70px] z-[40] overflow-hidden lg:hidden md:top-[74px]"
      >
        <div
          id="menu-movil"
          class="h-full w-full overflow-hidden border-t border-white/10 bg-[linear-gradient(180deg,rgba(48,48,48,0.985)_0%,rgba(40,40,40,0.975)_100%)] text-white shadow-[0_22px_50px_rgba(0,0,0,0.26)]"
        >
          <div class="relative">
            <div class="pointer-events-none absolute inset-0 overflow-hidden">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_65%_28%,rgba(255,255,255,0.06),transparent_22%),radial-gradient(circle_at_55%_58%,rgba(255,255,255,0.03),transparent_26%)]"></div>
            </div>

            <div class="relative z-10 h-full overflow-y-auto px-6 pb-10 pt-10 md:px-8 md:pt-12">
              <!-- aquí también pintamos todo desde el mismo array -->
              <ul class="flex flex-col gap-7 md:gap-8">
                <li
                  v-for="enlace in enlacesNavbar"
                  :key="enlace.id"
                >
                  <!-- link normal -->
                  <a
                    v-if="enlace.tipo === 'link'"
                    :href="enlace.href"
                    class="block"
                    @click="cerrarMenu"
                  >
                    <span class="block text-[18px] font-semibold tracking-[-0.02em] text-white md:text-[19px]">
                      {{ enlace.texto }}
                    </span>
                    <span class="mt-[18px] block h-px w-full bg-white/60"></span>
                  </a>

                  <!-- dropdown móvil normal -->
                  <template v-else-if="enlace.tipo === 'dropdown'">
                    <button
                      type="button"
                      class="block w-full text-left"
                      @click="alternarSubmenuMovil(enlace.clave)"
                    >
                      <span class="block text-[18px] font-semibold tracking-[-0.02em] text-white md:text-[19px]">
                        {{ enlace.texto }}
                      </span>
                      <span class="mt-[18px] block h-px w-full bg-white/60"></span>
                    </button>

                    <Transition
                      enter-active-class="transition-all duration-300 ease-out"
                      leave-active-class="transition-all duration-220 ease-in"
                      enter-from-class="opacity-0"
                      enter-to-class="opacity-100"
                      leave-from-class="opacity-100"
                      leave-to-class="opacity-0"
                    >
                      <div
                        v-if="submenuMovilActivo === enlace.clave"
                        class="overflow-hidden pt-6"
                      >
                        <Transition
                          appear
                          enter-active-class="transition-all duration-300 ease-out"
                          leave-active-class="transition-all duration-220 ease-in"
                          enter-from-class="-translate-x-8 opacity-0"
                          enter-to-class="translate-x-0 opacity-100"
                          leave-from-class="translate-x-0 opacity-100"
                          leave-to-class="-translate-x-6 opacity-0"
                        >
                          <div class="px-0 py-[2px]">
                            <div class="space-y-9">
                              <div
                                v-for="bloque in enlace.bloques"
                                :key="bloque.titulo || bloque.links[0]"
                              >
                                <p
                                  v-if="bloque.titulo"
                                  class="mb-2 text-[13px] font-bold leading-[1.2] text-white/60 md:mb-[10px] md:text-[14px]"
                                >
                                  {{ bloque.titulo }}
                                </p>

                                <ul
                                  class="flex flex-col"
                                  :class="bloque.estilo === 'normal' ? 'gap-2' : 'gap-1'"
                                >
                                  <li
                                    v-for="link in bloque.links"
                                    :key="link"
                                  >
                                    <a
                                      href="#"
                                      class="inline-block border-b border-transparent text-white transition duration-200 hover:border-white"
                                      :class="bloque.estilo === 'normal'
                                        ? 'text-[17px] font-medium leading-[1.4] md:text-[18px]'
                                        : 'text-[18px] font-bold leading-[1.35] md:text-[19px]'"
                                      @click="cerrarMenu"
                                    >
                                      {{ link }}
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </Transition>
                      </div>
                    </Transition>
                  </template>

                  <!-- idioma en móvil -->
                  <template v-else>
                    <button
                      type="button"
                      class="block w-full text-left"
                      @click="alternarSubmenuMovil(enlace.clave)"
                    >
                      <span class="block text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.7"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="h-[23px] w-[23px]"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path d="M3 12h18" />
                          <path d="M12 3a15 15 0 0 1 0 18" />
                          <path d="M12 3a15 15 0 0 0 0 18" />
                        </svg>
                      </span>
                      <span class="mt-[18px] block h-px w-full bg-white/60"></span>
                    </button>

                    <Transition
                      enter-active-class="transition-all duration-300 ease-out"
                      leave-active-class="transition-all duration-220 ease-in"
                      enter-from-class="opacity-0"
                      enter-to-class="opacity-100"
                      leave-from-class="opacity-100"
                      leave-to-class="opacity-0"
                    >
                      <div
                        v-if="submenuMovilActivo === enlace.clave"
                        class="overflow-hidden pt-6"
                      >
                        <Transition
                          appear
                          enter-active-class="transition-all duration-300 ease-out"
                          leave-active-class="transition-all duration-220 ease-in"
                          enter-from-class="-translate-x-8 opacity-0"
                          enter-to-class="translate-x-0 opacity-100"
                          leave-from-class="translate-x-0 opacity-100"
                          leave-to-class="-translate-x-6 opacity-0"
                        >
                          <div class="px-0 py-[2px]">
                            <ul class="flex flex-col gap-2">
                              <li
                                v-for="link in obtenerLinksIdioma(enlace)"
                                :key="link"
                              >
                                <a
                                  href="#"
                                  class="inline-block border-b border-transparent text-[17px] font-medium leading-[1.4] text-white transition duration-200 hover:border-white md:text-[18px]"
                                  @click="cerrarMenu"
                                >
                                  {{ link }}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </Transition>
                      </div>
                    </Transition>
                  </template>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
