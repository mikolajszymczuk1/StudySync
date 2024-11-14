<template>
  <PageBase class="tabProfile">
    <IonContent :fullscreen="true">
      <TabMainContent>
        <TabHeading>
          Welcome, <br />
          <span>Username</span>
        </TabHeading>
        <div class="tabProfile__detailsContainer">
          <SimpleHeading>Profile details</SimpleHeading>
          <div class="tabProfile__details">
            <div class="tabProfile__singleDetail">
              <div class="tabProfile__fieldType">Username</div>
              <div class="tabProfile__fieldValue">username</div>
              <PencilCircle />
            </div>
            <div class="tabProfile__singleDetail">
              <div class="tabProfile__fieldType">Firstname</div>
              <div class="tabProfile__fieldValue">firstname</div>
              <PencilCircle />
            </div>
            <div class="tabProfile__singleDetail">
              <div class="tabProfile__fieldType">Lastname</div>
              <div class="tabProfile__fieldValue">lastname</div>
              <PencilCircle />
            </div>
          </div>
        </div>
      </TabMainContent>
    </IonContent>
  </PageBase>
</template>

<script setup lang="ts">
import { IonContent } from '@ionic/vue';

import TabMainContent from '@/components/layouts/TabMainContent.vue';
import TabHeading from '@/components/ui/TabHeading.vue';
import PageBase from '@/components/layouts/PageBase.vue';
import SimpleHeading from '@/components/ui/SimpleHeading.vue';
import PencilCircle from '@/components/ui/PencilCircle.vue';
</script>

<style scoped lang="scss">
.tabProfile {
  &__detailsContainer {
    padding: 15px;

    background-color: $ColorBackground;
    border-radius: 20px;
  }

  &__details {
    display: flex;
    flex-direction: column;
    gap: 32px;

    margin-top: 15px;
    padding: 15px;

    border-radius: 20px;
    background-color: $ColorWhite;
  }

  &__singleDetail {
    display: flex;
    align-items: center;

    padding-bottom: 10px;

    border-bottom: solid 1px rgba($ColorAccentVariant, 0.1);

    font-family: $teachers;
    color: $ColorAccentVariant;
    font-weight: 600;
  }

  &__fieldType {
    flex: 1;
  }

  &__fieldValue {
    margin: 0 15px;

    color: rgba($ColorAccentVariant, 0.8);
  }
}
</style>
