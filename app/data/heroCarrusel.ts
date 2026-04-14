import type { HeroSlide } from '~/types/hero'

// en esta fase los datos ya no viven dentro del componente
// la idea es separar el contenido del render sin mezclar todavia i18n
// mas adelante este archivo puede cambiar si el hero pasa a usar traducciones
export const diapositivasHero: HeroSlide[] = [
  {
    id: 1,
    etiqueta: 'No te lo contamos.',
    titulo: 'Prueba gratis nuestras pantallas interactivas.',
    boton: 'Descubre más',
    imagenMovil: '/imagenes/banner_demo.webp',
    imagenTablet: '/imagenes/banner_demo_1024w.webp',
    imagenDesktop: '/imagenes/banner_demo_1024w.webp',
    alt: 'Pantalla interactiva Synetech con iconos flotando',
    variante: 'demo'
  },
  {
    id: 2,
    etiqueta: 'La pizarra digital interactiva con Inteligencia Artificial',
    titulo: 'SYNETECH IA',
    boton: 'Descubre más',
    imagenMovil: '/imagenes/banner-ia-576w.webp',
    imagenTablet: '/imagenes/banner-ia-1280w.webp',
    imagenDesktop: '/imagenes/banner-ia-1920w.webp',
    alt: 'Imagen promocional de Synetech IA',
    variante: 'ia'
  }
]
