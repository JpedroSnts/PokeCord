import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { getAllMessages, insertMessage, supabase } from "../utils/supabase";

import Message from "../components/Message";
import Layout from "../components/Layout";

interface MessageData {
  id_message?: number;
  id_pokemon: number;
  nm_pokemon: string;
  ds_message: string;
  created_at: string;
}

const Chat = () => {
  const router = useRouter();
  const [idPokemon, setIdPokemon] = useState(0);
  const [nmPokemon, setNmPokemon] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(null);

  function logout() {
    localStorage.removeItem("pokeId");
    localStorage.removeItem("pokeName");
    router.push("/");
  }

  async function submitMessage() {
    if (textMessage.trim() !== "") {
      const message: MessageData = {
        id_pokemon: idPokemon,
        nm_pokemon: nmPokemon,
        ds_message: textMessage,
        created_at: `${new Date().toLocaleDateString(
          "pt-BR",
        )} - ${new Date().toLocaleTimeString("pt-BR")}`,
      };
      await insertMessage(message);
      setTextMessage("");
    }
  }

  async function loadMessages() {
    const { data, error }: { data: MessageData[]; error: PostgrestError } =
      await getAllMessages();
    if (error) {
      console.log(error);
    } else {
      setMessages(data);
    }
  }

  useEffect(() => {
    const messagesArea = document.querySelector("#messagesArea");
    messagesArea.scrollBy(0, messagesArea.scrollHeight);
  }, [messages]);

  useEffect(() => {
    const lsPokeId = localStorage.getItem("pokeId");
    const lsPokeName = localStorage.getItem("pokeName");
    if (!lsPokeId || !lsPokeName) {
      router.push("/");
    } else {
      setIdPokemon(parseInt(lsPokeId));
      setNmPokemon(lsPokeName);
      loadMessages();
    }
  }, []);

  useEffect(() => {
    const subscription = supabase
      .from("message")
      .on("*", (payload) => {
        if (payload.eventType === "INSERT") {
          setNewMessage(payload.new);
        }
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (newMessage) {
      setMessages([...messages, newMessage]);
    }
  }, [newMessage]);

  return (
    <Layout
      title="Chat - PokeCord"
      classes="flex items-center justify-center w-screen h-screen p-6"
    >
      <div className="flex flex-col items-center justify-between w-full h-full px-4 pt-2 pb-4 bg-gray-900 rounded-xl">
        <header className="flex items-center self-start justify-between w-full">
          <section className="flex items-center">
            {idPokemon !== 0 ? (
              <img
                className="w-12 h-12 p-2 bg-gray-800 rounded-full"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${idPokemon}.png`}
              />
            ) : (
              ""
            )}
            <h3 className="mx-3 font-bold text-white">
              {idPokemon !== 0 ? nmPokemon : ""}
            </h3>
          </section>
          <button
            className="w-12 duration-200 ease-in-out rounded-md hover:bg-red-700 hover:text-white text-slate-400"
            onClick={logout}
          >
            Sair
          </button>
        </header>
        <article
          id="messagesArea"
          className="w-full h-full p-2 my-2 overflow-auto text-white bg-gray-800 rounded-xl"
        >
          {messages.map((message) => (
            <Message
              key={message.id_message}
              pokeId={message.id_pokemon}
              pokeName={message.nm_pokemon}
              date={message.created_at}
              text={message.ds_message}
            />
          ))}
        </article>
        <input
          type="text"
          onChange={(e) => setTextMessage(e.target.value)}
          className="w-full px-2 py-0.5 text-white bg-gray-800 outline-none rounded-md"
          value={textMessage}
          onKeyPress={(e) => {
            if (e.key === "Enter") submitMessage();
          }}
          placeholder="Digite sua mensagem..."
        />
      </div>
    </Layout>
  );
};

export default Chat;
