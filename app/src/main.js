import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import {createSaveFile, accessSaveFile} from './save_files.js'
import { createPet } from './pet.js'
import { changeTheme } from './misc.js'
document.querySelector('#app').innerHTML = `
 
`
pet = createPet();
setupCounter(document.querySelector('#counter'));
createSaveFile('me', pet);
accessSaveFile();
