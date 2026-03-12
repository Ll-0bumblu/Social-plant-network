import SunnyIcon from '@mui/icons-material/Sunny';
import ImageIcon from '@mui/icons-material/Image';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import CircularProgress from '@mui/material/CircularProgress';

import './DetectorCard.css'
import SuccesPin from '../SuccesPin/SuccesPin';

function DetectorCard({ status, cardData, handleAddPlant}) {
  return (
    <div className="detector-card">
        <div className={'detector-card__conent' + (status === "resInfo" ? "": " hidden")}>
             <div className="detector-card__header">
                <div className="detector-card__icon">🌿</div>
                <div className="detector-card__info">
                <h2 className="detector-card__title">
                    Предполагаемый вид: <strong>{cardData.name}</strong>
                </h2>
                <div className="detector-card__badges">
                    <span className="badge"><i className="fas fa-check"></i>{'Точность ' + cardData.probability + '%'}</span>
                    <span className="badge"><i className="fas fa-calendar"></i>{"Семейство: " + cardData.family}</span>
                </div>
                </div>
            </div>
            <div className="detector-card__footer">
                <button className="detector-btn" onClick={handleAddPlant}><i className="fas fa-plus"></i> Добавить в "Мой сад"</button>
            </div>
        </div>

        <div className={'detector_card__nosent' + (status === "defaultInfo" ? "": " hidden")}>
            <div className="nosent_content">
                <span className="nosent_title">
                    Определите растение по фото
                </span>
                <span className="nosent_text">
                    Сделайте фото листа, цветка или всего растения
                </span>
                <div className="nosent_tips">
                <div className="tip_item">
                    <ImageIcon sx={{color: '#1f4f1f'}}/>
                    <span className="tip_text">Четкое фото</span>
                </div>
                <div className="tip_item">
                    <SunnyIcon sx={{color: '#1f4f1f'}}/>
                    <span className="tip_text">Хорошее освещение</span>
                </div>
                <div className="tip_item">
                    <LooksOneIcon sx={{color: '#1f4f1f'}}/>
                    <span className="tip_text">Один объект</span>
                </div>
                </div>
            </div>
        </div>

        <div className={'detector_card__loading' + (status === "loading" ? " ": " hidden")}>
            <CircularProgress color="success"/>
        </div>

        <div className={"detector_card__succes" + (status === "addSucces" ? " " : " hidden")}>
            <span className='succes_mess'>Успешно добавлено!</span>
        </div>
    </div>
  )
}

export default DetectorCard