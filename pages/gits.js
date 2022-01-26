import { useRouter } from 'next/router'
import React from 'react';
import { Box, Text, Image, Button } from '@skynexui/components';
import appConfig from '../config.json';


export default function  GitUserPage(){
    const [userData, setUserData] = React.useState({});
    const router = useRouter()
 
    let username = router.query.username;
    React.useEffect(() => {
        getUserData();
    }, [username]);
    
    var gitHubUrl = `https://api.github.com/users/${username}`;
  
    const getUserData = async () => {
            const response = await fetch(gitHubUrl);
            const jsonData = await response.json();
            if (jsonData && jsonData.message !== "Not Found") {
                setUserData(jsonData);
            }
            else if (username !== "") {
                console.log('Username does not exist');
                router.push({
                    pathname:'/404'
                  });
            }
            else {
                setUserData({})
            }
        };
    return (
        <>
              <Box
                styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary[999],
                backgroundImage: 'url(https://cdn.ligadosgames.com/imagens/melhores-herois-lords-mobile-og.jpg)',
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
                        backgroundColor: appConfig.theme.colors.neutrals[700],
                    }}
                    >
                     <Box
                       styleSheet={{
                       display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                       width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                       }}
                    
                    >
                        <Image
                        styleSheet={{
                            borderRadius: '50%',
                            marginBottom: '16px',
                        }}
                        src={`https://github.com/${userData.login+ ".png"}`}
                        />
                        <Text
                        variant="body4"
                        styleSheet={{
                            color: appConfig.theme.colors.neutrals[200],
                            backgroundColor: appConfig.theme.colors.neutrals[900],
                            padding: '3px 10px',
                            borderRadius: '1000px'
                        }}
                        >
                        {userData.login}
                        </Text>
                        
                        </Box>
                        <Box
                            as="form"
                            styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px', marginTop: '32px'
                            }}
                            onSubmit={function (infosDoEvento){
                                infosDoEvento.preventDefault();
                                router.push({
                                pathname:router.query.from,
                                });
                            }}
                            >
                                <Text
                                variant="body4"
                                styleSheet={{
                                    color: appConfig.theme.colors.neutrals[200],
                                    backgroundColor: appConfig.theme.colors.neutrals[900],
                                    padding: '3px 10px',
                                    borderRadius: '1000px',
                                    margin:'10px'
                                }}
                                >
                                Link: <Text variant="body4"styleSheet={{
                                    color: appConfig.theme.colors.neutrals[200],
                                    backgroundColor: appConfig.theme.colors.neutrals[600],
                                    padding: '3px 10px',
                                    borderRadius: '1000px'
                                }} tag="a"href={userData.html_url}>{userData.html_url}</Text>
                                <br/>
                                Seguidores: {userData.followers}
                                <br/>
                                Seguindo: {userData.following}
                                </Text>
                                <Button
                                    type='submit'
                                    label='Voltar'
                                    fullWidth
                                    buttonColors={{
                                        contrastColor: appConfig.theme.colors.neutrals["000"],
                                        mainColor: appConfig.theme.colors.primary[500],
                                        mainColorLight: appConfig.theme.colors.primary[400],
                                        mainColorStrong: appConfig.theme.colors.primary[600],
                                    }}
                                    />
                            
                    </Box>
                </Box>
            </Box>
        </>
    )
}