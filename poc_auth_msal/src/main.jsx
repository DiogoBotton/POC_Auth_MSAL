import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfigAzureAD, msalConfigAzureB2C } from "./authConfig.js";

// Caso queira testar a autenticação com Azure AD e Azure B2C separadamente, importe acima do authConfig.js e use-o como parâmetro da classe abaixo
//const msalInstance = new PublicClientApplication(msalConfigAzureAD);
const msalInstance = new PublicClientApplication(msalConfigAzureB2C);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </StrictMode>
);
