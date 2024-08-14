import {SearchIcon } from "lucide-react";
import Header from "./_components/header"
import { Input } from "./_components/ui/input";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import {  CardContent } from "./_components/ui/card";
import { db } from "./_lib/prisma";
import BabershopItem from "./_components/barbershop-item";
import BookingItem from "./_components/booking-item";

interface QuickSearchOption{
  imageUrl: string;
  title: string
}

const quickSearchOptions: QuickSearchOption[] = [{
  imageUrl: "/cabelo.svg",
  title: "Cabelo"
},{
  imageUrl: "/barba.svg",
  title: "Barba"
},{
  imageUrl: "/acabamento.svg",
  title: "Acabamento"
},{
  imageUrl: "/masagem.svg",
  title: "Massagem"
},{
  imageUrl: "/hidratacao.svg",
  title: "Hidratação"
},


]

const Home = async () => {
  //chamar meu banco de dados
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc"
    }
  })
  return (
    <div>
      {/* header */}
      <Header />
      <div className="p-5">
        <h2 className=" text-xl font-bold">Olá, Sarti</h2>
        <p>Sabado, 10 de Agosto.</p>

        {/* Buscar */}
        <div className=" flex items-center gap-2 mt-6">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>

        </div>

        {/* BUSCA RAPIDA */}

        <div className=" flex gap-3 mt-6 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((option) => (
             <Button className=" gap-2 " variant="secondary" key={option.title}>
             <Image src={option.imageUrl} width={16} height={16} alt={option.title}/> {option.title}
           </Button>
           ))}
        

        </div>

        {/*Imagem  */}
        <div className=" relative w-full h-[150px] mt-6">
          <Image alt="Agende nos melhores Barber" src="/banner01.png" fill className="  rounded-xl object-cover" />
        </div>

        {/* Agendamento */}
        <BookingItem/>

        <h2 className=" mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Recomendados</h2>
        <div className=" flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => (
            <BabershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
        <h2 className=" mb-3 mt-6 text-xs font-bold uppercase text-gray-400">Populares</h2>

        <div className=" flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BabershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

      </div>
      <footer className="">
        <CardContent className=" py-6 px-5">
          <p className="text-sm text-gray-400"> © 2023 Copyright <span className=" font-bold"> FSW Barber</span> </p>
        </CardContent>
      </footer>
    </div>
  )

};
export default Home