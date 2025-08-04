enum Provide {
  Error = "provideInputError",
  Disabled = "provideInputDisabled",
}

type Props = {
  error?: Ref<string | undefined>;
  disabled?: Ref<boolean | undefined>;
}

export const useInputProvide = (props: Props) => {
  provide(Provide.Error, props.error);
  provide(Provide.Disabled, props.disabled);
}

export const useInputInject = (props: Props = {}) => {
  const { error, disabled } = props;
  const providedError = inject(Provide.Error, ref(""));
  const providedDisabled = inject(Provide.Disabled, ref(false));

  const accError = computed(() => providedError.value || error?.value);
  const accDisabled = computed(() => providedDisabled.value || disabled?.value);

  return {
    providedError,
    providedDisabled,
    accError,
    accDisabled,
  }
}