import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {

  readonly waBase = 'https://wa.me/51987654321?text=';

  readonly waIcon = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.126 1.535 5.858L.057 23.927l6.235-1.635A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.017-1.376l-.36-.213-3.7.97.988-3.608-.235-.371A9.818 9.818 0 1112 21.818z';

  readonly colorDots = [
    { color: '#C22D31', label: 'Baby Piolito' },
    { color: '#343594', label: 'Tilin' },
    { color: '#ECC238', label: 'Piolito' },
    { color: '#089347', label: 'Tobago' },
  ];

  readonly categorias = [
    { nombre: 'Baby Piolito', edad: '0 – 7 meses',   tallas: '15 – 19', icon: '🍼', gradient: 'linear-gradient(160deg, #9e2428, #C22D31)' },
    { nombre: 'Tilin',        edad: '8 – 18 meses',   tallas: '18 – 21', icon: '👣', gradient: 'linear-gradient(160deg, #27287a, #343594)' },
    { nombre: 'Piolito',      edad: '18m – 9 años',   tallas: '22 – 38', icon: '🏃', gradient: 'linear-gradient(160deg, #d4a800, #ECC238)' },
    { nombre: 'Tobago',       edad: '9 – 14 años',    tallas: '27 – 38', icon: '⚡', gradient: 'linear-gradient(160deg, #075e2e, #089347)' },
  ];

  readonly features = [
    { icon: '🦶', title: 'Arco Semi-Ortopédico',  desc: 'Facilita el desarrollo correcto del pie y previene malformaciones desde los primeros pasos.', color: '#C22D31' },
    { icon: '🐄', title: 'Cuero Legítimo',         desc: 'Materiales de primera calidad con forro de badana natural para máxima comodidad y durabilidad.', color: '#343594' },
    { icon: '🛡️', title: 'Planta Antideslizante',  desc: 'Caucho de alta resistencia para pasos firmes y seguros en cualquier superficie.', color: '#ECC238' },
    { icon: '📏', title: 'Guía de Tallas',          desc: 'Sistema de tallas adaptado al crecimiento natural del pie infantil peruano, de la 15 a la 38.', color: '#089347' },
  ];

  readonly storeInfo = [
    { icon: '📍', label: 'Dirección', value: 'Jr. Domingo Elias 752, Surquillo, Lima' },
    { icon: '📞', label: 'Teléfono',  value: '+511-445-3495' },
    { icon: '✉️', label: 'Email',     value: 'contacto@piolito.com' },
    { icon: '🕐', label: 'Horario',   value: 'Lun – Sáb: 9:00 am – 6:00 pm' },
  ];

  // ─── PRODUCTOS DESTACADOS ───
  readonly destacados = [
    { id: 1,  codigo: '3172',    linea: 'Piolito',      etapa: 'Todo Camina',  tallas: '22-26', colores: ['#8B4513','#F5F5DC'], color: '#ECC238', badge: '🔥 Más vendido' },
    { id: 2,  codigo: 'AM01-V6', linea: 'Piolito',      etapa: 'Todo Camina',  tallas: '22-26', colores: ['#CFB53B','#D4AF37'], color: '#ECC238', badge: '✨ Nuevo' },
    { id: 3,  codigo: '814',     linea: 'Piolito',      etapa: 'Juvenil',      tallas: '33-38', colores: ['#1a1a1a'],           color: '#ECC238', badge: '✨ Nuevo' },
    { id: 4,  codigo: 'TL-001',  linea: 'Tilin',        etapa: 'Primeros Pasos',tallas: '18-21',colores: ['#8B4513','#F5F5DC'], color: '#343594', badge: '🔥 Más vendido' },
    { id: 5,  codigo: 'BP-002',  linea: 'Baby Piolito', etapa: 'Recién Nacidos',tallas: '15-19',colores: ['#FFB6C1','#FFFFFF'], color: '#C22D31', badge: '✨ Nuevo' },
    { id: 6,  codigo: 'TB-101',  linea: 'Tobago',       etapa: 'Kids',         tallas: '27-32', colores: ['#1a1a1a','#C22D31'], color: '#089347', badge: '✨ Nuevo' },
  ];

  // ─── CIUDADES PARA MAPA ───
  readonly ciudades = [
    { nombre: 'Lima',      tiendas: 4, color: '#C22D31' },
    { nombre: 'Trujillo',  tiendas: 2, color: '#ECC238' },
    { nombre: 'Cusco',     tiendas: 2, color: '#089347' },
    { nombre: 'Arequipa',  tiendas: 1, color: '#ECC238' },
    { nombre: 'Piura',     tiendas: 1, color: '#ECC238' },
  ];

  encodeWA(p: any): string {
    return encodeURIComponent(`Hola! Me interesa el modelo *${p.codigo}* de la línea *${p.linea}*. ¿Pueden darme más info?`);
  }

  ngAfterViewInit() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.rise').forEach(el => io.observe(el));
  }
}
