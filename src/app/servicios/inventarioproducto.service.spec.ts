import { TestBed } from '@angular/core/testing';

import { InventarioproductoService } from './inventarioproducto.service';

describe('InventarioproductoService', () => {
  let service: InventarioproductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarioproductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
