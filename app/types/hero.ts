// este tipo es solo para el hero
// aqui junto el contenido, las imagenes y la variante visual de cada slide
// variante es la pieza que decide que layout se pinta en el componente
export interface HeroSlide {
  id: number
  etiqueta: string
  titulo: string
  boton: string
  alt: string
  imagenMovil: string
  imagenTablet: string
  imagenDesktop: string
  variante: 'demo' | 'ia'
}
