<template>
  <PageBase class="tabHome">
    <IonContent :fullscreen="true">
      <TabMainContent>
        <TabHeading large-bottom-space>
          Become a
          <span>
            time <br />
            management <br />
          </span>
          master
        </TabHeading>
        <EvenOddCalendarToggle class="tabHome__evenOddCalendarToggleWidget" />
        <SubjectsCalendar
          class="tabHome__subjectsCalendarWidget"
          :subjects="subjects"
        />
        <UpcomingEvents
          class="tabHome__upcomingEventsWidget"
          :events="events"
        />
        <TasksList />
      </TabMainContent>
    </IonContent>
  </PageBase>
</template>

<script setup lang="ts">
import { IonContent } from '@ionic/vue';
import type { EventData, SubjectData } from '@/types/commonTypes';
import SubjectsCalendar from '@/widgets/SubjectsCalendar.vue';
import UpcomingEvents from '@/widgets/UpcomingEvents.vue';
import TabMainContent from '@/components/layouts/TabMainContent.vue';
import TabHeading from '@/components/ui/TabHeading.vue';
import EvenOddCalendarToggle from '@/widgets/EvenOddCalendarToggle.vue';
import PageBase from '@/components/layouts/PageBase.vue';
import TasksList from '@/widgets/TasksList.vue';

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

const events: EventData[] = [
  { name: 'Some event 1', eventDate: '12-01-2024' },
  {
    name: 'Some event 2',
    eventDate: '10-10-2024',
  },
];
</script>

<style scoped lang="scss">
.tabHome {
  &__evenOddCalendarToggleWidget {
    margin-bottom: 10px;
  }

  &__subjectsCalendarWidget,
  &__upcomingEventsWidget {
    margin-bottom: 15px;
  }
}
</style>
