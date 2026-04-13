export type TarjetaIATipo = 'imagen-fondo' | 'blanca'//union de literales, el valor solo puede ser uno de esos dos
export type TarjetaVista = 'movil' | 'tablet' | 'desktop'//solo acepta alguna de las 3 vistaa
export type TarjetaFormato = 'estandar' | 'ancha'

export interface TarjetaIA {
  id: number
  tipo: TarjetaIATipo
  titulo: string
  subtitulo: string
  imagen: string
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

