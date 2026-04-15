export type TarjetaIATipo = 'imagen-fondo' | 'blanca'//union de literales, el valor solo puede ser uno de esos dos
export type TarjetaVista = 'movil' | 'tablet' | 'desktop'//solo acepta alguna de las 3 vistaa
export type TarjetaFormato = 'estandar' | 'ancha'

/* Antes la propiedad de imagenes usaba un solo tipo pq solo usaba una imagen para cada tarjeta, como
ahora se van a usar varias img según el tamaño de pantalla, dicha propiedad debe tener varios tipos para especificar
que img se va a usar.

Ahora cada tarjeta tiene sus 3 versiones de imagenes en 1 solo bloque*/
export interface TarjetaIAImagenes {
  movil: string
  tablet: string
  desktop: string
}

export interface TarjetaIA {
  id: number
  tipo: TarjetaIATipo
  titulo: string
  subtitulo: string
  imagenes: TarjetaIAImagenes
  alt: string
  ancha?: boolean //propiedad opcional, por eso tiene el '?', algunas tarjetas la tienen, otras no
  modal?: TarjetaModalIA
}
//interface para las tarjeta que muestren un modal
/* el boton de las tarjetas que tengan la propiedad modal ya no servirá para navegar, si no que emitirá un evento para abrir un modal en cuanto sea pulsado
se debe usar tanto en seccion como en carrusel, en este ultimo caso, como carrusel contiene la tarjeta, tiene que escuchar ese evento y reenviarlo al padre */
export interface TarjetaModalIA {
  titulo: string
  descripcion: string
}

//este tipo es solo para las tarjetas de Suite Educativa, asi no se mezclan los datos de Suite con los de IA
export interface TarjetaSuiteData {
  id: number
  titulo: string
  descripcion: string
  imagen: string
  alt: string
}
