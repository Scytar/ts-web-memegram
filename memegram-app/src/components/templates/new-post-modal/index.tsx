import style from './styles.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import { Dropzone } from '../../atoms/upload-dropzone';

const NewPostModal = (): JSX.Element => {
    return (
        // <div className={style.modalBackground}>
        <div>
            <div className={style.modalContainer}>
                <CloseIcon className={style.closeButton}/>
                <span className={style.modalDescription}>Compartilhe seus memes com a comunidade Memegram</span>
                <Dropzone />
            </div>
        </div>
    )
}

export { NewPostModal };