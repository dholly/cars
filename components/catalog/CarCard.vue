<script setup lang="ts">


import BaseIcon from "../ui-kit/base/BaseIcon.vue";
import BaseButton from "../ui-kit/base/BaseButton.vue";
import DropdownMenu from "../ui-kit/DropdownMenu.vue";
import {ref} from "vue";
import {NotificationType, useNotifications} from "../notifications";

interface Car {
  id: number;
  name: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  condition: string;
  leasing: number;
  images: Array<{
    id: string | number;
    image: string;
    alt?: string;
  }>;
}

const carActions = [
  {
    text: 'details',
    icon: 'eye',
    onClick: () => console.log('1')
  },
  {
    text: 'like',
    icon: 'heart',
    onClick: () => console.log('2')
  },
  {
    text: 'share',
    icon: 'share',
    group: 'social',
    onClick: () => console.log('3')
  }
];

const isLiked = ref(false);


const {addNotification} = useNotifications()
const showSuccess = () => {
  console.log('123')
  addNotification({
    message: 'success',
    title: 'success',
    type: NotificationType.SUCCESS
  })
}
const toggleLike = () => {
  isLiked.value = !isLiked.value;
  addNotification({
    message: 'like toggled',
    title: 'Like',
    type: NotificationType.SUCCESS
  })
}

const props = defineProps<{
  car: Car;
}>();
</script>

<template>
  <div class="car-card" v-if="car">
    <!--    <div class="car-card__header">
          <NuxtImg src="/images/kings-logo.svg" alt="Kings Logo"/>
          <div>
            Kings rental car
          </div>
          <div class="car-card__header-actions">
            <BaseIcon
                :icon="!isCrownActive ? 'car-crown-active' : 'car-crown-inactive'"
                @click="toggleCrown"
                class="crown-icon"
            />
            <DropdownMenu :options=carActions>
            </DropdownMenu>
          </div>
        </div>-->
    <div class="car-card__top d-flex fc jb">
      <div class="car-card__top-wrapper">
        <div v-if="car.condition"
             class="car-card__top-badge"
             :class="`badge-${car.condition.toLowerCase()}`">
          <div>{{ car.condition }}</div>
        </div>
        <div class="car-card__top-actions">
          <!--          <div>
                      <IconButton color="A6A6A6"
                                  size="sm"
                                  icon="car-back"
                                  @click="showSuccess"
                      />

                    </div>-->
          <div>
            <IconButton
                size="sm"
                color="#E33636"
                :icon="isLiked ? 'car-like' : 'car-like-active'"
                @click="toggleLike"
            />
          </div>
        </div>
        <HoverSwiper
            :slides="car.images"
            class="car-card__swiper"
        />
      </div>

    </div>
    <div class="car-card__bot d-flex fc jc">
      <!--      <div class="car-card__location d-flex ac" v-if="car.location">
              <BaseIcon :width="16" color="#999" icon="location"/>
              {{ car.location }}
            </div>-->
      <div class="car-card__price">
        {{ car.price.toLocaleString() }} AED
      </div>
      <div class="car-card__name d-flex ac">
        {{ car.name }}
      </div>
      <div class="car-card__info d-flex ac">
        <div class="d-flex ac">
          <BaseIcon :width="16" color="#999" icon="car-calendar"/>
          {{ car.year }}
        </div>
        <div class="d-flex ac">
          <BaseIcon :width="16" color="#999" icon="car-speed"/>
          {{ car.mileage }} km
        </div>

      </div>
      <div v-if="car.leasing" class="car-card__bot-leasing">
        <div class="leasing-title">
          Leasing
        </div>
        <div class="leasing-price">
          from {{ car.leasing.toLocaleString() }} AED
        </div>
        <!--        <BaseButton color="gray" @click="navigateTo(`/car/${car.id}`)">
                  View More
                </BaseButton>
                <BaseButton color="green">
                  Contact
                </BaseButton>-->
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/styles/mixins" as *;

.car-card {
  position: relative;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.07);
  min-width: 0;

  &__header {
    display: flex;
    gap: 12px;
    align-items: center;
    padding: 12px 20px;

    font-weight: 600;
    font-size: 16px;

    img {
      width: 36px;
      height: 36px;
    }

    &-actions {
      display: flex;
      align-items: center;
      margin-left: auto;
      gap: 6px;

      > svg {
        cursor: pointer;
      }
    }

    @include respond($laptop) {
      display: none;
    }
  }

  &__top {
    height: 275px;
    width: 100%;
    cursor: pointer;
    position: relative;
    @include respond(1499px) {
      height: 200px;
    }

    &-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
    }

    &-badge {
      position: absolute;
      left: 16px;
      top: 16px;
      z-index: 11;

      @include respond($laptop) {
        left: 16px;
        top: 16px;
      }

      > div {
        font-weight: 500;
        font-size: 14px;
        border-radius: 6px;
        padding: 2px 8px;
        background: #4a52db;
        color: white;
      }

      &.badge-used {
        > div {
          background: #1a1a1a;
        }
      }

      &.badge-rental {
        > div {
          background: #08b321;
        }
      }
    }


    &-actions {
      position: absolute;
      top: 16px;
      right: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 11;

      @include respond($laptop) {
        right: 16px;
        top: 16px;
      }

      > div {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 100px;
        width: 44px;
        height: 44px;
        box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.04);
        background: #fff;

        :deep(svg) {
          min-width: 24px;
          min-height: 24px;
        }


        &:hover {
          box-shadow: none;
        }
      }
    }
  }


  &__bot {
    padding: 16px;
    display: flex;
    flex-direction: column;
    @include respond($laptop) {
      gap: 0;
    }

    &-leasing {
      margin-top: 8px;
      display: flex;
      justify-content: space-between;
      width: 100%;
      border-radius: 8px;
      padding: 8px 12px;
      background: #f5f5f5;

      .leasing-title {
        font-weight: 500;
        font-size: 12px;
        color: #999;
      }

      .leasing-price {
        font-weight: 600;
        font-size: 12px;
        color: #1a1a1a;
      }

    }

    @include respond($laptop) {
      padding: 16px 19px;
    }
  }

  &__name {
    font-weight: 500;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    color: #999;
    @include respond($laptop) {
      font-size: 16px;
    }
  }

  &__info {
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    gap: 10px;
    color: #999;

    > div {
      gap: 4px;

    }
  }

  &__location {
    font-weight: 500;
    font-size: 14px;
    color: #999;

    gap: 6px;

    @include respond($laptop) {
      display: none;
    }
  }

  &__price {
    font-weight: 700;
    font-size: 20px;
  }

}
</style>