const Inicio = () => {
  return (
    <div>
      <h1>Autenticado com o Azure B2C</h1>
      <p>Usuário: {localStorage.getItem("name")}</p>
    </div>
  );
};

export default Inicio;
