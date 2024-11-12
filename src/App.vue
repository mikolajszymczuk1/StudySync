<template>
  <IonApp class="app">
    <IonMenu type="push" content-id="mainContent">
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
</script>
