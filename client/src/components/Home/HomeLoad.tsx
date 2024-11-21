import { useState, ChangeEvent, MouseEvent } from 'react'
import { useDispatch } from 'react-redux'
import { setFileList } from '@/store/slices/docsSlice'

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import CloseIcon from '@mui/icons-material/Close'
import SaveIcon from '@mui/icons-material/Save'
import Button from '@mui/material/Button'

import type { UploadedFile } from '@/types/types.home'
import type { BaseProps } from '@/types/types.components'

type UploadedFile = typeof UploadedFile
type BaseProps = typeof BaseProps


const HomeLoad = ({ t, baseTextPath }: BaseProps) => {
    const dispatch = useDispatch()
    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files || files.length === 0) return

        const fileArray = Array.from(files)

        const newUploadedFiles = [...uploadedFiles, ...fileArray]
        if( newUploadedFiles.length <= 5 ) {
            setUploadedFiles(newUploadedFiles)
        } else {
            alert( t(`${baseTextPath}.alert`) )
        }
        
    }

    const handleDeleteFile = (index: number) => {
        const newListUploadedFiles = [ ...uploadedFiles ]
        newListUploadedFiles.splice( index, 1 )
        setUploadedFiles([ ...newListUploadedFiles ])
    }

    const handleSaveFiles = (_event: MouseEvent<HTMLButtonElement>) => {
        console.log( uploadedFiles )
        dispatch(setFileList(uploadedFiles))
        setUploadedFiles( [] )
    }

    return (
        <>
            <div className="main__load flex flex-row">
                <main className="load__body">
                    <input
                        type="file"
                        multiple
                        accept=".pdf"
                        max-files="3"
                        onChange={handleFileUpload}
                    />
                    <div className="w-full h-[100%] flex flex-row justify-center items-center gap-[10px]">
                        <PictureAsPdfIcon />
                        <h2 className="description">{ t(`${baseTextPath}.input`) }</h2>
                    </div>
                </main>
                <aside className="load__files w-full flex flex-col gap-[20px]">
                    <div className="w-full flex flex-col gap-[10px]">
                        {
                            uploadedFiles.map(
                                (file, index) => (
                                    <div className="files__item flex flex-row justify-between" key={file.name}>
                                        <p className="file__name">{ file.name }</p>
                                        <Button 
                                            className="icon" 
                                            variant="text"
                                            onClick={_event => handleDeleteFile(index)}
                                        >
                                            <CloseIcon /> 
                                        </Button>
                                    </div>
                                )
                            )
                        }
                    </div>
                    {
                        Boolean( uploadedFiles.length )
                            &&
                            <Button 
                                className="btn w-full"
                                title="сохранить"
                                variant="contained"
                                onClick={handleSaveFiles}
                            >
                                { t(`${baseTextPath}.save`) }
                                <SaveIcon className="ml-2" /> 
                            </Button>
                    }
                </aside>
            </div>
        </>
    )
}

export default HomeLoad
