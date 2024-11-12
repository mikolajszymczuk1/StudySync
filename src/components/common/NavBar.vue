<template>
  <IonHeader class="navBar">
    <IonToolbar class="navBar__headerToolbar">
      <IonTitle class="navBar__logo">StudySync</IonTitle>
      <IonButtons slot="end" class="navBar__buttonsContainer">
        <IonMenuToggle>
          <IonButton class="navBar__menuButton">
            <FontAwesomeIcon class="navBar__menuIcon" :icon="faBars" />
          </IonButton>
        </IonMenuToggle>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
</template>

<script setup lang="ts">
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonMenuToggle,
} from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
</script>

<style scoped lang="scss">
.navBar {
  position: relative;

  box-shadow: 0 4px 15px rgba($ColorAccentVariant, 0.1);
  border-bottom: solid 1px rgba($ColorWhite, 0.1);

  &__headerToolbar {
    --background: transparent;
    --min-height: auto;

    display: flex;
    position: relative;
    padding: 15px;

    background: linear-gradient(
      45deg,
      rgba($ColorSecondary, 0.8) 0%,
      rgba($ColorPrimary, 0.8) 50%,
      rgba($ColorTertiary, 0.8) 100%
    );
    backdrop-filter: blur(15px);
  }

  &__logo {
    padding-left: 0;

    font-family: $teachers;
    font-size: 1.25rem;
    font-weight: bold;
    color: $ColorWhite;
  }

  &__buttonsContainer {
    height: 20px;
    min-height: 20px;
  }

  &__menuButton {
    --padding-end: 0;
    --padding-start: 0;
    --padding-top: 0;
    --padding-bottom: 0;

    min-height: 20px;
  }

  &__menuIcon {
    color: rgba($ColorWhite, 0.8);
    height: 20px;
    width: 23px;
  }
}
</style>
