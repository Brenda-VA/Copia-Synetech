<script setup>
import { ref } from 'vue'
const menuAbierto = ref(false)
function alternarMenu() {
  menuAbierto.value = !menuAbierto.value
}

function cerrarMenu() {
  menuAbierto.value = false
}
</script>

<template>

  <header class="sticky top-0 z-50 border-b border-white/10 bg-zinc-900/90 backdrop-blur">
    <nav
      class="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 md:px-6 lg:px-8"
      aria-label="Navegación principal"
    >
      <!-- Logo -->
      <a href="#" class="flex items-center shrink-0">
        <img
          src="/imagenes/logo_synetech.png"
          alt="Logo Synetech"
          class="h-7 w-auto md:h-8"
        >
      </a>
      <ul class="hidden items-center gap-8 text-sm font-medium text-white/90 lg:flex">
        <li>
          <a href="#" class="transition-colors duration-200 hover:text-cyan-300">
            Pantallas Interactivas
          </a>
        </li>

        <li>
          <a href="#" class="transition-colors duration-200 hover:text-cyan-300">
            Pantallas LED
          </a>
        </li>

        <li>
          <a href="#" class="transition-colors duration-200 hover:text-cyan-300">
            Soporte
          </a>
        </li>

        <li>
          <a href="#" class="transition-colors duration-200 hover:text-cyan-300">
            EdBlog
          </a>
        </li>

        <li>
          <a href="#" class="transition-colors duration-200 hover:text-cyan-300">
            Solicita una Demo
          </a>
        </li>
        <li>
          <button
            type="button"
            class="text-lg text-white transition-colors duration-200 hover:text-cyan-300"
            aria-label="Cambiar idioma"
          >
            🌐
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
      v-show="menuAbierto"
      id="menu-movil"
      class="border-t border-white/10 bg-zinc-900/95 lg:hidden"
    >
      <div class="mx-auto max-w-[1400px] px-4 py-4 md:px-6">
        <ul class="flex flex-col gap-1">
          <li>
            <a
              href="#"
              class="block rounded-md px-3 py-3 text-sm font-medium text-white/90 transition hover:bg-white/5 hover:text-cyan-300"
              @click="cerrarMenu"
            >
              Pantallas Interactivas
            </a>
          </li>

          <li>
            <a
              href="#"
              class="block rounded-md px-3 py-3 text-sm font-medium text-white/90 transition hover:bg-white/5 hover:text-cyan-300"
              @click="cerrarMenu"
            >
              Pantallas LED
            </a>
          </li>

          <li>
            <a
              href="#"
              class="block rounded-md px-3 py-3 text-sm font-medium text-white/90 transition hover:bg-white/5 hover:text-cyan-300"
              @click="cerrarMenu"
            >
              Soporte
            </a>
          </li>

          <li>
            <a
              href="#"
              class="block rounded-md px-3 py-3 text-sm font-medium text-white/90 transition hover:bg-white/5 hover:text-cyan-300"
              @click="cerrarMenu"
            >
              EdBlog
            </a>
          </li>

          <li>
            <a
              href="#"
              class="block rounded-md px-3 py-3 text-sm font-medium text-white/90 transition hover:bg-white/5 hover:text-cyan-300"
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
              🌐 Idioma
            </button>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>