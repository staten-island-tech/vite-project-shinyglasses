import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import {createSaveFile, accessSaveFile} from './save_files.js'

document.querySelector('#app').innerHTML = `
  <div>
    <p>EYIDFukdfh
    </p><a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
   
`
pet = createPet();
setupCounter(document.querySelector('#counter'));
createSaveFile('me', pet);
accessSaveFile();

