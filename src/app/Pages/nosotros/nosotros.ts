import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

const WA_NUMBER = '51977938796';
const WA_BASE   = `https://wa.me/${WA_NUMBER}?text=`;
const WA_ICON   =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.126 1.535 5.858L.057 23.927l6.235-1.635A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.017-1.376l-.36-.213-3.7.97.988-3.608-.235-.371A9.818 9.818 0 1112 21.818z';

@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css',
})
export class Nosotros implements AfterViewInit, OnDestroy {
  readonly waBase = WA_BASE;
  readonly waIcon = WA_ICON;

  activeSlide = 1;

  ngAfterViewInit(): void {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.rise, .slide-right, .slide-up').forEach(el => io.observe(el));

    const ioTiktoks = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          ioTiktoks.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    const tiktoksSection = document.querySelector('.nos-tiktoks');
    if (tiktoksSection) ioTiktoks.observe(tiktoksSection);
  }

  ngOnDestroy(): void {}

  setActive(index: number) {
    if (this.activeSlide !== index) {
      // Pausar todos los videos al cambiar de slide
      document.querySelectorAll('.tiktok-video').forEach((v: Element) => {
        const vid = v as HTMLVideoElement;
        vid.pause();
        const ov = vid.nextElementSibling as HTMLElement;
        if (ov) ov.classList.remove('hidden');
      });
    }
    this.activeSlide = index;
  }

  onCardClick(index: number, event: Event) {
    const target = event.target as HTMLElement;
    if (target.closest('.tiktok-phone')) return;
    this.setActive(index);
  }

  toggleVideo(event: Event) {
    event.stopPropagation();
    const overlay = event.currentTarget as HTMLElement;
    const card = overlay.closest('.tiktok-card') as HTMLElement;
    const cardIndex = parseInt(card?.getAttribute('data-index') || '-1');

    // Pausar todos los otros videos siempre
    document.querySelectorAll('.tiktok-video').forEach((v: Element) => {
      const vid = v as HTMLVideoElement;
      const ov = vid.nextElementSibling as HTMLElement;
      vid.pause();
      if (ov) ov.classList.remove('hidden');
    });

    // Si no está centrada, centrarla primero
    if (cardIndex >= 0 && this.activeSlide !== cardIndex) {
      this.activeSlide = cardIndex;
    }

    // Reproducir el video de esta card
    const video = overlay.previousElementSibling as HTMLVideoElement;
    if (video && video.tagName === 'VIDEO') {
      video.play().catch(() => {});
      overlay.classList.add('hidden');
    }
  }

  get orderedCards() {
    // Orden fijo - las clases CSS controlan la posición visual
    return [0, 1, 2];
  }

  getPos(index: number): string {
    const total = 3;
    const diff = (index - this.activeSlide + total) % total;
    if (diff === 0) return 'center';
    if (diff === 1) return 'right';
    return 'left';
  }

  valores = [
    { icon: '🤝', titulo: 'Cercanía',           desc: 'Acompañamos a niños y familias con empatía, entendiendo la importancia de cada etapa del crecimiento.',                    color: 'var(--yellow)' },
    { icon: '🛡️', titulo: 'Responsabilidad',    desc: 'Diseñamos calzado que prioriza la comodidad, la seguridad y el bienestar del pie en desarrollo.',                         color: 'var(--red)'    },
    { icon: '🎯', titulo: 'Criterio y Cuidado', desc: 'Cada detalle responde a principios de desarrollo infantil y funcionalidad, no a modas pasajeras.',                        color: 'var(--navy)'   },
    { icon: '💬', titulo: 'Transparencia',       desc: 'Comunicamos con honestidad para ayudar a las familias a elegir con confianza.',                                           color: 'var(--green)'  },
  ];

  stats = [
    { n: '41',   label: 'Años de historia'  },
    { n: '1985', label: 'Año de fundación'  },
    { n: '100%', label: 'Cuero legítimo'    },
    { n: '🇵🇪',  label: 'Hecho en Perú'     },
  ];

  playVideo(event: Event) {
    (event.target as HTMLVideoElement).play();
  }
  pauseVideo(event: Event) {
    (event.target as HTMLVideoElement).pause();
  }
}