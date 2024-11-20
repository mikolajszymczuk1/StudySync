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
          :subjects="subjectStore.subjects"
        />
        <UpcomingEvents
          class="tabHome__upcomingEventsWidget"
          :events="eventStore.events"
        />
        <TasksList class="tabHome__tasksListWidget" :items="todoStore.items" />
      </TabMainContent>
    </IonContent>
  </PageBase>
</template>

<script setup lang="ts">
import { IonContent } from '@ionic/vue';
import { useSubjectStore } from '@/stores/subjectStore';
import { useEventStore } from '@/stores/eventStore';
import { useTodoStore } from '@/stores/todoStore';

import EvenOddCalendarToggle from '@/widgets/EvenOddCalendarToggle.vue';
import SubjectsCalendar from '@/widgets/SubjectsCalendar.vue';
import UpcomingEvents from '@/widgets/UpcomingEvents.vue';
import TasksList from '@/widgets/TasksList.vue';

import TabMainContent from '@/components/layouts/TabMainContent.vue';
import PageBase from '@/components/layouts/PageBase.vue';

import TabHeading from '@/components/ui/TabHeading.vue';

const subjectStore = useSubjectStore();
const eventStore = useEventStore();
const todoStore = useTodoStore();
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
