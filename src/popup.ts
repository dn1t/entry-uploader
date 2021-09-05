import htm from 'htm';
import vhtml from 'vhtml';

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
        <div class="item" data-type="file">파일</div>
      </div>
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
  </div>
</>`.toString();

popup
  .querySelector('.popup .title .close')
  ?.addEventListener('click', () => togglePopup('close'));

Array.from(popup.querySelectorAll('.popup .tab .item')).forEach((el) =>
  el.addEventListener('click', () => {
    if (!el.classList.contains('selected')) {
      popup
        .querySelector('.popup .tab .item.selected')
        ?.classList.remove('selected');
      el.classList.add('selected');

      Array.from(popup.querySelectorAll(`.content`)).forEach((el) =>
        el.classList.toggle('show')
      );
    }
  })
);

document.documentElement.insertBefore(popup, document.head);
