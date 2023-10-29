const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    //store triggered event
    window.deferredPrompt = event;

    //show the button
    butInstall.classList.toggle("hidden", false);
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    //show prompt
    promptEvent.prompt();

    //rest deferred
    window.deferredPrompt = null;

    //hide button
    butInstall.classList.toggle("hidden", true);
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    //clear prompt
    window.deferredPrompt = null;
});
