<template>
  <IonPage>
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tabs/tab1">
          <IonIcon aria-hidden="true" :icon="triangle" />
          <IonLabel>Tab 1</IonLabel>
        </IonTabButton>

        <IonTabButton tab="tab2" href="/tabs/tab2">
          <IonIcon aria-hidden="true" :icon="ellipse" />
          <IonLabel>Tab 2</IonLabel>
        </IonTabButton>

        <IonTabButton tab="tab3" href="/tabs/tab3">
          <IonIcon aria-hidden="true" :icon="square" />
          <IonLabel>Tab 3</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';
</script>
