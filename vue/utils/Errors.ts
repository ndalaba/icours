export function hideValidationErrors(){
    document.querySelectorAll<HTMLInputElement>('input').forEach((elt) => elt.classList.remove('is_invalid'));
    document.querySelectorAll<HTMLDivElement>('.invalid-feedback').forEach((elt) => (elt.style.display = 'none'));

}

export function showValidationErrors(errors: { [s: string]: unknown; } | ArrayLike<unknown>, formId: string) {
    hideValidationErrors()
    for (const [key, value] of Object.entries(errors)) {
        document.querySelector(`#${formId + '-' + key}`)?.classList.add('is_invalid');
        const feedback = document.querySelector<HTMLDivElement>(`#${formId + '-' + key}-feedback`);
        if (feedback !== undefined && feedback !== null) {
            feedback.style.display = 'block';
            feedback.innerText = value as string;
        }
    }
}

export function hasValidationError(name: string, errors: { [s: string]: unknown; } | ArrayLike<unknown>) {
    let response = { message: "", hasError: false }
    for (const [key, value] of Object.entries(errors)) {
        if (key === name) {
            response = { message: value as string, hasError: true }
        }
        break;
    }
    return response;
}