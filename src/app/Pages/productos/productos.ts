import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PRODUCTOS, Producto } from '../../data/productos.data';
import { SanitizeUrlPipe } from '../../pipes/sanitize-url.pipe';

const WA_NUMBER = '51977938796';
const WA_BASE   = `https://wa.me/${WA_NUMBER}?text=`;
const WA_ICON   =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.126 1.535 5.858L.057 23.927l6.235-1.635A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.017-1.376l-.36-.213-3.7.97.988-3.608-.235-.371A9.818 9.818 0 1112 21.818z';

export type { Producto };

@Component({
  selector: 'app-productos',
  imports: [CommonModule, SanitizeUrlPipe],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['linea']) {
        this.setLinea(params['linea']);
        setTimeout(() => {
          document.querySelector('.sidebar')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    });
  }

  readonly waBase = WA_BASE;
  readonly waIcon = WA_ICON;

  // ─── CONFIG LÍNEAS ───────────────────────────────────────────────────────
  readonly lineas = [
    { key: 'todos',        label: 'Todos',        color: '#343594' },
    { key: 'baby-piolito', label: 'Baby Piolito', color: '#C22D31' },
    { key: 'tilin',        label: 'Tilin',        color: '#343594' },
    { key: 'piolito',      label: 'Piolito',      color: '#ECC238' },
    { key: 'escolar',      label: 'Escolar',      color: '#089347' },
  ];

  // ─── SUBCATEGORÍAS por línea ──────────────────────────────────────────────
  readonly subcategorias: Record<string, { key: string; label: string }[]> = {
    'todos': [],
    'baby-piolito': [
      { key: 'bp-otono-invierno-ninos',    label: '🍂 Otoño / Invierno Niños'     },
      { key: 'bp-primavera-verano-ninas',  label: '🌸 Primavera / Verano Niñas'   },
    ],
    'tilin': [
      { key: 'tl-invierno',          label: '🍂 Invierno'             },
    ],
    'piolito': [
      { key: 'pio-sandalias-verano-nina',  label: '👡 Sandalias Verano Niña'      },
      { key: 'pio-sandalias-verano-nino',  label: '👟 Sandalias Verano Niño'      },
      { key: 'pio-zapato-cerrado-nina',    label: '👞 Zapato Cerrado Niña'        },
      { key: 'pio-zapatos-zapatillas',     label: '👟 Zapatos y Zapatillas'       },
    ],
    'escolar': [
      { key: 'escolar',                    label: '🎒 Escolar'                    },
    ],
  };

  // ─── FILTROS (signals) ────────────────────────────────────────────────────
  filtroLinea       = signal<string>('todos');
  filtroSubcat      = signal<string>('todas');
  filtroGenero      = signal<string>('todos');
  filtroTalla       = signal<number | null>(null);
  busqueda          = signal<string>('');
  vistaGrid         = signal<boolean>(true);
  productoModal     = signal<Producto | null>(null);

  // ─── CATÁLOGO ─────────────────────────────────────────────────────────────
  readonly todos: Producto[] = PRODUCTOS;

  // ─── COMPUTED ─────────────────────────────────────────────────────────────
  readonly subcategoriasDisponibles = computed(() => {
    return this.subcategorias[this.filtroLinea()] ?? [];
  });

  readonly productosFiltrados = computed(() => {
    const linea  = this.filtroLinea();
    const subcat = this.filtroSubcat();
    const genero = this.filtroGenero();
    const talla  = this.filtroTalla();
    const busq   = this.busqueda().toLowerCase().trim();

    return this.todos.filter(p => {
      if (linea  !== 'todos'  && p.linea        !== linea)                           return false;
      if (subcat !== 'todas'  && p.subcategoria !== subcat)                          return false;
      if (genero !== 'todos'  && p.genero !== genero) return false;
      if (talla  !== null     && !p.tallasArray.includes(talla))                     return false;
      if (busq && !p.codigo.toLowerCase().includes(busq) &&
                  !p.descripcion.toLowerCase().includes(busq))                       return false;
      return true;
    });
  });

  readonly tallasDisponibles = computed(() => {
    const linea  = this.filtroLinea();
    const subcat = this.filtroSubcat();
    const genero = this.filtroGenero();
    const set = new Set<number>();
    this.todos
      .filter(p => {
        if (linea  !== 'todos' && p.linea        !== linea)                          return false;
        if (subcat !== 'todas' && p.subcategoria !== subcat)                         return false;
        if (genero !== 'todos' && p.genero !== genero) return false;
        return true;
      })
      .forEach(p => p.tallasArray.forEach(t => set.add(t)));
    return Array.from(set).sort((a, b) => a - b);
  });

  // ─── HELPERS ─────────────────────────────────────────────────────────────
  private readonly lineaColorMap: Record<string, string> = {
    'baby-piolito': '#C22D31',
    'tilin':        '#343594',
    'piolito':      '#d4a800',
    'escolar':      '#089347',
  };
  private readonly lineaLabelMap: Record<string, string> = {
    'baby-piolito': 'Baby Piolito',
    'tilin':        'Tilin',
    'piolito':      'Piolito',
    'escolar':      'Escolar',
  };

  lineaColor(linea: string): string { return this.lineaColorMap[linea] ?? '#343594'; }
  lineaLabel(linea: string): string { return this.lineaLabelMap[linea] ?? linea; }

  generoLabel(g: string): string {
    if (g === 'nino') return '👦 Niño';
    if (g === 'nina') return '👧 Niña';
    return g;
  }

  subcatLabel(key: string): string {
    for (const grupo of Object.values(this.subcategorias)) {
      const found = grupo.find(s => s.key === key);
      if (found) return found.label;
    }
    return key;
  }

  // ─── ACCIONES ────────────────────────────────────────────────────────────
  setLinea(linea: string): void  {
    this.filtroLinea.set(linea);
    this.filtroSubcat.set('todas');
    this.filtroTalla.set(null);
    if (linea === 'baby-piolito' || linea === 'piolito') {
      this.filtroGenero.set('todos');
    }
    if (linea !== 'piolito') {
      this.filtroTalla.set(null);
    }
  }
  setSubcat(s: string): void     { this.filtroSubcat.set(s);  this.filtroTalla.set(null); }
  setGenero(g: string): void     { this.filtroGenero.set(g);  this.filtroTalla.set(null); }
  toggleTalla(t: number): void   { this.filtroTalla.set(this.filtroTalla() === t ? null : t); }
  abrirModal(p: Producto): void  { this.productoModal.set(p); }
  cerrarModal(): void            { this.productoModal.set(null); }

  limpiarFiltros(): void {
    this.filtroLinea.set('todos');
    this.filtroSubcat.set('todas');
    this.filtroGenero.set('todos');
    this.filtroTalla.set(null);
    this.busqueda.set('');
  }

  waTexto(p: Producto): string {
    return encodeURIComponent(
      `Hola! Me interesa el modelo *${p.codigo}* de la línea *${this.lineaLabel(p.linea)}*.\n` +
      `Categoría: ${this.subcatLabel(p.subcategoria)}\n` +
      `Tallas disponibles: ${p.tallas}\n` +
      `¿Podrían darme más información?`
    );
  }

  hayFiltrosActivos(): boolean {
    return this.filtroLinea()  !== 'todos'
        || this.filtroSubcat() !== 'todas'
        || this.filtroGenero() !== 'todos'
        || this.filtroTalla()  !== null
        || this.busqueda()     !== '';
  }
}