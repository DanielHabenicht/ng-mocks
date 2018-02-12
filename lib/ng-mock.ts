import { Component, Directive, PipeTransform, Type } from '@angular/core';
import { MockComponent } from './mock-component';
import { MockDirective } from './mock-directive';
import { MockPipe } from './mock-pipe';

export type Declaration = Type<Component | Directive | PipeTransform>;

// tslint:disable-next-line:ban-types
const mockLookup: { [key: string]: Function } = {
  Component: MockComponent,
  Directive: MockDirective,
  Pipe: MockPipe
};

export function NgMock(...declarations: Declaration[]): Declaration[] {
  return declarations.map((declaration) => {
    const type = (declaration as any).__annotations__[0].__proto__.ngMetadataName;
    return mockLookup[type](declaration);
  });
}
