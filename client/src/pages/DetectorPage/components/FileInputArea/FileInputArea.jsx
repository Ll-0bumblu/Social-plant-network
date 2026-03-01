import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SpaIcon from '@mui/icons-material/Spa';
import FolderIcon from '@mui/icons-material/Folder';


import ErrorAlert from '../ErrorToast/ErrorAlert';

import { UploadImage } from '../../../../api/detector';
import { validFile } from './utils';

import './FileInputArea.css'
import UploadFileCard from './components/UploadFileCard';

const FileInputArea = ({ handleStatus, handleChangeCardData }) => {
    const [isDraging, setIsDraging] = useState(false);
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)

    const handleDragEnter = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDraging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDraging(false)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDraging(false)

        const dropFile = e.dataTransfer.files[0];
        if (dropFile) {
            setFile(dropFile)

            console.log(dropFile)
        }
    }

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);

            console.log(selectedFile)
        }
    }

    const handleRemoveFile = (e) => {
        e.preventDefault();
        e.stopPropagation();

        handleStatus("defaultInfo")
        setFile(null);
        setError(null)

        const fileInput = document.querySelector('.file-input');
        if (fileInput) {
            fileInput.value = '';
        }
    }

    const sentDataFile = async (e) => {
        e.preventDefault()
        setError(null)
        const validRes = validFile(file)

        if (validRes.isValid) {
            handleStatus("loading")

            try {
                const resData = await UploadImage(file)

                if (resData.name) {
                    handleChangeCardData(resData.name, resData.probability, resData.family);
                    handleStatus("resInfo")
                    console.log(resData)

                } else {
                    handleStatus("defaultInfo")
                    setError(resData.error)
                }
            } catch (error) {
                handleStatus("defaultInfo")
                setError(error.message)
                console.error('Upload error:', error)
            }
            
        } else {
            setError(validRes.error)
        }
    }

    return (
        <div style={{position: 'relative'}}>
        <form 
            className={"file-upload__area" + (isDraging ? " area-draging": "")}
            style={error ? {outline: '3px dashed #ef5350'} : {}}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onSubmit={sentDataFile}
        >
            <div className="file-upload__content">
                {!file ?
                    <>
                    <CloudUploadIcon sx={{ fontSize: '70px', color: '#4c8b4c'}}/>
                    <span style={{ 
                        fontWeight: 700,
                        fontSize: '1.21rem', 
                        marginTop: '20px'
                        }}
                    >
                        Перетащите фото или нажмите для выбора
                    </span>
                    <span style={{
                        fontSize: '1.1rem', 
                        color: '#3b5e3b',
                        opacity: 0.8,
                        marginBottom: '20px',
                        padding: 0,
                    }}
                    >
                        Поддерживаются JPEG, PNG, HEIC. Макс. 10 МБ.
                    </span>
                    </>
                    :
                    <UploadFileCard file={file} handleRemoveFile={handleRemoveFile}/>
                }
                
                <div className="file-upload__manager">
                    <span className='file-determine'>
                        <FolderIcon sx={{ fontSize: '60px', color: "#2d6e2d"}}/>
                        Выбрать Файл
                    </span>
                    <button 
                        className={file ? "file-determine btn" : "file-determine btn btn-disabled" }
                        type='submit'
                        disabled={!file}
                    >
                        <SpaIcon sx={{ fontSize: '60px', color: "#5ccb5c93"}}/>
                        Определить растение
                    </button>
                </div>
            </div>
            <input className='file-input' type='file' onChange={handleFileSelect} accept=".jpg,.jpeg,.png,.heic"/>
        </form>
            {error && <ErrorAlert error={error}/>}
        </div>
    )
}

export default FileInputArea