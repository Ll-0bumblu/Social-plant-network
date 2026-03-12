import React, { useState } from 'react'

function DragDropArea({ error, children, onDrop: externalOnDrop }) {
    const [isDraging, setIsDraging] = useState(false);

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
        
        if (externalOnDrop) {
            externalOnDrop(e)
        }
    }

    return (
        <div 
            className={"file-upload__area" + (isDraging ? " area-draging" : "")}
            style={error ? {outline: '3px dashed #ef5350'} : {}}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {children}
        </div>
    )
}

export default DragDropArea