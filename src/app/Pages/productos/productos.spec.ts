import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { routes } from '../../app.routes';
import { Productos } from './productos';

describe('Productos', () => {
  let component: Productos;
  let fixture: ComponentFixture<Productos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productos],
      providers: [provideRouter(routes)],
    }).compileComponents();

    fixture   = TestBed.createComponent(Productos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show all products by default', () => {
    expect(component.productosFiltrados().length).toBe(component.todos.length);
  });

  it('should filter by linea', () => {
    component.setLinea('escolar');
    expect(component.productosFiltrados().every(p => p.linea === 'escolar')).toBe(true);
  });

  it('should filter by subcategoria', () => {
    component.setLinea('baby-piolito');
    component.setSubcat('bp-otono-invierno-ninos');
    expect(component.productosFiltrados().every(p => p.subcategoria === 'bp-otono-invierno-ninos')).toBe(true);
  });

  it('should clear filters', () => {
    component.setLinea('piolito');
    component.limpiarFiltros();
    expect(component.productosFiltrados().length).toBe(component.todos.length);
  });
});