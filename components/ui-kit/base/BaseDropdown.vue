<template>
  <div
    ref="rootRef"
    :class="[
      'base-dropdown',
      {'base-dropdown--block': block},
    ]"
  >
    <slot name="trigger" :toggle="toggle" :open="open" :close="close" :isOpen="isShown">
      <IconButton
        class="base-dropdown__trigger"
        icon="dots-horizontal"
        :size="size"
        :color="color"
        @click="toggle"
      />
    </slot>
    <div
      ref="dropdownRef"
      v-show="isShown"
      :class="[
        'dropdown',
        'base-dropdown__dropdown',
        'base-dropdown__dropdown--position_' + dropdownPosition,
      ]"
      :style="{ marginTop: margin, ...dropdownStyle as Object,...fixedStyles}"
    >
      <slot name="dropdown" :toggle="toggle" :open="open" :close="close" :isOpen="isShown">
        Dropdown
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import type { Size, Color } from './types';
import type { StyleValue } from 'vue';
import {usePositionFixed} from "~/composable/positionFixed";
import { useElementBounding } from "@vueuse/core";
import IconButton from '~/components/IconButton.vue'
interface Props {
  color?: Color,
  size?: Size,
  dropdownPosition?: "left"|"right"|"center";
  dropdownStyle?: StyleValue;
  disabled?: boolean;
  block?: boolean;
  margin?: number;
  isFixed?:boolean;
}

const rootRef = ref();
const dropdownRef = ref();
const {fixedStyles,fixPosition,unfixPosition} = usePositionFixed(dropdownRef);

// const dropdownFixed = ref({});
// const updateDropdownPosition = () => {
//   if (!isShown.value || !dropdownRef.value) return;
//   const rect = dropdownRef.value.getBoundingClientRect();
//   dropdownFixed.value = {
//     position: 'fixed',
//     top: `${rect.top}px`,
//     left: `${rect.left}px`,
//     width: `${rect.width}px`,
//     'min-width':0,
//     zIndex: 1000,
//   };
// };

const isShown = ref(false);
const props = withDefaults(defineProps<Props>(), {
  dropdownPosition: "left",
  color: "transparent",
  size: "sm",
  isFixed:false,
  dropdownStyle: () => ({}),
})

const emits = defineEmits<{
  close: [];
  open: [];
}>()

watch(isShown, async (value) => {
  if (value) {
    emits("open");
    await nextTick();
    if (props.isFixed) fixPosition();
  } else {
    emits("close");
    if (props.isFixed) unfixPosition();
  }
})

const toggle = () => {
  if (!props.disabled) {
    isShown.value = !isShown.value;
  } else {
    isShown.value = false;
  }
}

onClickOutside(rootRef, () => { isShown.value = false })

const { top, left } = useElementBounding(rootRef);
watch([top, left], ([newTop, newLeft], [oldTop, oldLeft]) => {
  if (!props.isFixed||!isShown.value) return;
  if (newTop !== oldTop || newLeft !== oldLeft) {
    isShown.value=false;
  }
});

const open = () => {
  if (!props.disabled) {
    isShown.value = true;
  }
}

const close = () => {
  isShown.value = false;
}

defineExpose({
  isShown,
  open,
  close,
  toggle,
})
</script>

<style scoped lang="scss">
.base-dropdown {
  display: inline-block;
  position: relative;

  &--block {
    display: block;
  }

  &__dropdown {
    position: absolute;
    top: 100%;
    min-width: 100%;
    z-index: 15;
    margin: rem(8px) 0 0 0;
  }

  &__dropdown--position {
    &_left {
      left: 0;
    }
    &_right {
      right: 0;
    }
    &_center {
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
}
.base-dropdown__trigger{
  rotate: 90deg;
}
</style>