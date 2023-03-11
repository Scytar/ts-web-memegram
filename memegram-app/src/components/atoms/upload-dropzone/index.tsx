import style from './style.module.scss';
import React, { useCallback } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import BackupIcon from '@mui/icons-material/Backup';
import CloseIcon from '@mui/icons-material/Close';

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */
const Dropzone = (): JSX.Element => {

    const onDrop = useCallback((acceptedFiles: any[], rejectedFiles: any[]): void => {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('file', file);
        fetch('api/upload', {
            method: 'POST',
            body: formData,
        });
    }, []);

    const acceptedFileExtensions: Accept = {
        image: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp'],
        extension: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
    };
    const string = acceptedFileExtensions.extension.join(', ');

    const { getRootProps, getInputProps , isDragActive, isDragReject } = useDropzone({ 
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
        <div {...getRootProps()} className={`dropzone ${style.dropzone} ${getDropzoneClassNames()}`}>
            <input {...getInputProps()} />
            {isDragActive?
            <>
                {/* <BackupIcon className={style.icon}/> 
                <p>Solte o arquivo para</p> */}
                <CloseIcon className={style.icon}/>
                <p>Não arreste arquivos para cá!</p>
                <span>Ainda vamos implementar essa função!</span>
            </>
            :
            <>
                {isDragReject?
                <>
                <span>Erro ao enviar</span>
                </>
                :
                null
                }
                <AddPhotoAlternateIcon className={style.icon}/>
                <p>Clique aqui para enviar seu arquivo!</p>
                {/* TODO: add drag & drop feature */}
                <span>Permitidos: {string}</span>
                <span>até 10MB</span>
            </>
            }
        </div>
    )
}

export { Dropzone };