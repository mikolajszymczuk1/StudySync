<template>
  <PageBase class="tabEvents">
    <IonContent :fullscreen="true">
      <TabMainContent>
        <TabHeading>
          Setup <br />
          your <span>events</span>
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
