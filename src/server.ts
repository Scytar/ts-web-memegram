//inicialização do servidor 
import express from 'express';
import router from './routes/index';

const app = express();

app.use(router);
app.listen(3000, () => console.log('Server running on port 3000'));