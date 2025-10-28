import { useMsal, useIsAuthenticated } from "@azure/msal-react";
import "./style.css";

const Login = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  // Função para realizar o login em um PopUp
  const handleLogin = async () => {
    try {
      let response = await instance.loginPopup();
      console.log("response", response);
      localStorage.setItem("idToken", response.idToken);
      localStorage.setItem("socialName", response.idTokenClaims.socialName);
      localStorage.setItem("cpf", response.idTokenClaims.cpf);
      localStorage.setItem("email", response.idTokenClaims.email);
    } catch (error) {
      console.log("Erro na autenticação: ", error);
    }
  };

  // Função para Logout
  const handleLogout = () => {
    instance
      .logoutPopup()
      .then(() => {
        console.log("Logout successful");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  // Função para testar autenticação na API
  const verifyAuthentication = async () => {
    const account = instance.getAllAccounts()[0];
    const result = await instance.acquireTokenSilent({
      account,
      scopes: [import.meta.env.VITE_MSAL_API_SCOPE], // Exemplo: "api://<client-id-da-api>/access_as_user"
    });
    result.accessToken;

    const response = await fetch("http://localhost:5265/auth/microsoft", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${result.accessToken}`,
      },
    });

    console.log(response);

    if (!response.ok)
      return alert(
        "Não foi possível realizar a autenticação, status: " + response.status
      );

    return alert("Autenticação realizada! :) " + response.status);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {isAuthenticated ? (
          <>
            <h1 className="login-title">Usuário autenticado!</h1>
            <h2>{localStorage.getItem("socialName")}</h2>
            <h3>{localStorage.getItem("cpf")}</h3>
            <h3>{localStorage.getItem("email")}</h3>

            <button className="login-button" onClick={verifyAuthentication}>
              Verificar autenticação
            </button>

            <button className="logout-button" onClick={handleLogout}>
              Sair
            </button>
          </>
        ) : (
          <>
            <h1 className="login-title">
              Faça login para continuar (Azure B2C)
            </h1>
            <button className="login-button" onClick={handleLogin}>
              Entrar com Microsoft
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
