<template>
  <PageBase class="registerView">
    <NavBar />
    <IonContent :fullscreen="true">
      <TabMainContent>
        <TabHeading class="registerView__heading">
          <span>Create</span> new <br />
          account
        </TabHeading>
        <div class="registerView__form">
          <CommonInput
            name="username"
            placeholder="Write your username ..."
            label-text="Username"
            :custom-icon="faUser"
          />
          <CommonInput
            name="password"
            placeholder="Write your password ..."
            is-password
            label-text="Password"
            :custom-icon="faLock"
          />
          <CommonInput
            name="passwordRepeat"
            placeholder="Repeat your password ..."
            is-password
            label-text="Repeat password"
            :custom-icon="faLock"
          />
          <div class="registerView__buttons">
            <PrimaryButton @click-action="handleRegister()">
              Register
            </PrimaryButton>
            <PrimaryButton bordered @click-action="handleLogin()">
              Login
            </PrimaryButton>
          </div>
        </div>
      </TabMainContent>
    </IonContent>
  </PageBase>
</template>

<script setup lang="ts">
import { IonContent } from '@ionic/vue';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { useIonRouter } from '@ionic/vue';

import TabMainContent from '@/components/layouts/TabMainContent.vue';
import TabHeading from '@/components/ui/TabHeading.vue';
import PageBase from '@/components/layouts/PageBase.vue';
import NavBar from '@/components/common/NavBar.vue';
import CommonInput from '@/components/inputs/CommonInput.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';

const router = useIonRouter();

const handleRegister = (): void => {
  router.push('/tabs/home');
};

const handleLogin = (): void => {
  router.push('/login');
};
</script>

<style scoped lang="scss">
.registerView {
  &__heading {
    margin-top: 40px;

    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 25px;

    width: 250px;
    margin: 0 auto;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;

    margin-top: 5px;
  }
}
</style>
