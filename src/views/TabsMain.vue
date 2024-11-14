<template>
  <IonPage class="tabsMain">
    <NavBar />
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
      <IonTabBar slot="bottom" class="tabsMain__tabBar">
        <IonTabButton
          class="tabsMain__tabButton"
          tab="tabProfile"
          href="/tabs/profile"
          @click.prevent="changeTab('profile')"
        >
          <FontAwesomeIcon class="tabsMain__tabButtonIcon" :icon="faUser" />
          <IonLabel class="tabsMain__tabButtonLabel">Profile</IonLabel>
        </IonTabButton>
        <IonTabButton
          class="tabsMain__tabButton"
          tab="tabEvents"
          href="/tabs/events"
          @click.prevent="changeTab('events')"
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
          @click.prevent="changeTab('home')"
        >
          <FontAwesomeIcon class="tabsMain__tabButtonIcon" :icon="faHouse" />
          <IonLabel class="tabsMain__tabButtonLabel">Home</IonLabel>
        </IonTabButton>
        <IonTabButton
          class="tabsMain__tabButton"
          tab="tabSubjects"
          href="/tabs/subjects"
          @click.prevent="changeTab('subjects')"
        >
          <FontAwesomeIcon class="tabsMain__tabButtonIcon" :icon="faBook" />
          <IonLabel class="tabsMain__tabButtonLabel">Subjects</IonLabel>
        </IonTabButton>
        <IonTabButton
          class="tabsMain__tabButton"
          tab="tabGrades"
          href="/tabs/grades"
          @click.prevent="changeTab('grades')"
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
  useIonRouter,
} from '@ionic/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHouse,
  faCalendarCheck,
  faUser,
  faBook,
  faGraduationCap,
} from '@fortawesome/free-solid-svg-icons';
import NavBar from '@/components/common/NavBar.vue';

const router = useIonRouter();

/**
 * Change current tab
 * @param {string} tabPathName tab path name
 */
const changeTab = (tabPathName: string): void => {
  router.push(`/tabs/${tabPathName}`);
};
</script>

<style scoped lang="scss">
.tabsMain {
  $self: &;

  &__tabBar {
    height: 80px;

    background-color: $ColorAccentVariant;
  }

  &__tabButton {
    background-color: $ColorAccentVariant;
    border-radius: 20px;

    &.tab-selected {
      background-color: $ColorAccent;
    }
  }

  &__tabButtonIcon {
    color: rgba($ColorTertiary, 0.5);
    font-size: 25px;

    #{ $self }__tabButton.tab-selected & {
      color: $ColorWhite;
    }
  }

  &__tabButtonLabel {
    margin-top: 6px;

    font-family: $teachers;
    font-weight: 500;
    color: rgba($ColorTertiary, 0.5);
    font-size: 0.75rem;

    #{ $self }__tabButton.tab-selected & {
      color: $ColorWhite;
    }
  }
}
</style>
