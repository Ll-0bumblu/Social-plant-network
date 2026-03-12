import { makeAutoObservable } from 'mobx'

class FileStore {
    selectFile = null
    error = null

    constructor() {
        makeAutoObservable(this)
    }

    setError(error) {
        this.error = error
    }

    get formatFileSize()  {
        if (this.selectFile) {
            if (this.selectFile.size < 1024) return this.selectFile.size + ' B';
            else if (this.selectFile.size < 1048576) return (this.selectFile.size / 1024).toFixed(1) + ' KB';
            else return (this.selectFile.size / 1048576).toFixed(1) + ' MB';
        } else {
            return null
        }
    }
}

export const fileStore = new FileStore();