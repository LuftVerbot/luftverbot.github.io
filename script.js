// Global variables for players and streams
let player = null;
window.hls = null;

// Stream Data (DRM Keys + URLs)
const streams = {
    stream1: {
        name: 'Eurosport 1',
        url: 'https://cdn-s-lb2.pluscdn.pl/ch/1456336/126/dash/d6c12d19/live.mpd',
        fallbackUrl: 'https://windnew.newkso.ru/wind/premium57/mono.m3u8',
        keys: {
            'e87994b160bd48b5ac2f608ef5dc0f09': '26840f913d91ed7e355a8cc18b99adef'
        }
    },
    stream2: {
        name: 'Eurosport 2',
        url: 'https://lb2-e2-31.pluscdn.pl/ch/1455824/109/dash/8792e496/live.mpd',
        fallbackUrl: 'https://windnew.newkso.ru/wind/premium58/mono.m3u8',
        keys: {
            '51ab61e7bc85492a9ff91bb55f101709': '59acf98d228bddef6443da0b5b0669a2'
        }
    },
    stream3: {
        name: 'Polsat Sport 1',
        url: 'https://r.dcs.redcdn.pl/livedash/play/playtv/indigo/live/polsat_sport/live.livx?indexMode&futc',
        fallbackUrl: 'https://xyzdddd.mizhls.ru/lb/premium50/index.m3u8',
        keys: {
            '9dd4a81698d4525a3c3dccf9c1860a7c': 'dd48335b7cb0b65a45a8766d725b3b6f'
        }
    },
    stream4: {
        name: 'Polsat Sport 2',
        url: 'https://cdn-s-lb2.pluscdn.pl/ch/1455745/96/dash/3880d03f/live.mpd',
        fallbackUrl: 'https://windnew.newkso.ru/wind/premium50/mono.m3u8',
        keys: {
            '3201accccbe9455cbc28dcd4bcdf1509': 'f4d9a50f98ea833d2e5120d83bd59a23'
        }
    },
    stream5: {
        name: 'Polsat Sport 3',
        url: 'https://cdn-s-lb2.pluscdn.pl/ch/1455832/117/dash/790ff37c/live.mpd',
        fallbackUrl: 'https://love2live.wideiptv.top/POLSATSPORTNEWS/index.fmp4.m3u8?token=1c968035bac61ce22e279b61da7c11eef135ab0e-82f60e5a39f1e448db321c889c375481-1741388001-1741377201',
        keys: {
            '03ddf71c8dae4e8d8b171fb81ecfe609': 'fc80cf8969cf1b3c2c061eadb94e1330'
        }
    },
    stream6: {
        name: 'TVP Sport',
        url: 'https://estreams.tv.nej.cz/dash/CH_TVP_SPORT_Portable.ism/playlist.mpd',
        keys: {
            '95620bdd974041409d4674ab629e22d4': 'c6c226ca1689f528a6f91e86da618f64',
            '181c091002d04c5481c3faab18752843': 'b081b6169351e0f4bfc40212dfeeed10',
            '1163925b6b37434198130f773bc62841': 'e2bdd2b87e1ddb502eb7898daece857f'
        }
    },
    stream7: {
        name: 'Polsat Sport Premium 1 Super HD',
        url: 'https://r.dcs.redcdn.pl/livedash/play/playtv/indigo/live/polsat_sport_premium_1/live.livx?indexMode&futc',
        keys: {
            '500a020efaa5cf0038480b530e8b875d': '3e7a2e3f11473d24303e838fa072a5a4'
        }
    },
    stream8: {
        name: 'Canal+ Sport 5 HD',
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
        fallbackUrl: 'https://love2live.wideiptv.top/PolsatSportPremium2/index.fmp4.m3u8?token=5b4def00c47583a32dec2cbb5c2877b5fc87f4f6-4e42a96bc2a3a8f279f4adb7443b3a93-1741387807-1741377007',
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
        name: 'Canal+ Sport 2 HD',
        url: 'https://r.dcs.redcdn.pl/webcache/canalplus2/live/store01/CplusSport2NEPL/hd2-dashdrm02/CplusSport2NEPL.mpd',
        keys: {
            '073741e9e2a14dfe84ece6fb0ee86dbf': '98cc50e6b8b38c2a4ce55c55b6d5b464',
            '3b45f4b43e58446a87d3ae2439490e97': '1ad4aa72e68dd885a351b8ede099acf4'
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
        url: 'https://r.dcs.redcdn.pl/livedash/o2/tvnplayerncp/live/11_sports/live2.isml/playlist.mpd?indexMode=&dummyfile=&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjQ0NDgzOCIsIkFQUExJQ0FUSU9OIjoiRk8iLCJleHAiOjE3NDQ2OTU4MzYsImlhdCI6MTc0NDY1MjYzNn0.3xK8a9UmNdFV1LaTHoz2bWlrm9UFZuT9-GpIJNqhA0E&dvr=7200000',
        fallbackUrl: 'https://windnew.newkso.ru/wind/premium72/mono.m3u8',
        keys: {
            'f19a390cc9c5f717fe8def88b9e1923b': '27e54c03e1a01be61abeb55aa9ca5474'
        }
    },
    stream18: {
        name: 'Eleven Sports 3',
        url: 'https://r.dcs.redcdn.pl/webcache/canalplus2/live/store01/11Sports3/hd2-dashdrm02/11Sports3.mpd',
        fallbackUrl: 'https://ddy6new.newkso.ru/ddy6/premium428/mono.m3u8',
        keys: {
            '55b19ea29fdd4c96825531f96a504df1': 'a6ec613e0eadfb923ff816e4c8c68a4a',
            'ce125d7af48a45799d671941125ed55e': '973599517f31f3b4327fa975f549ed2b',
            '1de6210c1b064b928c5bb003da7023e5': 'd1eb59b178c89539d7caf1022968107e',
            '696c7203cea54375a2433c8be361f6ed': '39e60bf9f0154884f5039d8e6cc47601'
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
        url: 'https://r.dcs.redcdn.pl/livedash/o2/tvnplayerncp/live/canal_plus_sport/live2.isml/playlist.mpd?indexMode=&dummyfile=&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjQ0NDgzOCIsIkFQUExJQ0FUSU9OIjoiRk8iLCJleHAiOjE3NDY5MDA3ODQsImlhdCI6MTc0Njg1NzU4NH0.Sj8-3xxDiiMqvtc8yulV_1F44ztFao0-0Xy4om-6RAA&dvr=7200000',
        keys: {
            'b18527331596f1b4d71d0a31d3db876f': '0012e4418e9b788c91dc50dbfce79802'
        }
    },
    stream21: {
        name: 'Sky Sport 1 German',
        url: 'https://linear205-de-dash1-prd-ak.cdn12.skycdp.com/031122-50/index_stereo.mpd',
        keys: {
            '000b0e3422812fcf3d1eb8cdf7511193': '1fe928a3793feb3739f293b0b1b81d1d'
        }
    },
    stream22: {
        name: 'Canal+ Sport 3 HD',
        url: 'https://r.dcs.redcdn.pl/livedash/o2/tvnplayerncp/live/canal_plus_sport_3/live2.isml/playlist.mpd?indexMode=&dummyfile=&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjQ0NDgzOCIsIkFQUExJQ0FUSU9OIjoiRk8iLCJleHAiOjE3NDY5MDAwNjUsImlhdCI6MTc0Njg1Njg2NX0.CfkMtFdcZ0KQD7mObNX_-NVQ1NaCDz7vJFL_70tyVZ4&dvr=7200000',
        keys: {
            'ec1e0c6a78a86b0e7fe9e227fa95cdca': '953acb21086235adb744781bed74f295'
        }
    },
    stream23: {
        name: 'Eleven Sports 4',
        url: 'https://r.dcs.redcdn.pl/livedash/o2/tvnplayerncp/live/eleven_sports_4_hd/live.isml/playlist.mpd?indexMode=&dummyfile=&server_side_events=0',
        keys: {
            '5288e6308fb45f5b89f3ece30b12b1b3': '106c98f71aa6a18fbd32da9d58859413'
        }
    },
    stream24: {
        name: 'Eleven Sports 1',
        url: 'https://r.dcs.redcdn.pl/livedash/o2/tvnplayerncp/live/11/live2.isml/playlist.mpd?indexMode=&dummyfile=&jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjQ0NDgzOCIsIkFQUExJQ0FUSU9OIjoiRk8iLCJleHAiOjE3NDY5MDA0MzMsImlhdCI6MTc0Njg1NzIzM30.l27q6HbPwraEnYBpRCz5NzIxyQN4RlMwWpxNevThUSs&dvr=7200000',
        keys: {
            '5459b578ff0942a848627ab4345e3b6d': 'b2cf0928548f26e4512d901f2945b86a'
        }
    },
    stream25: {
        name: 'Sky Sport Bundesliga 1',
        url: 'https://linear205-de-dash1-prd-ak.cdn12.skycdp.com/031122-50/index_stereo.mpd',
        keys: {
            '000b0e3422812fcf3d1eb8cdf7511193': '1fe928a3793feb3739f293b0b1b81d1d'
        }
    },
    stream26: {
        name: 'Sky Sport Bundesliga 2',
        url: 'https://linear204-de-dash1-prd-ak.cdn12.skycdp.com/031123-50/index_stereo.mpd',
        keys: {
            '000befd7c86292bb122e08bcfc0a06c2': 'd1cdb3b40de46f75910b2b69ffea9dab'
        }
    },
    stream27: {
        name: 'Sky Sport Bundesliga 3',
        url: 'https://linear205-de-dash1-prd-ak.cdn12.skycdp.com/031124-50/index_stereo.mpd',
        keys: {
            '000b2bff43fd13add0f7e3fd8a7d3066': 'cf859a91af1aed3d87b148e8fcb9111f'
        }
    },
    stream28: {
        name: 'Sky Sport Bundesliga 4',
        url: 'https://linear204-de-dash1-prd-ak.cdn12.skycdp.com/031125-50/index_stereo.mpd',
        keys: {
            '000ba721a0fffe492656276b76701d85': '746161b7ed203532f40ac3f3852bd12a'
        }
    },
    stream29: {
        name: 'Sky Sport Bundesliga 5',
        url: 'https://linear205-de-dash1-prd-ak.cdn12.skycdp.com/032126-50/index_stereo.mpd',
        keys: {
            '000b4dd98709c99e7d3ca61284971da3': 'd37b0eafb4859024bfe415c37b967ce2'
        }
    },
    stream30: {
        name: 'Sky Sport Bundesliga 6',
        url: 'https://linear204-de-dash1-prd-ak.cdn12.skycdp.com/032127-50/index_stereo.mpd',
        keys: {
            '000b93f4cd3cf2e0a79b4f570de9064e': 'c04740423c9d905fb2b42c94984a07c2'
        }
    },
    stream31: {
        name: 'Canal+ 360 HD',
        url: 'https://r.dcs.redcdn.pl/livedash/o2/tvnplayerncp/live/canal_plus_family/live.isml/playlist.mpd?indexMode=&dummyfile=&server_side_events=1&dvr=7200000',
        keys: {
            '84d509efbf613af2eac503248dfedff5': 'bff5e2d2e2c792087a83ea00e6db36ea'
        }
    },
    stream32: {
        name: 'Sky Sport Top Event',
        url: 'https://linear202-de-dash1-prd-ak.cdn12.skycdp.com/035111-50/index_stereo.mpd',
        keys: {
            '000b3265e1f9d52374c6c4705a258f7a': 'd223e0fec55e0a22344d1cacb8cd2855'
        }
    },
    stream33: {
        name: 'TSN 1',
        url: 'https://live-cito.9c9media.ca/f2ca3f90e91525b7d72012084085c9e35ac9faa51724957469496/f/tsn1/manifest.mpd',
        keys: {
            '8df41512092240d38550e83dc05e157e': 'f29f106ec9f58b41c7c8391b64f3bb25'
        }
    },
    stream34: {
        name: 'TSN 3',
        url: 'https://live-cito.9c9media.ca/4ccae8216e3a581e1088eeb48416282fa95299001725016468668/f/tsn3/manifest.mpd',
        keys: {
            '473177ea3d394060a0d0c266521ffd68': 'cb6366270ecf03b7b80aae491ef9d618'
        }
    },
    stream35: {
        name: 'TEST',
        url: 'https://dcj-ak-livedazn.akamaized.net/dash/dazn-linear-511/stream.mpd',
        fallbackUrl: 'https://windnew.newkso.ru/wind/premium50/mono.m3u8',
        keys: {
            'cfb5e2b73bef4f3c878f25ab86a7451f': '0d6712bf2a84edcc93d001a9613f6fec'
        }
    }
};

// Wait for the DOM to load before initializing
document.addEventListener('DOMContentLoaded', () => {
    initializeDarkMode();
    setupCustomVideoControls();
    setupEventListeners();
    generateStreamLibrary();
    populateStreamOptions();

    // Load default stream
    const defaultStreamKey = Object.keys(streams)[0];
    changeStream(defaultStreamKey);
});

// ==============================
//      Stream & Player Logic
// ==============================
async function changeStream(streamKey) {
    const selectedStream = streams[streamKey];
    const videoElement = document.getElementById('video');

    await destroyPlayers();

    // Use Shaka if DRM keys exist; otherwise use HLS / native playback
    if (selectedStream.keys) {
        await setupShakaPlayer(videoElement, selectedStream);
    } else {
        await setupHlsPlayer(videoElement, selectedStream);
    }

    updateStreamSelectedText(selectedStream.name);
    closeAllSelect();
}

async function destroyPlayers() {
    if (player) {
        try {
            await player.destroy();
        } catch (err) {
            console.error('Error destroying Shaka player:', err);
        }
        player = null;
    }
    if (window.hls) {
        try {
            window.hls.destroy();
        } catch (err) {
            console.error('Error destroying HLS instance:', err);
        }
        window.hls = null;
    }
}

function onErrorEvent(event) {
    console.error('Error:', event.detail);
    showNotification('An error occurred while loading the video. Please try again.');
}

function showNotification(message) {
    document.getElementById('notification').textContent = message;
}

function clearNotification() {
    document.getElementById('notification').textContent = '';
}

function showLoadingSpinner() {
    document.getElementById('loadingSpinner').hidden = false;
}

function hideLoadingSpinner() {
    document.getElementById('loadingSpinner').hidden = true;
}

// ==============================
//      Shaka & HLS Setup
// ==============================
async function setupShakaPlayer(videoElement, stream) {
    showLoadingSpinner();
    shaka.polyfill.installAll();
    player = new shaka.Player(videoElement);

    // Custom error handler to trigger fallback on any Shaka error.
    const shakaErrorHandler = async (event) => {
        const error = event.detail;
        console.error("Shaka error event:", error);
        if (stream.fallbackUrl && !stream.fallbackAttempted) {
            stream.fallbackAttempted = true;
            console.log("Fallback triggered via error event. Switching to HLS fallback URL:", stream.fallbackUrl);
            player.removeEventListener('error', shakaErrorHandler);
            await destroyPlayers();
            const fallbackStream = { ...stream, url: stream.fallbackUrl };
            delete fallbackStream.keys; // Remove DRM keys so HLS logic is used.
            await setupHlsPlayer(videoElement, fallbackStream);
        } else {
            onErrorEvent({ detail: error });
        }
    };
    player.addEventListener('error', shakaErrorHandler);
    player.configure({ drm: { clearKeys: stream.keys } });

    // Create a promise that rejects if load doesn't finish in time.
    const loadPromise = player.load(stream.url);
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Shaka load timed out")), 10000); // 10 seconds timeout
    });

    try {
        // Wait for either the load to succeed or the timeout.
        await Promise.race([loadPromise, timeoutPromise]);
        populateQualityOptionsShaka();
        clearNotification();
        hideLoadingSpinner();
        if (document.getElementById('autoStart').checked) {
            videoElement.play();
            updatePlayPauseButton();
        }
    } catch (error) {
        console.error("Error loading DRM stream with Shaka:", error);
        // If an error occurs (or timeout fires) and fallback is available, use it.
        if (stream.fallbackUrl && !stream.fallbackAttempted) {
            stream.fallbackAttempted = true;
            console.log("Fallback triggered in catch block. Switching to HLS fallback URL:", stream.fallbackUrl);
            await destroyPlayers();
            const fallbackStream = { ...stream, url: stream.fallbackUrl };
            delete fallbackStream.keys;
            await setupHlsPlayer(videoElement, fallbackStream);
        } else {
            onErrorEvent({ detail: error });
        }
    }
}

async function setupHlsPlayer(videoElement, stream) {
    showLoadingSpinner();
    if (Hls.isSupported()) {
        let hls = new Hls();
        window.hls = hls;
        hls.attachMedia(videoElement);
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
            hls.loadSource(stream.url);
            hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                populateQualityOptionsHls(data.levels);
                clearNotification();
                hideLoadingSpinner();
                if (document.getElementById('autoStart').checked) {
                    videoElement.play();
                    updatePlayPauseButton();
                }
            });
        });
        hls.on(Hls.Events.ERROR, (event, data) => {
            console.error('HLS.js error:', data);
            // Attempt fallback on any error (or adjust this check as needed)
            if (stream.fallbackUrl && !stream.fallbackAttempted) {
                stream.fallbackAttempted = true;
                console.log("Attempting HLS fallback URL:", stream.fallbackUrl);
                // Destroy current instance and create a new one with the fallback URL
                hls.destroy();
                let newHls = new Hls();
                window.hls = newHls;
                newHls.attachMedia(videoElement);
                newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
                    newHls.loadSource(stream.fallbackUrl);
                    newHls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                        populateQualityOptionsHls(data.levels);
                        clearNotification();
                        hideLoadingSpinner();
                        if (document.getElementById('autoStart').checked) {
                            videoElement.play();
                            updatePlayPauseButton();
                        }
                    });
                });
            } else {
                showNotification('An error occurred while loading the video. Please try again.');
            }
        });
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
        videoElement.src = stream.url;
        videoElement.addEventListener('loadedmetadata', () => {
            populateQualityOptionsNative();
            clearNotification();
            hideLoadingSpinner();
            if (document.getElementById('autoStart').checked) {
                videoElement.play();
                updatePlayPauseButton();
            }
        });
    } else {
        console.error('HLS not supported in this browser');
        showNotification('HLS is not supported in this browser.');
    }
}

// ==============================
//     Custom Video Controls
// ==============================
function setupCustomVideoControls() {
    const video = document.getElementById('video');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const fullscreenBtn = document.getElementById('fullscreenBtn');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');

    playPauseBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
        updatePlayPauseButton();
    });

    video.addEventListener('click', () => {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
        updatePlayPauseButton();
    });

    video.addEventListener('timeupdate', () => {
        const progressPercent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    });

    progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const clickPos = e.clientX - rect.left;
        const clickPercent = clickPos / rect.width;
        video.currentTime = clickPercent * video.duration;
    });

    volumeSlider.addEventListener('input', () => {
        video.volume = volumeSlider.value;
    });

    // Fullscreen button toggles fullscreen on the entire player container
    fullscreenBtn.addEventListener('click', () => {
        const container = document.querySelector('.player-container');
        if (!document.fullscreenElement) {
            if (container.requestFullscreen) {
                container.requestFullscreen();
            } else if (container.webkitRequestFullscreen) {
                container.webkitRequestFullscreen();
            } else if (container.msRequestFullscreen) {
                container.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    });

    // Listen for fullscreen changes to update the button text
    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            fullscreenBtn.textContent = '✕';
        } else {
            fullscreenBtn.textContent = '⛶';
        }
    });

    // Auto-hide controls on inactivity
    let controlTimeout;
    const videoContainer = document.querySelector('.player-container');
    videoContainer.addEventListener('mousemove', () => {
        document.getElementById('videoControls').style.opacity = 1;
        clearTimeout(controlTimeout);
        controlTimeout = setTimeout(() => {
            document.getElementById('videoControls').style.opacity = 0;
        }, 3000);
    });
}

function updatePlayPauseButton() {
    const video = document.getElementById('video');
    const playPauseBtn = document.getElementById('playPauseBtn');
    playPauseBtn.textContent = video.paused ? '⏯' : '⏸';
}

// ==============================
//    Quality Handling
// ==============================
function populateQualityOptionsHls(levels) {
    const qualitySelection = document.getElementById('qualitySelection');
    qualitySelection.innerHTML = '';

    const autoOption = document.createElement('div');
    autoOption.classList.add('option');
    autoOption.textContent = 'Auto';
    autoOption.onclick = () => changeQualityHls(-1);
    qualitySelection.appendChild(autoOption);

    levels.forEach((level, index) => {
        const option = document.createElement('div');
        option.classList.add('option');
        option.textContent = `${level.height}p (${Math.round(level.bitrate / 1000)} kbps)`;
        option.onclick = () => changeQualityHls(index);
        qualitySelection.appendChild(option);
    });

    setQualitySelectLabel('Select Quality');
}

function changeQualityHls(levelIndex) {
    if (!window.hls) return;
    window.hls.currentLevel = levelIndex;
    if (levelIndex === -1) {
        setQualitySelectLabel('Auto');
    } else {
        const level = window.hls.levels[levelIndex];
        setQualitySelectLabel(`${level.height}p (${Math.round(level.bitrate / 1000)} kbps)`);
    }
    closeAllSelect();
}

function populateQualityOptionsShaka() {
    if (!player) return;
    const tracks = player.getVariantTracks();
    const qualitySelection = document.getElementById('qualitySelection');
    qualitySelection.innerHTML = '';

    tracks.forEach((track) => {
        const option = document.createElement('div');
        option.classList.add('option');
        option.textContent = `${track.height}p (${Math.round(track.bandwidth / 1000)} kbps)`;
        option.onclick = () => changeQualityShaka(track.id);
        qualitySelection.appendChild(option);
    });

    setQualitySelectLabel('Select Quality');
}

function changeQualityShaka(trackId) {
    if (!player) return;
    const tracks = player.getVariantTracks();
    const selectedTrack = tracks.find(t => t.id === trackId);
    if (selectedTrack) {
        player.selectVariantTrack(selectedTrack, true);
        setQualitySelectLabel(`${selectedTrack.height}p (${Math.round(selectedTrack.bandwidth / 1000)} kbps)`);
        closeAllSelect();
    }
}

function populateQualityOptionsNative() {
    const qualitySelection = document.getElementById('qualitySelection');
    qualitySelection.innerHTML = '';
    const option = document.createElement('div');
    option.classList.add('option');
    option.textContent = 'Default';
    option.onclick = () => {
        setQualitySelectLabel('Default');
        closeAllSelect();
    };
    qualitySelection.appendChild(option);
    setQualitySelectLabel('Default');
}

function setQualitySelectLabel(labelText) {
    document.querySelector('#qualitySelectContainer .select-selected').textContent = labelText;
}

// ==============================
//     Custom Select Handling
// ==============================
function populateStreamOptions() {
    const streamOptionsContainer = document.getElementById('streamOptions');
    streamOptionsContainer.innerHTML = '';
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const showFavoritesOnly = document.getElementById('showFavorites').checked;
    const searchFilter = document.getElementById('streamSearch').value.toUpperCase();

    Object.keys(streams).forEach(streamKey => {
        const stream = streams[streamKey];
        if (showFavoritesOnly && !favorites.includes(streamKey)) return;
        if (!stream.name.toUpperCase().includes(searchFilter)) return;

        const optionDiv = document.createElement('div');
        optionDiv.classList.add('option', 'stream-option');

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('stream-name');
        nameDiv.textContent = stream.name;
        nameDiv.onclick = () => {
            changeStream(streamKey);
            closeAllSelect();
        };

        const favoriteIcon = document.createElement('span');
        favoriteIcon.classList.add('favorite-icon');
        favoriteIcon.textContent = favorites.includes(streamKey) ? '★' : '☆';
        favoriteIcon.onclick = (e) => {
            e.stopPropagation();
            toggleFavorite(streamKey);
        };

        optionDiv.appendChild(nameDiv);
        optionDiv.appendChild(favoriteIcon);
        streamOptionsContainer.appendChild(optionDiv);
    });
}

function generateStreamLibrary() {
    const libraryContainer = document.getElementById('streamLibrary');
    libraryContainer.innerHTML = '';
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const showFavoritesOnly = document.getElementById('showFavorites').checked;
    const searchFilter = document.getElementById('streamSearch').value.toUpperCase();

    Object.keys(streams).forEach(streamKey => {
        const stream = streams[streamKey];
        const isFavorite = favorites.includes(streamKey);
        if (showFavoritesOnly && !isFavorite) return;
        if (!stream.name.toUpperCase().includes(searchFilter)) return;

        const card = document.createElement('div');
        card.classList.add('stream-card');

        const namePlaceholder = document.createElement('div');
        namePlaceholder.classList.add('stream-thumbnail-text');
        namePlaceholder.textContent = stream.name;
        card.appendChild(namePlaceholder);

        const overlay = document.createElement('div');
        overlay.classList.add('stream-favorite-overlay');

        const favIcon = document.createElement('div');
        favIcon.classList.add('favorite-icon');
        favIcon.textContent = isFavorite ? '★' : '☆';
        favIcon.onclick = (e) => {
            e.stopPropagation();
            toggleFavorite(streamKey);
        };

        overlay.appendChild(favIcon);
        card.onclick = () => {
            changeStream(streamKey);
        };
        card.appendChild(overlay);
        libraryContainer.appendChild(card);
    });
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

function toggleSelect(selectedElement) {
    closeAllSelect(selectedElement);
    selectedElement.nextElementSibling.classList.toggle('select-hide');
    selectedElement.classList.toggle('select-arrow-active');
}

function updateStreamSelectedText(text) {
    document.querySelector('#streamSelectContainer .select-selected').textContent = text;
}

// ==============================
//         UI Event Listeners
// ==============================
function setupEventListeners() {
    const streamSelectContainer = document.getElementById('streamSelectContainer');
    streamSelectContainer
        .querySelector('.select-selected')
        .addEventListener('click', function () {
            toggleSelect(this);
        });

    const qualitySelectContainer = document.getElementById('qualitySelectContainer');
    qualitySelectContainer
        .querySelector('.select-selected')
        .addEventListener('click', function () {
            toggleSelect(this);
        });

    document.addEventListener('click', (e) => {
        if (!e.target.matches('.select-selected') && !e.target.matches('.favorite-icon')) {
            closeAllSelect();
        }
    });

    // Favorites / Search
    document.getElementById('showFavorites').addEventListener('change', () => {
        populateStreamOptions();
        generateStreamLibrary();
    });
    document.getElementById('streamSearch').addEventListener('input', () => {
        populateStreamOptions();
        generateStreamLibrary();
    });
}

// ==============================
//         Dark Mode
// ==============================
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

// ==============================
//         Favorites
// ==============================
function toggleFavorite(streamKey) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(streamKey)) {
        favorites = favorites.filter(fav => fav !== streamKey);
    } else {
        favorites.push(streamKey);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    populateStreamOptions();
    generateStreamLibrary();
}