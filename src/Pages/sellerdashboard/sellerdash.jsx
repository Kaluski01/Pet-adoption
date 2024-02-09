import React from 'react';
import { useLocation,Link } from 'react-router-dom';
import PetCard from './Petinput';

export default function Sellerdash() {
  const location = useLocation();
  const { firstname } = location.state || {};
  // const navigate = useNavigate();

  return (
    <div className='bg-dark' style={{height:'500px', color:'white', marginTop:'55px'}}>
      <h1>Welcome to your Dashboard, {firstname}!</h1>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <PetCard/>
              <Link to='/sellerdashboard/Addpet'><button className='btn btn-primary'>Add pet</button></Link>
            </div>
          </div>
        </div>
    </div>
  );
}
