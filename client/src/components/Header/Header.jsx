import { NavLink } from 'react-router-dom';
import GrassIcon from '@mui/icons-material/Grass';
import HomeIcon from '@mui/icons-material/Home';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './Header.css'

const navLinks = [
    {to: '/garden', name: "Мой сад", icon: <HomeIcon/>},
    {to: '/detector', name: "Детектор", icon: <LocalSeeIcon/>}, 
    {to: '/kalendar', name: "Календарь", icon: <CalendarMonthIcon/>}, 
    {to: '/notifications', name: "Уведомления", icon: <NotificationsIcon/>}, 
]

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo-container">
            <GrassIcon className="logo-icon" />
            <div className="logo-text">
              <span className="logo-bold">Plant</span>
              <span className="logo-light">Social</span>
            </div>
          </div>

          <nav className="nav-menu">
            {navLinks.map(link => (
              <NavLink 
                key={link.to}
                to={link.to} 
                className={({ isActive }) => isActive ? "nav-link active-link" : "nav-link"}
              >
                <div className='nav-text__wrap'>
                    {link.icon}
                    {link.name}
                </div>
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;