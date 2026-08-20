import {
  useAuth,
} from "../context/AuthContext";


export default function CustomerDashboard() {

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
          MY NUTRITION
        </span>

        <h1>
          Good morning,
          <em> {currentUser.name}</em> 🌿
        </h1>


        <div className="customer-progress">

          <div>
            <span>
              Current Weight
            </span>

            <strong>
              78 kg
            </strong>
          </div>


          <div>
            <span>
              Goal
            </span>

            <strong>
              70 kg
            </strong>
          </div>


          <div>
            <span>
              Progress
            </span>

            <strong>
              72%
            </strong>
          </div>

        </div>

      </main>

    </div>

  );
}