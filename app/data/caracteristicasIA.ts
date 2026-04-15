import type { TarjetaIA } from '~/types/tarjetas'
/*  Este archivo sigue siendo la fuente de datos por defecto de la sección IA, antes solo guardaba claves que el padre traducia,
ahora guarda una funcion que gneera tarjetas ya traducidas, ya no da keys si no texto final

la traducción ocurre aquí dentro porque este fichero actua como tarjetas por defecto del padre
asi los hijos no necesitan saber nada de i18n y solo reciben texto ya listo */

/*ESTA FUNCION:
Recibe (t) y traduce las claves (itulo: t('caracteristicasIA.tarjetas.preguntale.titulo')). a texto traducido como 'Preguntale  */
export function crearTarjetasIA(t: (key: string) => string): TarjetaIA[] {
  /*se actualizan las rutas porque laas imagenes ya se movieron a subcarpetas nuevas y se habian roto las rutas debido a este cambio*/
  return [
    {
      id: 1,
      tipo: 'imagen-fondo',
      titulo: t('caracteristicasIA.tarjetas.preguntale.titulo'),
      subtitulo: t('caracteristicasIA.tarjetas.preguntale.subtitulo'),
      imagenes: {//ahora ya se usan rutas mas ordenadas y encima con 3 tamaños a elegir segun la pantalla
        movil: '/imagenes/caracteristicas-ia/asistente-ia/asistente-ia-576w.webp',
        tablet: '/imagenes/caracteristicas-ia/asistente-ia/asistente-ia-1024w.webp',
        desktop: '/imagenes/caracteristicas-ia/asistente-ia/asistente-ia-1280w.webp'
      },
      alt: t('caracteristicasIA.tarjetas.preguntale.alt'),
      modal: {
        titulo: t('caracteristicasIA.tarjetas.preguntale.modal.titulo'),
        descripcion: t('caracteristicasIA.tarjetas.preguntale.modal.descripcion')
      }
    },
    {
      id: 2,
      tipo: 'blanca',
      titulo: t('caracteristicasIA.tarjetas.artista.titulo'),
      subtitulo: t('caracteristicasIA.tarjetas.artista.subtitulo'),
      imagenes: {//lo mismo aqui y en el resto de tarjetas
        movil: '/imagenes/caracteristicas-ia/ia-generativa/ia-generativa-576w.webp',
        tablet: '/imagenes/caracteristicas-ia/ia-generativa/ia-generativa-1024w.webp',
        desktop: '/imagenes/caracteristicas-ia/ia-generativa/ia-generativa-1280w.webp'
      },
      alt: t('caracteristicasIA.tarjetas.artista.alt')
    },
    {
      id: 3,
      tipo: 'imagen-fondo',
      titulo: t('caracteristicasIA.tarjetas.subtitulos.titulo'),
      subtitulo: t('caracteristicasIA.tarjetas.subtitulos.subtitulo'),
      imagenes: {
        movil: '/imagenes/caracteristicas-ia/subtitulos-automaticos-ia/subtitulos-automaticos-ia-576w.webp',
        tablet: '/imagenes/caracteristicas-ia/subtitulos-automaticos-ia/subtitulos-automaticos-ia-1024w.webp',
        desktop: '/imagenes/caracteristicas-ia/subtitulos-automaticos-ia/subtitulos-automaticos-ia-1280w.webp'
      },
      alt: t('caracteristicasIA.tarjetas.subtitulos.alt')
    },
    {
      id: 4,
      tipo: 'blanca',
      titulo: t('caracteristicasIA.tarjetas.traduccion.titulo'),
      subtitulo: t('caracteristicasIA.tarjetas.traduccion.subtitulo'),
      imagenes: {
        movil: '/imagenes/caracteristicas-ia/traduccion-automatica-ia/traduccion-automatica-ia-768w.webp',
        tablet: '/imagenes/caracteristicas-ia/traduccion-automatica-ia/traduccion-automatica-ia-1280w.webp',
        desktop: '/imagenes/caracteristicas-ia/traduccion-automatica-ia/traduccion-automatica-ia-1512w.webp'
      },
      alt: t('caracteristicasIA.tarjetas.traduccion.alt'),
      ancha: false
    },
    {
      id: 5,
      tipo: 'blanca',
      titulo: t('caracteristicasIA.tarjetas.perfiles.titulo'),
      subtitulo: t('caracteristicasIA.tarjetas.perfiles.subtitulo'),
      imagenes: {
        movil: '/imagenes/caracteristicas-ia/gestion-perfiles-usuario/gestion-perfiles-usuario-576w.webp',
        tablet: '/imagenes/caracteristicas-ia/gestion-perfiles-usuario/gestion-perfiles-usuario-1024w.webp',
        desktop: '/imagenes/caracteristicas-ia/gestion-perfiles-usuario/gestion-perfiles-usuario-1280w.webp'
      },
      alt: t('caracteristicasIA.tarjetas.perfiles.alt'),
      ancha: true
    }
  ]
}
