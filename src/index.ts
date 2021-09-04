import './styles.css';

// window.addEventListener('load', () => {
const buttonContainer = document.querySelector('.css-5aeyry.e1h77j9v3')!;
const buttonList = buttonContainer.querySelectorAll('.css-16523bz.e1h77j9v5')!;
const templateButton = buttonList[0];

if (buttonList.length >= 2) buttonList[1].remove();

const button = templateButton.cloneNode(true) as HTMLDivElement;

button.classList.add('upload');
buttonContainer.insertBefore(button, templateButton.nextSibling);
// });
