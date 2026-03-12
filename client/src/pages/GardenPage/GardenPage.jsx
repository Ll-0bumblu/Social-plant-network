import { GetPlanList } from '../../api/garden';
import PageLayout from '../../layouts/PageLayout/PageLayout'
import HomeIcon from '@mui/icons-material/Home';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import GardenCard from './components/GardenCard/GardenCard';

import './GardenPage.css'
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function GardenPage() {
    const query = useQuery({ 
        queryKey: ['plants'], 
        queryFn: GetPlanList,
    })

    return (
        <PageLayout icon={<HomeIcon/>} name={"Мой сад"}>

                <div className="plant-grid">
                    {query.isLoading && <CircularProgress color='succes' className='curular'/>}

                    {query.data?.map(item => <GardenCard key={item.id} cardData={item}/>)}
                </div>

                <div className="flex-row">
                    <NavLink className="btn-garden" to={'/detector'}><AddCircleIcon/> Добавить растение</NavLink>
                </div>
                {query.isError && <Alert severity="error"><AlertTitle>Ошибка!</AlertTitle>{query.error.message}</Alert>}
        </PageLayout>
    )
}

export default GardenPage
