<template>
  <BaseButton :class="rootClasses" :size="size" :color="color" :disabled="disabled">
    <slot>
      <BaseIcon class="icon-button__icon" :icon="icon"/>
    </slot>
    <span v-if="counter"
          class="icon-button__counter"
          :class="counterPosition">{{ counter }}</span>
  </BaseButton>
</template>

<script setup lang="ts">
import type { Size, Color } from './base/types/base-button';
import BaseButton from "./ui-kit/base/BaseButton.vue";
import BaseIcon from "./ui-kit/base/BaseIcon.vue";
type CounterPosition = "top-center" | "top-right";
interface Props {
  size?: Size;
  color?: Color;
  icon?: string;
  rounded?: boolean;
  counter?: number;
  counterPosition?:CounterPosition;
  disabled?: boolean;
}

const props =  withDefaults(defineProps<Props>(), {
  size: "med",
  color: "blue",
  rounded: false,
});

const { size, rounded, disabled,counterPosition } = toRefs(props);

const rootClasses = computed(() => {
  return [
    'icon-button',
    'icon-button--' + size.value,
    {'icon-button--rounded': rounded.value},
    {'icon-button--disabled': disabled.value}
  ]
})
</script>

<style lang="scss" scoped>
.icon-button {
  position: relative;

  &__icon {
    height: 100%;
    width: 100%;
  }

  &__counter {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 18px;
    width: 18px;
    border-radius: 50%;
    border: 2px solid var(--color-white);
    background: var(--color-light-blue);
    position: absolute;
    bottom: 100%;
    left:50%;
    transform: translate(-50%, 50%);
    &.top-right{
      bottom: 100%;
      left:100%;
      transform: translate(-75%, 50%);
    }
    margin: 0 0 1px 0;

    color: var(--color-white);
    font-size: rem(10px);
    font-weight: 600;
    line-height: 0;
  }
}

.icon-button--rounded {
  border-radius: 50%;
}

// Size
.icon-button--sm {
  width: 2.67rem;
  height: 2.67rem;
  padding: .67rem;
}
.icon-button--med {
  width: 3.2rem;
  height: 3.2rem;
  padding: .93rem;
}
.icon-button--big {
  width: 4rem;
  height: 4rem;
  padding: 1.33rem;
}

//Disabled
.icon-button--disabled {

}
</style>
