import { differenceInMilliseconds } from 'date-fns';
import sharp from 'sharp';

import images from '../assets/imagems';

const imgs: string[] = Object.keys(images).reduce<string[]>((resultado, key) => {
    resultado.push(key);
    return resultado;
}, []);

(async () => {
    const inicio = new Date();

    for (const img of imgs) {
        const index = imgs.indexOf(img);

        if (index > -1) {
            const antes = new Date();
            await readFile(img);
            const depois = new Date();

            const diff = differenceInMilliseconds(depois, antes);
            console.log(`${index}: ${img} (${diff / 1000})`);
        }
    }

    const fim = new Date();

    const diff = differenceInMilliseconds(fim, inicio);

    console.log(`${imgs.length}: ${diff / 1000}`);
})();

async function readFile(file: string): Promise<void> {
    const local = `/Users/stefanobassan/Projects/artepublica-ui/assets/obras/${file}`;

    const img = sharp(local);

    const { width, height } = await img.metadata();

    await getImage(file, img, height! > width! ? undefined : 272, height! > width! ? 272 : undefined);
}

async function getImage(file: string, img: sharp.Sharp, width?: number, height?: number): Promise<void> {
    const [name] = file.split('.');
    await img
        .resize(width, height)
        .toFormat('jpeg')
        .jpeg({
            quality: 100,
            // chromaSubsampling: '4:4:4',
            force: true,
        })
        .toFile(`/Users/stefanobassan/Projects/artepublica-ui/assets/obras/resized/${name}.jpeg`);
}