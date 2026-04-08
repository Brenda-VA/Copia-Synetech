<script setup>
import { ref } from 'vue'

const menuAbierto = ref(false)
const menuActivo = ref(null)

function alternarMenu() {
  menuAbierto.value = !menuAbierto.value
}

function cerrarMenu() {
  menuAbierto.value = false
}

function abrirDropdown(nombre) {
  menuActivo.value = nombre
}

function cerrarDropdown() {
  menuActivo.value = null
}
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-[#3a3a3d]"
    @mouseleave="cerrarDropdown"
  >
    <nav
      class="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 md:px-6 lg:px-8"
      aria-label="Navegación principal"
    >
      <a href="#" class="flex shrink-0 items-center">
        <img
          src="/imagenes/logo-synetech-blanco.png"
          alt="Logo Synetech"
          class="h-3 w-auto md:h-4"
        >
      </a>

      <ul class="hidden items-center gap-8 text-sm font-medium text-white/90 lg:flex">
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
              class="h-7 w-7"
            >
              <circle cx="12" cy="12" r="9"></circle>
              <path d="M3 12h18"></path>
              <path d="M12 3a15 15 0 0 1 0 18"></path>
              <path d="M12 3a15 15 0 0 0 0 18"></path>
            </svg>
          </button>
        </li>
      </ul>

      <button
        type="button"
        class="inline-flex items-center justify-center rounded-md border border-white/15 px-3 py-2 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5 lg:hidden"
        :aria-expanded="menuAbierto ? 'true' : 'false'"
        aria-controls="menu-movil"
        aria-label="Abrir o cerrar menú"
        @click="alternarMenu"
      >
        {{ menuAbierto ? 'Cerrar' : 'Menú' }}
      </button>
    </nav>

    <div
      v-show="menuActivo === 'pantallas'"
      class="hidden bg-[#3a3a3d] lg:block"
      @mouseenter="abrirDropdown('pantallas')"
    >
      <div class="mx-auto max-w-[1400px] px-4 py-14 md:px-6 lg:px-8">
        <div class="grid max-w-[860px] grid-cols-3 gap-x-16">
          <div>
            <p class="text-[1rem] font-normal text-white/55">
              Pantallas Interactivas
            </p>

            <ul class="mt-10 space-y-4 text-[1rem] font-normal text-white">
              <li>
                <a
                  href="#"
                  class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
                >
                  Piscis
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
                >
                  Taurus
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
                >
                  Gemini
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p class="text-[1rem] font-normal text-white/55">
              Software Educativo
            </p>

            <ul class="mt-10 space-y-4 text-[1rem] font-normal text-white">
              <li>
                <a
                  href="#"
                  class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
                >
                  Synetech Class
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
                >
                  Synetech OS
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
                >
                  Synetech DMS
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
                >
                  Synetech Share
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p class="text-[1rem] font-normal text-white/55">
              Inteligencia Artificial
            </p>

            <ul class="mt-10 space-y-4 text-[1rem] font-normal text-white">
              <li>
                <a
                  href="#"
                  class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
                >
                  Synetech IA
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div
      v-show="menuActivo === 'soporte'"
      class="hidden bg-[#3a3a3d] lg:block"
      @mouseenter="abrirDropdown('soporte')"
    >
      <div class="mx-auto max-w-[1400px] px-4 py-14 md:px-6 lg:px-8">
        <div class="grid max-w-[860px] grid-cols-3 gap-x-16">
          <div>
            <p class="text-[1rem] font-normal text-white/55">
              Descargas
            </p>

            <ul class="mt-10 space-y-4 text-[1rem] font-normal text-white">
              <li>
                <a
                  href="#"
                  class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
                >
                  Pantallas Interactivas
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p class="text-[1rem] font-normal text-white/55">
              Te ayudamos
            </p>

            <ul class="mt-10 space-y-4 text-[1rem] font-normal text-white">
              <li>
                <a
                  href="#"
                  class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
                >
                  Contacta con soporte
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
                >
                  Reparación de pantallas LED
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p class="text-[1rem] font-normal text-white/55">
              Información Adicional
            </p>

            <ul class="mt-10 space-y-4 text-[1rem] font-normal text-white">
              <li>
                <a
                  href="#"
                  class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
                >
                  Garantía
                </a>
              </li>
              <li>
                <a
                  href="#"
                  class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
                >
                  Comprueba la cobertura
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div
      v-show="menuActivo === 'idioma'"
      class="hidden bg-[#3a3a3d] lg:block"
      @mouseenter="abrirDropdown('idioma')"
    >
      <div class="mx-auto max-w-[1400px] px-4 py-14 md:px-6 lg:px-8">
        <div class="max-w-[280px] text-white">
          <p class="text-[1rem] font-normal text-white/55">
            Elige tu idioma
          </p>

          <ul class="mt-10 space-y-4 text-[1rem] font-normal text-white">
            <li>
              <a
                href="#"
                class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
              >
                Español
              </a>
            </li>

            <li>
              <a
                href="#"
                class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
              >
                English
              </a>
            </li>

            <li>
              <a
                href="#"
                class="inline-block border-b border-transparent pb-[2px] transition duration-200 hover:border-white hover:text-white"
              >
                Deutsch
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div
      v-show="menuAbierto"
      id="menu-movil"
      class="bg-[#3a3a3d] lg:hidden"
    >
      <div class="mx-auto max-w-[1400px] px-4 py-4 md:px-6">
        <ul class="flex flex-col gap-1">
          <li>
            <a
              href="#"
              class="block rounded-md px-3 py-3 text-sm font-medium text-white/90 transition hover:bg-white/5 hover:text-white"
              @click="cerrarMenu"
            >
              Pantallas Interactivas
            </a>
          </li>

          <li>
            <a
              href="#"
              class="block rounded-md px-3 py-3 text-sm font-medium text-white/90 transition hover:bg-white/5 hover:text-white"
              @click="cerrarMenu"
            >
              Pantallas LED
            </a>
          </li>

          <li>
            <a
              href="#"
              class="block rounded-md px-3 py-3 text-sm font-medium text-white/90 transition hover:bg-white/5 hover:text-white"
              @click="cerrarMenu"
            >
              Soporte
            </a>
          </li>

          <li>
            <a
              href="#"
              class="block rounded-md px-3 py-3 text-sm font-medium text-white/90 transition hover:bg-white/5 hover:text-white"
              @click="cerrarMenu"
            >
              EdBlog
            </a>
          </li>

          <li>
            <a
              href="#"
              class="block rounded-md px-3 py-3 text-sm font-medium text-white/90 transition hover:bg-white/5 hover:text-white"
              @click="cerrarMenu"
            >
              Solicita una Demo
            </a>
          </li>

          <li>
            <button
              type="button"
              class="mt-2 w-full rounded-md border border-white/15 px-3 py-3 text-left text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Idioma
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>