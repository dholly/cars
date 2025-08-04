<template>
  <BaseDropdown
    ref="dropdownRef"
    class="dropdown-menu"
    :color="color"
    :dropdown-position="dropdownPosition"
  >
    <template #trigger="slotProps">
      <slot name="trigger" v-bind="slotProps"/>
    </template>
    <template #dropdown>
      <div class="dropdown-menu__controls-dropdown">
        <template v-for="(group, index) in listGroups" :key="index">
          <hr v-if="index !== 'default'">
          <button
            v-for="(option, index) in group" :key="index"
            :class="[
              'dropdown-menu__controls-dropdown-item',
              'dropdown-menu__controls-dropdown-item--color_' + (option.color || 'white'),
            ]"
            type="button"
            @click="onItemClick(option.onClick)"
          >
            <BaseIcon class="dropdown-menu__controls-dropdown-icon" :icon="option.icon"/>
            <span>{{ option.text }}</span>
          </button>
        </template>
      </div>
    </template>
  </BaseDropdown>
</template>

<script setup lang="ts">
import type { Color } from './base/types';
import BaseDropdown from './base/BaseDropdown.vue'
import BaseIcon from './base/BaseIcon.vue'

interface Option {
  text: string;
  icon: string;
  group?: string;
  color?: Color;
  onClick?: () => void;
}

interface Props {
  options: Option[];
  color?: Color;
  dropdownPosition?: "left"|"right"|"center";
}

const dropdownRef = ref();
const props = withDefaults(defineProps<Props>(), {
  dropdownPosition: "left",
  color: "white",
});

const listGroups = computed(() => {
  return props.options.reduce((acc, option) => {
    const group = option.group || 'default';
    acc[group] = [...(acc[group] || []), option];
    return acc;
  }, {} as any);
})

const onItemClick = (fn: () => void) => {
  fn();
  dropdownRef.value.close();
}
</script>

<style scoped lang="scss">
.dropdown-menu {
  &__controls-dropdown {
    min-width: 190px;
    white-space: nowrap;
    padding: rem(8px) 0;

    hr {
      margin: rem(8px) rem(18px);
    }
  }
  &__controls-dropdown-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: rem(8px) rem(18px);
    gap: rem(10px);
    color: var(--color-text-secondary);
    font-size: rem(15px);
    font-weight: 600;
    letter-spacing: rem(-0.15px);
    transition: var(--default-transition);
    cursor: pointer;

    &:hover {
      background: var(--color-light-grey);
    }

    &--color {
      &_alert {
        color: var(--color-alert);

        .dropdown-menu__controls-dropdown-icon {
          color: var(--color-alert);
        }

        &:hover {
          background: rgba(209, 65, 65, 0.15);
        }
      }
    }
  }
  &__controls-dropdown-icon {
    width: 18px;
    height: 18px;
    color: var(--color-gray-very-dark);
  }
}
</style>
