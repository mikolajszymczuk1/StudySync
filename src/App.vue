<template>
  <IonApp class="app">
    <IonMenu
      class="app__sideMenu"
      :disabled="isMenuVisible"
      type="push"
      content-id="mainContent"
    >
      <IonHeader class="app__menuHeader">
        <PrimaryButton @click-action="handleClick()">Logout</PrimaryButton>
      </IonHeader>
      <IonContent></IonContent>
    </IonMenu>
    <IonRouterOutlet id="mainContent" />
  </IonApp>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import {
  IonApp,
  IonRouterOutlet,
  IonContent,
  IonMenu,
  IonHeader,
  useIonRouter,
} from '@ionic/vue';
import { useUserStore } from '@/stores/userStore';

import PrimaryButton from '@/components/buttons/PrimaryButton.vue';

const route = useRoute();
const router = useIonRouter();
const userStore = useUserStore();

const isMenuVisible = computed<boolean>(() => {
  return ['login', 'register'].includes(route.name as string);
});

const handleClick = async (): Promise<void> => {
  await userStore.logoutUser();
  router.push({ name: 'login' });
};
</script>

<style scoped lang="scss">
.app {
  &__sideMenu {
    background-color: $ColorBackground;
  }

  &__menuHeader {
    display: flex;
    align-items: center;

    height: 56px;
    padding-left: 15px;

    box-shadow: 0 4px 15px rgba($ColorAccentVariant, 0.1);
    border-bottom: solid 1px rgba($ColorAccentVariant, 0.1);
    background-color: $ColorWhite;
  }
}
</style>
