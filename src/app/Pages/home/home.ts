import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PRODUCTOS } from '../../data/productos.data';
import { SanitizeUrlPipe } from '../../pipes/sanitize-url.pipe';

const WA_NUMBER = '51933444277';
const WA_BASE   = `https://wa.me/${WA_NUMBER}?text=`;
const WA_ICON   =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.126 1.535 5.858L.057 23.927l6.235-1.635A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.017-1.376l-.36-.213-3.7.97.988-3.608-.235-.371A9.818 9.818 0 1112 21.818z';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SanitizeUrlPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {

  constructor(private router: Router) {}

  readonly waBase = WA_BASE;
  readonly waIcon = WA_ICON;

  readonly colorDots = [
    { color: '#C22D31', label: 'Baby Piolito' },
    { color: '#343594', label: 'Tilin' },
    { color: '#ECC238', label: 'Piolito' },
    { color: '#089347', label: 'Escolar' },
  ];

  readonly categorias = [
    { nombre: 'Baby Piolito', edad: '0 – 7 meses',  tallas: '15 – 19', img: 'babypiolito.webp', gradient: 'linear-gradient(160deg, #9e2428, #C22D31)', linea: 'baby-piolito' },
    { nombre: 'Tilin',        edad: '8 – 18 meses',  tallas: '18 – 21', img: 'tilinpiolito.webp', gradient: 'linear-gradient(160deg, #27287a, #343594)', linea: 'tilin' },
    { nombre: 'Piolito',      edad: '18m – 9 años',  tallas: '22 – 38', img: 'Piolito.webp', gradient: 'linear-gradient(160deg, #d4a800, #ECC238)', linea: 'piolito' },
    { nombre: 'Escolar',       edad: '9 – 14 años',   tallas: '27 – 38', img: 'Urbanopiolito.webp',  gradient: 'linear-gradient(160deg, #075e2e, #089347)', linea: 'urbano' },
  ];

  readonly features = [
    { icon: '🦶', title: 'Arco Semi-Ortopédico',  desc: 'Facilita el desarrollo correcto del pie y previene malformaciones desde los primeros pasos.',   color: '#C22D31' },
    { icon: '🐄', title: 'Cuero Legítimo',         desc: 'Materiales de primera calidad con forro de badana natural para máxima comodidad y durabilidad.', color: '#343594' },
    { icon: '🛡️', title: 'Planta Antideslizante',  desc: 'Caucho de alta resistencia para pasos firmes y seguros en cualquier superficie.',                color: '#ECC238' },
    { icon: '📏', title: 'Guía de Tallas',          desc: 'Sistema de tallas adaptado al crecimiento natural del pie infantil peruano, de la 15 a la 38.', color: '#089347' },
  ];

  readonly storeInfo = [
    { icon: '📍', label: 'Dirección', value: 'Jr. Domingo Elias 752, Surquillo, Lima' },
    { icon: '📞', label: 'Teléfono',  value: '+511-445-3495' },
    { icon: '✉️', label: 'Email',     value: 'contacto@piolito.com' },
    { icon: '🕐', label: 'Horario',   value: 'Lun – Sáb: 9:00 am – 6:00 pm' },
  ];

  readonly destacados = PRODUCTOS.filter(p => p.destacado);

  readonly ciudades = [
    { nombre: 'Perú',      tiendas: 4, color: '#C22D31' },
    { nombre: 'Colombia',  tiendas: 3, color: '#ECC238' },
    { nombre: 'Ecuador',   tiendas: 2, color: '#089347' },
    { nombre: 'Chile',     tiendas: 2, color: '#ECC238' },
    { nombre: 'Bolivia',   tiendas: 1, color: '#ECC238' },
    { nombre: 'México',    tiendas: 1, color: '#ECC238' },
  ];

  private readonly lineaLabelMap: Record<string, string> = {
    'baby-piolito': 'Baby Piolito',
    'tilin':        'Tilin',
    'piolito':      'Piolito',
    'escolar':      'Escolar',
  };
  private readonly lineaColorMap: Record<string, string> = {
    'baby-piolito': '#C22D31',
    'tilin':        '#343594',
    'piolito':      '#d4a800',
    'escolar':      '#089347',
  };
  lineaLabel(linea: string): string { return this.lineaLabelMap[linea] ?? linea; }
  lineaColor(linea: string): string { return this.lineaColorMap[linea] ?? '#343594'; }

  tipoLabel(t: string): string {
    if (t === 'zapato')    return '👞 Zapato';
    if (t === 'sandalia')  return '👡 Sandalia';
    if (t === 'zapatilla') return '👟 Zapatilla';
    return t;
  }

  private readonly subcatLabelMap: Record<string, string> = {
    'bp-otono-invierno-ninos':   '🍂 Otoño / Invierno Niños',
    'bp-primavera-verano-ninas': '🌸 Primavera / Verano Niñas',
    'pio-sandalias-verano-nina': '👡 Sandalias Verano Niña',
    'pio-sandalias-verano-nino': '👟 Sandalias Verano Niño',
    'pio-zapato-cerrado-nina':   '👞 Zapato Cerrado Niña',
    'pio-zapatos-zapatillas':    '👟 Zapatos y Zapatillas',
    'tl-invierno-ninas':         '🍂 Invierno Niñas',
    'tl-invierno-ninos':         '🍂 Invierno Niños',
    'escolar':                   '🎒 Escolar',
  };
  subcatLabel(key: string): string { return this.subcatLabelMap[key] ?? key; }

  encodeWA(p: { codigo: string; linea: string }): string {
    return encodeURIComponent(`Hola! Me interesa el modelo *${p.codigo}* de la línea *${this.lineaLabel(p.linea)}*. ¿Pueden darme más info?`);
  }

  irAColeccion(linea: string): void {
    this.router.navigate(['/productos'], { queryParams: { linea } });
  }

  ngAfterViewInit(): void {
    // ── Intersection observer para animaciones .rise ──
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.rise').forEach(el => io.observe(el));

    // ── Forzar reproducción del video del globo ──
    const video = document.querySelector('.globe-video') as HTMLVideoElement;
    if (video) {
      video.muted = true;
      video.loop = true;
      video.autoplay = true;
      video.playsInline = true;
      video.play().catch(() => {
        // Si falla el autoplay, intentar al primer click/touch
        const playOnInteraction = () => {
          video.play();
          document.removeEventListener('click', playOnInteraction);
          document.removeEventListener('touchstart', playOnInteraction);
        };
        document.addEventListener('click', playOnInteraction);
        document.addEventListener('touchstart', playOnInteraction);
      });
    }
  }
}