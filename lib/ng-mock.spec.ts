import { Component, Directive, Pipe, PipeTransform } from '@angular/core';
import * as MockComponent from './mock-component';
import * as MockDirective from './mock-directive';
import * as MockPipe from './mock-pipe';
import { NgMock } from './ng-mock';

@Component({ selector: 'someComponent' })
class SomeComponent {}

@Directive({ selector: 'someDirective' })
class SomeDirective {}

@Pipe({ name: 'somePipe' })
class SomePipe implements PipeTransform { transform: () => void; }

fdescribe('ngMock', () => {
  let mockComponentSpy: jasmine.Spy;
  let mockDirectiveSpy: jasmine.Spy;
  let mockPipeSpy: jasmine.Spy;

  beforeEach(() => {
    mockComponentSpy = spyOn(MockComponent, 'MockComponent').and.callThrough();
    mockDirectiveSpy = spyOn(MockDirective, 'MockDirective').and.callThrough();
    mockPipeSpy = spyOn(MockPipe, 'MockPipe').and.callThrough();
  });

  it('should do stuff', () => {
    NgMock(SomeComponent);
    expect(mockComponentSpy).toHaveBeenCalled();
    expect(mockDirectiveSpy).not.toHaveBeenCalled();
    expect(mockPipeSpy).not.toHaveBeenCalled();
  });

  it('should do stuff again', () => {
    NgMock(SomeComponent, SomeDirective, SomePipe);
    expect(mockComponentSpy).toHaveBeenCalled();
    expect(mockDirectiveSpy).toHaveBeenCalled();
    expect(mockPipeSpy).toHaveBeenCalled();
  });
});
