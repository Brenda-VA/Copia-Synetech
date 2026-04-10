<!-- <script setup>
</script>

<template>
  <main class="min-h-screen bg-slate-950 text-white">
    <!--- Los autoimports se hacen esribiendo con la primera letra en mayuscula el nombre de la carpeta -->
    <!-- <LayoutBarraNavegacion />
    <SeccionesHeroCarrusel />
    <SeccionesSeccionCaracteristicasIA />
    <SeccionesSeccionSuiteEducativa />
  </main>
  
  Aqui se está moviendo el contenido a index, cuando no tenía más páginas app.vue contenia todo,
  ahora al tener mas páginas, Nuxt activa el sistema de rutas y espera páginas dentro de pages/
  en pages debe ir index.vue que ahora serria la home real, y dentro de pages cada nuevo archivo es una rutapara una pagins nueva--> 
<template> 
<!-- A partir de ahora en app.vue deben ir cosas globales, por ejemplo dejar el navbar, esto haria q este elemento este en todas las páginas -->
  <LayoutBarraNavegacion />
  <NuxtPage /> <!-- renderiza la página actual -->
 
</template>