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
  const Header: any;
  const Select: any;
  const SwitchBox: any;
  const TagInput: any;
  const TextField: any;
  const Tip: any;
  const UiTable: any;
  const UiTableRow: any;
  const UiTableCell: any;

  export {
    Button,
    Checkbox,
    DateTimeInput,
    Header,
    Select,
    SwitchBox,
    TagInput,
    TextField,
    Tip,
    UiTable,
    UiTableRow,
    UiTableCell,
  };
}

declare interface NodeModule {
  hot: {
    accept(paths?: [], callback?: () => void): void
  }
}
