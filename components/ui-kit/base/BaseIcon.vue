<template>
  <svg class="base-icon" v-bind="iconAttrs" data-base-icon>
    <use :href="iconUrl" width="100%" height="100%" />
  </svg>
</template>


<script setup>
/**
 * BaseIcon component.
 * Use for insert icons.
 * Support all svg props.
 */
import Sprite from "./assets/BaseIcon/sprite.svg";
import FlagsSprite from "./assets/BaseIcon/flags.svg";
import { ICONS } from "./assets/BaseIcon/sprite.js";

const attrs = useAttrs()

const props = defineProps({
  icon: {
    type: String,
    required: true,
    validator(value) {
      // return Object.keys(ICONS).includes(value);
      return true;
    },
  },
  isFlag:Boolean
});

const { icon, isFlag } = toRefs(props);

const iconProps = computed(() => ICONS[icon.value]);
const iconUrl = computed(() => {
  if (isFlag.value) return `${FlagsSprite}#${icon.value}`;
  return `${Sprite}#${icon.value}`;
})

const iconAttrs = computed(() => {
  const defaultProps = {
    height: 24,
    width: 24,
  };

  return {
    ...defaultProps,
    ...iconProps.value,
    ...attrs,
  }
});
</script>

<style lang="scss" scoped>
.base-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  vertical-align: baseline;
  fill: inherit;
  stroke: inherit;
}
</style>
