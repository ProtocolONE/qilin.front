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

/**
 * @TODO For main.ts we need type of vue instances, but
 * vue declaring generate lint error.
 */
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vue-clickaway' {
  const directive: Directive;
  const mixin: Mixin;
  const version: string;

  export { directive, mixin, version };
}
