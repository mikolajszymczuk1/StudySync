<template>
  <IonApp class="app">
    <IonMenu :disabled="isMenuVisible" type="push" content-id="mainContent">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu Content</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonMenuToggle>
          <IonButton @click="handleClick()">Click to close the menu</IonButton>
        </IonMenuToggle>
      </IonContent>
    </IonMenu>
    <IonRouterOutlet id="mainContent" />
  </IonApp>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useIonRouter } from '@ionic/vue';
import {
  IonApp,
  IonRouterOutlet,
  IonContent,
  IonMenu,
  IonHeader,
  IonTitle,
  IonMenuToggle,
  IonButton,
  IonToolbar,
} from '@ionic/vue';
import { useUserStore } from '@/stores/userStore';

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
