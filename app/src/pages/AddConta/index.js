import React, {useState} from 'react';
import { Alert } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import TextInputMask from 'react-native-text-input-mask';
//import ImagePicker
import ImagePicker from 'react-native-image-crop-picker';
//import Style
import {style} from './styleMask';
import {Container, TitleInput, InputForm, BtnSubmitForm, TxtSubmitForm, TitleRequired,ImagemUser, ContainerImagem} from './styles';
//import API
import api from '../../config/api';


export default function AddConta() {
  const [nome, setNome] = useState('');
  const [dataNascimento, setData] = useState('');
  const [foto, setFoto] = useState('');
  const [loading, setLoading] = useState(false);

  const fotoCamera = async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setFoto(image.path);
    }).catch((e) => {
      Alert.alert("Foto é obrigatória!","Selecione uma foto de sua galeria ou tire uma na hora se preferir!");
    });
  }

  const fotoBiblioteca = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setFoto(image.path)
    }).catch((e) =>{
        Alert.alert("Foto é obrigatória!","Selecione uma foto de sua galeria ou tire uma na hora se preferir!");
    });
  }

  const addConta = async () => {
    setLoading(true);
    if (nome.trim() === ''){
      Alert.alert("Campo Obrigatório!", "Campo nome é obrigatório!");
      setLoading(false);
    }else if(dataNascimento.trim() === ''){
      Alert.alert("Campo Obrigatório!", "Campo Data de Nascimento é obrigatório!");
      setLoading(false);
    }else if(foto.trim() === ''){
      Alert.alert("Campo Obrigatório!", "Campo Foto é obrigatório!");
      setLoading(false);
    }else{
      setLoading(true);
      await api.post('/contas',{nome,dataNascimento,foto}
      ).then((response) => {
          Alert.alert("", response.data.message);
          setNome('');
          setData('');
          setFoto('');
          setLoading(false);
      }).catch((err) => {
        if(err.response){
          Alert.alert("", response.data.message);
        }else{
          Alert.alert("", "Erro conta não cadastrada com sucesso, tente mais tarde.");
        }
        setLoading(false);
      });
    }
  };

  return(
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <Container>
      <TitleInput>* Foto: </TitleInput>
        <ContainerImagem>
        { foto ? 
        <ImagemUser source={{uri:foto}}/>
        :
        <ImagemUser source={{uri:"https://www.stevefarber.com/wp-content/uploads/2019/01/man-avatar-placeholder.png"}}/>
        }
        <BtnSubmitForm  /*disabled={loading}*/ onPress={fotoCamera}>
          <TxtSubmitForm>Tirar Foto</TxtSubmitForm>
        </BtnSubmitForm>
        <BtnSubmitForm  /*disabled={loading}*/ onPress={fotoBiblioteca}>
          <TxtSubmitForm>Escolher Foto</TxtSubmitForm>
        </BtnSubmitForm>
        </ContainerImagem>

        <TitleInput>* Nome: </TitleInput>
        <InputForm placeholder="Nome Completo"
          value={nome}
          editable={!loading}
          onChangeText={text => setNome(text)}
        />

        <TitleInput>* Data de Nascimento: </TitleInput>
        <TextInputMask placeholder="Data Nasimento"
          keyboardType="numeric"
          style={style.inputMasck}
          mask={'[00]/[00]/[0000]'}
          value={dataNascimento}
          editable={!loading}
          onChangeText={text => setData(text)}
        />

        <TitleRequired>*Campo Obrigatório</TitleRequired>

        <BtnSubmitForm disabled={loading} onPress={addConta}>
          <TxtSubmitForm>Cadastrar</TxtSubmitForm>
        </BtnSubmitForm>

      </Container>
    </ScrollView>
  );
}