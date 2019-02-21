import axios from 'axios';
import config from '@/config';

export interface Options {
  width: number;
  height: number;
}

export type FileReadyFunc = (urls: string[]) => any;
export type FileSelectFunc = (file: File) => any;

export function Select(select: FileSelectFunc) {
  const input: HTMLInputElement = document.createElement('input');
  input.type = 'file';
  input.style.display = 'none';
  document.body.appendChild(input);
  input.addEventListener('change', () =>
    (async () => {
      if (!input.files.length) {
        return;
      }
      select(input.files[0]);
    })()
  );
  input.click();
  // ... no promise cuz at this point we didn't known when dialog is closed.
}

export function UploadImage(file: File, opts: Options, fileReady: FileReadyFunc) {
  const formData = new FormData();
  formData.append('file', file, file.name);
  axios
    .post(`${config.imaginary_api}/resize`, formData, {
      params: {
        width: opts.width,
        height: opts.height,
        format: 'jpeg',
      },
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    })
    .then(res => fileReady([res.data]));
}

export function UploadVideo(file: File, fileReady: FileReadyFunc) {
  const formData = new FormData();
  formData.append('file', file, file.name);
  axios
    .post(`${config.imaginary_api}/video`, formData, {
      params: {},
      headers: {
        'Content-Type': `multipart/form-data`,
      },
    })
    .then(res => fileReady([res.data]))
}
