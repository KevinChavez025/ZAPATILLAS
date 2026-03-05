import { Component, signal, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeUrlPipe } from '../../pipes/sanitize-url.pipe';

const WA_NUMBER = '51977938796';
const WA_BASE   = `https://wa.me/${WA_NUMBER}?text=`;
const WA_ICON   =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.126 1.535 5.858L.057 23.927l6.235-1.635A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.017-1.376l-.36-.213-3.7.97.988-3.608-.235-.371A9.818 9.818 0 1112 21.818z';

export type TiendaTipo = 'propia' | 'distribuidor';

export interface Tienda {
  id: number;
  nombre: string;
  ciudad: string;
  pais: string;
  horario: string;
  telefono?: string;
  tipo: TiendaTipo;
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
    { num: 1, nombre: 'Corte de cuero',           icon: '', video: 'assets/videos/paso1.webm',
      desc: 'Cada pieza se corta con precisión usando moldes propios diseñados especialmente para el pie infantil, garantizando un ajuste perfecto en cada talla.' },
    { num: 2, nombre: 'Manipulación de cueros',   icon: '', video: 'assets/videos/paso2.webm',
      desc: 'Los cortes son tratados y preparados a mano: se humedecen, moldean y acondicionan para que el cuero quede flexible y listo para el armado.' },
    { num: 3, nombre: 'Cosido',                   icon: '', video: 'assets/videos/paso5.webm',
      desc: 'Se realizan las costuras estructurales que dan firmeza al calzado. Cada punto es revisado para asegurar que soporte el movimiento activo del niño.' },
    { num: 4, nombre: 'Conformado de los cortes', icon: '', video: 'assets/videos/paso4.webm',
      desc: 'El corte armado se monta sobre una horma que replica la forma del pie del niño, dándole al zapato su silueta definitiva y su comodidad característica.' },
    { num: 5, nombre: 'Ensuelado',                icon: '', video: 'assets/videos/paso6.webm',
      desc: 'La suela antideslizante se adhiere con presión y calor, asegurando una unión duradera que protege los primeros pasos del niño en cualquier superficie.' },
    { num: 6, nombre: 'Acabado',                  icon: '', video: 'assets/videos/paso7.webm',
      desc: 'El zapato pasa por un control de calidad final: limpieza, pulido, revisión de costuras y presentación. Cada Piolito sale de fábrica listo para conquistar.' },
  ];

  pasoActivo   = 0;
  pasoAnterior = -1;
  progreso     = 0;
  private timerInterval?: ReturnType<typeof setInterval>;
  private scrollObserver?: IntersectionObserver;
  private readonly DURACION_SEG = 5;

  ngAfterViewInit() {
    // ─── Videos ──────────────────────────────────────────────────────────────
    document.querySelectorAll<HTMLVideoElement>('.pstack-video').forEach(v => {
      v.muted = true;
      v.volume = 0;
    });
    this.iniciarTimer();
    this.activarVideo(0);

    // ─── IntersectionObserver para fade-in al hacer scroll ───────────────────
    this.scrollObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            this.scrollObserver!.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const targets = document.querySelectorAll(
      '.proceso-header, .pnace-stack, .pnace-info, .tiendas-grid'
    );
    targets.forEach(el => this.scrollObserver!.observe(el));
  }

  ngOnDestroy() {
    this.detenerTimer();
    this.scrollObserver?.disconnect();
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
      const videos = document.querySelectorAll<HTMLVideoElement>('.pstack-video');
      videos.forEach((v, idx) => {
        v.muted = true;
        v.volume = 0;
        if (idx === i) { v.currentTime = 0; v.play().catch(() => {}); }
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
    {
      id: 1,
      nombre: 'Piolito — Fábrica & Showroom',
      ciudad: 'Lima',
      pais: 'Perú',
      telefono: '+51 977 938 796',
      horario: 'Lun–Sáb 9am–6pm',
      tipo: 'propia',
      destacada: true,
    },
  ];

  waTexto(t: Tienda): string {
    return encodeURIComponent(`Hola! Quisiera saber la dirección y cómo llegar a *${t.nombre}* en ${t.ciudad}, ${t.pais}.`);
  }

  togglePlay(video: HTMLVideoElement): void {
    video.muted = true;
    video.volume = 0;
    if (video.paused) { video.play(); } else { video.pause(); }
  }
}