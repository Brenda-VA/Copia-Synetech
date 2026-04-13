import type { TarjetaIA } from '~/types/tarjetas'
/*  Este archivo saca los datos por defecto de las tarjetas de SeccionCaracteristicasIA y convierte el texto plano en keys i18n
de esa forma el componente original queda más limpio  

la SeccionCaracteristicasIA ya no define datos hardcodeados en el padre; ahora usa un modelo centralizado y preparado para i18n*/
export const tarjetasCaracteristicasIAPorDefecto: TarjetaIA[] = [
  {
    id: 1,
    tipo: 'imagen-fondo',
    tituloKey: 'caracteristicasIA.tarjetas.preguntale.titulo',
    subtituloKey: 'caracteristicasIA.tarjetas.preguntale.subtitulo',
    imagen: '/imagenes/asistente-ia-1024w.webp',
    altKey: 'caracteristicasIA.tarjetas.preguntale.alt',
    modal: {
      tituloKey: 'caracteristicasIA.tarjetas.preguntale.modal.titulo',
      descripcionKey: 'caracteristicasIA.tarjetas.preguntale.modal.descripcion'
    }
  },
  {
    id: 2,
    tipo: 'blanca',
    tituloKey: 'caracteristicasIA.tarjetas.artista.titulo',
    subtituloKey: 'caracteristicasIA.tarjetas.artista.subtitulo',
    imagen: '/imagenes/ia-generativa-1512w.webp',
    altKey: 'caracteristicasIA.tarjetas.artista.alt'
  },
  {
    id: 3,
    tipo: 'imagen-fondo',
    tituloKey: 'caracteristicasIA.tarjetas.subtitulos.titulo',
    subtituloKey: 'caracteristicasIA.tarjetas.subtitulos.subtitulo',
    imagen: '/imagenes/subtitulos-automaticos-ia-1024w.webp',
    altKey: 'caracteristicasIA.tarjetas.subtitulos.alt'
  },
  {
    id: 4,
    tipo: 'blanca',
    tituloKey: 'caracteristicasIA.tarjetas.traduccion.titulo',
    subtituloKey: 'caracteristicasIA.tarjetas.traduccion.subtitulo',
    imagen: '/imagenes/traduccion-automatica-ia-1280w.webp',
    altKey: 'caracteristicasIA.tarjetas.traduccion.alt',
    ancha: false
  },
  {
    id: 5,
    tipo: 'blanca',
    tituloKey: 'caracteristicasIA.tarjetas.perfiles.titulo',
    subtituloKey: 'caracteristicasIA.tarjetas.perfiles.subtitulo',
    imagen: '/imagenes/gestion-perfiles-usuario-1024w.webp',
    altKey: 'caracteristicasIA.tarjetas.perfiles.alt',
    ancha: true
  }
]
