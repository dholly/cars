<template>
  <label :class="rootClasses">
    <span
      v-if="numberControls"
      class="base-input__control"
      :size="size"
      @click="decreaseValue"
    >
      <BaseIcon icon="minus"/>
    </span>
    <slot name="prefix">
      <span v-if="prefix" class="base-input__prefix">{{ prefix }}</span>
    </slot>

    <input
      :class="{
        'type-date': type==='date',
        readonly: readonly,
      }"
      ref="inputElement"
      v-model="modelValue"
      :type="type"
      :disabled="accDisabled"
      :placeholder="placeholder"
      :min="min"
      :max="max"
      :readonly="readonly"
      @focus="onFocus"
      @blur="onBlur"
      @input="onInput"
      @change="onChange"
      @keydown="onKeyDown"
    />

    <slot name="postfix">
      <span v-if="postfix" class="base-input__postfix">{{ postfix }}</span>
    </slot>
    <span
      v-if="numberControls"
      class="base-input__control"
      :size="size"
      @click="increaseValue"
    >
      <BaseIcon icon="plus"/>
    </span>
  </label>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import { useInputInject } from '~/composable/useInputProvide';
import type { Color } from './types';

export type Size = "big" | "med" | "sm";

interface Props {
  name?: string;
  color?: Color;
  size?: Size;
  block?: boolean;
  error?: string;
  disabled?: boolean;
  prefix?: string;
  postfix?: string;
  placeholder?: string;
  type?: string;
  min?: string|number;
  max?: string|number;
  fixed?: number;
  readonly?: boolean;
  float?: number;
  rules?: any;
  numberStep?: number,
  numberControls?: boolean;
}

const instance = getCurrentInstance()
const hasFocus = ref(false);
const inputElement = ref();
const modelValue = defineModel();
const props =  withDefaults(defineProps<Props>(), {
  color: "gray",
  size: "med",
  block: false,
  disabled: false,
  type: "text",
  min: -Infinity,
  max: +Infinity,
  numberStep: 1,
});
const emits = defineEmits<{
  focus: [e: Event];
  blur: [e: Event];
  input: [e: Event];
  change: [e: Event];
}>();

const { size, block, error, disabled, type, min, max, color, readonly, rules, numberControls } = toRefs(props);

const fieldName = computed(() => {
  return props.name || String(instance?.uid)
})

const {
  value: inputValue,
  handleBlur,
  errorMessage,
  meta,
} = useField (
  fieldName,
  rules,
  {
    initialValue: modelValue.value,
  }
);

const computedError = computed(() => {
  return error.value || errorMessage.value;
})

const { accError, accDisabled } = useInputInject({
  error: computedError,
  disabled: disabled,
});

watch(modelValue, (value, oldValue) => {
  inputValue.value = value;

  if (inputElement.value && value !== oldValue && !hasFocus.value) {
    inputElement.value.dispatchEvent(new Event("change"));
  }
})

const rootClasses = computed(() => {
  return [
    'base-input',
    'base-input--' + size.value,
    'base-input--color_' + color.value,
    { 'base-input--block': block.value },
    { 'base-input--error': accError.value },
    { 'base-input--disabled': accDisabled.value },
    { 'base-input--focus': hasFocus.value },
    { 'base-input--with-controls': numberControls.value },
    { 'readonly': readonly.value }
  ]
})

const onFocus = (e: Event, force = false) => {
  if (!readonly || force) {
    hasFocus.value = true;
  }

  emits("focus", e);
}
const onBlur = (e: Event) => {
  hasFocus.value = false;
  if (type.value === "number") {
    modelValue.value = modelValue.value !== "" ? Math.max(Math.min(modelValue.value as number || 0, max.value as number), min.value as number) : "";
  }
  handleBlur(e);
  emits("blur", e);
}
const onInput = (e: Event) => {
  emits("input", e);
}
const onChange = (e: Event) => {
  if (type.value === "number") {
    const valueSplit = (modelValue.value as number).toString().split(".");
    const valueJoin = valueSplit.map((str, index) => {
      if (index === 1) return str.slice(0, props.float)
      return str;
    }).join('.')

    modelValue.value = modelValue.value !== "" ? Math.min(parseFloat(valueJoin), max.value as number) : "";
  }
  emits("change", e);
}
const onKeyDown = (e: KeyboardEvent) => {
  const keyCode = e.code;
  if (type.value === "number"&&keyCode === "Period") {
    e.preventDefault();
  }
}

const sum = (a: any, b: any, positions: number) => {
  const factor = Math.pow(10, positions)
  return (a.toFixed(positions) * factor + b.toFixed(positions) * factor) / factor
}

const subtraction = (a: any, b: any, positions: number) => {
  const factor = Math.pow(10, positions)
  return (a.toFixed(positions) * factor - b.toFixed(positions) * factor) / factor
}

const decreaseValue = () => {
  modelValue.value = Math.max(subtraction(modelValue.value, props.numberStep, 4), Number(min.value));
}

const increaseValue = () => {
  modelValue.value = Math.min(sum(modelValue.value, props.numberStep, 4), Number(max.value));
}

defineExpose({
  meta,
  inputElement,
  focus: onFocus,
  blur: onBlur,
})
</script>

<style scoped lang="scss">
.base-input {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 13px;
  border: 1px solid transparent;
  color: var(--color-main-text);
  font-family: Inter;
  font-size: 1rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.33;
  letter-spacing: -0.225px;
  transition: var(--input-transition);
  cursor: text;

  @include respond($mobile-lg) {
    font-size: 16px;
  }

  input {
    padding: 0;
    margin: 0;
    width: 100%;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
    background: transparent;
    border: none;
    cursor: inherit;

    &.type-date{
      width: calc(100% - 35px);
      flex-grow: 1;
    }

    &:read-only {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }

    &[type=number] {
      -moz-appearance: textfield;
    }
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }

  input::placeholder {
    color: var(--color-gray-very-dark);
    @include respond($mobile-lg) {
      font-size: rem(16px);
    }
  }

  &:not(.base-input--disabled):hover {
    border-color: var(--color-line-light, #DEDEDE);
  }

  &__control {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: rem(5px);
    background: var(--color-light-blue);
    color: var(--color-white);
    user-select: none;
    cursor: pointer;

    &:first-child {
      border-radius: 13px 0 0 13px;
    }
    &:last-child {
      border-radius: 0 13px 13px 0;
    }
  }
}
.base-input.base-input--focus:not(.base-input--disabled) {
  border-color: var(--color-input-focus-border);
  background: var(--secondary, #FFF);
}
.base-input.base-input--disabled {
  color: var(--color-gray-very-dark) !important;
  border-color: var(--color-line-light, #DEDEDE) !important;
  background: var(--secondary, #FFF) !important;
  cursor: not-allowed !important;
}
.base-input--block {
  display: flex;
  width: 100%;
}
.base-input--error {
  border-color: var(--color-alert) !important;
  background: var(--color-alert-5) !important;
}

.base-input__prefix,
.base-input__postfix {
  color: var(--color-gray-very-dark);
  cursor: inherit;
  user-select: none;
}

// Size
.base-input--big {
  height: 4rem;
  padding: 1.33rem 1.47rem;

  .base-input__control {
    height: 4rem;
  }
}
.base-input--med {
  height: 3.2rem;
  padding: .67rem 1.2rem;

  .base-input__control {
    height: 3.2rem;
  }
}
.base-input--sm {
  height: 2.67rem;
  padding: .53rem 1rem;

  .base-input__control {
    height: 2.67rem;
  }
}

// Color
.base-input--color {
  &_gray {
    background: var(--color-light-grey);
  }
  &_white {
    background: var(--color-white);
  }
  &_outline {
    background: transparent;
    border: 1px solid #D8DDE4;
  }
}

.base-input--with-controls {
  padding-left: 0;
  padding-right: 0;
}
</style>
