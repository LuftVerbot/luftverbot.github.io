// Shaka Player initialization
shaka.polyfill.installAll();
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
        name: 'TVP Sport',
        url: 'https://r.dcs.redcdn.pl/webcache/canalplus2/live/store01/TVPSport/hd2-dashdrm02/TVPSport.mpd',
        keys: {
            '95620bdd974041409d4674ab629e22d4': 'c6c226ca1689f528a6f91e86da618f64',
            '181c091002d04c5481c3faab18752843': 'b081b6169351e0f4bfc40212dfeeed10',
            '1163925b6b37434198130f773bc62841': 'e2bdd2b87e1ddb502eb7898daece857f'
        }
    },
    stream6: {
        name: 'Polsat Sport Premium 1 Super HD',
        url: 'https://cdn-s-lb2.pluscdn.pl/ch/1459449/266/dash/edb3b20d/live.mpd',
        keys: {
            '8eb4a9586edf4b0cade4b5725fd55209': '54caa4e2142cf691af9bb6028545afc6'
        }
    },
    stream7: {
        name: 'Canal+ Sport5 HD',
        url: 'https://r.dcs.redcdn.pl/webcache/canalplus2/live/store01/CplusSport5/hd2-dashdrm02/CplusSport5.mpd',
        keys: {
            '4cea0821d1824cafa0635743a6d97778': '924faa02e646007d6f84af2939792d85',
            'e5cd5fa487c941f08dc227b6b7d2ba34': '86acbf7a6443072a3df2619ed38d5729',
            'd8f713ce3f9443f7bdd07160d181d535': '54ef8a5499686d0c88be6ef84fc4267e'
        }
    },
    stream8: {
        name: 'Polsat Sport Fight',
        url: 'https://lb2-e1-92.pluscdn.pl/ch/1455746/97/dash/0dd0a424/live.mpd',
        keys: {
            '39b61633fdd04e43a3485d3c5ddd1109': '6914f88aa49c2edeacc2c876a7fc108f'
        }
    },
    stream9: {
        name: 'Sky Sports Tennis',
        url: 'https://linear014-gb-dash1-prd-ll.cdn.skycdp.com/Content/DASH_003_720_120/Live/channel(skysportstennis)/manifest_720.mpd',
        keys: {
            '00032023ad4896139b22a071d6c1183c': 'e0c6c1454bb792b843f085be9999c9da'
        }
    },
    stream10: {
        name: 'Eurosport 2 Italy',
        url: 'https://linear312-it-dash1-prd.selector.skycdn.it/016a/31150/FHD/eurosport2/master_stereo.mpd',
        keys: {
            '003670a7034342a4a07c91173818c61c': '7b90055c1a1ea34d9090e9ebf6c4db8a'
        }
    },
    stream11: {
        name: 'Polsat Sport 3',
        url: 'https://cdn-s-lb2.pluscdn.pl/ch/1455832/117/dash/790ff37c/live.mpd',
        keys: {
            '03ddf71c8dae4e8d8b171fb81ecfe609': 'fc80cf8969cf1b3c2c061eadb94e1330'
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
    }
};

let player;
if (shaka.Player.isBrowserSupported()) {
    initPlayer();
} else {
    console.error('Browser not supported!');
}

async function initPlayer() {
    const video = document.getElementById('video');
    player = new shaka.Player(video);
    window.player = player;

    player.addEventListener('error', onErrorEvent);
    changeStream('stream1');
}

function onErrorEvent(event) {
    onError(event.detail);
}

function onError(error) {
    console.error('Error code', error.code, 'object', error);
}

// Change stream function
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
    } catch (error) {
        onError(error);
    }

    document.querySelector("#streamSelectContainer .select-selected").textContent = selectedStream.name;
    closeAllSelect();
}

// Populate available quality options
function populateQualityOptions() {
    const tracks = player.getVariantTracks();
    const qualitySelection = document.getElementById('qualitySelection');
    qualitySelection.innerHTML = '';

    tracks.forEach(track => {
        const option = document.createElement('div');
        option.textContent = `${track.height}p (${Math.round(track.bandwidth / 1000)} kbps)`;
        option.onclick = () => changeQuality(track.id);
        qualitySelection.appendChild(option);
    });

    document.querySelector("#qualitySelectContainer .select-selected").textContent = 'Select Quality';
    closeAllSelect();
}

// Change video quality function
function changeQuality(trackId) {
    const tracks = player.getVariantTracks();
    const selectedTrack = tracks.find(track => track.id === trackId);
    player.selectVariantTrack(selectedTrack, true);

    document.querySelector("#qualitySelectContainer .select-selected").textContent = `${selectedTrack.height}p (${Math.round(selectedTrack.bandwidth / 1000)} kbps)`;
    closeAllSelect();
}

// Dropdown management
document.querySelectorAll('.custom-select').forEach(select => {
    select.querySelector('.select-selected').addEventListener('click', function() {
        this.nextElementSibling.classList.toggle('select-hide');
        this.classList.toggle('select-arrow-active');
    });
});

function closeAllSelect() {
    document.querySelectorAll('.select-items').forEach(item => item.classList.add('select-hide'));
    document.querySelectorAll('.select-selected').forEach(selected => selected.classList.remove('select-arrow-active'));
}

window.addEventListener('click', function(e) {
    if (!e.target.matches('.select-selected')) {
        closeAllSelect();
    }
});