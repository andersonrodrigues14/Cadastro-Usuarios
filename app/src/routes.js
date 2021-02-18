import React from 'react';

//navegação
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

//paginas
import Home from './pages/Home';
import Conta from './pages/Conta';
import AddConta from './pages/AddConta';

export default function Routes(){

  const screenOptionStyle = {
    headerStyle: {
      backgroundColor: '#171941'
    },
    headerTintColor: '#bf38ac',
  }

  return(
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Home" component={Home} options={{
          headerTitle: "Cadastro de Usuários"
        }}/>
        <Stack.Screen name="Conta" component={Conta} options={{
          headerTitle: "Lista de Usuários"
        }}/>
        <Stack.Screen name="AddConta" component={AddConta} options={{
          headerTitle: "Adicionar Usuário"
        }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
