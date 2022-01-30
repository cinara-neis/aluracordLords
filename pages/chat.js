import { Box, Text, TextField, Image, Button, Icon } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';
import { useRouter } from 'next/router';
import { createClient} from '@supabase/supabase-js';
import { ThreeDots } from "react-loading-icons";
import {ButtonSendSticker} from '../src/componentes/ButtonSendSticker';

function escutaMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
        .from('mensagens')
        .on('INSERT', (respostaLive) => {
            adicionaMensagem(respostaLive.new);
        })
        .subscribe();
}


const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMxODk2MiwiZXhwIjoxOTU4ODk0OTYyfQ.xxIjeYitmIqi9MZJGhqynM8TuVaMLBX4QPjE0QFhzjo'
const SUPABASE_URL = 'https://fevqvewltajaxyneieet.supabase.co';
const supabaseClient =  createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
    const router = useRouter();
    const [mensagem, setMensagem] = React.useState('')
    const [listaDeMensagens, setListaDeMensagens]=React.useState([])
    const [tempMensagem, setTempMensagem] = React.useState('')
    const [loading, setLoading] = React.useState(true);

    
    React.useEffect(() => {
        supabaseClient
          .from('mensagens')
          .select('*')
          .order('id', { ascending: false })
          .then(({ data }) => {
            console.log("Dados da consulta: ", data);
        if (data != null) {
            setListaDeMensagens(data);
        }
        setLoading(false);
      });
      escutaMensagensEmTempoReal((novaMensagem) => {
        setListaDeMensagens((valorAtualDaLista) => {
          return [
            novaMensagem,
                 ...valorAtualDaLista
            ]
            })
        })
      }, []);

    function handleNovaMensage(novaMensagem){
        const mensagem = {
            de: router.query.username,
            texto: novaMensagem
        }

        supabaseClient
            .from('mensagens')
            .insert([
                mensagem
            ])
            .then(({ data }) => {
                console.log('Criando mensagem: ', data);
                setListaDeMensagens([
                    data[0],
                    ...listaDeMensagens,
                ]);
        setMensagem('');
        })
    }

    function handleDeletaMensagem(mensagemAtual) {
        supabaseClient
          .from("mensagens")
          .delete()
          .match({ id: mensagemAtual.id })
          .then(({ data }) => {
            const listaDeMensagensFiltrada = listaDeMensagens.filter((mensagem) => {
              return mensagem.id != data[0].id;
            });
            setListaDeMensagens(listaDeMensagensFiltrada);
          });
      }

    function Header() {
        return (
            <>
                <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                    <Text variant='heading5'>
                        Chat dos Lords
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
                        borderRadius: '10px',
                        padding: '15px',
                    }}
                > {loading ? (
                    <Box
                      styleSheet={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <ThreeDots
                        fill={appConfig.theme.colors.neutrals[800]}
                        height="16px"
                      />
                    </Box>
                  ) : (
                    <MessageList mensagens={listaDeMensagens} handleDeletaMensagem={handleDeletaMensagem} /> 
                  )}
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
                                padding: '5px',
                                marginTop: '10px',
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
                        <ButtonSendSticker
                            onStickerClick={(sticker) => {
                                // console.log(
                                //   "[USANDO O COMPONENTE] Salva esse sticker no banco"
                                // );
                                handleNovaMensage(`:sticker: ${sticker}`);
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
  );
}

function MessageList(props) {
    console.log("MessageList", props);
  
    const handleDeletaMensagem = props.handleDeletaMensagem;
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                wordBreak: 'break-word',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '1px',
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
                                src={`https://github.com/${mensagem.de}.png`}
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
                            <Icon
                                name={"FaTrash"}
                                styleSheet={{
                                    marginLeft: "5px",
                                    width: "15px",
                                    height: "15px",
                                    color: appConfig.theme.colors.primary["950"],
                                    hover: {
                                    color: "white",
                                    },
                                    display: "inline-block",
                                }}
                                onClick={(event) => {
                                    event.preventDefault();
                                    handleDeletaMensagem(mensagem);
                                }}
                                />
                        </Box>
                        {mensagem.texto.startsWith(":sticker:") ? (
              <Image src={mensagem.texto.replace(":sticker:", "")} />
            ) : (
              mensagem.texto
            )}
          </Text>
        );
      })}
    </Box>
  );
}

