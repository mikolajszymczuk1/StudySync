<template>
  <IonPage class="tabHome">
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
    <IonContent :fullscreen="true">
      <div class="tabHome__decorationUnder"></div>
      <div class="tabHome__tabMainContent">
        <SubjectsCalendar :subjects="subjects" />
        <div class="">
          <UpcomingEvents :events="events" />
        </div>
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
import type { EventData, SubjectData } from '@/types/commonTypes';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SubjectsCalendar from '@/widgets/SubjectsCalendar.vue';
import UpcomingEvents from '@/widgets/UpcomingEvents.vue';

const subjects: SubjectData[] = [
  {
    name: 'Subject 1',
    day: 'Monday',
    start: '8:00',
    end: '9:30',
    classNumber: '224',
  },
  {
    name: 'Subject 2',
    day: 'Monday',
    start: '10:15',
    end: '12:00',
    classNumber: '224',
  },
  {
    name: 'Subject 3',
    day: 'Friday',
    start: '9:15',
    end: '10:45',
    classNumber: '244',
  },
  {
    name: 'Subject 4',
    day: 'Wednesday',
    start: '7:30',
    end: '10:00',
    classNumber: '224',
  },
  {
    name: 'Subject 5',
    day: 'Wednesday',
    start: '16:30',
    end: '18:00',
    classNumber: '54',
  },
];

const events: EventData[] = [];
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

  &__tabMainContent {
    position: relative;
    padding: 0 15px;
  }
}

.menuHeader {
  position: relative;

  box-shadow: none;

  &__headerToolbar {
    --background: transparent;
    --min-height: auto;

    display: flex;
    padding: 30px 15px;

    background: $darkRose;
    background: linear-gradient(
      90deg,
      rgba($darkRose, 1) 0%,
      rgba($lightSky, 1) 100%
    );
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
