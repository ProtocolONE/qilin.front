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
  const FormByStep: any;
  const Header: any;
  const PageHeader: any;
  const Select: any;
  const SwitchBox: any;
  const TagInput: any;
  const TextField: any;
  const Tip: any;
  const UiButton: any;
  const UiModal: any;
  const UiTable: any;
  const UiTableCell: any;
  const UiTableRow: any;
  const UiTip: any;
  const UiLangsBar: any;
  const UiFormByStep: any;
  const UiHeader: any;
  const UiPaginator: any;
  const UiCheckbox: any;
  const UiTextField: any;
  const UiTextarea: any;
  const UiSelect: any;
  const UiPageHeader: any;
  const UiDateTimeInput: any;
  const UiSwitchBox: any;

  export {
    Button,
    Checkbox,
    DateTimeInput,
    FormByStep,
    Header,
    PageHeader,
    Select,
    SwitchBox,
    TagInput,
    TextField,
    Tip,
    UiButton,
    UiModal,
    UiTable,
    UiTableCell,
    UiTableRow,
    UiTextarea,
    UiLangsBar,
    UiFormByStep,
    UiHeader,
    UiPageHeader,
    UiPaginator,
    UiCheckbox,
    UiTextField,
    UiSelect,
    UiDateTimeInput,
    UiSwitchBox,
    UiTip,
  };
}

declare interface NodeModule {
  hot: {
    accept(paths?: [], callback?: () => void): void
  }
}
