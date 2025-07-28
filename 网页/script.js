const audio = document.getElementById('audio');
const lyricsContainer = document.getElementById('lyrics');

const lrc = `[00:00.00]One Last Kiss
[00:02.01]作词：宇多田ヒカル
[00:04.00]编曲：宇多田ヒカル/A.G.Cook
[00:06.00]制作人：宇多田ヒカル/A.G.Cook
[00:08.00]作曲：宇多田ヒカル
[00:11.00]网页制作：slslsllessl
[00:13.00]恭喜你迈出了重要的一步
[00:15.00]____________
[00:20.10]初めてのルーブルは
[00:22.00]なんてことはなかったわ
[00:25.03]私だけのモナリザ
[00:26.50]もうとっくに出会ってたから
[00:29.00]初めてあなたを見た
[00:31.50]あの日動き出した歯車
[00:33.90]止められない喪失の予感
[00:37.40]もういっぱいあるけど
[00:43.40]もう一つ増やしましょう
[00:48.10]Can you give me one last kiss?
[00:52.20]忘れたくないこと
[00:54.50]Oh oh oh oh oh...
[01:01.00]忘れたくないこと
[01:05.20]Oh oh oh oh...Wh---
[01:09.05]I love you more than you'll ever know
[01:20.20]「写真は苦手なんだ」
[01:22.00]でもそんなものはいらないわ
[01:24.50]あなたが焼きついたまま
[01:27.00]私の心のプロジェクター
[01:29.00]寂しくないふりしてた
[01:31.00]まあ、そんなのお互い様か
[01:33.50]誰かを求めることは 
[01:35.30]即ち傷つくことだった
[01:37.00]Oh, can you give me one last kiss?
[01:43.00]燃えるようなキスをしよう
[01:48.50]忘れたくても
[01:52.00]忘れられないほど
[01:54.03]Oh oh oh oh oh…
[02:00.20]I love you then you"ll ever know...
[02:03.01]Oh oh oh oh oh ...
[02:09.30]I love you then you"ll ever know...
[02:29.10]もう分かっているよ
[02:35.01]この世の終わりでも
[02:39.02]年をとっても
[02:45.03]忘れられない人(Oh oh oh oh...)
[02:47.02]Oh oh(忘れられない人)oh oh oh...
[02:52.03]忘れられない人(Oh oh oh oh...)
[03:00.50]I love you then you"ll ever know...
[03:03.40]Oh oh oh oh Wh---oh oh oh...
[03:09.30]忘れられない人...(Oh oh oh oh...)
[03:16.50]Oh oh oh oh...
[03:18.01]I love you then you"ll ever know...
[03:21.02]忘れられない人...
[03:22.05]忘れられない人...
[03:24.36]忘れられない人...
[03:26.65]忘れられない人...
[03:27.52]忘れられない人......(I love you then you"ll ever know...)
[03:45.03]吹いていった風の後を
[03:50.40]追いかけた眩しい午後...
[03:57.40]耳机有降噪哦`;

function parseLRC(lrcText) {
  const lines = lrcText.split('\n');
  const result = [];
  for (const line of lines) {
    const match = line.match(/\[(\d{2}):(\d{2}\.\d{2})\](.*)/);
    if (match) {
      const min = parseInt(match[1]);
      const sec = parseFloat(match[2]);
      const time = min * 60 + sec;
      const text = match[3].trim();
      result.push({ time, text });
    }
  }
  return result;
}

const lyrics = parseLRC(lrc);

lyrics.forEach((line, index) => {
  const div = document.createElement('div');
  div.className = 'line';
  div.textContent = line.text;
  div.dataset.index = index;
  lyricsContainer.appendChild(div);
});

function updateLyrics() {
  const currentTime = audio.currentTime;
  let currentIndex = 0;
  for (let i = 0; i < lyrics.length; i++) {
    if (currentTime >= lyrics[i].time) {
      currentIndex = i;
    }
  }

  document.querySelectorAll('.line').forEach((div, i) => {
    div.classList.toggle('active', i === currentIndex);
  });

  const activeLine = document.querySelector('.active');
  if (activeLine) {
    activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

audio.addEventListener('timeupdate', updateLyrics);
