<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const menuAbierto = ref(false)
const menuActivo = ref(null)
const submenuMovilActivo = ref(null)

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

function abrirDropdown(nombre) {
  menuActivo.value = nombre
}

function cerrarDropdown() {
  menuActivo.value = null
}

function alternarSubmenuMovil(nombre) {
  submenuMovilActivo.value = submenuMovilActivo.value === nombre ? null : nombre
}

watch(menuAbierto, (abierto) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = abierto ? 'hidden' : ''
  }
})

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
      <a href="#" class="flex shrink-0 items-center">
        <img
          src="/imagenes/logo-synetech-blanco.png"
          alt="Logo Synetech"
          class="h-[12px] w-auto sm:h-[13px] lg:h-[14px]"
        >
      </a>

      <!-- Escritorio / tablet grande -->
      <ul class="hidden items-center gap-7 text-sm font-medium text-white/90 lg:flex xl:gap-8">
        <li
          class="relative"
          @mouseenter="abrirDropdown('pantallas')"
        >
          <a
            href="#"
            class="border-b border-transparent pb-1 transition duration-200 hover:border-white hover:text-white"
          >
            Pantallas Interactivas
          </a>
        </li>

        <li>
          <a
            href="#"
            class="border-b border-transparent pb-1 transition duration-200 hover:border-white hover:text-white"
          >
            Pantallas LED
          </a>
        </li>

        <li
          class="relative"
          @mouseenter="abrirDropdown('soporte')"
        >
          <a
            href="#"
            class="border-b border-transparent pb-1 transition duration-200 hover:border-white hover:text-white"
          >
            Soporte
          </a>
        </li>

        <li>
          <a
            href="#"
            class="border-b border-transparent pb-1 transition duration-200 hover:border-white hover:text-white"
          >
            EdBlog
          </a>
        </li>

        <li>
          <a
            href="#"
            class="border-b border-transparent pb-1 transition duration-200 hover:border-white hover:text-white"
          >
            Solicita una Demo
          </a>
        </li>

        <li
          class="relative"
          @mouseenter="abrirDropdown('idioma')"
        >
          <button
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

      <!-- Botón móvil / tablet pequeña -->
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

    <!-- Dropdown escritorio: Pantallas -->
    <div
      v-show="menuActivo === 'pantallas'"
      class="hidden bg-[#2D2D2D] lg:block"
      @mouseenter="abrirDropdown('pantallas')"
    >
      <div class="mx-auto max-w-[1400px] px-5 py-12 md:px-6 lg:px-8 xl:py-14">
        <div class="grid max-w-[860px] grid-cols-3 gap-x-14 xl:gap-x-16">
          <div>
            <p class="text-[1rem] font-normal text-white/55">
              Pantallas Interactivas
            </p>

            <ul class="mt-9 space-y-4 text-[1rem] font-normal text-white">
              <li><a href="#" class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white">Piscis</a></li>
              <li><a href="#" class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white">Taurus</a></li>
              <li><a href="#" class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white">Gemini</a></li>
            </ul>
          </div>

          <div>
            <p class="text-[1rem] font-normal text-white/55">
              Software Educativo
            </p>

            <ul class="mt-9 space-y-4 text-[1rem] font-normal text-white">
              <li><a href="#" class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white">Synetech Class</a></li>
              <li><a href="#" class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white">Synetech OS</a></li>
              <li><a href="#" class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white">Synetech DMS</a></li>
              <li><a href="#" class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white">Synetech Share</a></li>
            </ul>
          </div>

          <div>
            <p class="text-[1rem] font-normal text-white/55">
              Inteligencia Artificial
            </p>

            <ul class="mt-9 space-y-4 text-[1rem] font-normal text-white">
              <li><a href="#" class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white">Synetech IA</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Dropdown escritorio: Soporte -->
    <div
      v-show="menuActivo === 'soporte'"
      class="hidden bg-[#2D2D2D] lg:block"
      @mouseenter="abrirDropdown('soporte')"
    >
      <div class="mx-auto max-w-[1400px] px-5 py-12 md:px-6 lg:px-8 xl:py-14">
        <div class="grid max-w-[860px] grid-cols-3 gap-x-14 xl:gap-x-16">
          <div>
            <p class="text-[1rem] font-normal text-white/55">
              Descargas
            </p>

            <ul class="mt-9 space-y-4 text-[1rem] font-normal text-white">
              <li><a href="#" class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white">Pantallas Interactivas</a></li>
            </ul>
          </div>

          <div>
            <p class="text-[1rem] font-normal text-white/55">
              Te ayudamos
            </p>

            <ul class="mt-9 space-y-4 text-[1rem] font-normal text-white">
              <li><a href="#" class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white">Contacta con soporte</a></li>
              <li><a href="#" class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white">Reparación de pantallas LED</a></li>
            </ul>
          </div>

          <div>
            <p class="text-[1rem] font-normal text-white/55">
              Información Adicional
            </p>

            <ul class="mt-9 space-y-4 text-[1rem] font-normal text-white">
              <li><a href="#" class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white">Garantía</a></li>
              <li><a href="#" class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white">Comprueba la cobertura</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- Dropdown escritorio: Idioma -->
    <div
      v-show="menuActivo === 'idioma'"
      class="hidden bg-[#2D2D2D] lg:block"
      @mouseenter="abrirDropdown('idioma')"
    >
      <div class="mx-auto max-w-[1400px] px-5 py-12 md:px-6 lg:px-8 xl:py-14">
        <div class="max-w-[280px] text-white">
          <p class="text-[1rem] font-normal text-white/55">
            Elige tu idioma
          </p>

          <ul class="mt-9 space-y-4 text-[1rem] font-normal text-white">
            <li><a href="#" class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white">Español</a></li>
            <li><a href="#" class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white">English</a></li>
            <li><a href="#" class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white">Deutsch</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>

  <!-- Desplegable móvil / tablet pequeña -->
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
              <ul class="flex flex-col gap-7 md:gap-8">
                <!-- Pantallas Interactivas -->
                <li>
                  <button
                    type="button"
                    class="grupo-linea w-full text-left"
                    @click="alternarSubmenuMovil('pantallas')"
                  >
                    <span class="block text-[18px] font-semibold tracking-[-0.02em] text-white md:text-[19px]">
                      Pantallas Interactivas
                    </span>
                    <span class="linea-seccion"></span>
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
                      v-if="submenuMovilActivo === 'pantallas'"
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
                        <div class="submenu-contenido">
                          <div class="space-y-9">
                            <div>
                              <p class="submenu-titulo">
                                Pantallas Interactivas
                              </p>
                              <ul class="submenu-lista">
                                <li><a href="#" class="submenu-enlace" @click="cerrarMenu">Piscis</a></li>
                                <li><a href="#" class="submenu-enlace" @click="cerrarMenu">Taurus</a></li>
                                <li><a href="#" class="submenu-enlace" @click="cerrarMenu">Gemini</a></li>
                              </ul>
                            </div>

                            <div>
                              <p class="submenu-titulo">
                                Software Educativo
                              </p>
                              <ul class="submenu-lista">
                                <li><a href="#" class="submenu-enlace" @click="cerrarMenu">Synetech Class</a></li>
                                <li><a href="#" class="submenu-enlace" @click="cerrarMenu">Synetech OS</a></li>
                                <li><a href="#" class="submenu-enlace" @click="cerrarMenu">Synetech DMS</a></li>
                                <li><a href="#" class="submenu-enlace" @click="cerrarMenu">Synetech Share</a></li>
                              </ul>
                            </div>

                            <div>
                              <p class="submenu-titulo">
                                Inteligencia Artificial
                              </p>
                              <ul class="submenu-lista">
                                <li><a href="#" class="submenu-enlace" @click="cerrarMenu">Synetech IA</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </Transition>
                </li>

                <!-- Pantallas LED -->
                <li>
                  <a
                    href="#"
                    class="grupo-linea block"
                    @click="cerrarMenu"
                  >
                    <span class="block text-[18px] font-semibold tracking-[-0.02em] text-white md:text-[19px]">
                      Pantallas LED
                    </span>
                    <span class="linea-seccion"></span>
                  </a>
                </li>

                <!-- Soporte -->
                <li>
                  <button
                    type="button"
                    class="grupo-linea w-full text-left"
                    @click="alternarSubmenuMovil('soporte')"
                  >
                    <span class="block text-[18px] font-semibold tracking-[-0.02em] text-white md:text-[19px]">
                      Soporte
                    </span>
                    <span class="linea-seccion"></span>
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
                      v-if="submenuMovilActivo === 'soporte'"
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
                        <div class="submenu-contenido">
                          <div class="space-y-9">
                            <div>
                              <p class="submenu-titulo">
                                Descargas
                              </p>
                              <ul class="submenu-lista submenu-lista--normal">
                                <li><a href="#" class="submenu-enlace submenu-enlace--normal" @click="cerrarMenu">Pantallas Interactivas</a></li>
                              </ul>
                            </div>

                            <div>
                              <p class="submenu-titulo">
                                Te ayudamos
                              </p>
                              <ul class="submenu-lista submenu-lista--normal">
                                <li><a href="#" class="submenu-enlace submenu-enlace--normal" @click="cerrarMenu">Contacta con soporte</a></li>
                                <li><a href="#" class="submenu-enlace submenu-enlace--normal" @click="cerrarMenu">Reparación de pantallas LED</a></li>
                              </ul>
                            </div>

                            <div>
                              <p class="submenu-titulo">
                                Información adicional
                              </p>
                              <ul class="submenu-lista submenu-lista--normal">
                                <li><a href="#" class="submenu-enlace submenu-enlace--normal" @click="cerrarMenu">Garantía</a></li>
                                <li><a href="#" class="submenu-enlace submenu-enlace--normal" @click="cerrarMenu">Comprueba la cobertura</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </Transition>
                    </div>
                  </Transition>
                </li>

                <!-- EdBlog -->
                <li>
                  <a
                    href="#"
                    class="grupo-linea block"
                    @click="cerrarMenu"
                  >
                    <span class="block text-[18px] font-semibold tracking-[-0.02em] text-white md:text-[19px]">
                      EdBlog
                    </span>
                    <span class="linea-seccion"></span>
                  </a>
                </li>

                <!-- Solicita una Demo -->
                <li>
                  <a
                    href="#"
                    class="grupo-linea block"
                    @click="cerrarMenu"
                  >
                    <span class="block text-[18px] font-semibold tracking-[-0.02em] text-white md:text-[19px]">
                      Solicita una Demo
                    </span>
                    <span class="linea-seccion"></span>
                  </a>
                </li>

                <!-- Idioma -->
                <li>
                  <button
                    type="button"
                    class="grupo-linea w-full text-left"
                    @click="alternarSubmenuMovil('idioma')"
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
                    <span class="linea-seccion"></span>
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
                      v-if="submenuMovilActivo === 'idioma'"
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
                        <div class="submenu-contenido submenu-contenido--idioma">
                          <ul class="submenu-lista submenu-lista--normal">
                            <li><a href="#" class="submenu-enlace submenu-enlace--normal" @click="cerrarMenu">Español</a></li>
                            <li><a href="#" class="submenu-enlace submenu-enlace--normal" @click="cerrarMenu">English</a></li>
                            <li><a href="#" class="submenu-enlace submenu-enlace--normal" @click="cerrarMenu">Deutsch</a></li>
                          </ul>
                        </div>
                      </Transition>
                    </div>
                  </Transition>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.grupo-linea {
  display: block;
}

.linea-seccion {
  display: block;
  height: 1px;
  margin-top: 18px;
  width: 100%;
  background: rgba(255, 255, 255, 0.62);
}

.submenu-contenido {
  padding-left: 0;
  padding-right: 0;
  padding-top: 2px;
  padding-bottom: 2px;
}

.submenu-contenido--idioma {
  max-width: none;
}

.submenu-titulo {
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.58);
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
}

.submenu-lista {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.submenu-lista--normal {
  gap: 8px;
}

.submenu-enlace {
  display: inline-block;
  color: white;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.35;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.submenu-enlace--normal {
  font-size: 17px;
  font-weight: 500;
  line-height: 1.4;
}

.submenu-enlace:hover {
  border-bottom-color: white;
}

@media (min-width: 768px) {
  .linea-seccion {
    width: 100%;
  }

  .submenu-titulo {
    font-size: 14px;
    margin-bottom: 10px;
  }

  .submenu-enlace {
    font-size: 19px;
  }

  .submenu-enlace--normal {
    font-size: 18px;
  }
}
</style>