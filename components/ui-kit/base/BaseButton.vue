<template>
  <component
    :is="rootComponent"
    :class="rootClasses"
    :to="to"
    :href="href"
    type="button"
    :target="href ? '_blank' : '_self'"
    :disabled="disabled"
  >
    <slot/>
  </component>
</template>

<script setup lang="ts">
import type { RouteLocationAsPathGeneric, RouteLocationAsRelativeGeneric } from 'vue-router';
import type { Color, Size, Variant } from './types/base-button-types';

interface Props {
  size?: Size,
  color?: Color,
  variant?: Variant,
  block?: boolean,
  rounded?: boolean,
  to?: string | RouteLocationAsRelativeGeneric | RouteLocationAsPathGeneric;
  href?: string;
  disabled?: boolean;
}

const props =  withDefaults(defineProps<Props>(), {
  size: "med",
  color: "blue",
  variant: "default",
  block: false,
});

const { color, size, variant, block, rounded, disabled } = toRefs(props);

const rootComponent = computed(() => {
  if (disabled.value) return 'button'; // Disabled
  if (props.to) {
    return resolveComponent('NuxtLink');
  }
  if (props.href) {
    return 'a';
  }
  return 'button';
})

const rootClasses = computed(() => {
  return [
    'base-button',
    'base-button--' + size.value,
    'base-button--' + color.value,
    'base-button--' + variant.value,
    { 'base-button--disabled': disabled.value },
    { 'base-button--block': block.value },
    { 'base-button--rounded': rounded.value },
  ]
})
</script>

<style lang="scss" scoped>
.base-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  fill: currentcolor;
  stroke: currentcolor;
  border: 1px solid transparent;
  position: relative;

  font-size: 1rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: rem(-0.225px);
  color: inherit;
  text-decoration: none;
  text-align: center;

  transition: var(--button-transition, .3s ease-in-out);
  cursor: pointer;

  &:disabled,
  &--disabled {
    color: var(--color-gray-very-dark) !important;
    border-color: var(--color-line-light) !important;
    background: var(--color-white) !important;
    cursor: not-allowed;
  }
}

// Sizes
.base-button--sm {
  height: 2.67rem;
  padding: 0 1.07rem;
  border-radius: 10px;
  gap: 6px;

  &.base-button--rounded {
    border-radius: 40px;
  }
}
.base-button--med {
  height: 3.2rem;
  padding: 0 1.47rem;
  border-radius: 100px;
  gap: .5rem;

  &.base-button--rounded {
    border-radius: 50px;
  }
}
.base-button--big {
  height: 4rem;
  padding: 0 2rem;
  border-radius: 16px;
  gap: .67rem;

  &.base-button--rounded {
    border-radius: 60px;
  }
}

// Color
.base-button--blue {
  color: var(--color-white);
  background: var(--color-light-blue, #032D8C);

  &:hover {
    background: var(--color-blue, #011E60);
  }
}
.base-button--gold {
  color: var(--color-white);
  background: var(--color-gold, #CC9D6A);

  &:hover {
    background: var(--color-gold-dark, #AC835C);
  }
}
.base-button--gray {
  background: var(--color-light-grey, #F5F5F5);

  &:hover {
    background: var(--color-gray, #EBEBEB);
  }
}
.base-button--white {
  background: var(--secondary, #fff);
  color: var(--color-main-text, #222);
/*  border: 1px solid var(--color-line-medium);*/
  &:hover {
    background: var(--color-gray, #EBEBEB);
  }
}
.base-button--transparent {
  background: transparent;
  color: var(--color-main-text, #222);

  &:hover {
    background: var(--color-gray, #EBEBEB);
  }
}
.base-button--alert {
  background: var(--color-alert-15, rgba(209, 65, 65, 0.15));
  color: var(--color-alert, #D14141);

  &:hover {
    background: var(--color-alert-20, rgba(209, 65, 65, 0.20));;
  }
}
.base-button--error {
  color: var(--color-white);
  background: var(--color-alert, #D14141);
}
.base-button--green {
  color: var(--color-white);
  background: var(--color-green);

  &:hover {
    background: var(--color-green-light);
  }
}

.base-button--brown {
  color: var(--color-white);
  background: var(--color-brown);

  &:hover {
    background: var(--color-brown-light);
  }
}

// Outline
.base-button--outline {
  background: transparent !important;

  &.base-button--blue {
    color: var(--color-light-blue, #032D8C);
    border-color: var(--color-light-blue, #032D8C);

    &:hover {
      color: var(--color-accent-outline);
      border-color: var(--color-accent-outline);
    }
  }
}

// Plain
.base-button--plain {
  height: auto;
  padding: 0;
  background: transparent !important;
  border: none !important;

  &.base-button--blue {
    color: var(--color-light-blue, #032D8C);

    &:hover {
      color: var(--color-blue, #011E60);
    }
  }
}

// Block box
.base-button--block {
  display: flex;
  width: 100%;
}
</style>
