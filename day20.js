window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// 判斷使否有SpeechRecognition物件

const recognition = new SpeechRecognition();
recognition.interimResults = true; //邊輸入邊出現結果
// recognition.lang = 'en-US';//原始設定
recognition.lang = 'zh-TW'; //輸入中文

let p = document.createElement('p');//先創再一個<p>
const words = document.querySelector('.words');
words.appendChild(p);

// 辨識成功就出現結果
recognition.addEventListener('result', e => {
    // console.log(e);//每次輸入聲音都會出現
    // console.log(e.results);
    // console.log(e.results[0]);
    // 產出文字
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    // 把這些發音套換成圖示，注意要使用 recognition.lang = 'en-US';才能正確輸入
    const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '😏');
    // 如果要把這些發音換成中文也OK

    // 輸出文字
    p.textContent = poopScript;//把變數內容放入上方設定的<p>

    // 如果辨識完成，就在結尾加上<p>，否則第二次輸入會覆蓋第一次
    if (e.results[0].isFinal) {
        p = document.createElement('p');
        words.appendChild(p);
    }
});

//測試-聲音停止時觸發
recognition.addEventListener('soundend', e => {
    console.log(e);
});

//因為start只會辨識一次，故要結束再啟動
recognition.addEventListener('end', recognition.start);

recognition.start();//開始接收音訊輸入
