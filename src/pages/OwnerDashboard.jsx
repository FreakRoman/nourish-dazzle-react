import {
  useAuth,
} from "../context/AuthContext";


export default function OwnerDashboard() {

  const {
    currentUser,
    logout,
  } = useAuth();


  return (

    <div className="dashboard-page">

      <header className="dashboard-header">

        <div className="dashboard-brand">
          ◒ Nourish
        </div>

        <div>

          <span>
            {currentUser.name}
          </span>

          <button
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </header>


      <main className="dashboard-content">

        <span className="dashboard-eyebrow">
          OWNER PORTAL
        </span>

        <h1>
          Welcome back,
          <em> {currentUser.name}</em>
        </h1>

        <div className="dashboard-grid">

          <div className="dashboard-card">
            <strong>53</strong>
            <span>Coaches</span>
          </div>

          <div className="dashboard-card">
            <strong>128</strong>
            <span>Customers</span>
          </div>

          <div className="dashboard-card">
            <strong>47</strong>
            <span>Active Plans</span>
          </div>

          <div className="dashboard-card">
            <strong>91%</strong>
            <span>Retention</span>
          </div>

        </div>

      </main>

    </div>

  );
}