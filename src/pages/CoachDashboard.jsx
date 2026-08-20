import {
  useAuth,
} from "../context/AuthContext";


export default function CoachDashboard() {

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

          <button onClick={logout}>
            Logout
          </button>

        </div>

      </header>


      <main className="dashboard-content">

        <span className="dashboard-eyebrow">
          COACH PORTAL
        </span>

        <h1>
          Good morning,
          <em> {currentUser.name}</em>
        </h1>


        <div className="dashboard-grid">

          <div className="dashboard-card">
            <strong>18</strong>
            <span>My Customers</span>
          </div>

          <div className="dashboard-card">
            <strong>12</strong>
            <span>On Track</span>
          </div>

          <div className="dashboard-card">
            <strong>3</strong>
            <span>Needs Attention</span>
          </div>

          <div className="dashboard-card">
            <strong>94%</strong>
            <span>Client Engagement</span>
          </div>

        </div>

      </main>

    </div>

  );
}