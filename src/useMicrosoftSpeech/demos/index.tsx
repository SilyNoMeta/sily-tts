import { AudioPlayer, genLevaOptions, getEdgeVoiceOptions, useMicrosoftSpeech } from '@lobehub/tts';
import { Icon, StoryBook, useControls, useCreateStore } from '@lobehub/ui';
import { Button, Input } from 'antd';
import { Volume2 } from 'lucide-react';
import { Flexbox } from 'react-layout-kit';

const defaultText = '这是一段使用 Microsoft Speech 的语音演示';

export default () => {
  const store = useCreateStore();
  const options: any = useControls(
    {
      api: {
        label: 'MICROSOFT_SPEECH_PROXY_URL',
        value: '',
      },
      name: {
        options: genLevaOptions(getEdgeVoiceOptions()),
        value: 'zh-CN-YunxiaNeural',
      },
      pitch: {
        max: 1,
        min: -1,
        step: 0.1,
        value: 0,
      },
      rate: {
        max: 1,
        min: -1,
        step: 0.1,
        value: 0,
      },
      style: {
        options: [
          'affectionate',
          'angry',
          'calm',
          'cheerful',
          'disgruntled',
          'embarrassed',
          'fearful',
          'general',
          'gentle',
          'sad',
          'serious',
        ],
        value: 'general',
      },
    },
    { store },
  );
  const { setText, isGlobalLoading, audio, start, stop } = useMicrosoftSpeech(defaultText, options);
  return (
    <StoryBook levaStore={store}>
      <Flexbox gap={8}>
        {isGlobalLoading ? (
          <Button block loading onClick={stop}>
            Generating...
          </Button>
        ) : (
          <Button block icon={<Icon icon={Volume2} />} onClick={start} type={'primary'}>
            Speak
          </Button>
        )}
        <Input.TextArea defaultValue={defaultText} onChange={(e) => setText(e.target.value)} />
        <AudioPlayer audio={audio} isLoading={isGlobalLoading} />
      </Flexbox>
    </StoryBook>
  );
};