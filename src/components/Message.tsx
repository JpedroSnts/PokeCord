interface MessageProps {
  pokeId: Number;
  pokeName: string;
  date: string;
  text: string;
}

const Message = ({ pokeId, pokeName, date, text }: MessageProps) => {
  return (
    <section className="p-2 duration-100 ease-in-out rounded-md hover:bg-gray-900">
      <div className="flex items-center">
        <img
          className="w-10 h-10"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`}
        />
        <h3 className="ml-2 mr-3 font-bold">{pokeName}</h3>
        <small className="text-slate-400">{date}</small>
      </div>
      <p className="ml-12">{text}</p>
    </section>
  );
};

export default Message;
