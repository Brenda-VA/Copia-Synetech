export type ProductoKey = "taurusV" | "gemini";

export interface FilaTecnica {
  id: string;
  label: string;
  valor: string;
}

export interface CategoriaTecnica {
  id: string;
  titulo: string;
  filas: Record<string, Omit<FilaTecnica, "id">>;
}

export interface ProductoTecnico {
  nombre: string;
  imagen: string;
  alt: string;
  categorias: Record<string, Omit<CategoriaTecnica, "id">>;
}

export const fichasTecnicas: Record<ProductoKey, ProductoTecnico> = {
  taurusV: {
    nombre: "Taurus-V",
    imagen: "/imagenes/taurus/taurus-frontal.webp",
    alt: "Pantalla interactiva Taurus-V frontal",
    categorias: {
      display: {
        titulo: "Display",
        filas: {
          tamanosDisponibles: {
            label: "Tamaños disponibles",
            valor: "65” / 75” / 86”",
          },
          resolucion: { label: "Resolución", valor: "4K" },
          vidaUtil: { label: "Vida útil", valor: "≥50.000 horas" },
          brillo: { label: "Brillo", valor: "400 cd/m2" },
          relacionAspecto: { label: "Relación de aspecto", valor: "16:9" },
          tasaRefresco: { label: "Tasa de refresco", valor: "60 Hz" },
          ratioContraste: { label: "Ratio de contraste", valor: "5000:1" },
          tiempoRespuesta: { label: "Tiempo de respuesta", valor: "6.5 ms" },
        },
      },
      sistemaOperativo: {
        titulo: "Sistema Operativo",
        filas: {
          os: { label: "OS", valor: "Android 14 (actualizable a Android 16)" },
          ram: { label: "RAM", valor: "16G" },
          rom: { label: "ROM", valor: "128G" },
          npu: { label: "NPU", valor: "6T" },
          perfilesNube: {
            label: "Perfiles de usuario en la nube",
            valor: "Sí",
          },
          ia: { label: "IA", valor: "Compatible" },
        },
      },
      sistemaTactil: {
        titulo: "Sistema táctil",
        filas: {
          herramientaTactil: {
            label: "Herramienta táctil",
            valor: "Lápiz pasivo, dedo y palma",
          },
          precision: { label: "Precisión", valor: "±1 mm" },
          puntosTactiles: { label: "Puntos táctiles", valor: "50" },
          velocidadRastreo: { label: "Velocidad de rastreo", valor: "≤2.5 ms" },
        },
      },
      audio: {
        titulo: "Audio",
        filas: {
          altavoz: { label: "Altavoz", valor: "2 x 20W + 2 x 16W" },
          microfonos: { label: "Micrófonos", valor: "8" },
        },
      },
      potencia: {
        titulo: "Potencia",
        filas: {
          consumo: {
            label: "Consumo",
            valor: "65”: 195W / 75”: 320W / 86”: 375W",
          },
        },
      },
      conectividad: {
        titulo: "Conectividad",
        filas: {
          ranuraOps: { label: "Ranura OPS", valor: "1 (80 pin)" },
          usbBTouch: { label: "USB-B Touch", valor: "3" },
          usbC: { label: "USB-C", valor: "3" },
          displayPort: { label: "Display Port", valor: "1" },
          hdmiIn: { label: "HDMI In", valor: "4" },
          usbA: { label: "USB - A", valor: "5 (1 x USB 2.0 / 4 x USB 3.0)" },
          audioIn: { label: "Audio In", valor: "1 (3.5 mm Jack)" },
          audioOut: { label: "Audio Out", valor: "1 (3.5 mm Jack)" },
          vgaIn: { label: "VGA In", valor: "-" },
          spdif: { label: "SPDIF", valor: "1" },
          rs232: { label: "RS-232", valor: "1" },
          rj45In: { label: "RJ45 In", valor: "1 (10M / 100M / 1000Mbps)" },
          rj45Out: { label: "RJ45 Out", valor: "1 (10M / 100M / 1000Mbps)" },
          wifi: { label: "Wi-Fi", valor: "Wi-Fi 6 802.11 a/b/g/n/ac/ax" },
          bluetooth: { label: "Bluetooth", valor: "5.4" },
          nfc: { label: "NFC", valor: "Sí" },
        },
      },
      software: {
        titulo: "Software",
        filas: {
          synetechClass: { label: "Synetech Class", valor: "Sí" },
          synetechShare: { label: "Synetech Share", valor: "Sí" },
          synetechOs: { label: "Synetech OS", valor: "Sí" },
          synetechDms: { label: "Synetech DMS", valor: "Opcional" },
        },
      },
    },
  },

  gemini: {
    nombre: "Gemini",
    imagen: "/imagenes/gemini/gemini.webp",
    alt: "Pantalla interactiva Gemini frontal",
    categorias: {
      display: {
        titulo: "Display",
        filas: {
          tamanosDisponibles: { label: "Tamaños disponibles", valor: "75”" },
          resolucion: { label: "Resolución", valor: "4K" },
          vidaUtil: { label: "Vida útil", valor: "≥50.000 horas" },
          brillo: { label: "Brillo", valor: "500 cd/m2" },
          relacionAspecto: { label: "Relación de aspecto", valor: "16:9" },
          tasaRefresco: { label: "Tasa de refresco", valor: "60 Hz" },
          ratioContraste: { label: "Ratio de contraste", valor: "5500:1" },
          tiempoRespuesta: { label: "Tiempo de respuesta", valor: "6.5 ms" },
        },
      },
      sistemaOperativo: {
        titulo: "Sistema Operativo",
        filas: {
          os: { label: "OS", valor: "Android 14 (actualizable a Android 16)" },
          ram: { label: "RAM", valor: "8G" },
          rom: { label: "ROM", valor: "64G" },
          npu: { label: "NPU", valor: "-" },
          perfilesNube: {
            label: "Perfiles de usuario en la nube",
            valor: "Sí",
          },
          ia: { label: "IA", valor: "Compatible" },
        },
      },
      sistemaTactil: {
        titulo: "Sistema táctil",
        filas: {
          herramientaTactil: {
            label: "Herramienta táctil",
            valor: "Lápiz pasivo, dedo y palma",
          },
          precision: { label: "Precisión", valor: "±1 mm" },
          puntosTactiles: { label: "Puntos táctiles", valor: "50" },
          velocidadRastreo: { label: "Velocidad de rastreo", valor: "≤2.5 ms" },
        },
      },
      audio: {
        titulo: "Audio",
        filas: {
          altavoz: { label: "Altavoz", valor: "2 x 20W" },
          microfonos: { label: "Micrófonos", valor: "8" },
        },
      },
      potencia: {
        titulo: "Potencia",
        filas: {
          consumo: { label: "Consumo", valor: "190W" },
        },
      },
      conectividad: {
        titulo: "Conectividad",
        filas: {
          ranuraOps: { label: "Ranura OPS", valor: "1 (80 pin)" },
          usbBTouch: { label: "USB-B Touch", valor: "2" },
          usbC: { label: "USB-C", valor: "2" },
          displayPort: { label: "Display Port", valor: "1" },
          hdmiIn: { label: "HDMI In", valor: "3" },
          usbA: { label: "USB - A", valor: "5 (1 x USB 2.0 / 4 x USB 3.0)" },
          audioIn: { label: "Audio In", valor: "1 (3.5 mm Jack)" },
          audioOut: { label: "Audio Out", valor: "1 (3.5 mm Jack)" },
          vgaIn: { label: "VGA In", valor: "1" },
          spdif: { label: "SPDIF", valor: "1" },
          rs232: { label: "RS-232", valor: "1" },
          rj45In: { label: "RJ45 In", valor: "1 (10M / 100M / 1000Mbps)" },
          rj45Out: { label: "RJ45 Out", valor: "1 (10M / 100M / 1000Mbps)" },
          wifi: { label: "Wi-Fi", valor: "Wi-Fi 6 802.11 a/b/g/n/ac/ax" },
          bluetooth: { label: "Bluetooth", valor: "5.4" },
          nfc: { label: "NFC", valor: "Sí" },
        },
      },
      software: {
        titulo: "Software",
        filas: {
          synetechClass: { label: "Synetech Class", valor: "Sí" },
          synetechShare: { label: "Synetech Share", valor: "Sí" },
          synetechOs: { label: "Synetech OS", valor: "Sí" },
          synetechDms: { label: "Synetech DMS", valor: "Opcional" },
        },
      },
    },
  },
};
