
/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */
import style from './style.module.scss';
import React, { useCallback, useContext, useRef } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import BackupIcon from '@mui/icons-material/Backup';
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from '../../../contexts/userInfo';

const Dropzone = (): JSX.Element => {

    const userInfo = useContext(UserContext);

    // Must create a handler for user selecting not supported file extension
    const onDrop = useCallback((acceptedFiles: any[], event: any): void => {   
        const file = acceptedFiles[0];
        const formData = new FormData();

        formData.append('file', file);
        formData.append('body', JSON.stringify(userInfo))

        // This could be an separate file server, that only saves images and serves them staticly
        fetch('http://localhost:3030/api/upload', {
            method: 'POST',
            body: formData,
        })
        .then((res) => res.json()) 
        // eslint-disable-next-line
        .then((data) => console.log(data))
        // eslint-disable-next-line
        .catch((e) => console.log(e))
                       
    }, []);

    const acceptedFileExtensions: Accept = {
        image: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp',],
        extension: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    };
    const string = acceptedFileExtensions.extension.join(', ');

    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        maxFiles: 1,
        maxSize: 10485760,
        accept: acceptedFileExtensions,
    });

    const getDropzoneClassNames = (): string => {
        if (isDragReject) {
            return 'dropzone-reject';
        }
        if (isDragActive) {
            return 'dropzone-active';
        }
        return 'dropzone-inactive';
    };

    return (
       <div>
            <div {...getRootProps()} className={`dropzone ${style.dropzone} ${getDropzoneClassNames()}`}>
                <input {...getInputProps()}/>
                {isDragActive ?
                    <>
                        {/* <BackupIcon className={style.icon}/> 
                        <p>Solte o arquivo para</p> */}
                        <CloseIcon className={style.icon} />
                        <p>Não arreste arquivos para cá!</p>
                        <span>Ainda vamos implementar essa função!</span>
                    </>
                    :
                    <>
                        {isDragReject ?
                            <>
                                <span>Erro ao enviar</span>
                            </>
                            :
                            null
                        }
                        <AddPhotoAlternateIcon className={style.icon} />
                        <p>Clique aqui para enviar seu arquivo!</p>
                        {/* TODO: add drag & drop feature */}
                        <span>Permitidos: {string}</span>
                        <span>até 10MB</span>
                    </>
                }
            </div> 
       </div>
    )
}

export { Dropzone };