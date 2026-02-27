import { Component, signal, computed } from '@angular/core';
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
export class Tiendas {

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

  iframeUrl(t: Tienda): string {
    const q = encodeURIComponent(t.direccion + ', ' + t.ciudad + ', Peru');
    return `https://maps.google.com/maps?q=${q}&z=15&output=embed`;
  }
}