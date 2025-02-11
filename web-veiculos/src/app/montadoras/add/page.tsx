"use client"
import { gql, useMutation, useQuery } from "@apollo/client";
import { redirect } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

interface MontadoraFormData {
    nome: string;
    pais: string;
    ano_fundacao: number;
}

const ADD_MONTADORA = gql`
  mutation AddMontadora($nome: String!, $pais: String!, $ano_fundacao:Int!) {
    AddMontadora(nome: $nome, pais: $pais,ano_fundacao:$ano_fundacao){
      id
      nome
      pais
      ano_fundacao
    }
  }
`;

const AddMontadoraPage: React.FC = () => {

    const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<MontadoraFormData>();

    const [addMontadora, { loading, error, data}]=useMutation(ADD_MONTADORA);
    
    // const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<MontadoraFormData>();

    const onSubmit = async (data: MontadoraFormData) => {
       try {
            const { data: response }  = await addMontadora({ 
                variables:{
                    nome: data.nome,
                    pais: data.pais,
                   ano_fundacao:parseInt(data.ano_fundacao.toString(), 10),
                }, 
            });

            if (response?.addMontadora){
             alert('Montadora cadastrada com sucesso!');
             redirect('/montadoras');
            }
         } catch (error) {
             console.error('Erro:', error);
             alert('Erro ao cadastrar montadora');
         }
     };

    if (isSubmitSuccessful) {
         redirect('/montadoras');
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">Cadastrar Montadora</h1>   
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
                <input
                    id="nome"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                    {...register('nome', { required: 'Nome é obrigatório' })}
                />
                {errors.nome && <span className="text-red-500 text-sm">{errors.nome.message}</span>}
                </div>
                <div>
                <label htmlFor="pais" className="block text-sm font-medium text-gray-700">País</label>
                <input
                    id="pais"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                    {...register('pais', { required: 'País é obrigatório' })}
                />
                {errors.pais && <span className="text-red-500 text-sm">{errors.pais.message}</span>}
                </div>
                <div>
                <label htmlFor="ano_fundacao" className="block text-sm font-medium text-gray-700">Ano de Fundação</label>
                <input
                    id="ano_fundacao"
                    type="number"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                    {...register('ano_fundacao', {
                    required: 'Ano de fundação é obrigatório',
                    min: { value: 1898, message: 'Ano deve ser no mínimo 1898' },
                    max: { value: 2025, message: 'Ano deve ser no máximo 2025' },
                    })}
                />
                {errors.ano_fundacao && <span className="text-red-500 text-sm">{errors.ano_fundacao.message}</span>}
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Cadastrar</button>
            </form>
            </div>
        </div>
    );
};

export default AddMontadoraPage;