import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

const BASE_URL = 'https://piolito.com';

const PAGE_META: Record<string, { title: string; description: string }> = {
  '':             { title: 'Piolito — Calzado Infantil Peruano', description: 'Fábrica mayorista de calzado infantil peruano desde 1985. Cuero legítimo, diseño ortopédico. Envíos a toda Latinoamérica.' },
  '/productos':   { title: 'Productos — Piolito Calzado Infantil', description: 'Catálogo completo de calzado infantil Piolito. Modelos Baby Piolito, Tilin, Piolito y Escolar en cuero legítimo.' },
  '/tiendas':     { title: 'Fábrica & Showroom — Piolito', description: 'Visita nuestra fábrica y showroom en Surquillo, Lima. Atendemos distribuidores mayoristas de lunes a sábado.' },
  '/guia-tallas': { title: 'Guía de Tallas — Piolito', description: 'Aprende a medir el pie de tu niño y encuentra la talla perfecta con nuestra guía de tallas Piolito.' },
  '/nosotros':    { title: 'Nosotros — Piolito, 41 años de historia', description: '41 años fabricando calzado infantil de calidad en Lima, Perú. Conoce nuestra historia, misión y valores.' },
};

@Injectable({ providedIn: 'root' })
export class SeoService {

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private meta: Meta,
    private titleService: Title,
    private router: Router
  ) {}

  init(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        const path = e.urlAfterRedirects.split('?')[0];
        this.setCanonical(BASE_URL + path);
        this.setPageMeta(path);
      });
  }

  private setCanonical(url: string): void {
    let link = this.doc.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
    this.meta.updateTag({ property: 'og:url', content: url });
  }

  private setPageMeta(path: string): void {
    const m = PAGE_META[path] ?? PAGE_META[''];
    this.titleService.setTitle(m.title);
    this.meta.updateTag({ name: 'description', content: m.description });
    this.meta.updateTag({ property: 'og:title', content: m.title });
    this.meta.updateTag({ property: 'og:description', content: m.description });
    this.meta.updateTag({ name: 'twitter:title', content: m.title });
    this.meta.updateTag({ name: 'twitter:description', content: m.description });
  }
}