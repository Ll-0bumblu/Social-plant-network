import PageLayout from '../../layouts/PageLayout/PageLayout'
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import GardenCard from './components/GardenCard/GardenCard';

import './GardenPage.css'

const cardData = [
    {name: "Монстера Деликатесная"},
    {name: "Монстера Деликатесная"},
    {name: "Монстера Деликатесная"},
    {name: "Монстера Деликатесная"},
]

function GardenPage() {
  return (
    <PageLayout icon={<HomeIcon/>} name={"Мой сад"}>
            <div className="weather-note">
                <span className='fas fa-umbrella'>⛈️ Завтра ожидается дождь. Полив монстеры можно пропустить.</span>
            </div>

            <div className="plant-grid">
                {cardData.map(item => <GardenCard cardData={item}/>)}
            </div>

            <div className="flex-row">
                <div className="btn"><AddCircleIcon/> Добавить растение</div>
            </div>
    </PageLayout>
  )
}

export default GardenPage
