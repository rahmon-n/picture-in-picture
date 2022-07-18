const videoElement = document.querySelector('#video');
const button = document.querySelector('#button');

async function selectMediaStream() {
  try {
    const mediaStream = await navigator.mediaDevices.getDisplayMedia();
    videoElement.srcObject = mediaStream;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  } catch (error) {
    console.log('error: ', error);
  }
}

selectMediaStream();

button.addEventListener('click', async () => {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
  } else {
    button.disabled = true;
    await videoElement.requestPictureInPicture();
    button.disabled = false;
  }
});

videoElement.addEventListener('enterpictureinpicture', () => {
  button.textContent = 'stop';
});

videoElement.addEventListener('leavepictureinpicture', () => {
  button.textContent = 'start';
});
