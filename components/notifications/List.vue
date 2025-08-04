<script lang="ts" setup>
import { useNotifications } from "./store";
import NotificationsItem from "./DefaultNotification.vue";

const notifications = computed(() => {
  return useNotifications().notifications;
});

</script>

<template>
  <transition-group class="notifications-list" name="notifications" tag="div">
    <template v-for="notification in notifications"
              :key="notification.id"
    >
      <component :is="notification.component || NotificationsItem"
                 v-bind="notification.componentProps"
                 :id="notification.id"
                 :message="notification.message"
                 :type="notification.type"
                 :user="notification.user"
                 :title="notification.title"
      />
    </template>
  </transition-group>
</template>

<style lang="scss" scoped>
.notifications-list {
  position: fixed;
  right: 20px;
  bottom: 20px;
  max-width: rem(320px);
  width: 100%;
  gap: 15px;
  z-index: 2000000001;
  display: flex;
  flex-direction: column-reverse;

  @include respond($mobile) {
    right: 10px;
    bottom: 10px;
  }
}

.notifications-leave-active {
  position: absolute;
}

.notifications-enter-active,
.notifications-leave-active {
  transition: 0.5s ease-in-out;
}

.notifications-enter-from {
  opacity: 0;
  transform: translate(100%, -50%);
  @include respond($mobile) {
    transform: translate(0, 100%);
  }
}

.notifications-leave-to {
  opacity: 0;
  transform: translate(100%, 50%);
  transition: 0.25s ease-in-out;
  min-width: 100%;
  @include respond($mobile) {
    transform: translate(100%, 0);
  }
}

.notifications-move {
  transition: 0.5s ease-in-out;
}
</style>