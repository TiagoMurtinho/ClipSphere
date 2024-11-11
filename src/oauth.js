let googleClient;

export const initGoogleClient = (clientId) => {
  googleClient = google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: 'https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.profile',
    callback: (response) => {

      localStorage.setItem('googleTokens', JSON.stringify(response));
      console.log('Tokens:', response);
    },
  });
};

export const signIn = () => {
  return new Promise((resolve, reject) => {
    try {
      if (!googleClient) {
        console.error("Google Client não inicializado. Chame 'initGoogleClient' primeiro.");
        reject("Google Client não inicializado.");
        return;
      }
      googleClient.requestAccessToken();
      resolve(googleClient);
    } catch (error) {
      console.error('Erro ao fazer login com o Google', error);
      reject(error);
    }
  });
};

export const getStoredTokens = () => {
  const tokens = localStorage.getItem('googleTokens');
  return tokens ? JSON.parse(tokens) : null;
};

export const clearTokens = () => {
  localStorage.removeItem('googleTokens');
};
