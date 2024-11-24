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
              <div class="tabProfile__fieldValue">
                {{ userStore.user?.username }}
              </div>
              <PencilCircle class="tabProfile__editCircle" />
            </div>
            <div class="tabProfile__singleDetail">
              <div class="tabProfile__fieldType">Firstname</div>
              <div class="tabProfile__fieldValue">
                {{ userStore.user?.firstName }}
              </div>
              <PencilCircle @click="changeFieldValue('firstName')" />
            </div>
            <div class="tabProfile__singleDetail">
              <div class="tabProfile__fieldType">Lastname</div>
              <div class="tabProfile__fieldValue">
                {{ userStore.user?.lastName }}
              </div>
              <PencilCircle @click="changeFieldValue('lastName')" />
            </div>
          </div>
        </div>
      </TabMainContent>
      <CreateEditModal
        :modal-open="modalOpen"
        :heading="`Change ${fieldToEdit === 'firstName' ? 'first name' : 'last name'}`"
        small-size
        no-delete
        @on-close="closeModal()"
        @on-save="saveUserData()"
      >
        <ModalForm>
          <div>
            <ModalInputLabel>
              {{ fieldToEdit === 'firstName' ? 'First name' : 'Last name' }}
            </ModalInputLabel>
            <CommonInput :name="fieldToEdit" no-icon no-label />
          </div>
        </ModalForm>
      </CreateEditModal>
    </IonContent>
  </PageBase>
</template>

<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { IonContent } from '@ionic/vue';
import { useUserStore } from '@/stores/userStore';
import { useForm } from 'vee-validate';
import type { UserDataModalForm } from '@/types/formTypes';

import TabMainContent from '@/components/layouts/TabMainContent.vue';
import TabHeading from '@/components/ui/TabHeading.vue';
import PageBase from '@/components/layouts/PageBase.vue';
import SimpleHeading from '@/components/ui/SimpleHeading.vue';
import PencilCircle from '@/components/ui/PencilCircle.vue';
import CreateEditModal from '@/components/modals/CreateEditModal.vue';
import ModalForm from '@/components/layouts/ModalForm.vue';
import CommonInput from '@/components/inputs/CommonInput.vue';
import ModalInputLabel from '@/components/ui/ModalInputLabel.vue';

const userStore = useUserStore();

const { values, setFieldValue } = useForm<UserDataModalForm>();

// Modal data
// ---------------------------------------------

const modalOpen: Ref<boolean> = ref(false);
const fieldToEdit: Ref<string> = ref('');

// ---------------------------------------------

const openModal = (): void => {
  modalOpen.value = true;
};

const closeModal = (): void => {
  modalOpen.value = false;
};

/**
 * Change field value
 * @param {string} field field name
 */
const changeFieldValue = async (field: string): Promise<void> => {
  fieldToEdit.value = field;
  if (fieldToEdit.value === 'firstName') {
    setFieldValue('firstName', userStore.user!.firstName);
  } else {
    setFieldValue('lastName', userStore.user!.lastName);
  }
  openModal();
};

/** Save user data */
const saveUserData = async (): Promise<void> => {
  if (values.firstName === '' || values.lastName === '') {
    closeModal();
    return;
  }

  await userStore.changeUserData(
    fieldToEdit.value,
    values[fieldToEdit.value as keyof UserDataModalForm],
  );
  closeModal();
};
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

    overflow: hidden;

    color: rgba($ColorAccentVariant, 0.8);
  }

  &__editCircle {
    opacity: 0;
  }
}
</style>
