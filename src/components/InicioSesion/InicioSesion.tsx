import "./InicioSesion.css";

function InicioSesion() {
  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-header">
          <h1>Inicio de Sesión</h1>
          <p>Ingresa a tu cuenta SENA</p>
        </div>

        <form>

          <div className="form-group">
            <label htmlFor="correo">Correo institucional</label>
            <input
              id="correo"
              type="email"
              placeholder="correo@sena.edu.co"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa tu contraseña"
            />
          </div>


          <button type="submit" className="login-button">
            Iniciar sesión
          </button>

        </form>


      </div>
    </div>
  );
}

export default InicioSesion;

