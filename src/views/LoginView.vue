<template>
  <PageBase class="loginView">
    <NavBar />
    <IonContent :fullscreen="true">
      <TabMainContent>
        <TabHeading class="loginView__heading" data-cy="tabHeadingLogin">
          <span>Login</span> to your <br />
          account
        </TabHeading>
        <div class="loginView__form">
          <CommonInput
            name="username"
            placeholder="Write your username ..."
            label-text="Username"
            :custom-icon="faUser"
            data-cy="loginUsernameInput"
          />
          <CommonInput
            name="password"
            placeholder="Write your password ..."
            is-password
            label-text="Password"
            :custom-icon="faLock"
            data-cy="loginPasswordInput"
          />
          <div class="loginView__buttons">
            <PrimaryButton data-cy="loginButton" @click-action="handleLogin()">
              Login
            </PrimaryButton>
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
import { onBeforeRouteLeave } from 'vue-router';
import { IonContent, useIonRouter } from '@ionic/vue';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { LoginForm } from '@/types/formTypes';
import { useForm } from 'vee-validate';
import { useUserStore } from '@/stores/userStore';
import { object, string } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';

import TabMainContent from '@/components/layouts/TabMainContent.vue';
import TabHeading from '@/components/ui/TabHeading.vue';
import PageBase from '@/components/layouts/PageBase.vue';
import NavBar from '@/components/common/NavBar.vue';
import CommonInput from '@/components/inputs/CommonInput.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';

const router = useIonRouter();
const userStore = useUserStore();

const { values, validate, meta, setErrors, setFieldValue, resetForm } =
  useForm<LoginForm>({
    validationSchema: toTypedSchema(
      object({
        username: string().required(),
        password: string().required(),
      }),
    ),
  });

const handleLogin = async (): Promise<void> => {
  validate();
  if (meta.value.valid) {
    const { status, error } = await userStore.loginUser(
      values.username,
      values.password,
    );

    if (status) {
      router.push('/tabs/home');
    } else {
      setErrors({
        username: error,
        password: error,
      });
    }
  }
};

const handleRegister = (): void => {
  router.push('/register');
};

onBeforeRouteLeave((): void => {
  setFieldValue('username', '');
  setFieldValue('password', '');
  resetForm();
});
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
