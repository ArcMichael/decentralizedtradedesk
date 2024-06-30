import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <nav>
        <Link to='/welcome'>Go to Welcome Page</Link>
        <Link to='/'>Go to Home Page</Link>
      </nav>
    </div>
  );
}

export default HomePage;
