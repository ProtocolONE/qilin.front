import axios, { AxiosResponse } from 'axios';
import config from '@/config';

export interface VideoTransferOptions {

}

export type FileReadyFunc = (urls: string[]) => any;

export default function Uploader(opts: VideoTransferOptions, fileReady: FileReadyFunc) {

  if (process.env.NODE_ENV === 'development') {
    fileReady(['https://static.protocol.one/qilin/MOVIE.mp4']);
    return;
  }

  const input: HTMLInputElement = document.createElement('input');
  input.type = 'file';
  input.style.display = 'none';
  document.body.appendChild(input);
  input.addEventListener('change', () =>
    (async () => {
      if (!input.files.length) {
        return;
      }
      const file: File = input.files[0];
      const formData = new FormData();
      formData.append('file', file, file.name);
      const response: AxiosResponse = await axios.post(`${config.imaginary_api}/video`, formData, {
        params: {},
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      });
      fileReady([response.data]);
    })()
  );
  input.click();
  // ... no promise cuz at this point we didn't known when dialog is closed.
}
