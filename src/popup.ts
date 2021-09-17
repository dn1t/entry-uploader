import htm from 'htm';
import vhtml from 'vhtml';
import manifest from './manifest.json';
import { upload } from './upload';

const html = htm.bind(vhtml);

const popup = (() => {
  if (document.querySelector('.uploaderPopupContainer') !== null)
    return document.querySelector('.uploaderPopupContainer')!;

  const tmp = document.createElement('div');
  document.documentElement.insertBefore(tmp, document.head);

  return tmp;
})();

window.isOpen = false;

export const togglePopup = (type?: 'open' | 'close') => {
  const open = (() =>
    type === undefined ? !window.isOpen : type === 'open')();

  if (open)
    (
      document.querySelector('.uploaderPopupContainer')! as HTMLDivElement
    ).style.display = 'flex';
  else
    (
      document.querySelector('.uploaderPopupContainer')! as HTMLDivElement
    ).style.display = 'none';

  window.isOpen = open;
};

popup.className = 'uploaderPopupContainer';

popup.innerHTML = html`<>
  <div class="popupBackground"></div>
  <div class="popup">
    <div class="title">
      파일 선택
      <div class="close">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-x"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </div>
    </div>
    <div class="tab">
      <div class="bg">
        <div class="item selected" data-type="image">이미지</div>
        <div class="item" data-type="music">음악</div>
        <div class="item" data-type="video">동영상</div>
        <div class="item" data-type="file">파일</div>
        <div class="item" data-type="info">정보</div>
      </div>
      <div class="by"><a href="https://playentry.org/profile/60bc5559659bf40bd15d022c" target="_blank">띠까</a></div>
    </div>
    <div class="content image show">
      <input type="file" id="image" accept=".jpg, .png, .jpeg, .gif, .bmp, .apng, .svg, .ico, .webp" style="display: none;" />
      <label for="image">
        <a class="uploadButton">내 컴퓨터에서 선택 (8MB 미만)</a> 
      </label>
      <div class="divider">
        <div class="line" />
        <div class="or">또는</div>
        <div class="line" />
      </div>
      <form id="urlForm">
        <input type="url" id="url" placeholder="이미지 URL" />
        <button type="submit">선택</button>
      </form>
    </div>
    <div class="content music">
      <input type="file" id="music" style="display: none;" />
      <label for="music">
        <a class="uploadButton">내 컴퓨터에서 선택 (8MB 미만)</a> 
      </label>
    </div>
    <div class="content video">
      <input type="file" id="video" style="display: none;" />
      <label for="video">
        <a class="uploadButton">내 컴퓨터에서 선택 (8MB 미만)</a> 
      </label>
    </div>
    <div class="content file">
      <input type="file" id="file" style="display: none;" />
      <label for="file">
        <a class="uploadButton">내 컴퓨터에서 선택 (8MB 미만)</a> 
      </label>
      <div class="divider">
        <div class="line" />
        <div class="or">또는</div>
        <div class="line" />
      </div>
      <form id="urlForm">
        <input type="url" id="url" placeholder="구글 드라이브 공유 URL" />
        <button type="submit">선택</button>
      </form>
    </div>
    <div class="content info">
      <h2 class="name">entry-uploader</h2>
      <p class="info">v${manifest.version}</p>
      <p class="info"><a href="https://github.com/EntryHack/entry-uploader" target="_blank">entry-uploader 깃허브 레포</a>에서 버그 제보와 기여를 해주세요! 뭐가 어떻게 되어가고 있는지 알아야 개발을 하지... 제발... ㅠㅠ</p>
    </div>
  </div>
</>`.toString();

popup
  .querySelector('.popup .title .close')
  ?.addEventListener('click', () => togglePopup('close'));

(
  Array.from(popup.querySelectorAll('input[type=file]')) as HTMLInputElement[]
).forEach((el) => {
  el.onchange = async (e) => {
    const file = el.files![0];
    const fileInfo = await upload(file);

    
  };
});

Array.from(popup.querySelectorAll('.popup .tab .item')).forEach((el) =>
  el.addEventListener('click', () => {
    if (!el.classList.contains('selected')) {
      popup
        .querySelector('.popup .tab .item.selected')
        ?.classList.remove('selected');
      el.classList.add('selected');

      Array.from(popup.querySelectorAll(`.content`)).forEach((el) => {
        if (
          el.classList.contains(
            popup
              .querySelector('.popup .tab .item.selected')
              ?.getAttribute('data-type') ?? ''
          )
        )
          return el.classList.add('show');
        el.classList.remove('show');
      });
    }
  })
);

document.documentElement.insertBefore(popup, document.head);
