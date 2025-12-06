import './style.css'
const notifications = [{'name': 'hunger'
}];
import {showThemesPopup, shop, SaveFiles} from './popups.js';
import {Pet} from './pets.js'
import { initExitPopup, preventMultiplePopups } from './misc.js';


const pet = new Pet('johnny', 'cat');
SaveFiles.showSaveFilesPopUp();
shop();
showThemesPopup();
