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
        <TasksList class="tabHome__tasksListWidget" />
      </TabMainContent>
    </IonContent>
  </PageBase>
</template>

<script setup lang="ts">
import { IonContent } from '@ionic/vue';
import type { EventData, SubjectData } from '@/types/commonTypes';

import EvenOddCalendarToggle from '@/widgets/EvenOddCalendarToggle.vue';
import SubjectsCalendar from '@/widgets/SubjectsCalendar.vue';
import UpcomingEvents from '@/widgets/UpcomingEvents.vue';
import TasksList from '@/widgets/TasksList.vue';

import TabMainContent from '@/components/layouts/TabMainContent.vue';
import PageBase from '@/components/layouts/PageBase.vue';

import TabHeading from '@/components/ui/TabHeading.vue';

const subjects: SubjectData[] = [
  {
    id: 1,
    name: 'Subject 1',
    day: 'Monday',
    start: '8:00',
    end: '9:30',
    evenOdd: 'odd',
    classNumber: '224',
    grade: 4,
  },
  {
    id: 2,
    name: 'Subject 2',
    day: 'Monday',
    start: '10:15',
    end: '12:00',
    evenOdd: 'odd',
    classNumber: '224',
    grade: 4,
  },
  {
    id: 3,
    name: 'Subject 3',
    day: 'Friday',
    start: '9:15',
    end: '10:45',
    evenOdd: 'odd',
    classNumber: '244',
    grade: 4,
  },
  {
    id: 4,
    name: 'Subject 4',
    day: 'Wednesday',
    start: '7:30',
    end: '10:00',
    evenOdd: 'odd',
    classNumber: '224',
    grade: 4,
  },
  {
    id: 5,
    name: 'Subject 5',
    day: 'Wednesday',
    start: '16:30',
    end: '18:00',
    evenOdd: 'odd',
    classNumber: '54',
    grade: 4,
  },
];

const events: EventData[] = [
  { id: 1, name: 'Some event 1', eventDate: '2024-01-12' },
  {
    id: 2,
    name: 'Some event 2',
    eventDate: '2024-10-10',
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

  &__tasksListWidget {
    margin-bottom: 30px;
  }
}
</style>
