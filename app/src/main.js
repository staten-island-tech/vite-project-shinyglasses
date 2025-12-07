import './style.css'
const notifications = [{'name': 'hunger'
}];
import {showThemesPopup, shop, Savefiles} from './popups.js';
import {Pet} from './pets.js'
import { initExitPopup, preventMultiplePopups } from './misc.js';


if (localStorage.length === 0) {
Savefiles.createSavefile([], 'light', 'one', true);
Savefiles.createSavefile([], 'light', 'two', false);
Savefiles.createSavefile([], 'light', 'three', false);
}

console.log(localStorage)
Savefiles.showSaveFilesPopUp();
shop();
showThemesPopup();
Savefiles.loadSavefile();



//when load in make three save files so its easy to access later => access the first one