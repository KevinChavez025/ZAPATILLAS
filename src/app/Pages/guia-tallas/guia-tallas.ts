import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

const WA_NUMBER = '51933444277';
const WA_BASE   = `https://wa.me/${WA_NUMBER}?text=`;

interface TallaRow {
  cms: number;
  talla: number;
}

interface Linea {
  nombre: string;
  rango: string;
  edad: string;
  color: string;
  icon: string;
  tallas: number[];
}

@Component({
  selector: 'app-guia-tallas',
  imports: [CommonModule, RouterLink],
  templateUrl: './guia-tallas.html',
  styleUrl: './guia-tallas.css',
})
export class GuiaTallas implements AfterViewInit {

  readonly waBase = WA_BASE;

  ngAfterViewInit(): void {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.rise').forEach(el => io.observe(el));
  }

  readonly tallas: TallaRow[] = [
    { cms: 9.7,  talla: 16 },
    { cms: 10.4, talla: 17 },
    { cms: 11,   talla: 18 },
    { cms: 11.7, talla: 19 },
    { cms: 12.4, talla: 20 },
    { cms: 13,   talla: 21 },
    { cms: 13.7, talla: 22 },
    { cms: 14.4, talla: 23 },
    { cms: 15,   talla: 24 },
    { cms: 15.7, talla: 25 },
    { cms: 16.4, talla: 26 },
    { cms: 17,   talla: 27 },
    { cms: 17.7, talla: 28 },
    { cms: 18.4, talla: 29 },
    { cms: 19,   talla: 30 },
    { cms: 19.7, talla: 31 },
    { cms: 20.4, talla: 32 },
    { cms: 21,   talla: 33 },
    { cms: 21.7, talla: 34 },
    { cms: 22.4, talla: 35 },
    { cms: 23,   talla: 36 },
    { cms: 23.7, talla: 37 },
    { cms: 24.4, talla: 38 },
  ];

  readonly lineas: Linea[] = [
    {
      nombre: 'Baby Piolito',
      rango:  'Tallas 16 – 19',
      edad:   '0 – 7 meses',
      color:  '#C22D31',
      icon:   '🍼',
      tallas: [16, 17, 18, 19],
    },
    {
      nombre: 'Tilin',
      rango:  'Tallas 18 – 21',
      edad:   '8 – 18 meses',
      color:  '#343594',
      icon:   '👣',
      tallas: [18, 19, 20, 21],
    },
    {
      nombre: 'Piolito',
      rango:  'Tallas 22 – 38',
      edad:   '18 meses – 9 años',
      color:  '#d4a800',
      icon:   '🏃',
      tallas: [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
    },
    {
      nombre: 'Escolar',
      rango:  'Tallas 27 – 38',
      edad:   '9 – 14 años',
      color:  '#089347',
      icon:   '⚡',
      tallas: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38],
    },
  ];

  readonly steps = [
    { num: '01', title: 'Coloca el pie',      desc: 'Pon el pie del niño sobre una hoja de papel en el suelo, con el talón contra la pared.' },
    { num: '02', title: 'Marca la longitud',   desc: 'Traza una línea en el punto más largo del pie (generalmente el dedo gordo o el segundo dedo).' },
    { num: '03', title: 'Mide en centímetros', desc: 'Con una regla mide desde la pared hasta la marca. Esa es la longitud del pie.' },
    { num: '04', title: 'Busca tu talla',      desc: 'Encuentra el centímetro en la tabla y selecciona la talla correspondiente.' },
  ];

  scrollToTabla(e: Event): void {
    e.preventDefault();
    const el = document.getElementById('tabla');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  isInLinea(talla: number, linea: Linea): boolean {
    return linea.tallas.includes(talla);
  }
}