<script type="text/javascript">	

//文本合成语音，并播放
function speechSynthesisSpeak(lang, text) {

    if (!window.speechSynthesis || !window.speechSynthesis.getVoices || !window.SpeechSynthesisUtterance) {
        console.error("浏览器不支持文本合成语音，请更换浏览器使用！");
        return;
    }

    //播放合成语音
    function speak(lang, text) {
        getSpeech(lang).then((voice) => {
            if (!voice) {
                console.error("获取不到语音列表对应的语言语音，无法执行合成！");
            } else {
                //构建语音合成器
                let utterance = new window.SpeechSynthesisUtterance();
                //设置文本
                utterance.text = text;
                //设置速率
                utterance["rate"] = 1;
                //设置语言（从获取的voice设置）
                utterance.lang = voice.lang;
                //设置语言配置
                utterance.voice = voice;
                //播放语音
                window.speechSynthesis.speak(utterance);
            }
        });
    }
    //获取语音配置（异步）
    function getSpeech(lang) {
        return new Promise(function (resolve, reject) {
                let id = setInterval(() => {
                    let voices = window.speechSynthesis.getVoices();
                    let langVoices = window.speechSynthesis.getVoices().filter((d) => d.lang === lang);
                    if (langVoices.length !== 0) {
                        resolve(langVoices[0]);
                        clearInterval(id);
                    } else if (voices.length !== 0) {
                        resolve(null);
                        clearInterval(id);
                    }
                }, 10);
            }
        )
    }

    //执行合成播放
    speak(lang, text);

}
</script>	
