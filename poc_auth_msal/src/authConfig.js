export const msalConfig = { // process.env não funciona no Vite, use import.meta.env
  auth: {
    clientId: import.meta.env.VITE_MSAL_CLIENT_ID, // ID do aplicativo registrado no Azure AD
    // Exemplo: "12345678-1234-1234-1234-123456789012"
    
    authority: import.meta.env.VITE_MSAL_AUTHORITY, // URL de autoridade do Azure AD
    // Exemplo: "https://login.microsoftonline.com/{tenantId}"
    redirectUri: import.meta.env.VITE_MSAL_REDIRECT_URI, // ou seu domínio
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  }
};

export const loginRequest = {
  scopes: [import.meta.env.VITE_MSAL_API_SCOPE] // Exemplo: "api://<client-id-da-api>/access_as_user"
};
