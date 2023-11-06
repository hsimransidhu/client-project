'use strict';

document.addEventListener('DOMContentLoaded', function () {
    function BatteryStatus() {
        return 'getBattery' in navigator;
    }

    function updateOS() {
        const osInfo = window.navigator.platform || 'Not available';
        document.querySelector('.os').textContent = `Operating System: ${osInfo}`;
    }

    function updateLanguage() {
        const languageInfo = window.navigator.language || 'Not available';
        document.querySelector('.language').textContent = `System Language: ${languageInfo}`;
    }

    function updateBrowser() {
        const userAgent = window.navigator.userAgent || 'Not available';
        let browserName = 'Not available';
        if (userAgent.includes('Chrome')) {
            browserName = 'Chrome';
        } else if (userAgent.includes('Firefox')) {
            browserName = 'Firefox';
        } else if (userAgent.includes('Edge')) {
            browserName = 'Edge';
        }
        document.querySelector('.browser').textContent = `Browser: ${browserName}`;
    }

    function updateBattery() {
        if (BatteryStatus()) {
            navigator.getBattery().then(function (battery) {
                const batteryLevel = Math.round(battery.level * 100);
                const batteryStatus = battery.charging ? 'Charging' : 'Idle';
                document.querySelector('.level').textContent = `Battery Level: ${batteryLevel}%`;
                document.querySelector('.status').textContent = `Battery Status: ${batteryStatus}`;
                battery.addEventListener("chargingchange", function () {
                    updateBattery();
                });

                //  Event Listener, when the Battery Level Changes
                battery.addEventListener("levelchange", function () {
                    updateBattery();
                });
            });
        } else {
            document.querySelector('.level').textContent = 'Battery Level: Not available';
            document.querySelector('.status').textContent = 'Battery Status: Not available';
        }
    }

    function updateNetwork() {
        const networkStatus = navigator.onLine ? 'Online' : 'Offline';
        const networkButton = document.querySelector('.net');
        document.querySelector('.net').textContent = `Network Status: ${networkStatus}`;

        if (networkStatus === 'Online') {
            networkButton.textContent = 'Online';
            networkButton.style.backgroundColor = '#33ab4e';
        } else {
            networkButton.textContent = 'Offline';
            networkButton.style.backgroundColor = '#e74c3c';
        }
    }

    window.addEventListener("load", (event) => {
        const statusDisplay = document.querySelector(".net");
        statusDisplay.textContent = navigator.onLine ? "Online" : "OFFline";
    });

    window.addEventListener("offline", (event) => {
        const statusDisplay = document.querySelector(".net");
        statusDisplay.textContent = "OFFline";
        statusDisplay.style.backgroundColor = '#e74c3c';
    });

    window.addEventListener("online", (event) => {
        const statusDisplay = document.querySelector(".net");
        statusDisplay.textContent = "Online";
        statusDisplay.style.backgroundColor = '#33ab4e';
    });

    updateOS();
    updateLanguage();
    updateBrowser();
    updateWindow();
    updateBattery();
    updateNetwork();

    //onevent 
    window.addEventListener('online', updateNetwork());
    window.addEventListener('offline', updateNetwork());
});

function updateWindow() {
    let windowWidth = window.innerWidth || 'Not available';
    let windowHeight = window.innerHeight || 'Not available';
    let orientation = windowWidth > windowHeight ? 'Landscape' : 'Portrait';
    document.querySelector('.width').textContent = `Window Width: ${windowWidth}px`;
    document.querySelector('.height').textContent = `Window Height: ${windowHeight}px`;
    document.querySelector('.orientation').textContent = `Window Orientation: ${orientation}`;
}

window.addEventListener('resize', function () {
    updateWindow();
    updateOS();
    updateLanguage();
    updateBrowser();
});

