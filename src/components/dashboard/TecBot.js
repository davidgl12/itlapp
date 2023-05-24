import {useState} from 'react';
import {Configuration, OpenAIApi} from 'openai';
import { WidthFull } from '@mui/icons-material';

const configuration = new Configuration({
  organization: 'org-0XpXovab9tULjv34eRGiqx6C',
  apiKey: process.env.REACT_APP_APIKEY,
})

console.log("Organization: ", process.env.REACT_APP_ORGANIZATION);
console.log("Apikey: ", process.env.REACT_APP_APIKEY);
console.log("GPT_ORGANIZATION: ", process.env); 
console.log(process.env.NODE_ENV)

const openai = new OpenAIApi(configuration);

function TecBot() {

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const promps = [
                  {value: "¿Cuántas materias puede estudiar un alumno al semestre en el tecnológico de la laguna?"}, 
                  {value: "¿Cuántas materias hay en la carrera de Sistemas computacionales?"},
                  {value: "¿Qué materias llevan matemáticas en la carrera de Sistemas?"},
                  {value: "¿Qué materias son enfocadas en la carrera de ingeniería en Sistemas Computacionales?"},
                  {value: "¿Cuál es el mínimo de materias que puede llevar un alumno en el tecnológico de la laguna?"}
                ];

  const chat = async (e, message) => {
    e.preventDefault();

    setIsTyping(true);

    let msgs = chats;
    msgs.push({role: "user", content: message})

    setChats(msgs);

    window.scrollTo(0, 1e10);
    setMessage("");

    await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are TecBot. You help with the selection of courses to the students from Tec Laguna.",
        },
        ...chats,
      ],
    })
    .then((result) => {
      //console.log(result);
      msgs.push(result.data.choices[0].message);
      console.log(result.data.choices[0].message);
      setChats(msgs);
      setIsTyping(false);
      window.scrollTo(0, 1e10);
    })
    .catch(error => console.log(error));
  };

  return (
    <main>
      <h1>TecBot</h1>
           
      <section>
        {
          chats && chats.length ? (
            chats.map((chat, index) => (
              <p 
              style={
                {
                backgroundColor: '#bda563',
                WidthFull: '70%',
                padding: '15px',
                borderRadius: '50px'
                }
                } 
              key={index} 
              className={chat.role === "user" ? "user_msg" : ""}
              >
                <span>{chat.content}</span>
              </p>
            ))
          ) : ""
        }
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>Typing</i>
        </p>
      </div>

      <form onSubmit={(e) => chat(e, message)}>
        <input
          style={{backgroundColor: '#EEEEEE'}} 
          type='text' 
          name='message' 
          value={message} 
          placeholder='Escribe tu duda y pulsa Enter'
          onChange={(e) => setMessage(e.target.value)}/>
      </form> 

      <h5>Preguntas frecuentes:</h5>
      <section>
      {
        promps.map((promp) => (
          <button 
            onClick={(e) => setMessage(promp.value)} 
            style={{color: 'White', backgroundColor: '#bda563'}}>
            {promp.value}
          </button>
          
        ))
      }
      </section>
    </main>
  )
}

export default TecBot;
