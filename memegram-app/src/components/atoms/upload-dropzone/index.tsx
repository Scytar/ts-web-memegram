import style from './style.module.scss';
import React, { useCallback , useContext } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import BackupIcon from '@mui/icons-material/Backup';
import CloseIcon from '@mui/icons-material/Close';
import { UserContext } from '../../../contexts/userInfo';

/* eslint-disable  @typescript-eslint/no-explicit-any */
/* eslint-disable  @typescript-eslint/no-unused-vars */
const Dropzone = (): JSX.Element => {
    
    const userInfo = useContext(UserContext);

    // Must create a handler for user selecting not supported file extension
    const onDrop = useCallback((acceptedFiles: any[], rejectedFiles: any[]): void => {
        const file = acceptedFiles[0];
        const formData = new FormData();

        
        // eslint-disable-next-line
        console.log('file',file);
        // eslint-disable-next-line
        console.log('data',userInfo)

        formData.append('file', file);
        formData.append('body', JSON.stringify(userInfo))

        // This could be an separate file server, that only saves images and serves them staticly
        fetch('http://localhost:3030/api/upload', {
            method: 'POST',
            body: formData,
        })
        // eslint-disable-next-line
        .then((res) => console.log(res));
    }, []);

    const acceptedFileExtensions: Accept = {
        image: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif', 'image/webp', ],
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