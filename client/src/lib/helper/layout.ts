export function activeMenu(elt: string) {
    document.querySelectorAll('.dropdown-item').forEach(elt => elt.classList.remove('active'))
    document.querySelector(elt)?.classList.add('active')
}