//inicialização do servidor 
import express from 'express';
import router from './routes/index';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());

app.use("/api",router);
app.listen(process.env.PORT, () => console.log('Server running on port' + process.env.PORT));