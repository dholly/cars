<script setup lang="ts">
import { NotificationType, type NotificationItem } from './types'
import { computed } from 'vue'
import { useNotifications } from './store'
import BaseIcon from "../ui-kit/base/BaseIcon.vue";

const { removeNotification } = useNotifications()

const props = withDefaults(defineProps<NotificationItem>(), {
  type: NotificationType.INFO
})

const titleToShow = computed(() => {
  if (props.title) return props.title
  switch (props.type) {
    case NotificationType.ERROR:
      return 'error'
    case NotificationType.WARNING:
      return 'warning'
    case NotificationType.SUCCESS:
      return 'success'
    case NotificationType.INFO:
      return 'info'
    default:
      return 'something-happen'
  }
})

const closeNotification = () => {
  removeNotification(props.id)
}
</script>

<template>
  <div
      :class="[
      'notification',
      'notification--type_' + type,
    ]"
  >
    <div class="notification__header">
      <template v-if="user">
        <UserCard
            class="notification__user"
            :avatar="user.avatar"
        >
          <template #name>
            <span class="notification__user-name">
              {{ user.name }}
            </span>
          </template>
          <template #subtitle>
            <span class="notification__user-action">
              {{ user.action }}
            </span>
          </template>
        </UserCard>
      </template>
      <template v-else>
        {{ titleToShow }}
      </template>

      <button
          class="notification__close-button"
          type="button"
          @click="closeNotification"
      >
        <BaseIcon
            class="notification__close-icon"
            icon="x-close"
        />
      </button>

    </div>
    <div class="notification__body" v-html="message"/>
  </div>
</template>

<style scoped lang="scss">
.notification {
  background: var(--color-white);
  overflow: hidden;
  border-radius: 10px;
  box-shadow: var(--dropdown-shadow);
  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    padding: rem(12px) rem(12px) rem(12px) rem(14px);
    background: var(--color-light-blue);

    color:var(--color-white);
    font-size: rem(17px);
    font-weight: 600;
  }

  &__close-button {
    align-self: flex-start;
    padding: 0;
    margin: 0 0 0 auto;
    cursor: pointer;
  }

  &__close-icon {
    height: rem(20px);
    width: rem(20px);
  }

  &__body {
    display: flex;
    align-items: center;
    align-self: stretch;
    gap: rem(12px);
    padding: rem(12px) rem(14px);

    color: var(--color-main-text);
    font-size: rem(15px);
    font-style: normal;
    font-weight: 500;
    line-height: 1.44;
    letter-spacing: rem(-0.15px);
  }

  &__user {
    line-height: 1;
  }
  &__user-name {
    color: var(--color-white);
    font-size: rem(15px);
    font-weight: 600;
    letter-spacing: rem(-0.15px);
  }
  &__user-action {
    color:rgba(255, 255, 255, 0.60);
    font-size: rem(13px);
    font-weight: 500;
    letter-spacing: rem(-0.065px);
  }

  &--type {
    &_info {}
    &_success {
      .notification__header {
        background: #2FC49D;
      }
    }
    &_error {
      .notification__header {
        background: var(--color-alert);
      }
    }
    &_warning {
      .notification__header {
        background: #FD9644;
      }
    }
  }
}
</style>
