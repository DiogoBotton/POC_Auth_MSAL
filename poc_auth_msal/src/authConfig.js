export const msalConfigAzureAD = {
  // process.env não funciona no Vite, use import.meta.env
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
  },
};

export const msalConfigAzureB2C = {
  auth: {
    clientId: import.meta.env.VITE_MSAL_B2C_CLIENT_ID, // ID do aplicativo registrado no Azure B2C
    // Exemplo: "12345678-1234-1234-1234-123456789012"

    authority: import.meta.env.VITE_MSAL_B2C_AUTHORITY, // URL de autoridade do Azure B2C
    // Exemplo: "https://<tenant-name>.b2clogin.com/<tenant-name>.onmicrosoft.com/b2c_signin_signup_policy_example"

    knownAuthorities: [import.meta.env.VITE_MSAL_B2C_DOMAIN], // Domínio conhecido do B2C

    redirectUri: "https://localhost:7294/inicio", // ou seu domínio

    postLogoutRedirectUri: "https://localhost:7294/", // URL para redirecionar após logout

    navigateToLoginRequestUrl: false, // Evita redirecionar para a URL original após login
  },
  cache: {
    cacheLocation: "localStorage", // sessionStorage é mais seguro, porém o localStorage permite o SSO entre abas
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: [import.meta.env.VITE_MSAL_API_SCOPE], // Exemplo: "api://<client-id-da-api>/access_as_user"
};
