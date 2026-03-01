import PageLayout from '../../layouts/PageLayout/PageLayout'
import FileInputArea from './components/FileInputArea/FileInputArea';
import DetectorCard from './components/DetectorCard/DetectorCard';
import LocalSeeIcon from '@mui/icons-material/LocalSee';

import './DetectorPage.css'
import { useState } from 'react';

const DetectorPage = () => {
    const [status, setStatus] = useState("defaultInfo") // defaultInfo loading resInfo
    const [cardData, setCardData] = useState({ name: "", probability: 0, family: ""})
    
    const handleStatus = (status) => {
        setStatus(status)
    }
    
    const handleChangeCardData = (name, probability, family) => {
        setCardData({name, probability, family})
    }

    return (
        <PageLayout icon={<LocalSeeIcon/>} name={"Детектор растений"}>
            <FileInputArea 
                handleStatus={handleStatus}
                handleChangeCardData={handleChangeCardData}
            />
            <DetectorCard status={status} cardData={cardData}/>
        </PageLayout>
    )
}

export default DetectorPage