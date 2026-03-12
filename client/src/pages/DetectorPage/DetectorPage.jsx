import PageLayout from '../../layouts/PageLayout/PageLayout'
import FileInputArea from './components/FileInputArea/FileInputArea';
import DetectorCard from './components/DetectorCard/DetectorCard';
import LocalSeeIcon from '@mui/icons-material/LocalSee';

import './DetectorPage.css'
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { addPlant } from '../../api/detector';

const DetectorPage = () => {
    const [status, setStatus] = useState("defaultInfo") // defaultInfo loading resInfo addSucces
    const [cardData, setCardData] = useState({ name: "", probability: 0, family: ""})

    const mutation = useMutation({
        mutationFn: addPlant,
         onSuccess: (data) => {
            handleChangeCardData(data.name, data.probability, data.family);
            console.log(data.message)
            setStatus("addSucces")
        },
        onError: (error) => {
            handleStatus("defaultInfo")
            console.log(error.message)
        }
    })

    const handleAddPlant = () => {
        mutation.mutate(cardData)
    }    

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
            <DetectorCard status={status} cardData={cardData} handleAddPlant={handleAddPlant}/>
        </PageLayout>
    )
}

export default DetectorPage