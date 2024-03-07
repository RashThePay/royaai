export function addArt(item) {
    let gallery = getGallery();
    const id = 'art-'+gallery.length;
    gallery.push(id);
    localStorage.setItem('gallery', JSON.stringify(gallery))
    localStorage.setItem(id,JSON.stringify(item))
}
function getGallery(){
    let gallery = localStorage.getItem('gallery')
    if (!gallery) {
        localStorage.setItem('gallery', '[]')
        gallery = '[]'
    }
    gallery = JSON.parse(gallery);
    return gallery;
}
export function getArts(){
    let gallery = getGallery()
    let arts = []
    for (let id of gallery) {
        let art = JSON.parse(localStorage.getItem(id))
        art.img?.length && arts.push(art)
    }
    return arts;
}
