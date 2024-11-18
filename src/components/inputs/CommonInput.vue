<template>
  <label class="commonInput" :class="noIcon ? 'commonInput--noIcon' : ''">
    <div v-if="!noLabel" class="commonInput__label">
      {{ labelText }}
    </div>
    <div class="commonInput__inputWrapper">
      <input
        :id="name"
        v-model="value"
        class="commonInput__input"
        :type="isPassword ? 'password' : 'text'"
        :placeholder="placeholder"
        :name="name"
      />
      <FontAwesomeIcon
        v-if="!noIcon"
        class="commonInput__icon"
        :icon="customIcon"
      />
    </div>
    <div v-if="errorMessage" class="commonInput__errorMessage">
      - {{ errorMessage }}
    </div>
  </label>
</template>

<script setup lang="ts">
import { onMounted, type PropType } from 'vue';
import { useField } from 'vee-validate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faMagnifyingGlass,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  isPassword: {
    type: Boolean,
    default: false,
  },
  initValue: {
    type: String,
    default: '',
  },
  noLabel: {
    type: Boolean,
    default: false,
  },
  labelText: {
    type: String,
    default: 'Example label',
  },
  customIcon: {
    type: Object as PropType<IconDefinition>,
    default: faMagnifyingGlass,
  },
  noIcon: {
    type: Boolean,
    default: false,
  },
});

/** Catch value and errors from field (input component) */
const { errorMessage, value } = useField<string>(() => props.name);

onMounted((): void => {
  if (props.initValue !== '') {
    value.value = props.initValue;
  }
});
</script>

<style scoped lang="scss">
.commonInput {
  $self: &;

  &__label {
    margin-bottom: 10px;

    font-family: $teachers;
    font-weight: 600;
    color: $ColorAccentVariant;
    font-size: 1.25rem;
  }

  &__inputWrapper {
    position: relative;
  }

  &__input {
    height: 40px;
    width: 100%;
    padding: 0 50px 0 25px;

    background-color: $ColorWhite;
    outline: none;
    border: solid 1px rgba($ColorAccentVariant, 0.1);
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba($ColorAccentVariant, 0.1);

    font-family: $teachers;
    font-size: 0.875rem;
    color: $ColorAccentVariant;
    font-weight: 500;

    #{ $self }--noIcon & {
      padding-right: 25px;
    }

    &::placeholder {
      font-family: $teachers;
      font-size: 0.875rem;
      color: $ColorAccentVariant;
      font-weight: 500;
    }
  }

  &__icon {
    position: absolute;
    right: 25px;
    top: 50%;

    transform: translateY(-50%);

    font-size: 1.0625rem;
    color: $ColorAccentVariant;
  }

  &__errorMessage {
    margin-top: 6px;

    font-family: $teachers;
    font-weight: 500;
    font-size: 0.875rem;
    color: rgba($ColorWhite, 0.8);
  }
}
</style>
