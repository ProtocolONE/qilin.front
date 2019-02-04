
import axios, {AxiosResponse} from 'axios';
import config from '@/config';

export interface Options {
  width: number;
  height: number;
}

export type FileReadyFunc = (urls: string[]) => any;

export default function Uploader(opts: Options, fileReady: FileReadyFunc) {
  const input: HTMLInputElement = document.createElement('input');
  input.type = "file";
  input.style.display = 'none';
  document.body.appendChild(input);
  input.addEventListener('change', event => (async () => {
    if (!input.files.length) {
      return;
    }
    const file: File = input.files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    const response: AxiosResponse = await axios.post(config.image_api + '/resize', formData, {
      params: {
        width: opts.width,
        height: opts.height,
        format: 'jpeg',
      },
      headers: {
        'Content-Type': `multipart/form-data`,
      }
    });
    fileReady([response.data]);
  })()
    .then(res => {})
    .catch(err => console.error(err)));
  input.click();
  // ... no promise cuz at this point we didn't known when dialog is closed.
};
