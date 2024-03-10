export function addArt(item) {
    let gallery = getGallery();
    if (gallery.length >= 20) {
        let remove = gallery.shift();
        localStorage.removeItem(remove);
    }
    let id = ''
    gallery.length ? id = 'art-' + (parseInt(gallery[gallery.length - 1].split('-')[1]) + 1) : id = 'art-1';
    gallery.push(id);
    localStorage.setItem('gallery', JSON.stringify(gallery))
    localStorage.setItem(id, JSON.stringify(item))
}
function getGallery() {
    let gallery = localStorage.getItem('gallery')
    if (!gallery) {
        localStorage.setItem('gallery', '[]')
        gallery = '[]'
    }
    gallery = JSON.parse(gallery);
    return gallery;
}
export function getArts() {
    try {
        let gallery = getGallery()
        let arts = []
        for (let id of gallery) {
            let art = JSON.parse(localStorage.getItem(id))
            art.img?.length && arts.push(art)
        }
        return arts;
    } catch (error) {
        localStorage.clear();
    }
}
