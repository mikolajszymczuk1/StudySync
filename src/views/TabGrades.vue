<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Grades</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">Grades tab</IonTitle>
        </IonToolbar>
      </IonHeader>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/vue';
</script>
