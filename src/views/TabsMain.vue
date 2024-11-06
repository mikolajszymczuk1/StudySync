<template>
  <IonPage class="tabsMain">
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
      <IonTabBar slot="bottom" class="tabsMain__tabBar">
        <IonTabButton
          class="tabsMain__tabButton"
          tab="tabProfile"
          href="/tabs/profile"
        >
          <FontAwesomeIcon class="tabsMain__tabButtonIcon" :icon="faUser" />
          <IonLabel class="tabsMain__tabButtonLabel">Profile</IonLabel>
        </IonTabButton>
        <IonTabButton
          class="tabsMain__tabButton"
          tab="tabEvents"
          href="/tabs/events"
        >
          <FontAwesomeIcon
            class="tabsMain__tabButtonIcon"
            :icon="faCalendarCheck"
          />
          <IonLabel class="tabsMain__tabButtonLabel">Events</IonLabel>
        </IonTabButton>
        <IonTabButton
          class="tabsMain__tabButton"
          tab="tabHome"
          href="/tabs/home"
        >
          <FontAwesomeIcon class="tabsMain__tabButtonIcon" :icon="faHouse" />
          <IonLabel class="tabsMain__tabButtonLabel">Home</IonLabel>
        </IonTabButton>
        <IonTabButton
          class="tabsMain__tabButton"
          tab="tabSubjects"
          href="/tabs/subjects"
        >
          <FontAwesomeIcon class="tabsMain__tabButtonIcon" :icon="faBook" />
          <IonLabel class="tabsMain__tabButtonLabel">Subjects</IonLabel>
        </IonTabButton>
        <IonTabButton
          class="tabsMain__tabButton"
          tab="tabGrades"
          href="/tabs/grades"
        >
          <FontAwesomeIcon
            class="tabsMain__tabButtonIcon"
            :icon="faGraduationCap"
          />
          <IonLabel class="tabsMain__tabButtonLabel">Grades</IonLabel>
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
  IonPage,
  IonRouterOutlet,
} from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHouse,
  faCalendarCheck,
  faUser,
  faBook,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
</script>

<style scoped lang="scss">
.tabsMain {
  $self: &;

  &__tabBar {
    height: 106px;

    background-color: $darkMaroon;
  }

  &__tabButton {
    background-color: $darkMaroon;
  }

  &__tabButtonIcon {
    color: rgba(white, 0.15);
    font-size: 25px;

    #{ $self }__tabButton.tab-selected & {
      color: $cyan;
    }
  }

  &__tabButtonLabel {
    margin-top: 6px;

    font-family: $teachers;
    font-weight: 500;
    color: rgba(white, 0.15);
    font-size: 0.75rem;

    #{ $self }__tabButton.tab-selected & {
      color: $cyan;
    }
  }
}
</style>
