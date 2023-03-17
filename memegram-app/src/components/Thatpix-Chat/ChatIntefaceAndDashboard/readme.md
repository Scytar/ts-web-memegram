UI
https://www.figma.com/file/Mw2vDGTxBTh04yN39lU020/Memegram?node-id=0%3A1

FrontEndConsumption

// A conexao websocket e aberta ao abrir a rota de mensagens
// Fechar conexao ao sair da rota de mensagens
// A mensagem do websocket virá mais ou menos como esta abaixo

From websocket>JSON.stringfy{
    typeOfData: 'chat',
    data1: {
        conversations
    }
}

// Abaixo esta a aparencia da string(que tem que ser montada como JSON) que vai ser recebido pelo websocket
// Participante é alguem que tem autorizacao para ver o historico de uma conversa.


    conversations:[
    {
        chatId: uuid,
        chatName: string(24),
        chatRoles:{
            owner: 'userId',
        },
        participantes:[
            {
                userId: 'userId',
                username: string
            }
        ],
        mensagens:[
            {
                messageId: uuid,
                username: string,
                dateWithTime: date,
                mensagem: string,
            }
        ]
    }
    ]

Backend

Security

SenhaCheckup
Local Storage / Coockie para saber se ele ta logado (token)
SSL on Websocket
Database
 Check

 