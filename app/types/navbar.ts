// no todos los items del navbar tienen la misma forma
// por eso primero se separan y luego se unen en un tipo general

export interface NavbarBloque {
  titulo?: string
  estilo: 'destacado' | 'normal'
  links: string[]
}

export interface NavbarLinkItem {
  id: number
  texto: string
  href: string
  tipo: 'link'
}

export interface NavbarDropdownItem {
  id: number
  texto: string
  href: string
  tipo: 'dropdown'
  clave: string
  maxWidth: string 
  bloques: NavbarBloque[]
}

export interface NavbarIdiomaItem {
  id: number
  texto: string
  tipo: 'idioma'
  clave: string
  maxWidth: string
  bloques: NavbarBloque[]
}

// segun el tipo sabemos si el item es link, dropdown o idioma
export type NavbarItem = NavbarLinkItem | NavbarDropdownItem | NavbarIdiomaItem
