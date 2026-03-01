import { Component, signal, computed, AfterViewInit, ElementRef, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeUrlPipe } from '../../pipes/sanitize-url.pipe';

const WA_NUMBER = '51977938796';
const WA_BASE   = `https://wa.me/${WA_NUMBER}?text=`;
const WA_ICON   =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.126 1.535 5.858L.057 23.927l6.235-1.635A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.017-1.376l-.36-.213-3.7.97.988-3.608-.235-.371A9.818 9.818 0 1112 21.818z';

const GEOAPIFY_KEY = '91cddf3e33c44edda0b7d7bd77f6e710';

export type TiendaTipo = 'propia' | 'distribuidor';

export interface Tienda {
  id: number;
  nombre: string;
  ciudad: string;
  departamento: string;
  direccion: string;
  telefono?: string;
  horario: string;
  tipo: TiendaTipo;
  lat: number;
  lng: number;
  destacada?: boolean;
}

@Component({
  selector: 'app-tiendas',
  imports: [CommonModule, SanitizeUrlPipe],
  templateUrl: './tiendas.html',
  styleUrl: './tiendas.css',
})
export class Tiendas implements AfterViewInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}

  // ─── PROCESO DE FABRICACIÓN ───────────────────────────────────────────────
  readonly pasos = [
    { num: 1, nombre: 'Selección de materiales', icon: '🐄', video: 'assets/videos/paso1.mp4',
      desc: 'Elegimos cueros de primera calidad, revisados a mano por su textura, resistencia y suavidad. Solo los mejores materiales forman parte de un Piolito.' },
    { num: 2, nombre: 'Corte de cuero',           icon: '✂️', video: 'assets/videos/paso2.mp4',
      desc: 'Cada pieza se corta con precisión usando moldes propios diseñados especialmente para el pie infantil, garantizando un ajuste perfecto en cada talla.' },
    { num: 3, nombre: 'Manipulación de cueros',   icon: '🤲', video: 'assets/videos/paso3.mp4',
      desc: 'Los cortes son tratados y preparados a mano: se humedecen, moldean y acondicnan para que el cuero quede flexible y listo para el armado.' },
    { num: 4, nombre: 'Aparado de los cortes',    icon: '🧵', video: 'assets/videos/paso4.mp4',
      desc: 'Las piezas se unen con costuras finas y resistentes. Este proceso define la forma del zapato y garantiza que las uniones duren con el uso diario.' },
    { num: 5, nombre: 'Conformado de los cortes', icon: '👟', video: 'assets/videos/paso5.mp4',
      desc: 'El corte armado se monta sobre una horma que replica la forma del pie del niño, dándole al zapato su silueta definitiva y su comodidad característica.' },
    { num: 6, nombre: 'Cosido',                   icon: '🪡', video: 'assets/videos/paso6.mp4',
      desc: 'Se realizan los costuras estructurales que dan firmeza al calzado. Cada punto es revisado para asegurar que soporte el movimiento activo del niño.' },
    { num: 7, nombre: 'Ensuelado',                icon: '👞', video: 'assets/videos/paso7.mp4',
      desc: 'La suela antideslizante se adhiere con presión y calor, asegurando una unión duradera que protege los primeros pasos del niño en cualquier superficie.' },
    { num: 8, nombre: 'Acabado',                  icon: '✨', video: 'assets/videos/paso8.mp4',
      desc: 'El zapato pasa por un control de calidad final: limpieza, pulido, revisión de costuras y presentación. Cada Piolito sale de fábrica listo para conquistar.' },
  ];

  pasoActivo  = 0;
  pasoAnterior = -1;
  progreso    = 0;
  private timerInterval?: ReturnType<typeof setInterval>;
  private readonly DURACION_SEG = 5;

  ngAfterViewInit() {
    this.iniciarTimer();
  }

  ngOnDestroy() {
    this.detenerTimer();
  }

  private iniciarTimer() {
    this.detenerTimer();
    this.progreso = 0;
    const intervalo = 100;
    const totalTicks = (this.DURACION_SEG * 1000) / intervalo;
    let tick = 0;
    this.timerInterval = setInterval(() => {
      tick++;
      this.progreso = (tick / totalTicks) * 100;
      this.cdr.detectChanges();
      if (tick >= totalTicks) { this.siguientePaso(); }
    }, intervalo);
  }

  private detenerTimer() {
    if (this.timerInterval) { clearInterval(this.timerInterval); }
  }

  private activarVideo(i: number) {
    setTimeout(() => {
      const videos = document.querySelectorAll<HTMLVideoElement>('.reel-video');
      videos.forEach((v, idx) => {
        if (idx === i) { v.currentTime = 0; v.play(); }
        else { v.pause(); }
      });
    }, 50);
  }

  siguientePaso() {
    this.pasoAnterior = this.pasoActivo;
    this.pasoActivo = (this.pasoActivo + 1) % this.pasos.length;
    this.iniciarTimer();
    this.activarVideo(this.pasoActivo);
    setTimeout(() => { this.pasoAnterior = -1; this.cdr.detectChanges(); }, 600);
  }

  irAPaso(i: number) {
    if (i === this.pasoActivo) return;
    this.pasoAnterior = this.pasoActivo;
    this.pasoActivo = i;
    this.iniciarTimer();
    this.activarVideo(this.pasoActivo);
    setTimeout(() => { this.pasoAnterior = -1; this.cdr.detectChanges(); }, 600);
  }

  readonly waBase = WA_BASE;
  readonly waIcon = WA_ICON;

  readonly tiendas: Tienda[] = [
    { id: 1, nombre: 'Piolito — Fábrica & Showroom', ciudad: 'Lima', departamento: 'Lima', direccion: 'Jr. Domingo Elias 752, Surquillo', telefono: '+51 977 938 796', horario: 'Lun–Sáb 9am–6pm', tipo: 'propia', lat: -12.1127569, lng: -77.0238865, destacada: true },
  ];

  readonly departamentos = ['Todos'];

  filtroDept   = signal<string>('Todos');
  filtroTipo   = signal<string>('todos');
  tiendaActiva = signal<Tienda | null>(this.tiendas[0]);

  readonly tiendaFiltradas = computed(() => this.tiendas);

  seleccionar(t: Tienda): void { this.tiendaActiva.set(t); }

  mapUrl(t: Tienda): string {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(t.direccion + ', ' + t.ciudad + ', Perú')}`;
  }

  waTexto(t: Tienda): string {
    return encodeURIComponent(`Hola! Quisiera saber el horario y cómo llegar a *${t.nombre}* en ${t.ciudad}.`);
  }
mapaImagenUrl(t: Tienda): string {
  return `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=800&height=450&center=lonlat:${t.lng},${t.lat}&zoom=16&marker=lonlat:${t.lng},${t.lat}&apiKey=${GEOAPIFY_KEY}`;
}
}