"use client"

import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";

export interface Veiculo {
    id: number;
    placa: string;
    valor: number;
    modelo: { nome: string };

}

const GET_VEICULOS = gql`
    query {
        veiculos {
            id
            placa
            modelo {
                nome
            }
        }
    }
`;

export default function Veiculo() {
    const { loading, error, data } = useQuery(GET_VEICULOS);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro ao carregar veiculos: {error.message}</p>;

    return (
        <div className="flex flex-col items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
              <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <Image
                  className="dark:invert"
                  src="/next.svg"
                  alt="Next.js logo"
                  width={180}
                  height={38}
                  priority
                />

                <h1>Lista de Veiculos</h1>

                <Link href="/veiculos/add" className="flex items-center gap-2 text-blue-500 hover:text-blue-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Novo Veiculo
                </Link>

                <ul>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.veiculos.map((veiculo: Veiculo) => (
                            <li key={veiculo.id} className="border rounded-lg p-4 shadow-md">
                                <h2 className="text-xl font-bold mb-2">{veiculo.placa} <span className="text-gray-300">#{veiculo.id}</span></h2>
                                <p className="text-gray-200">Modelo: {veiculo.modelo.nome}</p>
                            </li>
                        ))}
                    </div>
                </ul>    
                </main>
                <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                    <p>veiculos</p>
                </footer>
      
        </div>
    )
}