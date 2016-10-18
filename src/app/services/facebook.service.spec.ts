/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';
import { FacebookService } from './facebook.service';

describe('Service: Facebook', () => {
  beforeEach(() => {
    addProviders([FacebookService]);
  });

  it('should ...',
    inject([FacebookService],
      (service: FacebookService) => {
        expect(service).toBeTruthy();
      }));
});
