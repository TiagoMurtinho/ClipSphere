<template>
  <transition
    name="feedback-modal"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div
      v-if="isOpen"
      class="feedback-modal-overlay"
      @click="closeModal"
    >
      <div
        :class="['feedback-modal', { 'is-open': isOpen }]"
        @click.stop
      >

        <div
          class="feedback-modal-close"
          @click="closeModal"
        >
          <CIcon
            :icon="cilX"
          />
        </div>

        <h2>Enviar Feedback</h2>
        <p>Gostaríamos de saber sua opinião!</p>

        <textarea
          v-model="feedback"
          placeholder="Escreva seu feedback aqui..."
          rows="5"
          class="feedback-modal-textarea"
        ></textarea>

        <div class="feedback-modal-actions">
          <button
            @click="submitFeedback"
            class="feedback-modal-submit-btn"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import './FeedbackModal.css'
import { ref, watch } from 'vue';
import { cilX } from '@coreui/icons'
import { CIcon } from '@coreui/icons-vue'
import Swal from 'sweetalert2'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['close', 'submitFeedback']);

const feedback = ref('');

function closeModal() {
  emit('close');
}

function submitFeedback() {
  if (feedback.value.trim()) {
    emit('submitFeedback', feedback.value);
    feedback.value = '';
    closeModal();
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Atenção',
      text: 'Por favor, insira um feedback.',
      confirmButtonText: 'OK',
    });
  }
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  },
  { immediate: true }
);

function beforeEnter(el) {
  el.style.transform = 'translateY(100%)';
}

function enter(el, done) {
  el.offsetHeight;
  el.style.transition = 'transform 0.5s ease-out';
  el.style.transform = 'translateY(0)';
  done();
}

function leave(el, done) {
  el.style.transition = 'transform 0.5s ease-in';
  el.style.transform = 'translateY(100%)';
  done();
}
</script>
