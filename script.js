// Funci�n as�ncrona para agregar plantillas de manera m�s eficiente
async function addTemplate(url, from, to, position) {
    try {
        const response = await fetch(url);
        const html = await response.text();

        // Comprobar si el contenido HTML est� vac�o
        if (!html.trim()) {
            //console.warn('External HTML content is empty:', url);
            return;
        }

        const tempElement = document.createElement('div');
        tempElement.innerHTML = html;
        const sectionElement = tempElement.querySelector(from);

        if (!sectionElement || !sectionElement.innerHTML.trim()) {
            console.warn(`Template content is empty for selector: ${from}`);
            return;
        }

        const contentContainer = document.querySelector(to);
        if (!contentContainer) {
            console.error(`Element not found with selector: ${to}`);
            return;
        }

        switch (position) {
            case 'top':
                contentContainer.prepend(sectionElement.cloneNode(true));
                break;
            case 'bottom':
                contentContainer.appendChild(sectionElement.cloneNode(true));
                break;
            default:
                console.error('Invalid position parameter. Use "top" or "bottom".');
        }
    } catch (error) {
        console.error('Error loading external HTML file:', error);
    }
}

// Funci�n para obtener la base del path
function getBasePath() {
    const parts = window.location.pathname.split('/');
    if (parts[parts.length - 1] !== 'argent' && parts[parts.length - 1] !== '') {
        parts.pop();
    }
    const index = parts.indexOf('argent');
    if (index !== -1) {
        return window.location.origin + parts.slice(0, index + 1).join('/');
    }
    return window.location.origin + parts.join('/');
}

const basePath = getBasePath();

// Estas l�neas intentar�n cargar las plantillas, pero si est�n vac�as, no se agregar�n al DOM
addTemplate(`${basePath}/header/index.html`, '.header', '.page', 'top');
addTemplate(`${basePath}/footer/index.html`, '.footer', '.page', 'bottom');
addTemplate(`${basePath}/sidebar/index.html`, '.sidebar', '.page', 'bottom');

function open_right_sidebar() {
    const sidebar = document.getElementsByClassName("sidebar")[0];
    sidebar.style.right = "0";
    sidebar.style.transition = "0.3s";
}
