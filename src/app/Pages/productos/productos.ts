import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

const WA_NUMBER = '51933444277';
const WA_BASE   = `https://wa.me/${WA_NUMBER}?text=`;
const WA_ICON   =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.126 1.535 5.858L.057 23.927l6.235-1.635A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.017-1.376l-.36-.213-3.7.97.988-3.608-.235-.371A9.818 9.818 0 1112 21.818z';

export type LineaKey  = 'baby-piolito' | 'tilin' | 'piolito' | 'urbano';
export type GeneroKey = 'nino' | 'nina' | 'ambos';

export interface Producto {
  id: number;
  codigo: string;
  linea: LineaKey;
  genero: GeneroKey;
  etapa: string;
  tallas: string;
  tallasArray: number[];
  colores: string[];
  imagen: string;
  descripcion: string;
  nuevo?: boolean;
  temporada?: string;
}

@Component({
  selector: 'app-productos',
  imports: [CommonModule],
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
          document.querySelector('.linea-tabs')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    { key: 'urbano',       label: 'Urbano',       color: '#089347' },
  ];

  readonly etapas: Record<string, string[]> = {
    'baby-piolito': ['Recién Nacidos (15-19)'],
    'tilin':        ['Primeros Pasos (18-21)'],
    'piolito':      ['Todo Camina (22-26)', 'Kids (27-32)', 'Juvenil (33-38)'],
    'urbano':       ['Kids (27-32)', 'Escolar (27-38)', 'Juvenil (33-38)'],
    'todos':        ['Todo Camina (22-26)', 'Kids (27-32)', 'Juvenil (33-38)', 'Primeros Pasos (18-21)', 'Recién Nacidos (15-19)', 'Escolar (27-38)'],
  };

  // ─── FILTROS (signals) ────────────────────────────────────────────────────
  filtroLinea   = signal<string>('todos');
  filtroGenero  = signal<string>('todos');
  filtroEtapa   = signal<string>('todas');
  filtroTalla   = signal<number | null>(null);
  busqueda      = signal<string>('');
  vistaGrid     = signal<boolean>(true);
  productoModal = signal<Producto | null>(null);

  // ─── CATÁLOGO ─────────────────────────────────────────────────────────────
  readonly todos: Producto[] = [
    // ── BABY PIOLITO ──
    { id: 1,  codigo: 'BP-001', linea: 'baby-piolito', genero: 'nino',  etapa: 'Recién Nacidos (15-19)', tallas: '15-19', tallasArray: [15,16,17,18,19], colores: ['#8B4513','#F5F5DC'],           imagen: 'assets/productos/bp-001.jpg',  descripcion: 'Cuero floter marrón · Forro badana ovino · Planta caucho',                                              nuevo: true, temporada: 'Otoño/Invierno' },
    { id: 2,  codigo: 'BP-002', linea: 'baby-piolito', genero: 'nina',  etapa: 'Recién Nacidos (15-19)', tallas: '15-19', tallasArray: [15,16,17,18,19], colores: ['#FFB6C1','#FFFFFF'],           imagen: 'assets/productos/bp-002.jpg',  descripcion: 'Cuero liso blanco · Forro badana ovino · Planta caucho natural',                                        nuevo: true },
    { id: 3,  codigo: 'BP-003', linea: 'baby-piolito', genero: 'ambos', etapa: 'Recién Nacidos (15-19)', tallas: '15-19', tallasArray: [15,16,17,18,19], colores: ['#ECC238','#343594'],           imagen: 'assets/productos/bp-003.jpg',  descripcion: 'Cuero anapado azul · Forro badana ovino · Planta driver natural' },
    // ── TILIN ──
    { id: 4,  codigo: 'TL-001', linea: 'tilin',        genero: 'nino',  etapa: 'Primeros Pasos (18-21)', tallas: '18-21', tallasArray: [18,19,20,21],    colores: ['#8B4513','#F5F5DC'],           imagen: 'assets/productos/tl-001.jpg',  descripcion: 'Cuero floter marrón · Forro badana · Planta caucho antideslizante',                                     nuevo: true },
    { id: 5,  codigo: 'TL-002', linea: 'tilin',        genero: 'nina',  etapa: 'Primeros Pasos (18-21)', tallas: '18-21', tallasArray: [18,19,20,21],    colores: ['#FFB6C1','#FF69B4','#FFFFFF'], imagen: 'assets/productos/tl-002.jpg',  descripcion: 'Cuero gamuzón naranja · Correas acolchadas · Planta caucho' },
    { id: 6,  codigo: 'TL-003', linea: 'tilin',        genero: 'ambos', etapa: 'Primeros Pasos (18-21)', tallas: '18-21', tallasArray: [18,19,20,21],    colores: ['#F5F5DC','#D2B48C'],           imagen: 'assets/productos/tl-003.jpg',  descripcion: 'Cuero gamuzón arena · Forro badana ovino · Planta caucho' },
    // ── PIOLITO — NIÑO ──
    { id: 7,  codigo: '3172',    linea: 'piolito',     genero: 'nino',  etapa: 'Todo Camina (22-26)',    tallas: '22-26', tallasArray: [22,23,24,25,26], colores: ['#8B4513','#F5F5DC'],           imagen: 'assets/productos/3172.jpg',    descripcion: 'Cuero floter marrón · Forro badana ovino color manteca · Planta huella América natura',                nuevo: true },
    { id: 8,  codigo: '106-I5',  linea: 'piolito',     genero: 'nino',  etapa: 'Todo Camina (22-26)',    tallas: '22-26', tallasArray: [22,23,24,25,26], colores: ['#8B4513','#FF8C00'],           imagen: 'assets/productos/106-i5.jpg',  descripcion: 'Cuero gamuzón marrón con correas acolchadas en renobuck naranja · Forro badana · Planta caucho' },
    { id: 9,  codigo: '1053',    linea: 'piolito',     genero: 'nino',  etapa: 'Todo Camina (22-26)',    tallas: '22-26', tallasArray: [22,23,24,25,26], colores: ['#F5F5DC'],                     imagen: 'assets/productos/1053.jpg',    descripcion: 'Cuero gamuzón arena · Forro badana ovino color manteca · Planta caucho' },
    { id: 10, codigo: '3110',    linea: 'piolito',     genero: 'nino',  etapa: 'Kids (27-32)',           tallas: '27-32', tallasArray: [27,28,29,30,31,32], colores: ['#6B4423'],                  imagen: 'assets/productos/3110.jpg',    descripcion: 'Cuero NBK cocoa modelo tipo Oxford · Forro badana ovino · Planta huella caucho natural' },
    { id: 11, codigo: '3132',    linea: 'piolito',     genero: 'nino',  etapa: 'Kids (27-32)',           tallas: '27-32', tallasArray: [27,28,29,30,31,32], colores: ['#2F2F2F'],                  imagen: 'assets/productos/3132.jpg',    descripcion: 'Cuero graso moro · Forro badana color manteca · Planta huella caucho con cerco suela' },
    { id: 12, codigo: 'BR09-I5', linea: 'piolito',     genero: 'nino',  etapa: 'Juvenil (33-38)',        tallas: '33-38', tallasArray: [33,34,35,36,37,38], colores: ['#8B4513'],                  imagen: 'assets/productos/br09-i5.jpg', descripcion: 'Cuero floter marrón · Forro badana ovino color manteca · Planta caucho' },
    { id: 13, codigo: 'BR10-I5', linea: 'piolito',     genero: 'nino',  etapa: 'Juvenil (33-38)',        tallas: '33-38', tallasArray: [33,34,35,36,37,38], colores: ['#1a1a1a'],                  imagen: 'assets/productos/br10-i5.jpg', descripcion: 'Cuero anapado negro · Forro badana ovino color manteca · Planta caucho negro' },
    // ── PIOLITO — NIÑA ──
    { id: 14, codigo: 'AM01-V6', linea: 'piolito',     genero: 'nina',  etapa: 'Todo Camina (22-26)',    tallas: '22-26', tallasArray: [22,23,24,25,26], colores: ['#CFB53B','#D4AF37'],           imagen: 'assets/productos/am01-v6.jpg', descripcion: 'Cuero grabado dorado mate · Forro badana ovino · Planta huella caucho con cerco de yute',              nuevo: true },
    { id: 15, codigo: 'PBB57',   linea: 'piolito',     genero: 'nina',  etapa: 'Kids (27-32)',           tallas: '27-32', tallasArray: [27,28,29,30,31,32], colores: ['#F5F5DC'],                  imagen: 'assets/productos/pbb57.jpg',   descripcion: 'Cuero liso natural · Forro badana ovino · Planta huella caucho natural con cerco suela' },
    { id: 16, codigo: 'PBB105',  linea: 'piolito',     genero: 'nina',  etapa: 'Kids (27-32)',           tallas: '27-32', tallasArray: [27,28,29,30,31,32], colores: ['#343594'],                  imagen: 'assets/productos/pbb105.jpg',  descripcion: 'Cuero anapado azul · Forro badana ovino color manteca · Planta driver natural' },
    { id: 17, codigo: '814',     linea: 'piolito',     genero: 'nina',  etapa: 'Juvenil (33-38)',        tallas: '33-38', tallasArray: [33,34,35,36,37,38], colores: ['#1a1a1a'],                  imagen: 'assets/productos/814.jpg',     descripcion: 'Cuero charol negro con flor pompom en gamuza · Forro badana · Planta caucho negro',                   nuevo: true },
    { id: 18, codigo: 'CH02-V5', linea: 'piolito',     genero: 'nina',  etapa: 'Juvenil (33-38)',        tallas: '33-38', tallasArray: [33,34,35,36,37,38], colores: ['#FFFFFF'],                  imagen: 'assets/productos/ch02-v5.jpg', descripcion: 'Cuero anapado blanco · Forro badana ovino · Planta huella caucho natural con cerco suela' },
    // ── URBANO — NIÑO ──
    { id: 19, codigo: 'UR-101',  linea: 'urbano',      genero: 'nino',  etapa: 'Kids (27-32)',           tallas: '27-32', tallasArray: [27,28,29,30,31,32], colores: ['#1a1a1a','#C22D31'],        imagen: 'assets/productos/tb-101.jpg',  descripcion: 'Comfort flex PU · Diseño deportivo · Planta agresiva poliuretano',                                     nuevo: true },
    { id: 20, codigo: 'UR-102',  linea: 'urbano',      genero: 'nino',  etapa: 'Escolar (27-38)',        tallas: '27-38', tallasArray: [27,28,29,30,31,32,33,34,35,36,37,38], colores: ['#343594','#FFFFFF'], imagen: 'assets/productos/tb-102.jpg', descripcion: 'Comfort flex PU · Estilo escolar · Planta poliuretano resistente' },
    { id: 21, codigo: 'UR-103',  linea: 'urbano',      genero: 'nino',  etapa: 'Juvenil (33-38)',        tallas: '33-38', tallasArray: [33,34,35,36,37,38], colores: ['#2F2F2F','#ECC238'],        imagen: 'assets/productos/tb-103.jpg',  descripcion: 'Comfort flex PU · Tendencia juvenil · Planta agresiva bicolor' },
    // ── URBANO — NIÑA ──
    { id: 22, codigo: 'UR-201',  linea: 'urbano',      genero: 'nina',  etapa: 'Kids (27-32)',           tallas: '27-32', tallasArray: [27,28,29,30,31,32], colores: ['#FF69B4','#FFFFFF'],        imagen: 'assets/productos/tb-201.jpg',  descripcion: 'Comfort flex PU · Sandalia juvenil · Planta poliuretano' },
    { id: 23, codigo: 'UR-202',  linea: 'urbano',      genero: 'nina',  etapa: 'Escolar (27-38)',        tallas: '27-38', tallasArray: [27,28,29,30,31,32,33,34,35,36,37,38], colores: ['#1a1a1a','#FFB6C1'], imagen: 'assets/productos/tb-202.jpg', descripcion: 'Comfort flex PU · Estilo escolar femenino · Planta poliuretano' },
    { id: 24, codigo: 'UR-203',  linea: 'urbano',      genero: 'nina',  etapa: 'Juvenil (33-38)',        tallas: '33-38', tallasArray: [33,34,35,36,37,38], colores: ['#DDA0DD','#FFFFFF'],        imagen: 'assets/productos/tb-203.jpg',  descripcion: 'Comfort flex PU · Moda juvenil · Planta agresiva' },
  ];

  // ─── COMPUTED ─────────────────────────────────────────────────────────────
  readonly productosFiltrados = computed(() => {
    const linea  = this.filtroLinea();
    const genero = this.filtroGenero();
    const etapa  = this.filtroEtapa();
    const talla  = this.filtroTalla();
    const busq   = this.busqueda().toLowerCase().trim();

    return this.todos.filter(p => {
      if (linea  !== 'todos' && p.linea  !== linea)                           return false;
      if (genero !== 'todos' && p.genero !== genero && p.genero !== 'ambos') return false;
      if (etapa  !== 'todas' && p.etapa  !== etapa)                           return false;
      if (talla  !== null    && !p.tallasArray.includes(talla))               return false;
      if (busq && !p.codigo.toLowerCase().includes(busq) && !p.descripcion.toLowerCase().includes(busq)) return false;
      return true;
    });
  });

  readonly etapasDisponibles = computed(() => {
    const linea = this.filtroLinea();
    return linea === 'todos' ? this.etapas['todos'] : (this.etapas[linea] ?? []);
  });

  readonly tallasDisponibles = computed(() => {
    const linea  = this.filtroLinea();
    const genero = this.filtroGenero();
    const etapa  = this.filtroEtapa();
    const set = new Set<number>();
    this.todos
      .filter(p => {
        if (linea  !== 'todos' && p.linea  !== linea)                           return false;
        if (genero !== 'todos' && p.genero !== genero && p.genero !== 'ambos') return false;
        if (etapa  !== 'todas' && p.etapa  !== etapa)                           return false;
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
    'urbano':       '#089347',
  };

  private readonly lineaLabelMap: Record<string, string> = {
    'baby-piolito': 'Baby Piolito',
    'tilin':        'Tilin',
    'piolito':      'Piolito',
    'urbano':       'Urbano',
  };

  lineaColor(linea: string): string { return this.lineaColorMap[linea] ?? '#343594'; }
  lineaLabel(linea: string): string { return this.lineaLabelMap[linea] ?? linea; }

  generoLabel(g: string): string {
    if (g === 'nino') return '👦 Niño';
    if (g === 'nina') return '👧 Niña';
    return '👦👧 Ambos';
  }

  // ─── ACCIONES ────────────────────────────────────────────────────────────
  setLinea(linea: string): void  { this.filtroLinea.set(linea); this.filtroEtapa.set('todas'); this.filtroTalla.set(null); }
  setGenero(g: string): void     { this.filtroGenero.set(g); this.filtroTalla.set(null); }
  setEtapa(e: string): void      { this.filtroEtapa.set(e); this.filtroTalla.set(null); }
  toggleTalla(t: number): void   { this.filtroTalla.set(this.filtroTalla() === t ? null : t); }
  abrirModal(p: Producto): void  { this.productoModal.set(p); }
  cerrarModal(): void            { this.productoModal.set(null); }

  limpiarFiltros(): void {
    this.filtroLinea.set('todos');
    this.filtroGenero.set('todos');
    this.filtroEtapa.set('todas');
    this.filtroTalla.set(null);
    this.busqueda.set('');
  }

  waTexto(p: Producto): string {
    return encodeURIComponent(
      `Hola! Me interesa el modelo *${p.codigo}* de la línea *${this.lineaLabel(p.linea)}*.\n` +
      `Tallas disponibles: ${p.tallas}\n` +
      `¿Podrían darme más información?`
    );
  }

  hayFiltrosActivos(): boolean {
    return this.filtroLinea()  !== 'todos'
        || this.filtroGenero() !== 'todos'
        || this.filtroEtapa()  !== 'todas'
        || this.filtroTalla()  !== null
        || this.busqueda()     !== '';
  }
}