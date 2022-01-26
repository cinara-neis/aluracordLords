import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';


export default function ChatPage() {
    const router = useRouter();
    const [mensagem, setMensagem] = React.useState('')
    const [listaDeMensagens, setListaDeMensagens]=React.useState([])
    const [tempMensagem, setTempMensagem] = React.useState('')

    
    function handleNovaMensage(novaMensagem){
        const mensagem = {
            id: listaDeMensagens.length +1,
            de: router.query.username,
            texto: novaMensagem
        }

        setListaDeMensagens([
            mensagem,
            ...listaDeMensagens
            
        ])
        setMensagem('')
    }
   
    let username = router.query.username;
    React.useEffect(() => {
        getUserData();
    }, [username]);
    
    var gitHubUrl = `https://api.github.com/users/${username}`;
  
    const getUserData = async () => {
            const response = await fetch(gitHubUrl);
            const jsonData = await response.json();
            if (!(jsonData && jsonData.message !== "Not Found") && username !== '') {
                console.log('Username does not exist');
                router.push({
                    pathname:'/404'
                  });
            }
        };
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary['000'],
                backgroundImage: `url(https://wisegeek.ru/kartinki/aac/1001-1300/1038-1.jpg)`,
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[''],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[500],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >
                     <MessageList mensagens={listaDeMensagens} setListaDeMensagens={setListaDeMensagens} /> 
                   
                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                            onKeyPress={(event)=>{
                                if(event.key === 'Enter'){
                                    event.preventDefault();
                                    handleNovaMensage(event.target.value)
                                    setTempMensagem('')
                                }
                            }}
                            onChange={(event)=>{
                                    event.preventDefault();
                                    setTempMensagem(event.target.value)
                                    setMensagem(event.target.value)
                            }}
                        />
                        <Button
                         type='button'
                         label='Enviar'
                         buttonColors={{
                             contrastColor: appConfig.theme.colors.neutrals["000"],
                             mainColor: appConfig.theme.colors.primary[500],
                             mainColorLight: appConfig.theme.colors.primary[400],
                             mainColorStrong: appConfig.theme.colors.primary[600],
                         }}
                         onClick={() =>{
                            handleNovaMensage(tempMensagem)
                            setTempMensagem('')
                         }}
                         />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    const router = useRouter();

    function handleDeleteMessage(mensagemId){
        let novaLista = props.mensagens.filter((message)=>{
            if(message.id != mensagemId){
                return message
            }
        })

        props.setListaDeMensagens([
            ...novaLista
        ])
    }

    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'hiden',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem)=>{
                return(
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals[700],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '8px',
                                display:'flex',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    display: 'inline-block',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${router.query.username}.png`}
                            />
                            <Text tag="strong" onClick={function (infosDoEvento){
                                    infosDoEvento.preventDefault();
                    
                                    router.push({
                                    pathname:'/git',
                                    query:{username:router.query.username, from:'/chat'}
                                    });
                                }}> 
                                {mensagem.de}
                            </Text>

                            <Button
                                type='button'
                                label='X'
                                styleSheet={{marginLeft:'3px',width: '20px',
                                height: '20px',}}
                                onClick={() => handleDeleteMessage(mensagem.id)}
                            />
                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                                tag="span"
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {mensagem.texto}
                    </Text>
                )
            })}
            
        </Box>
    )
}



