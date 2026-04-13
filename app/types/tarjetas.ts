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
}
