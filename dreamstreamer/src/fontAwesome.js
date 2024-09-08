import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Import the specific icons you need
import {
    faBars,        // Hamburger menu icon
    faTimes,       // Close menu icon
    faPlay,        // Play icon
    faPause,       // Pause icon
    faStepForward, // Next track icon
    faStepBackward,// Previous track icon
    faVolumeUp,    // Volume up icon
    faVolumeMute   // Volume mute icon
} from '@fortawesome/free-solid-svg-icons';

// Add these icons to the library
library.add(faBars, faTimes, faPlay, faPause, faStepForward, faStepBackward, faVolumeUp, faVolumeMute);

export default FontAwesomeIcon;
