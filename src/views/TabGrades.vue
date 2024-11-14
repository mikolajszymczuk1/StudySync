<template>
  <PageBase class="tabGrades">
    <IonContent :fullscreen="true">
      <TabMainContent>
        <TabHeading>
          Manage <br />
          your <span>grades</span>
        </TabHeading>
      </TabMainContent>
    </IonContent>
  </PageBase>
</template>

<script setup lang="ts">
import { IonContent } from '@ionic/vue';

import TabMainContent from '@/components/layouts/TabMainContent.vue';
import TabHeading from '@/components/ui/TabHeading.vue';
import PageBase from '@/components/layouts/PageBase.vue';
</script>
