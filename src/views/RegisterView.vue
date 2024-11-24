<template>
  <PageBase class="registerView">
    <NavBar />
    <IonContent :fullscreen="true">
      <TabMainContent>
        <TabHeading class="registerView__heading" data-cy="tabHeadingRegister">
          <span>Create</span> new <br />
          account
        </TabHeading>
        <div class="registerView__form">
          <CommonInput
            name="username"
            placeholder="Write your username ..."
            label-text="Username"
            :custom-icon="faUser"
            data-cy="registerUsernameInput"
          />
          <CommonInput
            name="password"
            placeholder="Write your password ..."
            is-password
            label-text="Password"
            :custom-icon="faLock"
            data-cy="registerPasswordInput"
          />
          <CommonInput
            name="repeatPassword"
            placeholder="Repeat your password ..."
            is-password
            label-text="Repeat password"
            :custom-icon="faLock"
            data-cy="registerRepeatPasswordInput"
          />
          <div class="registerView__buttons">
            <PrimaryButton
              data-cy="registerButton"
              @click-action="handleRegister()"
            >
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
import { RegisterForm } from '@/types/formTypes';
import { useForm } from 'vee-validate';
import { object, string, ref as yupRef } from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import { useUserStore } from '@/stores/userStore';

import TabMainContent from '@/components/layouts/TabMainContent.vue';
import TabHeading from '@/components/ui/TabHeading.vue';
import PageBase from '@/components/layouts/PageBase.vue';
import NavBar from '@/components/common/NavBar.vue';
import CommonInput from '@/components/inputs/CommonInput.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';

const router = useIonRouter();
const userStore = useUserStore();

const { values, validate, meta, setErrors } = useForm<RegisterForm>({
  validationSchema: toTypedSchema(
    object({
      username: string().required().min(4),
      password: string().required().min(4),
      repeatPassword: string()
        .required()
        .min(4)
        .oneOf([yupRef('password')], 'Passwords must match'),
    }),
  ),
});

const handleRegister = async (): Promise<void> => {
  validate();
  if (meta.value.valid) {
    const { status, error } = await userStore.registerUser(
      values.username,
      values.password,
      values.repeatPassword,
    );

    if (status) {
      router.push('/tabs/home');
    } else {
      setErrors({
        username: error,
      });
    }
  }
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
