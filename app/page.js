"use client"

import Image from 'next/image'
import styles from './page.module.css'
import React from 'react';
import { useState } from 'react';


//Coloque o código dos demais componentes aqui...

export default function Home() {
    
  const [blogMessages, setBlogMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ispesquisa, setIspesquisa] = useState(false);
  
  const handleSearch = event => {
    const term = event.target.value.toLowerCase();
    if (term === ''){
      setIspesquisa(false)
    }else{
      setIspesquisa(true)
    }
    setSearchTerm(term);
    const filteredMessages = blogMessages.filter(
      message =>
        message[1].toString().toLowerCase().includes(term) || // Verifica se o termo está presente no autor
        message[0].toString().toLowerCase().includes(term) // Verifica se o termo está presente na mensagem
    );
    setMessages(filteredMessages);
  };

  fetch('https://script.google.com/macros/s/AKfycbzBn3sALe1rYjz7Ze-Ik7q9TEVP0I2V3XX7GNcecWP8NvCzGt4yO_RT1OlQp09TE9cU/exec')
    .then(response => response.json())
    .then(data => {
        setBlogMessages(data);
    });
    return (
      <main className={styles.main}>
        <form>
          <label>Procure uma mensagem:</label>
          <input style={{width : '100%'}} type="text" placeholder="Search..." value={searchTerm} onChange={handleSearch}/>
        </form>
        
        <table>
          <thead>
            <tr>
              <th>Author</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {
            ispesquisa
                ? messages.map(message => (
                  <tr key={message.id}>
                    <td>{message[1]}</td>
                    <td>{message[0]}</td>
                    <td>{message[2]}</td>
                  </tr>
                ))
              :
                blogMessages.map(message => (
                  <tr key={message.id}>
                    <td>{message[1]}</td>
                    <td>{message[0]}</td>
                    <td>{message[2]}</td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </main>
    )
}