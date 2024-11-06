<template>
  <IonPage class="tabHome">
    <IonContent :fullscreen="true">
      <div class="tabHome__decorationUnder"></div>
      <IonHeader class="menuHeader">
        <IonToolbar class="menuHeader__headerToolbar">
          <IonTitle class="menuHeader__logo">Study Sync</IonTitle>
          <IonButtons slot="end">
            <IonButton class="menuHeader__menuButton">
              <FontAwesomeIcon class="menuHeader__menuIcon" :icon="faBars" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <div class="tabMainContent">
        <SubjectsCalendar />
      </div>
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
  IonButtons,
  IonButton,
} from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SubjectsCalendar from '@/widgets/SubjectsCalendar.vue';
</script>

<style scoped lang="scss">
.tabHome {
  position: relative;

  &__decorationUnder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 485px;

    background: $darkRose;
    background: linear-gradient(
      90deg,
      rgba($darkRose, 1) 0%,
      rgba($lightSky, 1) 100%
    );
    border-radius: 0 0 25px 25px;
  }
}

.tabMainContent {
  position: relative;
  padding: 0 15px;

  height: 1000px;
}

.menuHeader {
  position: relative;

  box-shadow: none;

  &__headerToolbar {
    --background: transparent;
    --min-height: auto;

    display: flex;
    padding: 43px 15px 30px 15px;

    background-color: transparent;
  }

  &__logo {
    padding-left: 0;

    font-family: $teachers;
    font-size: 2.1875rem;
    font-weight: 700;
    color: $white;
  }

  &__menuButton button {
    padding: 0;
  }

  &__menuIcon {
    color: rgba($white, 0.8);
    font-size: 1.25rem;
  }
}
</style>
