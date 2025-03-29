"use client"
import React from 'react'
import { useRef } from 'react'
import { FaRegCopy } from "react-icons/fa6";

const JamPolicy = () => {

  const policyRef = useRef<HTMLDivElement>(null);

  const handleCopy = async () => {
    try {
      const text = policyRef.current?.innerText;
      if (text) {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
        } else {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
        }
      } else {
        console.error('No text to copy');
      }
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div className=' w-[30%] h-[90vh] overflow-y-auto border-1 rounded-sm px-2 shadow-2xl bg-[#B6B6D5]' style={{ boxShadow: '7px 7px black' }}>
      <div className='flex justify-between items-center mb-4'>
        <div className=' border-1 mt-2 rounded-sm'>
          <h2 className=' text-xl font-semibold p-2 bg-[#E9E3F1] rounded-md'>Jam Policy</h2>
        </div>
        <div className=' border-1 mt-2 rounded-sm'>
          <button onClick={handleCopy} className="px-4 py-2 rounded cursor-pointer">
            <FaRegCopy />
          </button>
        </div>
      </div>
      <hr className='mb-3'/>
      <p ref={policyRef} className="text-gray-700 text-base mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde quisquam alias explicabo tempore rem cupiditate ex, culpa cumque quas, est nihil beatae voluptatum quod doloribus dolores aliquam illum nisi facilis. Incidunt sed harum nesciunt et accusamus similique est illo sunt accusantium voluptate, quia odit quis ipsam porro excepturi dicta fugiat, eius fugit architecto! Aut ratione rem, nam quam magnam libero fuga exercitationem esse dignissimos minima nihil omnis beatae deserunt sapiente quia excepturi neque atque quibusdam architecto! Eos deserunt veritatis exercitationem animi velit quam minima earum unde dolorem cupiditate! Corporis facilis asperiores molestias facere sit quae dolor architecto maiores nisi minima in ratione fugit unde eos expedita quisquam optio saepe voluptate consectetur, animi porro sunt. Non officiis, culpa eos facilis corrupti at, unde omnis impedit minus quo accusamus sapiente modi! Repudiandae impedit magnam adipisci assumenda tempora quos, laudantium autem? Error perspiciatis ut consequatur molestiae sed ipsam eligendi dolorum eaque deserunt quisquam deleniti exercitationem iure excepturi praesentium numquam ab ratione officiis, quia sapiente! Maiores animi vero ratione dolorem, voluptates iusto debitis quam enim nobis omnis, saepe et a! Iure aspernatur temporibus qui necessitatibus at quod, ipsa iste quisquam enim nisi distinctio deleniti, facere culpa nihil dicta libero, perferendis reprehenderit soluta sed officiis porro repellat eveniet facilis assumenda. Obcaecati molestiae error saepe, consequuntur, sunt quam veniam dolore consectetur iure quos voluptates quibusdam qui inventore? Dolorem veritatis eveniet eaque voluptatem qui laborum sequi itaque architecto eos aperiam, at quis pariatur. Repellat sed, excepturi sint ut quis cum accusantium impedit laboriosam rerum eos! Optio quae animi quia molestias, atque commodi error eligendi tempora, deserunt, quam perferendis! Voluptatibus distinctio, facere aperiam doloremque exercitationem, ipsam quaerat velit minima impedit voluptatum ea, sint nostrum consequuntur nobis excepturi. Deserunt dolorum cupiditate aut dignissimos aspernatur quae, ducimus commodi nihil excepturi ea, nesciunt earum molestias ipsum quo pariatur, iusto repellendus recusandae?
      </p>
    </div>
  )
}

export default JamPolicy