interface Directive {
  bind(): void;
  update(): void;
  unbind(): void;
}
interface onClickaway {
  onClickaway: Directive;
}
interface Mixin {
  directives: onClickaway;
}

declare module 'vue-clickaway' {
  const directive: Directive;
  const mixin: Mixin;
  const version: string;

  export { directive, mixin, version };
}

declare module '@protocol-one/ui-kit' {
  const Button: any;
  const TextField: any;

  export { Button, TextField };
}

declare interface NodeModule {
  hot: {
    accept(paths?: [], callback?: () => void): void
  }
}
