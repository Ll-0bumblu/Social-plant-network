import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import './UploadFileCard.css'

import React from 'react'

function UploadFileCard({ file, handleRemoveFile}) {

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        else return (bytes / 1048576).toFixed(1) + ' MB';
    }

    const getFileExtension = (filename) => {
        return filename.split('.').pop().toUpperCase();
    }

    return (
        <div className='upload-file__card'>
            <div className="file-card__icon">
                <InsertDriveFileIcon sx={{ fontSize: '40px', color: '#2d6e2d' }} />
            </div>
            <div className="file-card__info">
                <div className="file-card__name">
                    {file.name.length > 30 
                        ? file.name.substring(0, 27) + '...' 
                        : file.name
                    }
                </div>
                <div className="file-card__details">
                    <span className="file-card__size">{formatFileSize(file.size)}</span>
                    <span className="file-card__type">{getFileExtension(file.name)}</span>
                    <span className="file-card__status">
                        <CheckCircleIcon sx={{ fontSize: '16px', color: '#4caf50' }} />
                        Загружен
                    </span>
                </div>
            </div>
            <button 
                className="file-card__remove" 
                onClick={handleRemoveFile}
                type="button"
            >
                <CloseIcon sx={{ fontSize: '20px' }} />
            </button>
        </div>
    )
}

export default UploadFileCard
