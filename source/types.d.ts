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
  const Checkbox: any;
  const DateTimeInput: any;
  const Select: any;
  const SwitchBox: any;
  const TagInput: any;
  const TextField: any;
  const Tip: any;

  export {
    Button,
    Checkbox,
    DateTimeInput,
    Select,
    SwitchBox,
    TagInput,
    TextField,
    Tip,
  };
}

declare interface NodeModule {
  hot: {
    accept(paths?: [], callback?: () => void): void
  }
}
