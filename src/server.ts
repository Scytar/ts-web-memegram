//inicialização do servidor 
import express from 'express';
import router from './routes/index';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

app.use(router);
app.listen(3000, () => console.log('Server running on port 3000'));