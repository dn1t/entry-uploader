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
        <div class="item" data-type="file">파일</div>
        <div class="item" data-type="spotify">Spotify</div>
        <div class="item" data-type="info">정보</div>
      </div>
      <div class="by"><a href="https://playentry.org/profile/60bc5559659bf40bd15d022c" target="_blank">제작자 팔로우하기</a></div>
    </div>
    <div class="content image show">
      <input type="file" id="image" accept=".jpg, .png, .jpeg, .gif, .bmp, .apng, .svg, .ico, .webp" style="display: none;" />
      <label for="image">
        <a class="uploadButton">내 컴퓨터에서 선택</a> 
      </label>
      <div class="divider">
        <div class="line" />
        <div class="or">또는</div>
        <div class="line" />
      </div>
      <form id="urlForm">
        <input type="url" id="url" placeholder="이미지 원본 URL" />
        <button type="submit">확인</button>
      </form>
    </div>
    <div class="content file">
      <input type="file" id="file" style="display: none;" />
      <label for="file">
        <a class="uploadButton">내 컴퓨터에서 선택</a> 
      </label>
    </div>
    <div class="content spotify">
      <form id="urlForm">
        <input type="url" id="url" placeholder="Spotify 음원 URL" />
        <button type="submit">확인</button>
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
    popup.querySelector(
      '.content.show label[for] a.uploadButton'
    )!.textContent = '업로드 중입니다...';
    const fileInfo = await upload(file);

    const info = document.querySelector('.css-1lpaq59.e1h77j9v0 .link')!;

    info.textContent = `첨부된 파일: ${file.name}`;

    togglePopup('close');

    popup.querySelector(
      '.content.show label[for] a.uploadButton'
    )!.textContent = '내 컴퓨터에서 선택';

    (
      document.querySelector('.css-vvqlz4.e13821ld2')! as HTMLAnchorElement
    ).onclick = async (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();

      const content = (document.getElementById('Write')! as HTMLTextAreaElement)
        .value;

      const postRes = await fetch('https://playentry.org/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: `mutation CREATE_ENTRYSTORY(
            $content: String
            $text: String
            $image: String
            $sticker: String
            $cursor: String
          ) {
            createEntryStory(
              content: $content
              text: $text
              image: $image
              sticker: $sticker
              cursor: $cursor
            ) {
              discuss {
                id
              }
            }
          }
          `,
          variables: { content },
        }),
      });
      if (!postRes.ok) return alert(`에러: ${postRes.status}`);

      const postData = await postRes.json();
      if (
        !(
          postData.errors === undefined ||
          postData.errors[0] === undefined ||
          postData.errors[0].statusCode === undefined
        )
      )
        return alert(`에러: ${postData.errors[0].statusCode}`);

      const res = await fetch(
        'https://entry-uploader.thoratica.repl.co/addData',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: postData.data.createEntryStory.discuss.id,
            files: [
              {
                type:
                  popup.querySelector('.content.show')?.classList[1] ?? 'file',
                url: `https://playentry.org/uploads/${fileInfo.filename.slice(
                  0,
                  2
                )}/${fileInfo.filename.slice(2, 4)}/${fileInfo.filename}.${
                  fileInfo.filename.imageType
                }`,
              },
            ],
          }),
        }
      );

      console.log(await res.json());

      location.reload();
    };
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
