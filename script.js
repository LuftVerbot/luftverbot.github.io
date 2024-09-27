// Initialize Shaka Player
shaka.polyfill.installAll();

let player;

// Stream Data
const streams = {
        stream1: {
        name: 'Eurosport 1',
        url: 'https://cdn-s-lb2.pluscdn.pl/ch/1456336/126/dash/d6c12d19/live.mpd',
        keys: {
            'e87994b160bd48b5ac2f608ef5dc0f09': '26840f913d91ed7e355a8cc18b99adef'
        }
    },
    stream2: {
        name: 'Eurosport 2',
        url: 'https://r.dcs.redcdn.pl/livedash/o2/tvnplayer/live/eurosport_2/live.isml/playlist.mpd?indexMode=&dummyfile=&server_side_events=0&dvr=7200000',
        keys: {
            'bad345c3ad2e356f44ddbc8fe1eda83f': '81d4e6c13b382a7233efdcea27337875'
        }
    },
    stream3: {
        name: 'Polsat Sport 1',
        url: 'https://cdn-s-lb2.pluscdn.pl/ch/1456452/129/dash/ffe2048f/live.mpd',
        keys: {
            '590abbe92e6e470a9e355d58ec910709': '0af2b5f2450474207f6761adc9dc635e'
        }
    },
    stream4: {
        name: 'Polsat Sport 2',
        url: 'https://cdn-s-lb2.pluscdn.pl/ch/1455745/96/dash/3880d03f/live.mpd',
        keys: {
            '3201accccbe9455cbc28dcd4bcdf1509': 'f4d9a50f98ea833d2e5120d83bd59a23'
        }
    },
    stream5: {
        name: 'Polsat Sport 3',
        url: 'https://cdn-s-lb2.pluscdn.pl/ch/1455832/117/dash/790ff37c/live.mpd',
        keys: {
            '03ddf71c8dae4e8d8b171fb81ecfe609': 'fc80cf8969cf1b3c2c061eadb94e1330'
        }
    },
    stream6: {
        name: 'TVP Sport',
        url: 'https://r.dcs.redcdn.pl/webcache/canalplus2/live/store01/TVPSport/hd2-dashdrm02/TVPSport.mpd',
        keys: {
            '95620bdd974041409d4674ab629e22d4': 'c6c226ca1689f528a6f91e86da618f64',
            '181c091002d04c5481c3faab18752843': 'b081b6169351e0f4bfc40212dfeeed10',
            '1163925b6b37434198130f773bc62841': 'e2bdd2b87e1ddb502eb7898daece857f'
        }
    },
    stream7: {
        name: 'Polsat Sport Premium 1 Super HD',
        url: 'https://cdn-s-lb2.pluscdn.pl/ch/1459449/266/dash/edb3b20d/live.mpd',
        keys: {
            '8eb4a9586edf4b0cade4b5725fd55209': '54caa4e2142cf691af9bb6028545afc6'
        }
    },
    stream8: {
        name: 'Canal+ Sport5 HD',
        url: 'https://r.dcs.redcdn.pl/webcache/canalplus2/live/store01/CplusSport5/hd2-dashdrm02/CplusSport5.mpd',
        keys: {
            '4cea0821d1824cafa0635743a6d97778': '924faa02e646007d6f84af2939792d85',
            'e5cd5fa487c941f08dc227b6b7d2ba34': '86acbf7a6443072a3df2619ed38d5729',
            'd8f713ce3f9443f7bdd07160d181d535': '54ef8a5499686d0c88be6ef84fc4267e'
        }
    },
    stream9: {
        name: 'Polsat Sport Fight',
        url: 'https://lb2-e1-92.pluscdn.pl/ch/1455746/97/dash/0dd0a424/live.mpd',
        keys: {
            '39b61633fdd04e43a3485d3c5ddd1109': '6914f88aa49c2edeacc2c876a7fc108f'
        }
    },
    stream10: {
        name: 'Sky Sports Tennis',
        url: 'https://linear014-gb-dash1-prd-ll.cdn.skycdp.com/Content/DASH_003_720_120/Live/channel(skysportstennis)/manifest_720.mpd',
        keys: {
            '00032023ad4896139b22a071d6c1183c': 'e0c6c1454bb792b843f085be9999c9da'
        }
    },
    stream11: {
        name: 'Eurosport 2 Italy',
        url: 'https://linear312-it-dash1-prd.selector.skycdn.it/016a/31150/FHD/eurosport2/master_stereo.mpd',
        keys: {
            '003670a7034342a4a07c91173818c61c': '7b90055c1a1ea34d9090e9ebf6c4db8a'
        }
    },
    stream12: {
        name: 'Polsat Sport Premium 2 Super HD',
        url: 'https://cdn-s-lb2.pluscdn.pl/ch/1459450/267/dash/c0858178/live.mpd',
        keys: {
            '6a20b49be4db4f328e4bb48853124109': 'f32c1c3c983354bcafb0f2ccb8a59835'
        }
    },
    stream13: {
        name: 'Sky Sports Golf',
        url: 'https://linear003-gb-dash1-prd-ak.cdn.skycdp.com/016a/Content/DASH_003_720_120/Live/channel(skysportsgolf)/manifest_720.mpd',
        keys: {
            '0005f065b6b710a9d4769fb357e2027b': 'f26593b44feb0a043b1d6e090ce27a75'
        }
    },
    stream14: {
        name: 'Eurosport 1 Italy',
        url: 'https://linear311-it-dash1-prd.selector.skycdn.it/016a/313073/FHD/eurosport/master_stereo.mpd',
        keys: {
            '0036bb3fa7e6f2c334d7cba5c28b6caf': '217fa35739cd68e90b2cd23322c01312'
        }
    },
    stream15: {
        name: 'Canal+ Sport2 HD',
        url: 'https://r.dcs.redcdn.pl/webcache/canalplus2/live/store01/CplusSport2HD/hd2-dashdrm02/CplusSport2HD.mpd',
        keys: {
            '4f7fa9f0250a43cea8aebd8167f1fc81': 'f6bbc783b0e7a46a147e673a4347730a',
            '89787fecb0ac43ab86aa356054e2a183': 'f0153c6dc5c55c5f23fcdeed8241d5e4',
            '581eba7045254d1de036557789932a05': 'f5c080517f6c4366b1930315a6aa70e7'
        }
    },
    stream16: {
        name: 'TNT Sports 1',
        url: 'https://linear001-ie-dash1-prd-ak.cdn.skycdp.com/016a/Content/DASH_003_720_120/Live/channel(tntsport1)/manifest_720.mpd',
        keys: {
            '00051ad8db73a944abe9ec83ad88987b': '100c985696718d923c4b1289c1cf0d7d'
        }
    },
    stream17: {
        name: 'Eleven Sports 2',
        url: 'https://r.dcs.redcdn.pl/livedash/o2/tvnplayerncp/live/11_sports/live.isml/playlist.mpd?indexMode=&dummyfile=&server_side_events=0&dvr=7200000',
        keys: {
           'db4e84001a1e4fc3bf2612dc154dd75d': 'ad535148efdde938b29be16c9ab95134'
        }
    },
    stream18: {
        name: 'Eleven Sports 3',
        url: 'https://r.dcs.redcdn.pl/livedash/o2/tvnplayerncp/live/11_extra/live.isml/playlist.mpd?indexMode=&dummyfile=&server_side_events=0&dvr=7200000',
        keys: {
            '65c9e7e73a314bacb570514a605ea306': '91c84c5a2af36c16e20397da599a6e94'
        }
    },
    stream19: {
        name: 'Sky Sport',
        url: 'https://linear311-it-dash1-prd.selector.skycdn.it/016a/31917/FHD/skysport251/master.mpd',
        keys: {
            '0036422cf4293ae7cf1e7f7062cc29e8': '37a223fcc17c087043bc837432fd25d8'
        }
    },
    stream20: {
        name: 'Canal+ Sport HD',
        url: 'https://r.dcs.redcdn.pl/webcache/canalplus2/live/store01/CplusSportHD/hd2-dashdrm02/CplusSportHD.mpd',
        keys: {
            '4e942b1dad92436baad0c6a6901f6d13': '5adefdb3f4edd5ceee23d37c10c37e5c',
            '5fb92575d7da45219e9a88646cd3e243': '31d1f1df9c246eb734de1be0f6bf6acf',
            '7cd69bed1cc54d83bd7f988f622c1157': '332e0a856cdfcd7a1d6da6dcf84633a7'
        }
    }
};

if (shaka.Player.isBrowserSupported()) {
    initPlayer();
} else {
    console.error('Browser not supported!');
    alert('Your browser is not supported!');
}

async function initPlayer() {
    const video = document.getElementById('video');
    player = new shaka.Player(video);
    window.player = player;

    player.addEventListener('error', onErrorEvent);

    initializeDarkMode();
    setupEventListeners();
    populateStreamOptions();

    // Load the default stream
    const defaultStreamKey = Object.keys(streams)[0];
    await changeStream(defaultStreamKey);
    updateStreamSelectedText(streams[defaultStreamKey].name);
}

// Handle Errors
function onErrorEvent(event) {
    console.error('Error code', event.detail.code, 'object', event.detail);
    const notification = document.getElementById('notification');
    notification.textContent = 'An error occurred while loading the video. Please try again.';
}

// Change Stream
async function changeStream(streamKey) {
    const selectedStream = streams[streamKey];
    player.configure({
        drm: {
            clearKeys: selectedStream.keys
        }
    });

    try {
        await player.load(selectedStream.url);
        console.log('Stream loaded successfully!');
        populateQualityOptions();

        if (document.getElementById('autoStart').checked) {
            document.getElementById('video').play();
        }

        // Clear notifications
        document.getElementById('notification').textContent = '';
    } catch (error) {
        onErrorEvent({ detail: error });
    }

    updateStreamSelectedText(selectedStream.name);
    closeAllSelect();
}

// Populate Stream Options
function populateStreamOptions() {
    const streamOptionsContainer = document.getElementById('streamOptions');
    streamOptionsContainer.innerHTML = ''; // Clear existing options

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const showFavoritesOnly = document.getElementById('showFavorites').checked;
    const searchFilter = document.getElementById('streamSearch').value.toUpperCase();

    Object.keys(streams).forEach(streamKey => {
        const stream = streams[streamKey];

        // If showing favorites only and this stream is not a favorite, skip
        if (showFavoritesOnly && !favorites.includes(streamKey)) {
            return;
        }

        // Apply search filter
        if (stream.name.toUpperCase().includes(searchFilter)) {
            // Create the option
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('option', 'stream-option');

            // Stream name
            const nameDiv = document.createElement('div');
            nameDiv.classList.add('stream-name');
            nameDiv.textContent = stream.name;
            nameDiv.onclick = () => {
                changeStream(streamKey);
                closeAllSelect();
            };

            // Favorite icon
            const favoriteIcon = document.createElement('span');
            favoriteIcon.classList.add('favorite-icon');

            if (favorites.includes(streamKey)) {
                favoriteIcon.textContent = '★'; // Filled star
            } else {
                favoriteIcon.textContent = '☆'; // Empty star
            }

            favoriteIcon.onclick = (e) => {
                e.stopPropagation(); // Prevent triggering the stream change
                toggleFavorite(streamKey);
            };

            optionDiv.appendChild(nameDiv);
            optionDiv.appendChild(favoriteIcon);
            streamOptionsContainer.appendChild(optionDiv);
        }
    });
}

// Change Quality
function populateQualityOptions() {
    const tracks = player.getVariantTracks();
    const qualitySelection = document.getElementById('qualitySelection');
    qualitySelection.innerHTML = '';

    tracks.forEach(track => {
        const option = document.createElement('div');
        option.classList.add('option');
        option.textContent = `${track.height}p (${Math.round(track.bandwidth / 1000)} kbps)`;
        option.onclick = () => changeQuality(track.id);
        qualitySelection.appendChild(option);
    });

    document.querySelector("#qualitySelectContainer .select-selected").textContent = 'Select Quality';
}

function changeQuality(trackId) {
    const tracks = player.getVariantTracks();
    const selectedTrack = tracks.find(track => track.id === trackId);
    player.selectVariantTrack(selectedTrack, true);

    document.querySelector("#qualitySelectContainer .select-selected").textContent = `${selectedTrack.height}p (${Math.round(selectedTrack.bandwidth / 1000)} kbps)`;
    closeAllSelect();
}

// Event Listeners
function setupEventListeners() {
    // Stream select
    const streamSelectContainer = document.getElementById('streamSelectContainer');
    streamSelectContainer.querySelector('.select-selected').addEventListener('click', function () {
        toggleSelect(this);
    });

    // Quality select
    const qualitySelectContainer = document.getElementById('qualitySelectContainer');
    qualitySelectContainer.querySelector('.select-selected').addEventListener('click', function () {
        toggleSelect(this);
    });

    // Close selects when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.matches('.select-selected') && !e.target.matches('.favorite-icon')) {
            closeAllSelect();
        }
    });

    // Favorites toggle
    document.getElementById('showFavorites').addEventListener('change', populateStreamOptions);

    // Search input
    document.getElementById('streamSearch').addEventListener('input', populateStreamOptions);
}

// Toggle Select
function toggleSelect(selectedElement) {
    closeAllSelect(selectedElement);
    selectedElement.nextElementSibling.classList.toggle('select-hide');
    selectedElement.classList.toggle('select-arrow-active');
}

function closeAllSelect(exceptElement) {
    const selectItems = document.querySelectorAll('.select-items');
    const selectSelected = document.querySelectorAll('.select-selected');

    selectItems.forEach((item) => {
        if (exceptElement !== item.previousElementSibling) {
            item.classList.add('select-hide');
        }
    });

    selectSelected.forEach((selected) => {
        if (exceptElement !== selected) {
            selected.classList.remove('select-arrow-active');
        }
    });
}

function updateStreamSelectedText(text) {
    document.querySelector("#streamSelectContainer .select-selected").textContent = text;
}

// Favorites
function toggleFavorite(streamKey) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(streamKey)) {
        favorites = favorites.filter(fav => fav !== streamKey);
    } else {
        favorites.push(streamKey);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    populateStreamOptions();
}

// Dark Mode
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', isDarkMode);
    darkModeToggle.checked = isDarkMode;

    darkModeToggle.addEventListener('change', function () {
        document.body.classList.toggle('dark-mode', this.checked);
        localStorage.setItem('darkMode', this.checked);
    });
}