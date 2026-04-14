import type { NavbarItem } from '~/types/navbar'

// en esta fase los datos ya no viven dentro del componente
// la idea es separar contenido y lógica sin mezclar todavia i18n
// mas adelante este archivo puede cambiar si la navbar pasa a usar traducciones
export const enlacesNavbar: NavbarItem[] = [
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
