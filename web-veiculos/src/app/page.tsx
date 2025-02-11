"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 font-sans">
      <h1 className="text-2xl font-bold">Bem-vindo ao Sistema de Montadoras</h1>
      
      <div className="flex gap-4">
        <Link href="/montadoras" className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700">
          Listar Montadoras
        </Link>
        
        <Link href="/montadoras/add" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700">
          Adicionar Montadora
        </Link>
      </div>

    </div>
  );
}
