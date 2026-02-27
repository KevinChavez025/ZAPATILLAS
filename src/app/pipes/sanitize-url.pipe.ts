import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

const ALLOWED_PREFIXES = [
  'https://wa.me/',
  'https://maps.google.com/',
  'https://www.google.com/maps/',
];

@Pipe({ name: 'sanitizeUrl', standalone: true })
export class SanitizeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  // resourceUrl = true  → para src de <iframe>
  // resourceUrl = false → para href de <a>
  transform(url: string, resourceUrl = false): SafeUrl | SafeResourceUrl {
    const permitida = ALLOWED_PREFIXES.some(prefix => url.startsWith(prefix));
    if (!permitida) {
      console.warn('[SanitizeUrlPipe] URL bloqueada:', url);
      return '';
    }
    return resourceUrl
      ? this.sanitizer.bypassSecurityTrustResourceUrl(url)
      : this.sanitizer.bypassSecurityTrustUrl(url);
  }
}