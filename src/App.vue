<template>
  <IonApp class="app">
    <IonMenu v-if="isMenuVisible" type="push" content-id="mainContent">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu Content</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonMenuToggle>
          <IonButton>Click to close the menu</IonButton>
        </IonMenuToggle>
      </IonContent>
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
  IonTitle,
  IonMenuToggle,
  IonButton,
  IonToolbar,
} from '@ionic/vue';

const route = useRoute();

const isMenuVisible = computed<boolean>(() => {
  return !['login', 'register'].includes(route.name as string);
});
</script>
