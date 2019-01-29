import i18n from '@/i18n';

export default function changeI18nMeta(metaPath: string) {
  if (!document || !metaPath) {
    return;
  }

  const meta = {
    title: i18n.t(`${metaPath}.title`) as string,
    description: i18n.t(`${metaPath}.description`) as string,
  };

  const elemDescription = document.querySelectorAll('meta[name="description"]')[0];

  if (meta.title) {
    document.title = meta.title;
  }

  if (meta.description && elemDescription) {
      elemDescription.setAttribute('content', meta.description);
  } else if (meta.description) {
    const tag = document.createElement('meta');

    tag.setAttribute('name', 'description');
    tag.setAttribute('content', meta.description);

    document.head.appendChild(tag);
  } else if (elemDescription) {
    elemDescription.parentNode.removeChild(elemDescription);
  }
}
