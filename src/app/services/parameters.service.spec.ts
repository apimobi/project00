/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { ParametersService } from './parameters.service';

describe('Service: Parameres', () => {
  beforeEach(() => {
    addProviders([ParametersService]);
  });

  it('should ...',
    inject([ParametersService],
      (service: ParametersService) => {
        expect(service).toBeTruthy();
      }));
});
