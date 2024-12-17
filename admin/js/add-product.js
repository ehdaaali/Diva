
// let admin = JSON.parse(sessionStorage.user || null);

// window.onload = () => {
//     if (admin == null ) {
//         location.replace('/login')
        
//     }
// }

let editables = [...document.querySelectorAll('*[contenteditable="true"]')];
editables.map((element) => {
    let placeholder = element.getAttribute('date-placeholder');
    element.innerHTML = placeholder;

    element.addEventListener('focus', () =>
    {
        if (element.innerHTML === placeholder) {
            element.innerHTML = '';
        }
    })

    element.addEventListener('focusout', () =>
        {
            if (!element.innerHTML.length) {
                element.innerHTML = placeholder;
            }
        })
})