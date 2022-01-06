import {
  Component as NgComponent,
  Directive as NgDirective,
  Pipe as NgPipe,
  NgModule,
  ViewContainerRef,
  ComponentFactoryResolver,
  Type,
  ModuleWithProviders,
  SchemaMetadata,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

export function Component(
  componentMetadata: NgComponent & {
    standalone: true;
    // TODO: tighten up the types
    imports?: Array<Type<unknown> | ModuleWithProviders<unknown>>;
    schemas?: Array<SchemaMetadata | any[]>;
  }
): ClassDecorator {
  //console.log(`Standalone @Component declared:`, componentMetadata);

  const ngComponentDecorator = NgComponent(componentMetadata);

  const exportedProviders = [];
  const processedImports =
    componentMetadata.imports?.map(
      (importable) => importable['module'] ?? importable
    ) ?? [];

  return function (componentClazz) {
    @NgModule({
      declarations: [[componentClazz]],
      // TODO: is it a good idea to include CommonModule by default?
      imports: [processedImports],
      exports: [[componentClazz]],
      // TODO: surprisingly the JIT compiler still requires entryComponents for ComponentFactoryResolver to work
      entryComponents: [[componentClazz]],
      schemas: componentMetadata.schemas,
    })
    class VirtualNgModule {}

    componentClazz['module'] = VirtualNgModule;

    return ngComponentDecorator(componentClazz);
  };
}

export function Directive(
  directiveMedatada: NgDirective & {
    standalone: true;
    imports?: unknown[];
  }
): ClassDecorator {
  //console.log(`Standalone @Directive declared:`, directiveMedatada);

  const ngDirectiveDecorator = NgDirective(directiveMedatada);

  const processedImports =
    directiveMedatada.imports?.map(
      (importable) => importable['module'] ?? importable
    ) ?? [];

  return function (directiveClazz) {
    @NgModule({
      declarations: [[directiveClazz]],
      exports: [[directiveClazz]],
      imports: [processedImports],
    })
    class VirtualNgModule {}

    directiveClazz['module'] = VirtualNgModule;

    return ngDirectiveDecorator(directiveClazz);
  };
}

export function Pipe(
  pipeMetadata: NgPipe & {
    standalone: true;
    imports?: unknown[];
  }
): ClassDecorator {
  //console.log(`Standalone @Pipe declared:`, pipeMetadata);

  const ngPipeDecorator = NgPipe(pipeMetadata);

  const processedImports =
    pipeMetadata.imports?.map(
      (importable) => importable['module'] ?? importable
    ) ?? [];

  return function (pipeClazz) {
    @NgModule({
      declarations: [[pipeClazz]],
      exports: [[pipeClazz]],
      imports: [processedImports],
    })
    class VirtualNgModule {}

    pipeClazz['module'] = VirtualNgModule;

    return ngPipeDecorator(pipeClazz);
  };
}

export class ViewContainerRefShim {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  createComponent<T>(componetClazz: Type<T>) {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(componetClazz);

    this.viewContainerRef.createComponent(componentFactory);
  }
}

export function bootstrapComponent<T>(
  componetClazz: Type<T>,
  platformModule = BrowserModule
) {
  @NgModule({
    imports: [platformModule, componetClazz['module']],
    bootstrap: [componetClazz],
  })
  class VirtualBootstrapNgModule {}

  return platformBrowserDynamic().bootstrapModule(VirtualBootstrapNgModule);
}
