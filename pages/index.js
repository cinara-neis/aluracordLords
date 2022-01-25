import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import appConfig from '../config.json';
import React from 'react';
import { useRouter } from 'next/router';

function Title(props){
    console.log(props);
    const Tag = props.tag;
    return(
        <>
            <Tag>{props.children}</Tag>
        <style jsx>{`
            ${Tag}{
                color: ${appConfig.theme.colors.neutrals['000']};
                font-size: 24px;
                font-weight: 600;
            }
            `}</style>
        </>
    );
}



// function HomePage() {
//     return(
//         <div>
//             <GlobalStyle/>
//             <Title tag="h2">Boas vindas de volta!</Title>
//             <h2>Aluracord - Alura Matrix</h2>
//         </div>
//     )
//   }
  
//   export default HomePage;

export default function PaginaInicial() {
    //const username = 'cinara-neis';

    const [username, setUsername] = React.useState('');
    const roteamento = useRouter();
    const url = `https://api.github.com/users/${username}`;
    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTulwf508vr4HJhofCSn7-ppL9m2TgthqNSZg&usqp=CAU";
    
    fetch(url)
    .then(response => response.json())
    .then(data => {
        var nome = document.getElementById("nomePerfil")
        nome.innerText = username.length>2? data.name : ' Nome '
        var empresa = document.getElementById("Empresa")
        empresa.innerText = username.length>2? data.company : ' Empresa '
        var email =  document.getElementById("Email")
        email.innerText = username.length>2?data.email : ' Email '
        var localizacao = document.getElementById("Localizacao")
        localizacao.innerText = username.length>2? data.location : ' Localizacao '
        var seguidores = document.getElementById("Seguidores")
        seguidores.innerText = username.length>2? data.followers: ' Seguidores '
    })
    .catch(error => console.log(error));

    return (
      <>
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary['000'],
            backgroundImage: 'url(https://i0.wp.com/1hitgames.com/wp-content/uploads/2020/05/capa-site-8-scaled.jpg?resize=1024%2C534&ssl=1)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
              backgroundColor: appConfig.theme.colors.neutrals[''],
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit={function (event){
                event.preventDefault();
                roteamento.push('/chat')
                // window.location.href = '/chat';
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Title tag="h2">LordsCord!</Title>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[600] }}>
                {appConfig.name}
              </Text>
              
              {/* <input 
                type="text" 
                value= {username}
                onChange={function (event){
                  console.log('usuario digitou', event.target.value);
                  //onde ta o valor?
                  const valor = event.target.value;
                  //trocar o valor da variavel
                  //atraves do react e avise quem precisa
                  setUsername(valor);
                  }}
                /> */}
              <TextField
                value= {username}
                onChange={function (event){
                  console.log('usuario digitou', event.target.value);
                  //onde ta o valor?
                  const valor = event.target.value;
                  //trocar o valor da variavel
                  //atraves do react e avise quem precisa
                  setUsername(valor);
                  }}
                placeholder="Digite seu usuário"
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor: appConfig.theme.colors.neutrals[200],
                    mainColor: appConfig.theme.colors.neutrals[900],
                    mainColorHighlight: appConfig.theme.colors.primary[500],
                    backgroundColor: appConfig.theme.colors.neutrals['000'],
                  },
                }}
              />
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals['000'],
                  mainColor: appConfig.theme.colors.primary[400],
                  mainColorLight: appConfig.theme.colors.primary[400],
                  mainColorStrong: appConfig.theme.colors.primary[300],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: appConfig.theme.colors.neutrals[400],
                border: '2px solid',
                borderColor: appConfig.theme.colors.neutrals ['050'],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '100%',
                  marginBottom: '40px',
                }}
                src={username.length > 2 ? `https://github.com/${username}.png`: image}
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[300],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username.length > 2 ? username : 'Wesley'}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
}
        