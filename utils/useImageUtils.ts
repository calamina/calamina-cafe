import { filename } from 'pathe/utils';
import { PROJECT } from '~/data/projects/projects';

export const useImageUtils = () => {

    function getImages(path: string): { [k: string]: any } {
        let glob: Record<string, unknown> | null;

        switch (path) {
            case "web":
                glob = import.meta.glob('~/assets/img/web/*', { eager: true });
                // glob = import.meta.glob('~/assets/img/web/mini/*', { eager: true });
                break;
            case "phone":
                glob = import.meta.glob('~/assets/img/phone/*', { eager: true });
                break;
            default: glob = null;
        }

        if (!glob) return {}

        const images = Object.fromEntries(
            Object.entries(glob).map(([key, value]: any) => [filename(key), value.default])
        );
        return images
    }

    function getImagesSrc(path: string): string[] {
        return Object.values(getImages(path))
    }

    function getImageSrc(path: string): string {
        return Object.values(getImages(path))[0]
    }

    function getCoverAndImages(path: string): { cover: string, imgs: string[] } | null {
        const data: { cover: Record<string, unknown> | null, imgs: Record<string, unknown> | null } | null = getProjectImages(path)

        const cover = data?.cover
            ? Object.entries(data.cover).map(([_key, value]: any) => value.default)[0]
            : null

        const imgs = data?.imgs
            ? Object.entries(data.imgs).map(([_key, value]: any) => value.default)
            : []

        return { cover, imgs }
    }

    function getAllProjectImages(path: string): string[] | null {
        const imgs = getCoverAndImages(path)
        if (imgs) return [imgs.cover, ...imgs.imgs]
        return null
    }

    function getProjectImages(path: string): { cover: Record<string, unknown> | null, imgs: Record<string, unknown> | null } | null {
        const data: { cover: Record<string, unknown> | null, imgs: Record<string, unknown> | null } | null = { cover: null, imgs: null }

        switch (path) {
            case PROJECT.WEB.atlast:
                data.imgs = import.meta.glob('~/assets/img/web/atlast/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/atlast*', { eager: true });
                break;
            case PROJECT.WEB.netstart:
                data.imgs = import.meta.glob('~/assets/img/web/netstart/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/netstart*', { eager: true });
                break;
            case PROJECT.WEB.constellation:
                data.imgs = import.meta.glob('~/assets/img/web/constellation/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/constellation*', { eager: true });
                break;
            case PROJECT.WEB.jade:
                data.imgs = import.meta.glob('~/assets/img/web/jade/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/jade*', { eager: true });
                break;
            case PROJECT.WEB.pixilate:
                data.imgs = import.meta.glob('~/assets/img/web/pixilate/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/pixilate*', { eager: true });
                break;
            case PROJECT.WEB.planet:
                data.imgs = import.meta.glob('~/assets/img/web/planet/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/planet*', { eager: true });
                break;
            case PROJECT.WEB.calamina1:
                data.imgs = import.meta.glob('~/assets/img/web/calamina1/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/calamina1*', { eager: true });
                break;
            case PROJECT.WEB.calamina2:
                data.imgs = import.meta.glob('~/assets/img/web/calamina2/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/calamina2*', { eager: true });
                break;
            case PROJECT.WEB.animation:
                data.imgs = import.meta.glob('~/assets/img/web/animation/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/animation*', { eager: true });
                break;
            case PROJECT.WEB.chaser:
                data.imgs = import.meta.glob('~/assets/img/web/chaser/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/chaser*', { eager: true });
                break;
            case PROJECT.WEB.flora:
                data.imgs = import.meta.glob('~/assets/img/web/flora/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/flora*', { eager: true });
                break;
            case PROJECT.WEB.fatcat:
                data.imgs = import.meta.glob('~/assets/img/web/fatcat/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/fatcat*', { eager: true });
                break;
            case PROJECT.WEB.perpetua:
                data.imgs = import.meta.glob('~/assets/img/web/perpetua/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/perpetua*', { eager: true });
                break;
            case PROJECT.WEB.sorrow:
                data.imgs = import.meta.glob('~/assets/img/web/sorrow/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/sorrow*', { eager: true });
                break;
            case PROJECT.WEB.biosphere2:
                data.imgs = import.meta.glob('~/assets/img/web/biosphere2/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/biosphere2*', { eager: true });
                break;
            case PROJECT.WEB.bath:
                data.imgs = import.meta.glob('~/assets/img/web/bath/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/bath*', { eager: true });
                break;
            case PROJECT.WEB.words:
                data.imgs = import.meta.glob('~/assets/img/web/words/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/words*', { eager: true });
                break;
            case PROJECT.WEB.colors:
                data.imgs = import.meta.glob('~/assets/img/web/colors/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/colors*', { eager: true });
                break;
            case PROJECT.WEB.consola:
                data.imgs = import.meta.glob('~/assets/img/web/consola/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/web/consola*', { eager: true });
                break;

            case PROJECT.PHONE.cityscape:
                data.imgs = import.meta.glob('~/assets/img/phone/cityscape/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/phone/cityscape*', { eager: true });
                break;
            case PROJECT.PHONE.crystal:
                data.imgs = import.meta.glob('~/assets/img/phone/crystal/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/phone/crystal*', { eager: true });
                break;
            case PROJECT.PHONE.dots:
                data.imgs = import.meta.glob('~/assets/img/phone/dots/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/phone/dots*', { eager: true });
                break;
            case PROJECT.PHONE.end:
                data.imgs = import.meta.glob('~/assets/img/phone/end/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/phone/end*', { eager: true });
                break;
            case PROJECT.PHONE.nuit:
                data.imgs = import.meta.glob('~/assets/img/phone/nuit/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/phone/nuit*', { eager: true });
                break;
            case PROJECT.PHONE.warm:
                data.imgs = import.meta.glob('~/assets/img/phone/warm/*', { eager: true });
                data.cover = import.meta.glob('~/assets/img/phone/warm*', { eager: true });
                break;
            default: return null
        }

        return data;
    }

    return { getImages, getImagesSrc, getImageSrc, getCoverAndImages, getAllProjectImages }
}



