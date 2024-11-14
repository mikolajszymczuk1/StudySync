<template>
  <PageBase class="loginView">
    <NavBar />
    <IonContent :fullscreen="true">
      <TabMainContent>
        <TabHeading class="loginView__heading">
          <span>Login</span> to your <br />
          account
        </TabHeading>
        <div class="loginView__form">
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
          <div class="loginView__buttons">
            <PrimaryButton @click-action="handleLogin()">Login</PrimaryButton>
            <PrimaryButton bordered @click-action="handleRegister()">
              Register
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

const handleLogin = (): void => {
  router.push('/tabs/home');
};

const handleRegister = (): void => {
  router.push('/register');
};
</script>

<style scoped lang="scss">
.loginView {
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
