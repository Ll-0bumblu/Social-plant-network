import { useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SpaIcon from '@mui/icons-material/Spa';
import FolderIcon from '@mui/icons-material/Folder';

import ErrorAlert from '../ErrorToast/ErrorAlert';

import { UploadImage } from '../../../../api/detector';
import { validFile } from './utils';
import { useMutation} from '@tanstack/react-query';

import './FileInputArea.css'
import UploadFileCard from '../UploadFileCard/UploadFileCard';
import DragDropArea from '../DragDropArea/DragDropArea';

const FileInputArea = ({ handleStatus, handleChangeCardData }) => {
    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)

    const mutation = useMutation({
        mutationFn: UploadImage,   
        onSuccess: (data) => {
            handleChangeCardData(data.name, data.probability, data.family);
            handleStatus("resInfo")
            setError(null)
        },
        onError: (error) => {
            handleStatus("defaultInfo")
            setError(error.message)
        }
    })

    const handleDrop = (e) => {
        const dropFile = e.dataTransfer.files[0];
        if (dropFile) {
            setFile(dropFile)
        }
    }

    const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)
        
        const validRes = validFile(file)

        if (validRes.isValid) {
            handleStatus("loading")
            mutation.mutate(file)
        } else {
            setError(validRes.error)
        }
    }

    return (
        <div style={{position: 'relative'}}>
            <DragDropArea error={error} onDrop={handleDrop}>
                <form 
                    onDrop={handleDrop}
                    onSubmit={handleSubmit}
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
                                className={file ? "file-determine btn-detector" : "file-determine btn-detector btn-disabled" }
                                type='submit'
                                disabled={!file || mutation.isPending}
                            >
                                <SpaIcon sx={{ fontSize: '60px', color: "#5ccb5c93"}}/>
                                {mutation.isPending ? 'Загрузка...' : 'Определить растение'}
                            </button>
                        </div>
                    </div>
                    <input className='file-input' type='file' onChange={handleFileSelect} accept=".jpg,.jpeg,.png,.heic"/>
                </form>
            </DragDropArea>

            {error && <ErrorAlert error={error}/>}
        </div>
    )
}

export default FileInputArea