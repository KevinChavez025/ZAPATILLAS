import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SanitizeUrlPipe } from '../../pipes/sanitize-url.pipe';

const WA_NUMBER = '51933444277';
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
    { id: 1,  nombre: 'Piolito — Surquillo',         ciudad: 'Lima',     departamento: 'Lima',        direccion: 'Jr. Domingo Elias 752, Surquillo',       telefono: '+511-445-3495', horario: 'Lun–Sáb 9am–6pm', tipo: 'propia',       lat: -12.1119, lng: -77.0282, destacada: true },
    { id: 2,  nombre: 'Piolito — SJL',               ciudad: 'Lima',     departamento: 'Lima',        direccion: 'Av. Gran Chimú 410, SJL',                telefono: '+511-445-3495', horario: 'Lun–Sáb 9am–6pm', tipo: 'propia',       lat: -11.9833, lng: -77.0100 },
    { id: 3,  nombre: 'Distribuidora Lima Centro',    ciudad: 'Lima',     departamento: 'Lima',        direccion: 'Jr. Gamarra 880, La Victoria',                                      horario: 'Lun–Sáb 9am–7pm', tipo: 'distribuidor', lat: -12.0653, lng: -77.0185 },
    { id: 4,  nombre: 'Distribuidora Lima Norte',     ciudad: 'Lima',     departamento: 'Lima',        direccion: 'Av. Túpac Amaru 1200, Independencia',                               horario: 'Lun–Sáb 9am–6pm', tipo: 'distribuidor', lat: -11.9900, lng: -77.0550 },
    { id: 5,  nombre: 'Piolito — Trujillo',           ciudad: 'Trujillo', departamento: 'La Libertad', direccion: 'Jr. Pizarro 543, Centro de Trujillo',   telefono: '+51-44-123456', horario: 'Lun–Sáb 9am–7pm', tipo: 'propia',       lat: -8.1116,  lng: -79.0287 },
    { id: 6,  nombre: 'Distribuidora Trujillo Norte', ciudad: 'Trujillo', departamento: 'La Libertad', direccion: 'Av. España 1500, Trujillo',                                         horario: 'Lun–Sáb 9am–6pm', tipo: 'distribuidor', lat: -8.0952,  lng: -79.0238 },
    { id: 7,  nombre: 'Piolito — Cusco',              ciudad: 'Cusco',    departamento: 'Cusco',       direccion: 'Av. El Sol 320, Cusco',                 telefono: '+51-84-234567', horario: 'Lun–Sáb 9am–6pm', tipo: 'propia',       lat: -13.5319, lng: -71.9675 },
    { id: 8,  nombre: 'Distribuidora Cusco Centro',   ciudad: 'Cusco',    departamento: 'Cusco',       direccion: 'Calle Heladeros 156, Cusco',                                        horario: 'Lun–Dom 9am–7pm', tipo: 'distribuidor', lat: -13.5220, lng: -71.9780 },
    { id: 9,  nombre: 'Distribuidora Arequipa',       ciudad: 'Arequipa', departamento: 'Arequipa',    direccion: 'Calle Mercaderes 234, Arequipa',                                    horario: 'Lun–Sáb 9am–6pm', tipo: 'distribuidor', lat: -16.3989, lng: -71.5369 },
    { id: 10, nombre: 'Distribuidora Piura',          ciudad: 'Piura',    departamento: 'Piura',       direccion: 'Av. Grau 780, Piura',                                               horario: 'Lun–Sáb 9am–6pm', tipo: 'distribuidor', lat: -5.1945,  lng: -80.6328 },
  ];

  readonly departamentos = ['Todos', ...Array.from(new Set(this.tiendas.map(t => t.departamento)))];

  filtroDept   = signal<string>('Todos');
  filtroTipo   = signal<string>('todos');
  tiendaActiva = signal<Tienda | null>(this.tiendas[0]);

  readonly tiendaFiltradas = computed(() => {
    const dept = this.filtroDept();
    const tipo = this.filtroTipo();
    return this.tiendas.filter(t => {
      if (dept !== 'Todos' && t.departamento !== dept) return false;
      if (tipo !== 'todos' && t.tipo          !== tipo) return false;
      return true;
    });
  });

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