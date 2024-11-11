<template>
  <form @submit.prevent="handleLogin">
    <div class="mb-3">
      <CFormLabel for="username">Nome de Utilizador</CFormLabel>
      <div class="input-group">
        <div class="icon-container">
          <CIcon :icon="cilUser" class="input-icon" />
        </div>
        <CFormInput
          id="username"
          v-model="username"
          placeholder="Digite seu nome de utilizador"
          required
        />
      </div>
    </div>
    <div class="mb-3">
      <CFormLabel for="password">Senha</CFormLabel>
      <div class="input-group">
        <div class="icon-container">
          <CIcon :icon="cilLockLocked" class="input-icon" />
        </div>
        <CFormInput
          type="password"
          id="password"
          v-model="password"
          placeholder="Digite sua senha"
          required
        />
      </div>
    </div>
    <div class="form-check mb-3">
      <CFormCheck id="remember" v-model="rememberMe" />
      <CFormLabel for="remember">Lembrar-me</CFormLabel>
    </div>
    <div class="google-login">
      <button  @click.prevent="OAuth" type="button" class="btn-google">
        <i class="bi bi-google"></i>
        <span>Iniciar Sessão com Google</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import { CFormCheck, CFormInput, CFormLabel } from '@coreui/vue/dist/esm/components/form/index.js'

const props = defineProps({
  cilUser: {
    type: Array,
    required: true,
  },
  cilLockLocked: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits();

const username = ref('');
const password = ref('');
const rememberMe = ref(false);

const handleLogin = () => {
  emit('login', {
    username: username.value,
    password: password.value,
    rememberMe: rememberMe.value,
  });
};

const OAuth = () => {
  emit('googleLogin');
};
</script>

<style scoped>
.input-group {
  display: flex;
  align-items: center;
}

.input-icon {
  color: #000000;
  font-size: 1.2rem;
}

.icon-container {
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 38px;
  border-radius: 6px;
}

.google-login {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.btn-google {
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #555555;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s, box-shadow 0.3s;
}

.btn-google i {
  margin-right: 8px;
  font-size: 20px;
  position: relative;
}

.btn-google i::after {
  content: "";
  display: inline-block;
  width: 1px;
  height: 20px;
  background-color: #d9d9d9;
  position: absolute;
  right: -5px;
  top: 50%;
  transform: translateY(-50%);
}

.btn-google:hover {
  background-color: #f5f5f5;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
