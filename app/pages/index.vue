<script setup lang="ts">
import BotonPrimario from '~/components/ui/BotonPrimario.vue'

const localePath = useLocalePath()
</script>
<!--Ya no esta la import del navbar pq se colocó eb app.vue como un elemento global, esto para tener la navbar en todas las páginas-->
<template>
  <SeccionesHeroCarrusel>
    <template #boton>
      <BotonPrimario :to="localePath('/prueba')">
        Ir a prueba
      </BotonPrimario>
    </template>
  </SeccionesHeroCarrusel>
  <SeccionesSeccionCaracteristicasIA ruta-flechas="/prueba" />
  <SeccionesSeccionSuiteEducativa />
</template>
