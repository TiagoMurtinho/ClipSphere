<template>
  <teleport to="body">
    <CModal
      alignment="center"
      backdrop="static"
      :visible="visible"
      @close="closeModal"
      aria-labelledby="VerticallyCenteredExample"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredExample">{{ title }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <slot></slot>
      </CModalBody>
      <CModalFooter>
        <slot name="footer">
          <CButton
            color="secondary"
            @click="closeModal"
          >
            Fechar
          </CButton>
          <CButton
            color="primary"
            @click="confirm"
          >
            Salvar mudanças
          </CButton>
        </slot>
      </CModalFooter>
    </CModal>
  </teleport>
</template>

<script setup>
import { CButton } from '@coreui/vue/dist/esm/components/button/index.js'
import {
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle
} from '@coreui/vue/dist/esm/components/modal/index.js'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Modal Title',
  },
});

const emit = defineEmits(['close', 'confirm']);

const closeModal = () => {
  emit('close');
};

const confirm = () => {
  emit('confirm');
};
</script>
