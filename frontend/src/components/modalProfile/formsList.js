import React from 'react';
import '../../App.css';
import InputDefault from '../input/Input';
import InputPassword from '../input/InputPassword';
import InputEmail from '../input/InputEmail';
import InputFile from '../input/InputFile';

const FormsList = React.memo(() => {

    return (
        <div className="lista-forms-perfil">
            <InputDefault icon={<span className='material-symbols-outlined'>corporate_fare</span>} text="Nome da empresa"/>
            <InputDefault icon={<span className='material-symbols-outlined'>person</span>} text="Nome"/>
            <InputEmail icon={<span className='material-symbols-outlined'>mail</span>} text="Email"/>
            <InputDefault icon={<span className='material-symbols-outlined'>contact_page</span>} text="Documento"/>
            <InputPassword icon={<span className='material-symbols-outlined'>key</span>} text="Nova senha"/>
            <InputPassword icon={<span className='material-symbols-outlined'>vpn_key_alert</span>} text="Confirmar nova senha"/>
            <InputPassword icon={<span className='material-symbols-outlined'>lock</span>} text="Senha"/>
            <InputDefault icon={<span className='material-symbols-outlined'>description</span>} text="Descrição"/>
            <InputFile icon={<span className='material-symbols-outlined'>image</span>} text="Logo"></InputFile>
        </div>
    );
});

export default FormsList;