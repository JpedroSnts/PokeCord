import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import pokemons from "../utils/pokemons";
import Layout from "../components/Layout";

const HomePage = () => {
  const router = useRouter();
  const [nmPokemon, setNmPokemon] = useState("");
  const [idPokemon, setIdPokemon] = useState(0);

  useEffect(() => {
    const lsPokeId = localStorage.getItem("pokeId");
    if (!lsPokeId) {
      setIdPokemon(0);
      const pkmn = pokemons().find(
        (item) => item.name === nmPokemon.toLocaleLowerCase(),
      );
      if (pkmn !== undefined) {
        setIdPokemon(pkmn.id);
        let fomattedName =
          pkmn.name[0].toUpperCase() +
          pkmn.name.substring(1, pkmn.name.length).toLocaleLowerCase();
        setNmPokemon(fomattedName);
      }
    } else {
      router.push("/chat");
    }
  }, [nmPokemon]);

  function submitPokemon(e) {
    e.preventDefault();
    if (idPokemon !== 0) {
      localStorage.setItem("pokeId", idPokemon.toString());
      localStorage.setItem("pokeName", nmPokemon);
      router.push("/chat");
    }
  }

  return (
    <Layout title="Home - PokeCord">
      <article className="flex flex-col items-center justify-around w-4/5 max-w-2xl py-10 text-white bg-gray-900 sm:flex-row lg:w-3/5 xl:w-3/5 rounded-xl">
        <section className="mb-8 text-center sm:mb-0">
          <h1 className="text-4xl font-bold">PokeCord</h1>
          <h2>Chat between pokemons!</h2>
          <form className="flex flex-col" onSubmit={submitPokemon}>
            <input
              className={`${
                idPokemon !== 0 ? "border-green-500" : "border-gray-500"
              } px-2 py-0.5 mt-5 mb-1 bg-gray-800 border rounded-lg outline-none text-center`}
              type="text"
              placeholder="Name of your pokemon"
              value={nmPokemon}
              onChange={(e) => setNmPokemon(e.target.value)}
            />
            <button
              className={`${
                idPokemon !== 0
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-500"
              }  rounded-lg outline-none  ease-in-out duration-200 py-0.5`}
              disabled={idPokemon !== 0 ? false : true}
            >
              Login
            </button>
          </form>
        </section>
        <section className="justify-center p-5 bg-gray-800 rounded-lg h-52 w-44">
          {idPokemon !== 0 ? (
            <img
              className="w-32 h-32"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png`}
            />
          ) : (
            ""
          )}
          <h3 className="mt-3 text-center bg-gray-900 rounded-lg">
            {idPokemon !== 0 ? nmPokemon : ""}
          </h3>
        </section>
      </article>
    </Layout>
  );
};

export default HomePage;
