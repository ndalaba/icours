export function activeMenu(elt: string) {
    document.querySelectorAll('.dropdown-item').forEach(elt => elt.classList.remove('active'))
    document.querySelector(elt)?.classList.add('active')
}

export function resetSummernote() {
    const myOffcanvas = document.getElementById('offcanvasEnd')
    myOffcanvas?.addEventListener('hidden.bs.offcanvas', event => {
        document.querySelectorAll<HTMLFormElement>('#offcanvasEnd form').forEach(elt => elt.reset())
        // @ts-ignore
        $('.summernote').summernote('code', '');
    })
}